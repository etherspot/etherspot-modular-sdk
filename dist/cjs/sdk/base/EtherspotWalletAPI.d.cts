import { BaseApiParams, BaseAccountAPI } from './BaseAccountAPI.cjs';
import { Hex } from 'viem';
import { BigNumber, BigNumberish } from '../types/bignumber.cjs';
import { MODULE_TYPE } from '../common/constants.cjs';
import './TransactionDetailsForUserOp.cjs';
import '../../PaymasterAPI-CbUneXjr.cjs';
import '../types/user-operation-types.cjs';
import '../common/types.cjs';
import '../common/ERC4337Utils.cjs';
import '../../network.service-BJk94rpB.cjs';
import 'rxjs';
import '../../interfaces-q-ZvJZS9.cjs';
import 'viem/chains';
import '../common/rxjs/error.subject.cjs';
import '../common/rxjs/object.subject.cjs';
import '../wallet/providers/interfaces.cjs';
import '@walletconnect/universal-provider';
import '../common/rxjs/unique.subject.cjs';
import '../wallet/interfaces.cjs';
import './calcPreVerificationGas.cjs';
import '../interfaces.cjs';
import '../bundler/interface.cjs';
import '../dto/sign-message.dto.cjs';

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
