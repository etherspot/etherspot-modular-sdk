import { BaseApiParams, BaseAccountAPI } from './BaseAccountAPI.js';
import { Hex } from 'viem';
import { BigNumber, BigNumberish } from '../types/bignumber.js';
import { MODULE_TYPE } from '../common/constants.js';
import './TransactionDetailsForUserOp.js';
import '../../PaymasterAPI-Dj36ihyu.js';
import '../types/user-operation-types.js';
import '../common/types.js';
import '../common/ERC4337Utils.js';
import '../../network.service-B7y3JNe3.js';
import 'rxjs';
import '../../interfaces-q-ZvJZS9.js';
import 'viem/chains';
import '../common/rxjs/error.subject.js';
import '../common/rxjs/object.subject.js';
import '../wallet/providers/interfaces.js';
import '@walletconnect/universal-provider';
import '../common/rxjs/unique.subject.js';
import '../wallet/interfaces.js';
import './calcPreVerificationGas.js';
import '../interfaces.js';
import '../bundler/interface.js';
import '../dto/sign-message.dto.js';

interface EtherspotWalletApiParams extends BaseApiParams {
    factoryAddress?: string;
    index?: number;
    predefinedAccountAddress?: string;
}
type ModuleInfo = {
    validators?: string[];
    executors?: string[];
    hook?: string;
    fallbacks?: FallbackInfo[];
};
type FallbackInfo = {
    selector: string;
    handlerAddress: string;
};
declare class EtherspotWalletAPI extends BaseAccountAPI {
    index: number;
    predefinedAccountAddress?: string;
    bootstrapAddress?: string;
    eoaAddress: Hex;
    constructor(params: EtherspotWalletApiParams);
    getEOAAddress(): Hex;
    isModuleInstalled(moduleTypeId: MODULE_TYPE, module: string, initData?: string): Promise<boolean>;
    installModule(moduleTypeId: MODULE_TYPE, module: string, initData?: string): Promise<string>;
    uninstallModule(moduleTypeId: MODULE_TYPE, module: string, deinitData: string): Promise<string>;
    getAllExecutors(pageSize?: number): Promise<string[]>;
    getPreviousAddress(targetAddress: string, moduleTypeId: MODULE_TYPE): Promise<string>;
    generateModuleDeInitData(moduleTypeId: MODULE_TYPE, module: string, deinitDataBase: string): Promise<string>;
    getAllValidators(pageSize?: number): Promise<string[]>;
    getActiveHook(): Promise<string>;
    getFallbacks(): Promise<any[]>;
    getAllModules(pageSize?: number): Promise<ModuleInfo>;
    checkAccountAddress(address: string): Promise<void>;
    getInitCodeData(): Promise<string>;
    getAccountInitCode(): Promise<string>;
    getCounterFactualAddress(): Promise<string>;
    getNonce(key?: BigNumber): Promise<BigNumber>;
    encodeExecute(target: string, value: BigNumberish, data: string): Promise<string>;
    signUserOpHash(userOpHash: string): Promise<string>;
    encodeBatch(targets: string[], values: BigNumberish[], datas: string[]): Promise<string>;
}

export { EtherspotWalletAPI, type EtherspotWalletApiParams, type FallbackInfo, type ModuleInfo };
