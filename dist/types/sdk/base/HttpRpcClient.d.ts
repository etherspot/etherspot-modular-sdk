import { UserOperation } from '../common/ERC4337Utils.js';
import { Gas } from '../common/index.js';
import { RpcRequestError, type PublicClient } from "viem";
import { BaseAccountUserOperationStruct } from '../types/user-operation-types.js';
export declare class HttpRpcClient {
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
    /**
     * send a UserOperation to the bundler
     * @param userOp1
     * @return userOpHash the id of this operation, for getUserOperationTransaction
     */
    sendUserOpToBundler(userOp1: UserOperation): Promise<string>;
    sendAggregatedOpsToBundler(userOps1: BaseAccountUserOperationStruct[]): Promise<string>;
    getSkandhaGasPrice(): Promise<Gas>;
    getBundlerVersion(): Promise<string>;
    getUserOpsReceipt(uoHash: string): Promise<any>;
    private printUserOperation;
}
//# sourceMappingURL=HttpRpcClient.d.ts.map