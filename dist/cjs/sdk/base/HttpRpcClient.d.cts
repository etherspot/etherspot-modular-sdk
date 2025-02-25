import { UserOperation } from '../common/ERC4337Utils.cjs';
import { Gas } from '../common/getGasFee.cjs';
import { PublicClient, RpcRequestError } from 'viem';
import { BaseAccountUserOperationStruct } from '../types/user-operation-types.cjs';
import '../types/bignumber.cjs';
import '../common/types.cjs';

declare class HttpRpcClient {
    readonly bundlerUrl: string;
    readonly entryPointAddress: string;
    readonly chainId: number;
    private readonly publicClient;
    initializing: Promise<void>;
    constructor(bundlerUrl: string, entryPointAddress: string, chainId: number, publicClient: PublicClient);
    validateChainId(): Promise<void>;
    getVerificationGasInfo(tx: BaseAccountUserOperationStruct): Promise<any>;
    handleRPCError(err: any): void;
    parseViemRPCRequestError(error: any): RpcRequestError;
    sendUserOpToBundler(userOp1: UserOperation): Promise<string>;
    sendAggregatedOpsToBundler(userOps1: BaseAccountUserOperationStruct[]): Promise<string>;
    getSkandhaGasPrice(): Promise<Gas>;
    getBundlerVersion(): Promise<string>;
    getUserOpsReceipt(uoHash: string): Promise<any>;
    private printUserOperation;
}

export { HttpRpcClient };
