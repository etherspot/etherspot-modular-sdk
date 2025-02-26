"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherspotWalletAPI = void 0;
const BaseAccountAPI_js_1 = require("./BaseAccountAPI.js");
const Bootstrap_js_1 = require("./Bootstrap.js");
const constants_js_1 = require("../network/constants.js");
const index_js_1 = require("../common/index.js");
const viem_1 = require("viem");
const abis_js_1 = require("../common/abis.js");
const getInstalledModules_js_1 = require("../common/getInstalledModules.js");
const viem_utils_js_1 = require("../common/utils/viem-utils.js");
const bignumber_js_1 = require("../types/bignumber.js");
const SENTINEL_ADDRESS = (0, viem_1.getAddress)("0x0000000000000000000000000000000000000001");
const ADDRESS_ZERO = (0, viem_1.getAddress)("0x0000000000000000000000000000000000000000");
class EtherspotWalletAPI extends BaseAccountAPI_js_1.BaseAccountAPI {
    constructor(params) {
        super(params);
        this.index = params.index ?? 0;
        this.predefinedAccountAddress = params.predefinedAccountAddress ?? null;
        if (params?.optionsLike) {
            this.bootstrapAddress = constants_js_1.Networks[params.optionsLike.chainId]?.contracts?.bootstrap ?? constants_js_1.DEFAULT_BOOTSTRAP_ADDRESS;
        }
        else {
            this.bootstrapAddress = constants_js_1.DEFAULT_BOOTSTRAP_ADDRESS;
        }
    }
    getEOAAddress() {
        return this.services.walletService.EOAAddress ?? '0x';
    }
    async isModuleInstalled(moduleTypeId, module, initData = '0x') {
        const accountAddress = await this.getAccountAddress();
        if (!accountAddress)
            throw new Error('Account address not found');
        const response = await this.publicClient.readContract({
            address: accountAddress,
            abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
            functionName: 'isModuleInstalled',
            args: [moduleTypeId, module, initData]
        });
        return response;
    }
    async installModule(moduleTypeId, module, initData = '0x') {
        const accountAddress = await this.getAccountAddress();
        if (!accountAddress)
            throw new Error('Account address not found');
        if (await this.isModuleInstalled(moduleTypeId, module, initData)) {
            throw new Error('the module is already installed');
        }
        return (0, viem_1.encodeFunctionData)({
            functionName: 'installModule',
            abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
            args: [moduleTypeId, module, initData],
        });
    }
    async uninstallModule(moduleTypeId, module, deinitData) {
        const isModuleInstalled = await this.isModuleInstalled(moduleTypeId, module, deinitData);
        if (!isModuleInstalled) {
            throw new Error('he module is not installed in the wallet');
        }
        if (moduleTypeId === index_js_1.MODULE_TYPE.EXECUTOR || moduleTypeId === index_js_1.MODULE_TYPE.VALIDATOR) {
            const installedModules = moduleTypeId === index_js_1.MODULE_TYPE.EXECUTOR ? await this.getAllExecutors() : await this.getAllValidators();
            if (installedModules.length === 1) {
                throw new Error('Cannot uninstall the only module');
            }
        }
        return (0, viem_1.encodeFunctionData)({
            functionName: 'uninstallModule',
            abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
            args: [moduleTypeId, module, deinitData],
        });
    }
    async getAllExecutors(pageSize = constants_js_1.DEFAULT_QUERY_PAGE_SIZE) {
        if (!this.accountAddress) {
            throw new Error('Account address not found');
        }
        return await (0, getInstalledModules_js_1.getInstalledModules)({ client: this.publicClient, moduleAddress: (0, viem_utils_js_1.getViemAddress)(this.accountAddress), moduleTypes: ['executor'], pageSize: pageSize });
    }
    async getPreviousAddress(targetAddress, moduleTypeId) {
        if (moduleTypeId !== index_js_1.MODULE_TYPE.EXECUTOR && moduleTypeId !== index_js_1.MODULE_TYPE.VALIDATOR) {
            throw new Error("Unsupported module type");
        }
        const insalledModules = moduleTypeId === index_js_1.MODULE_TYPE.EXECUTOR ? await this.getAllExecutors() : await this.getAllValidators();
        const index = insalledModules.indexOf(targetAddress);
        if (index === 0) {
            return SENTINEL_ADDRESS;
        }
        else if (index > 0) {
            return insalledModules[index - 1];
        }
        else {
            throw new Error(`Module ${targetAddress} not found in installed modules`);
        }
    }
    async generateModuleDeInitData(moduleTypeId, module, deinitDataBase) {
        if (moduleTypeId !== index_js_1.MODULE_TYPE.EXECUTOR && moduleTypeId !== index_js_1.MODULE_TYPE.VALIDATOR) {
            throw new Error("Unsupported module type");
        }
        const previousAddress = await this.getPreviousAddress(module, moduleTypeId);
        const deInitDataGenerated = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('address, bytes'), [previousAddress, deinitDataBase]);
        return deInitDataGenerated;
    }
    async getAllValidators(pageSize = constants_js_1.DEFAULT_QUERY_PAGE_SIZE) {
        if (!this.accountAddress) {
            throw new Error('Account address not found');
        }
        return await (0, getInstalledModules_js_1.getInstalledModules)({ client: this.publicClient, moduleAddress: (0, viem_utils_js_1.getViemAddress)(this.accountAddress), moduleTypes: ['validator'], pageSize: pageSize });
    }
    async getActiveHook() {
        const activeHook = await this.publicClient.readContract({
            address: this.accountAddress,
            abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
            functionName: 'getActiveHook',
        });
        return activeHook;
    }
    async getFallbacks() {
        return [];
    }
    async getAllModules(pageSize = constants_js_1.DEFAULT_QUERY_PAGE_SIZE) {
        const validators = await this.getAllValidators(pageSize) || [];
        const executors = await this.getAllExecutors(pageSize) || [];
        const hook = await this.getActiveHook() || "";
        const fallbacks = await this.getFallbacks() || [];
        return {
            validators,
            executors,
            hook,
            fallbacks
        };
    }
    async checkAccountAddress(address) {
        const eoaAddress = await this.getEOAAddress();
        const isOwner = await this.publicClient.readContract({
            address: address,
            abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
            functionName: 'isOwner',
            args: [eoaAddress]
        });
        if (!isOwner) {
            throw new Error('the specified accountAddress does not belong to the given EOA provider');
        }
        else {
            this.accountAddress = address;
        }
    }
    async getInitCodeData() {
        if (!this.validatorAddress) {
            throw new Error('Validator address not found');
        }
        const validators = (0, Bootstrap_js_1.makeBootstrapConfig)(this.validatorAddress, '0x');
        const executors = (0, Bootstrap_js_1.makeBootstrapConfig)(ADDRESS_ZERO, '0x');
        const hook = (0, Bootstrap_js_1._makeBootstrapConfig)(ADDRESS_ZERO, '0x');
        const fallbacks = (0, Bootstrap_js_1.makeBootstrapConfig)(ADDRESS_ZERO, '0x');
        const initMSAData = (0, viem_1.encodeFunctionData)({
            functionName: 'initMSA',
            abi: (0, viem_1.parseAbi)(abis_js_1.bootstrapAbi),
            args: [validators, executors, hook, fallbacks],
        });
        const eoaAddress = await this.getEOAAddress();
        const initCode = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('address, address, bytes'), [eoaAddress, this.bootstrapAddress, initMSAData]);
        return initCode;
    }
    async getAccountInitCode() {
        if (this.factoryAddress == null || this.factoryAddress == '') {
            throw new Error('no factory to get initCode');
        }
        const initCode = await this.getInitCodeData();
        const salt = (0, viem_1.pad)((0, viem_1.toHex)(this.index), { size: 32 });
        const functionData = (0, viem_1.encodeFunctionData)({
            functionName: 'createAccount',
            abi: (0, viem_1.parseAbi)(abis_js_1.factoryAbi),
            args: [
                salt,
                initCode,
            ],
        });
        return (0, viem_1.concat)([
            this.factoryAddress,
            functionData,
        ]);
    }
    async getCounterFactualAddress() {
        if (this.predefinedAccountAddress) {
            await this.checkAccountAddress(this.predefinedAccountAddress);
        }
        const salt = (0, viem_1.pad)((0, viem_1.toHex)(this.index), { size: 32 });
        const initCode = await this.getInitCodeData();
        if (!this.accountAddress) {
            this.accountAddress = (await this.publicClient.readContract({
                address: this.factoryAddress,
                abi: (0, viem_1.parseAbi)(abis_js_1.factoryAbi),
                functionName: 'getAddress',
                args: [salt, initCode]
            }));
        }
        return this.accountAddress;
    }
    async getNonce(key = bignumber_js_1.BigNumber.from(0)) {
        const accountAddress = await this.getAccountAddress();
        const nonceKey = key.eq(0) ? this.validatorAddress : key.toHexString();
        if (!nonceKey) {
            throw new Error('nonce key not defined');
        }
        if (!this.checkAccountPhantom()) {
            let isAddressIndicator = false;
            try {
                isAddressIndicator = (0, viem_1.isAddress)((0, viem_1.getAddress)(nonceKey), { strict: true });
                if (!isAddressIndicator) {
                    throw new Error(`Invalid Validator Address: ${nonceKey}`);
                }
                else {
                    const isModuleInstalled = await this.isModuleInstalled(index_js_1.MODULE_TYPE.VALIDATOR, nonceKey);
                    if (!isModuleInstalled) {
                        throw new Error(`Validator: ${nonceKey} is not installed in the wallet`);
                    }
                }
            }
            catch (e) {
                console.error(`Error caught : ${e}`);
                throw new Error(`Invalid Validator Address: ${nonceKey}`);
            }
        }
        const dummyKey = (0, viem_1.getAddress)(nonceKey) + "00000000";
        const nonceResponse = await this.publicClient.readContract({
            address: this.entryPointAddress,
            abi: (0, viem_1.parseAbi)(abis_js_1.entryPointAbi),
            functionName: 'getNonce',
            args: [accountAddress, BigInt(dummyKey)]
        });
        return nonceResponse;
    }
    async encodeExecute(target, value, data) {
        const executeMode = (0, index_js_1.getExecuteMode)({
            callType: index_js_1.CALL_TYPE.SINGLE,
            execType: index_js_1.EXEC_TYPE.DEFAULT
        });
        let valueToProcess;
        if (bignumber_js_1.BigNumber.isBigNumber(value)) {
            valueToProcess = value.toString();
        }
        else if ((0, viem_1.isBytes)(value)) {
            valueToProcess = new Uint8Array(value);
        }
        else {
            if (typeof value === 'object' && value !== null && 'length' in value) {
                valueToProcess = new Uint8Array(Object.values(value));
            }
            else {
                valueToProcess = value;
            }
        }
        const calldata = (0, viem_1.concat)([
            target,
            (0, viem_1.pad)((0, viem_1.toHex)(valueToProcess), { size: 32 }),
            data
        ]);
        return (0, viem_1.encodeFunctionData)({
            functionName: 'execute',
            abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
            args: [executeMode, calldata],
        });
    }
    async signUserOpHash(userOpHash) {
        return await this.services.walletService.signUserOp(userOpHash);
    }
    async encodeBatch(targets, values, datas) {
        const executeMode = (0, index_js_1.getExecuteMode)({
            callType: index_js_1.CALL_TYPE.BATCH,
            execType: index_js_1.EXEC_TYPE.DEFAULT
        });
        const result = targets.map((target, index) => ({
            target: target,
            value: values[index],
            callData: datas[index]
        }));
        const convertedResult = result.map(item => ({
            ...item,
            value: typeof item.value === 'bigint' ? item.value : BigInt(item.value.toString()),
        }));
        const calldata = (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)('(address target,uint256 value,bytes callData)[]'), [convertedResult]);
        return (0, viem_1.encodeFunctionData)({
            functionName: 'execute',
            abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
            args: [executeMode, calldata],
        });
    }
}
exports.EtherspotWalletAPI = EtherspotWalletAPI;
//# sourceMappingURL=EtherspotWalletAPI.js.map