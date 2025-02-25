import { Gas } from './common/getGasFee.cjs';
import { SdkOptions, PaymasterApi } from './interfaces.cjs';
import { N as Network } from '../interfaces-q-ZvJZS9.cjs';
import { UserOperation } from './common/ERC4337Utils.cjs';
import { WalletProviderLike, MessagePayload } from './wallet/providers/interfaces.cjs';
import { PublicClient, Hex } from 'viem';
import { BigNumberish, BigNumber } from './types/bignumber.cjs';
import { MODULE_TYPE } from './common/constants.cjs';
import { UserOpsRequest, BatchUserOpsRequest } from './common/interfaces.cjs';
import { TransactionGasInfoForUserOp } from './base/TransactionDetailsForUserOp.cjs';
import { SignMessageDto } from './dto/sign-message.dto.cjs';
import { ModuleInfo } from './base/EtherspotWalletAPI.cjs';
import './bundler/interface.cjs';
import 'viem/chains';
import './types/user-operation-types.cjs';
import './common/types.cjs';
import '@walletconnect/universal-provider';
import './common/rxjs/unique.subject.cjs';
import 'rxjs';
import './base/BaseAccountAPI.cjs';
import '../PaymasterAPI-CbUneXjr.cjs';
import '../network.service-BJk94rpB.cjs';
import './common/rxjs/error.subject.cjs';
import './common/rxjs/object.subject.cjs';
import './wallet/interfaces.cjs';
import './base/calcPreVerificationGas.cjs';

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
