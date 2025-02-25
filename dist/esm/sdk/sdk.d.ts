import { Gas } from './common/getGasFee.js';
import { SdkOptions, PaymasterApi } from './interfaces.js';
import { N as Network } from '../interfaces-q-ZvJZS9.js';
import { UserOperation } from './common/ERC4337Utils.js';
import { WalletProviderLike, MessagePayload } from './wallet/providers/interfaces.js';
import { PublicClient, Hex } from 'viem';
import { BigNumberish, BigNumber } from './types/bignumber.js';
import { MODULE_TYPE } from './common/constants.js';
import { UserOpsRequest, BatchUserOpsRequest } from './common/interfaces.js';
import { TransactionGasInfoForUserOp } from './base/TransactionDetailsForUserOp.js';
import { SignMessageDto } from './dto/sign-message.dto.js';
import { ModuleInfo } from './base/EtherspotWalletAPI.js';
import './bundler/interface.js';
import 'viem/chains';
import './types/user-operation-types.js';
import './common/types.js';
import '@walletconnect/universal-provider';
import './common/rxjs/unique.subject.js';
import 'rxjs';
import './base/BaseAccountAPI.js';
import '../PaymasterAPI-Dj36ihyu.js';
import '../network.service-B7y3JNe3.js';
import './common/rxjs/error.subject.js';
import './common/rxjs/object.subject.js';
import './wallet/interfaces.js';
import './base/calcPreVerificationGas.js';

declare class ModularSdk {
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
    destroy(): void;
    getPublicClient(): PublicClient;
    getProviderUrl(): string;
    signMessage(dto: SignMessageDto): Promise<string>;
    getEOAAddress(): Hex;
    getCounterFactualAddress(): Promise<string>;
    estimate(params?: {
        paymasterDetails?: PaymasterApi;
        gasDetails?: TransactionGasInfoForUserOp;
        callGasLimit?: BigNumberish;
        key?: BigNumber;
    }): Promise<any>;
    getGasFee(): Promise<Gas>;
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

export { ModularSdk };
