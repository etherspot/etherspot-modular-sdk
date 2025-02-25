import { BaseAccountUserOperationStruct } from '../types/user-operation-types.cjs';
import { BigNumberish } from '../types/bignumber.cjs';
import { BytesLike } from './types.cjs';
import 'viem';

interface UserOperation {
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
type NotPromise<T> = {
    [P in keyof T]: Exclude<T[P], Promise<any>>;
};
declare function packUserOp(op1: UserOperation | NotPromise<BaseAccountUserOperationStruct>, forSignature?: boolean): string;
declare function packUint(high128: BigNumberish, low128: BigNumberish): string;
declare function packPaymasterData(paymaster: string, paymasterVerificationGasLimit: BigNumberish, postOpGasLimit: BigNumberish, paymasterData?: BytesLike): BytesLike;
declare function packUserOpData(op: any): NotPromise<BaseAccountUserOperationStruct>;
declare function getUserOpHash(op: UserOperation, entryPoint: string, chainId: number): string;
interface DecodedError {
    message: string;
    opIndex?: number;
}
declare function decodeErrorReason(error: string): DecodedError | undefined;
declare function rethrowError(e: any): any;
declare function deepHexlify(obj: any): any;
declare function resolveHexlify(a: any): any;

export { type NotPromise, type UserOperation, decodeErrorReason, deepHexlify, getUserOpHash, packPaymasterData, packUint, packUserOp, packUserOpData, resolveHexlify, rethrowError };
