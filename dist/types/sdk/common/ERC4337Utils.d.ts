import { BaseAccountUserOperationStruct } from '../types/user-operation-types.js';
import { BigNumberish } from '../types/bignumber.js';
import { BytesLike } from './types.js';
export interface UserOperation {
    sender: string;
    nonce: BigNumberish;
    factory?: string;
    factoryData?: BytesLike;
    callData: BytesLike;
    callGasLimit: BigNumberish;
    verificationGasLimit: BigNumberish;
    preVerificationGas: BigNumberish;
    maxFeePerGas: BigNumberish;
    maxPriorityFeePerGas: BigNumberish;
    paymaster?: string;
    paymasterVerificationGasLimit?: BigNumberish;
    paymasterPostOpGasLimit?: BigNumberish;
    paymasterData?: BytesLike;
    signature: BytesLike;
}
export type NotPromise<T> = {
    [P in keyof T]: Exclude<T[P], Promise<any>>;
};
/**
 * pack the userOperation
 * @param op
 * @param forSignature "true" if the hash is needed to calculate the getUserOpHash()
 *  "false" to pack entire UserOp, for calculating the calldata cost of putting it on-chain.
 */
export declare function packUserOp(op1: UserOperation | NotPromise<BaseAccountUserOperationStruct>, forSignature?: boolean): string;
export declare function packUint(high128: BigNumberish, low128: BigNumberish): string;
export declare function packPaymasterData(paymaster: string, paymasterVerificationGasLimit: BigNumberish, postOpGasLimit: BigNumberish, paymasterData?: BytesLike): BytesLike;
export declare function packUserOpData(op: any): NotPromise<BaseAccountUserOperationStruct>;
/**
 * calculate the userOpHash of a given userOperation.
 * The userOpHash is a hash of all UserOperation fields, except the "signature" field.
 * The entryPoint uses this value in the emitted UserOperationEvent.
 * A wallet may use this value as the hash to sign (the SampleWallet uses this method)
 * @param op
 * @param entryPoint
 * @param chainId
 */
export declare function getUserOpHash(op: UserOperation, entryPoint: string, chainId: number): string;
interface DecodedError {
    message: string;
    opIndex?: number;
}
/**
 * decode bytes thrown by revert as Error(message) or FailedOp(opIndex,paymaster,message)
 */
export declare function decodeErrorReason(error: string): DecodedError | undefined;
/**
 * update thrown Error object with our custom FailedOp message, and re-throw it.
 * updated both "message" and inner encoded "data"
 * tested on geth, hardhat-node
 * usage: entryPoint.handleOps().catch(decodeError)
 */
export declare function rethrowError(e: any): any;
/**
 * hexlify all members of object, recursively
 * @param obj
 */
export declare function deepHexlify(obj: any): any;
export declare function resolveHexlify(a: any): any;
export {};
//# sourceMappingURL=ERC4337Utils.d.ts.map