import { BaseApiParams, BaseAccountAPI } from './BaseAccountAPI.js';
import { MODULE_TYPE } from '../common/index.js';
import { Hex } from 'viem';
import { BigNumber, BigNumberish } from '../types/bignumber.js';
/**
 * constructor params, added no top of base params:
 * @param owner the signer object for the account owner
 * @param factoryAddress address of contract "factory" to deploy new contracts (not needed if account already deployed)
 * @param index nonce value used when creating multiple accounts for the same owner
 */
export interface EtherspotWalletApiParams extends BaseApiParams {
    factoryAddress?: string;
    index?: number;
    predefinedAccountAddress?: string;
}
export type ModuleInfo = {
    validators?: string[];
    executors?: string[];
    hook?: string;
    fallbacks?: FallbackInfo[];
};
export type FallbackInfo = {
    selector: string;
    handlerAddress: string;
};
/**
 * An implementation of the BaseAccountAPI using the EtherspotWallet contract.
 * - contract deployer gets "entrypoint", "owner" addresses and "index" nonce
 * - owner signs requests using normal "Ethereum Signed Message" (ether's signer.signMessage())
 * - nonce method is "nonce()"
 * - execute method is "execFromEntryPoint()"
 */
export declare class EtherspotWalletAPI extends BaseAccountAPI {
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
    /**
     * return the value to put into the "initCode" field, if the account is not yet deployed.
     * this value holds the "factory" address, followed by this account's information
     */
    getAccountInitCode(): Promise<string>;
    getCounterFactualAddress(): Promise<string>;
    getNonce(key?: BigNumber): Promise<BigNumber>;
    /**
     * encode a method call from entryPoint to our contract
     * @param target
     * @param value
     * @param data
     */
    encodeExecute(target: string, value: BigNumberish, data: string): Promise<string>;
    signUserOpHash(userOpHash: string): Promise<string>;
    encodeBatch(targets: string[], values: BigNumberish[], datas: string[]): Promise<string>;
}
//# sourceMappingURL=EtherspotWalletAPI.d.ts.map