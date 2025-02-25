"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packUserOp = packUserOp;
exports.packUint = packUint;
exports.packPaymasterData = packPaymasterData;
exports.packUserOpData = packUserOpData;
exports.getUserOpHash = getUserOpHash;
exports.decodeErrorReason = decodeErrorReason;
exports.rethrowError = rethrowError;
exports.deepHexlify = deepHexlify;
exports.resolveHexlify = resolveHexlify;
const buffer_1 = require("buffer");
const viem_1 = require("viem");
const hexlify_js_1 = require("./utils/hexlify.js");
const bignumber_js_1 = require("../types/bignumber.js");
function packUserOp(op1, forSignature = true) {
    let op;
    if ('callGasLimit' in op1) {
        op = packUserOpData(op1);
    }
    else {
        op = op1;
    }
    if (forSignature) {
        const packedUserOp = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('address, uint256, bytes32, bytes32, bytes32, uint256, bytes32, bytes32'), [op.sender,
            BigInt(op.nonce),
            (0, viem_1.keccak256)(op.initCode),
            (0, viem_1.keccak256)(op.callData),
            op.accountGasLimits.toString(),
            BigInt(op.preVerificationGas),
            op.gasFees.toString(),
            (0, viem_1.keccak256)(op.paymasterAndData)]);
        return packedUserOp;
    }
    else {
        const packedUserOp = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('address, uint256, bytes, bytes, bytes32, uint256, bytes32, bytes, bytes'), [op.sender,
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
function packUint(high128, low128) {
    return (0, viem_1.pad)(bignumber_js_1.BigNumber.from(high128).shl(128).add(low128).toHexString(), { size: 32 });
}
function packPaymasterData(paymaster, paymasterVerificationGasLimit, postOpGasLimit, paymasterData) {
    const paymasterAndData = paymasterData ? paymasterData : '0x';
    return (0, viem_1.concat)([
        paymaster,
        packUint(paymasterVerificationGasLimit, postOpGasLimit),
        paymasterAndData
    ]);
}
function packUserOpData(op) {
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
        nonce: bignumber_js_1.BigNumber.from(op.nonce).toHexString(),
        initCode: op.factory == null ? '0x' : (0, viem_1.concat)([op.factory, op.factoryData ?? '']),
        callData: op.callData,
        accountGasLimits: packUint(op.verificationGasLimit, op.callGasLimit),
        preVerificationGas: bignumber_js_1.BigNumber.from(op.preVerificationGas).toHexString(),
        gasFees: packUint(op.maxPriorityFeePerGas, op.maxFeePerGas),
        paymasterAndData,
        signature: op.signature
    };
}
function getUserOpHash(op, entryPoint, chainId) {
    const userOpHash = (0, viem_1.keccak256)(packUserOp(op, true));
    const enc = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('bytes32, address, uint256'), [userOpHash, entryPoint, BigInt(chainId)]);
    return (0, viem_1.keccak256)(enc);
}
const ErrorSig = (0, viem_1.keccak256)(buffer_1.Buffer.from('Error(string)')).slice(0, 10);
const FailedOpSig = (0, viem_1.keccak256)(buffer_1.Buffer.from('FailedOp(uint256,string)')).slice(0, 10);
function decodeErrorReason(error) {
    if (error.startsWith(ErrorSig)) {
        const [message] = (0, viem_1.decodeAbiParameters)((0, viem_1.parseAbiParameters)('string'), '0x' + error.substring(10));
        return { message };
    }
    else if (error.startsWith(FailedOpSig)) {
        const [opIndexBigInt, message] = (0, viem_1.decodeAbiParameters)((0, viem_1.parseAbiParameters)('uint256, string'), '0x' + error.substring(10));
        const formattedMessage = `FailedOp: ${message}`;
        return {
            message: formattedMessage,
            opIndex: Number(opIndexBigInt),
        };
    }
}
function rethrowError(e) {
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
            const errorWithMsg = (0, viem_1.concat)([ErrorSig, (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('string'), [decoded.message])]);
            parent.data = errorWithMsg;
        }
    }
    throw e;
}
function deepHexlify(obj) {
    if (typeof obj === 'function') {
        return undefined;
    }
    if (obj == null || typeof obj === 'string' || typeof obj === 'boolean') {
        return obj;
    }
    else if (obj._isBigNumber != null || typeof obj !== 'object') {
        const hexlified = (0, hexlify_js_1.hexlifyValue)(obj).replace(/^0x0/, '0x');
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
function resolveHexlify(a) {
    return deepHexlify(a);
}
//# sourceMappingURL=ERC4337Utils.js.map