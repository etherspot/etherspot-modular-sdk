import { Buffer } from 'buffer';
import { concat, decodeAbiParameters, encodeAbiParameters, keccak256, pad, parseAbiParameters } from 'viem';
import { hexlifyValue } from './utils/hexlify.js';
import { BigNumber } from '../types/bignumber.js';
// TODO - test this on sepolia
/**
 * pack the userOperation
 * @param op
 * @param forSignature "true" if the hash is needed to calculate the getUserOpHash()
 *  "false" to pack entire UserOp, for calculating the calldata cost of putting it on-chain.
 */
export function packUserOp(op1, forSignature = true) {
    let op;
    if ('callGasLimit' in op1) {
        op = packUserOpData(op1);
    }
    else {
        op = op1;
    }
    if (forSignature) {
        const packedUserOp = encodeAbiParameters(parseAbiParameters('address, uint256, bytes32, bytes32, bytes32, uint256, bytes32, bytes32'), [op.sender,
            BigInt(op.nonce),
            keccak256(op.initCode),
            keccak256(op.callData),
            op.accountGasLimits.toString(),
            BigInt(op.preVerificationGas),
            op.gasFees.toString(),
            keccak256(op.paymasterAndData)]);
        return packedUserOp;
    }
    else {
        // for the purpose of calculating gas cost encode also signature (and no keccak of bytes)
        const packedUserOp = encodeAbiParameters(parseAbiParameters('address, uint256, bytes, bytes, bytes32, uint256, bytes32, bytes, bytes'), [op.sender,
            BigInt(op.nonce),
            op.initCode,
            op.callData,
            op.accountGasLimits.toString(),
            BigInt(op.preVerificationGas),
            op.gasFees.toString(),
            op.paymasterAndData,
            op.signature]);
        return packedUserOp;
    }
}
export function packUint(high128, low128) {
    return pad(BigNumber.from(high128).shl(128).add(low128).toHexString(), { size: 32 });
}
// TODO - test this on sepolia
export function packPaymasterData(paymaster, paymasterVerificationGasLimit, postOpGasLimit, paymasterData) {
    const paymasterAndData = paymasterData ? paymasterData : '0x';
    return concat([
        paymaster,
        packUint(paymasterVerificationGasLimit, postOpGasLimit),
        paymasterAndData
    ]);
}
// TODO - test this on sepolia
export function packUserOpData(op) {
    let paymasterAndData;
    if (op.paymaster == null) {
        paymasterAndData = '0x';
    }
    else {
        if (op.paymasterVerificationGasLimit == null || op.paymasterPostOpGasLimit == null) {
            throw new Error('paymaster with no gas limits');
        }
        paymasterAndData = packPaymasterData(op.paymaster, op.paymasterVerificationGasLimit, op.paymasterPostOpGasLimit, op.paymasterData);
    }
    return {
        sender: op.sender,
        nonce: BigNumber.from(op.nonce).toHexString(),
        initCode: op.factory == null ? '0x' : concat([op.factory, op.factoryData ?? '']),
        callData: op.callData,
        accountGasLimits: packUint(op.verificationGasLimit, op.callGasLimit),
        preVerificationGas: BigNumber.from(op.preVerificationGas).toHexString(),
        gasFees: packUint(op.maxPriorityFeePerGas, op.maxFeePerGas),
        paymasterAndData,
        signature: op.signature
    };
}
/**
 * calculate the userOpHash of a given userOperation.
 * The userOpHash is a hash of all UserOperation fields, except the "signature" field.
 * The entryPoint uses this value in the emitted UserOperationEvent.
 * A wallet may use this value as the hash to sign (the SampleWallet uses this method)
 * @param op
 * @param entryPoint
 * @param chainId
 */
export function getUserOpHash(op, entryPoint, chainId) {
    const userOpHash = keccak256(packUserOp(op, true));
    //const enc = defaultAbiCoder.encode(['bytes32', 'address', 'uint256'], [userOpHash, entryPoint, chainId]);
    const enc = encodeAbiParameters(parseAbiParameters('bytes32, address, uint256'), [userOpHash, entryPoint, BigInt(chainId)]);
    return keccak256(enc);
}
const ErrorSig = keccak256(Buffer.from('Error(string)')).slice(0, 10); // 0x08c379a0
const FailedOpSig = keccak256(Buffer.from('FailedOp(uint256,string)')).slice(0, 10); // 0x220266b6
/**
 * decode bytes thrown by revert as Error(message) or FailedOp(opIndex,paymaster,message)
 */
// TODO-Test decodeErrorReason
export function decodeErrorReason(error) {
    if (error.startsWith(ErrorSig)) {
        const [message] = decodeAbiParameters(parseAbiParameters('string'), '0x' + error.substring(10));
        return { message };
    }
    else if (error.startsWith(FailedOpSig)) {
        const [opIndexBigInt, message] = decodeAbiParameters(parseAbiParameters('uint256, string'), '0x' + error.substring(10));
        const formattedMessage = `FailedOp: ${message}`;
        return {
            message: formattedMessage,
            opIndex: Number(opIndexBigInt),
        };
    }
}
/**
 * update thrown Error object with our custom FailedOp message, and re-throw it.
 * updated both "message" and inner encoded "data"
 * tested on geth, hardhat-node
 * usage: entryPoint.handleOps().catch(decodeError)
 */
export function rethrowError(e) {
    let error = e;
    let parent = e;
    if (error?.error != null) {
        error = error.error;
    }
    while (error?.data != null) {
        parent = error;
        error = error.data;
    }
    const decoded = typeof error === 'string' && error.length > 2 ? decodeErrorReason(error) : undefined;
    if (decoded != null) {
        e.message = decoded.message;
        if (decoded.opIndex != null) {
            // helper for chai: convert our FailedOp error into "Error(msg)"
            const errorWithMsg = concat([ErrorSig, encodeAbiParameters(parseAbiParameters('string'), [decoded.message])]);
            // modify in-place the error object:
            parent.data = errorWithMsg;
        }
    }
    throw e;
}
/**
 * hexlify all members of object, recursively
 * @param obj
 */
export function deepHexlify(obj) {
    if (typeof obj === 'function') {
        return undefined;
    }
    if (obj == null || typeof obj === 'string' || typeof obj === 'boolean') {
        return obj;
    }
    else if (obj._isBigNumber != null || typeof obj !== 'object') {
        const hexlified = hexlifyValue(obj).replace(/^0x0/, '0x');
        return hexlified;
    }
    if (Array.isArray(obj)) {
        return obj.map((member) => deepHexlify(member));
    }
    return Object.keys(obj).reduce((set, key) => ({
        ...set,
        [key]: deepHexlify(obj[key]),
    }), {});
}
// resolve all property and hexlify.
// (UserOpMethodHandler receives data from the network, so we need to pack our generated values)
export function resolveHexlify(a) {
    return deepHexlify(a);
}
//# sourceMappingURL=ERC4337Utils.js.map