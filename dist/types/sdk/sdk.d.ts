import { PaymasterApi, SdkOptions } from './interfaces.js';
import { Network } from "./network/index.js";
import { BatchUserOpsRequest, MODULE_TYPE, UserOperation, UserOpsRequest } from "./common/index.js";
import { MessagePayload, WalletProviderLike } from './wallet/index.js';
import { TransactionGasInfoForUserOp, ModuleInfo } from './base/index.js';
import { SignMessageDto } from './dto/index.js';
import { Hex, type PublicClient } from 'viem';
import { BigNumber, BigNumberish } from './types/bignumber.js';
/**
 * Modular-Sdk
 *
 * @category Modular-Sdk
 */
export declare class ModularSdk {
    private etherspotWallet;
    private bundler;
    private chainId;
    private factoryUsed;
    private index;
    private publicClient;
    private account;
    private providerUrl;
    private userOpsBatch;
    constructor(walletProvider: WalletProviderLike, optionsLike: SdkOptions);
    get supportedNetworks(): Network[];
    /**
     * destroys
     */
    destroy(): void;
    getPublicClient(): PublicClient;
    getProviderUrl(): string;
    /**
     * signs message
     * @param dto
     * @return Promise<string>
     */
    signMessage(dto: SignMessageDto): Promise<string>;
    getEOAAddress(): Hex;
    getCounterFactualAddress(): Promise<string>;
    estimate(params?: {
        paymasterDetails?: PaymasterApi;
        gasDetails?: TransactionGasInfoForUserOp;
        callGasLimit?: BigNumberish;
        key?: BigNumber;
    }): Promise<any>;
    getGasFee(): Promise<import("./common/getGasFee.js").Gas>;
    send(userOp: any, isUserOpAlreadySigned?: boolean): Promise<string>;
    signTypedData(msg: MessagePayload): Promise<string>;
    getNativeBalance(): Promise<string>;
    getUserOpReceipt(userOpHash: string): Promise<string>;
    getUserOpHash(userOp: UserOperation): Promise<string>;
    addUserOpsToBatch(tx: UserOpsRequest): Promise<BatchUserOpsRequest>;
    clearUserOpsFromBatch(): Promise<void>;
    isModuleInstalled(moduleTypeId: MODULE_TYPE, module: string): Promise<boolean>;
    installModule(moduleTypeId: MODULE_TYPE, module: string, initData?: string): Promise<string>;
    getPreviousModuleAddress(moduleTypeId: MODULE_TYPE, module: string): Promise<string>;
    generateModuleDeInitData(moduleTypeId: MODULE_TYPE, module: string, moduleDeInitData: string): Promise<string>;
    getPreviousAddress(moduleTypeId: MODULE_TYPE, targetAddress: string): Promise<string>;
    uninstallModule(moduleTypeId: MODULE_TYPE, module: string, deinitData: string): Promise<string>;
    getAllModules(pageSize?: number): Promise<ModuleInfo>;
    totalGasEstimated(userOp: UserOperation): Promise<BigNumber>;
    getNonce(key?: BigNumber): Promise<BigNumber>;
}
//# sourceMappingURL=sdk.d.ts.map