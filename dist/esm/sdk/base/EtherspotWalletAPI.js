import { BaseAccountAPI } from './BaseAccountAPI.js';
import { _makeBootstrapConfig, makeBootstrapConfig } from './Bootstrap.js';
import { DEFAULT_BOOTSTRAP_ADDRESS, Networks, DEFAULT_QUERY_PAGE_SIZE } from '../network/constants.js';
import { CALL_TYPE, EXEC_TYPE, MODULE_TYPE, getExecuteMode } from '../common/index.js';
import { encodeFunctionData, parseAbi, encodeAbiParameters, parseAbiParameters, concat, getAddress, pad, toHex, isBytes, isAddress } from 'viem';
import { accountAbi, bootstrapAbi, entryPointAbi, factoryAbi } from '../common/abis.js';
import { getInstalledModules } from '../common/getInstalledModules.js';
import { getViemAddress } from '../common/utils/viem-utils.js';
import { BigNumber } from '../types/bignumber.js';
// Creating a constant for the sentinel address using viem
const SENTINEL_ADDRESS = getAddress("0x0000000000000000000000000000000000000001");
const ADDRESS_ZERO = getAddress("0x0000000000000000000000000000000000000000");
/**
 * An implementation of the BaseAccountAPI using the EtherspotWallet contract.
 * - contract deployer gets "entrypoint", "owner" addresses and "index" nonce
 * - owner signs requests using normal "Ethereum Signed Message" (ether's signer.signMessage())
 * - nonce method is "nonce()"
 * - execute method is "execFromEntryPoint()"
 */
export class EtherspotWalletAPI extends BaseAccountAPI {
    constructor(params) {
        super(params);
        this.index = params.index ?? 0;
        this.predefinedAccountAddress = params.predefinedAccountAddress ?? null;
        this.bootstrapAddress = Networks[params.optionsLike.chainId]?.contracts?.bootstrap ?? DEFAULT_BOOTSTRAP_ADDRESS;
    }
    getEOAAddress() {
        return this.services.walletService.EOAAddress;
    }
    async isModuleInstalled(moduleTypeId, module, initData = '0x') {
        const accountAddress = await this.getAccountAddress();
        if (!accountAddress)
            throw new Error('Account address not found');
        const response = await this.publicClient.readContract({
            address: accountAddress,
            abi: parseAbi(accountAbi),
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
        return encodeFunctionData({
            functionName: 'installModule',
            abi: parseAbi(accountAbi),
            args: [moduleTypeId, module, initData],
        });
    }
    async uninstallModule(moduleTypeId, module, deinitData) {
        const isModuleInstalled = await this.isModuleInstalled(moduleTypeId, module, deinitData);
        if (!isModuleInstalled) {
            throw new Error('he module is not installed in the wallet');
        }
        // if this is uninstall on validator or executor, we need to check if there is more than 1 module
        // we cant delete all modules when moduletypeid is validator or executor
        if (moduleTypeId === MODULE_TYPE.EXECUTOR || moduleTypeId === MODULE_TYPE.VALIDATOR) {
            const installedModules = moduleTypeId === MODULE_TYPE.EXECUTOR ? await this.getAllExecutors() : await this.getAllValidators();
            if (installedModules.length === 1) {
                throw new Error('Cannot uninstall the only module');
            }
        }
        return encodeFunctionData({
            functionName: 'uninstallModule',
            abi: parseAbi(accountAbi),
            args: [moduleTypeId, module, deinitData],
        });
    }
    async getAllExecutors(pageSize = DEFAULT_QUERY_PAGE_SIZE) {
        return await getInstalledModules({ client: this.publicClient, moduleAddress: getViemAddress(this.accountAddress), moduleTypes: ['executor'], pageSize: pageSize });
    }
    async getPreviousAddress(targetAddress, moduleTypeId) {
        if (moduleTypeId !== MODULE_TYPE.EXECUTOR && moduleTypeId !== MODULE_TYPE.VALIDATOR) {
            throw new Error("Unsupported module type");
        }
        const insalledModules = moduleTypeId === MODULE_TYPE.EXECUTOR ? await this.getAllExecutors() : await this.getAllValidators();
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
    // here its users responsibility to prepare deInit Data
    // deinitData is prepared as bytes data made of the previous node address and the deinit data
    // the deinit data is the data that is passed to the module to be uninstalled
    async generateModuleDeInitData(moduleTypeId, module, deinitDataBase) {
        // this is applicable only for Executor and Validator modules
        // if the module type is not Executor or Validator, throw an error
        if (moduleTypeId !== MODULE_TYPE.EXECUTOR && moduleTypeId !== MODULE_TYPE.VALIDATOR) {
            throw new Error("Unsupported module type");
        }
        // Get the previous address in the list
        const previousAddress = await this.getPreviousAddress(module, moduleTypeId);
        // Prepare the deinit data
        const deInitDataGenerated = encodeAbiParameters(parseAbiParameters('address, bytes'), [previousAddress, deinitDataBase]);
        return deInitDataGenerated;
    }
    // function to get validators
    async getAllValidators(pageSize = DEFAULT_QUERY_PAGE_SIZE) {
        return await getInstalledModules({ client: this.publicClient, moduleAddress: getViemAddress(this.accountAddress), moduleTypes: ['validator'], pageSize: pageSize });
    }
    // function to get active hook
    async getActiveHook() {
        const activeHook = await this.publicClient.readContract({
            address: this.accountAddress,
            abi: parseAbi(accountAbi),
            functionName: 'getActiveHook',
        });
        return activeHook;
    }
    async getFallbacks() {
        return [];
    }
    // function to club the response of getAllExecutors, getAllValidators and getActiveHook
    // return should be a wrapper of tis way
    // prepare a schema like above and return the response
    async getAllModules(pageSize = DEFAULT_QUERY_PAGE_SIZE) {
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
            abi: parseAbi(accountAbi),
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
        const validators = makeBootstrapConfig(this.validatorAddress, '0x');
        const executors = makeBootstrapConfig(ADDRESS_ZERO, '0x');
        const hook = _makeBootstrapConfig(ADDRESS_ZERO, '0x');
        const fallbacks = makeBootstrapConfig(ADDRESS_ZERO, '0x');
        const initMSAData = encodeFunctionData({
            functionName: 'initMSA',
            abi: parseAbi(bootstrapAbi),
            args: [validators, executors, hook, fallbacks],
        });
        const eoaAddress = await this.getEOAAddress();
        const initCode = encodeAbiParameters(parseAbiParameters('address, address, bytes'), [eoaAddress, this.bootstrapAddress, initMSAData]);
        return initCode;
    }
    /**
     * return the value to put into the "initCode" field, if the account is not yet deployed.
     * this value holds the "factory" address, followed by this account's information
     */
    async getAccountInitCode() {
        if (this.factoryAddress == null || this.factoryAddress == '') {
            throw new Error('no factory to get initCode');
        }
        const initCode = await this.getInitCodeData();
        const salt = pad(toHex(this.index), { size: 32 });
        const functionData = encodeFunctionData({
            functionName: 'createAccount',
            abi: parseAbi(factoryAbi),
            args: [
                salt,
                initCode,
            ],
        });
        return concat([
            this.factoryAddress,
            functionData,
        ]);
    }
    async getCounterFactualAddress() {
        if (this.predefinedAccountAddress) {
            await this.checkAccountAddress(this.predefinedAccountAddress);
        }
        const salt = pad(toHex(this.index), { size: 32 });
        const initCode = await this.getInitCodeData();
        if (!this.accountAddress) {
            this.accountAddress = (await this.publicClient.readContract({
                address: this.factoryAddress,
                abi: parseAbi(factoryAbi),
                functionName: 'getAddress',
                args: [salt, initCode]
            }));
        }
        return this.accountAddress;
    }
    async getNonce(key = BigNumber.from(0)) {
        const accountAddress = await this.getAccountAddress();
        const nonceKey = key.eq(0) ? this.validatorAddress : key.toHexString();
        if (!this.checkAccountPhantom()) {
            let isAddressIndicator = false;
            try {
                isAddressIndicator = isAddress(getAddress(nonceKey), { strict: true });
                if (!isAddressIndicator) {
                    throw new Error(`Invalid Validator Address: ${nonceKey}`);
                }
                else {
                    const isModuleInstalled = await this.isModuleInstalled(MODULE_TYPE.VALIDATOR, nonceKey);
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
        const dummyKey = getAddress(nonceKey) + "00000000";
        const nonceResponse = await this.publicClient.readContract({
            address: this.entryPointAddress,
            abi: parseAbi(entryPointAbi),
            functionName: 'getNonce',
            args: [accountAddress, BigInt(dummyKey)]
        });
        return nonceResponse;
    }
    /**
     * encode a method call from entryPoint to our contract
     * @param target
     * @param value
     * @param data
     */
    async encodeExecute(target, value, data) {
        const executeMode = getExecuteMode({
            callType: CALL_TYPE.SINGLE,
            execType: EXEC_TYPE.DEFAULT
        });
        // Assuming toHex is a function that accepts string | number | bigint | boolean | Uint8Array
        // Convert BigNumberish to a string if it's a BigNumber
        // Convert BigNumberish or Bytes to a compatible type
        let valueToProcess;
        if (BigNumber.isBigNumber(value)) {
            valueToProcess = value.toString(); // Convert BigNumber to string
        }
        else if (isBytes(value)) {
            valueToProcess = new Uint8Array(value); // Convert Bytes to Uint8Array
        }
        else {
            // Here, TypeScript is unsure about the type of `value`
            // You need to ensure `value` is of a type compatible with `valueToProcess`
            // If `value` can only be string, number, bigint, boolean, or Uint8Array, this assignment is safe
            // If `value` can be of other types (like Bytes), you need an explicit conversion or handling here
            // For example, if there's a chance `value` is still `Bytes`, you could handle it like so:
            if (typeof value === 'object' && value !== null && 'length' in value) {
                // Assuming this condition is sufficient to identify Bytes-like objects
                // Convert it to Uint8Array
                valueToProcess = new Uint8Array(Object.values(value));
            }
            else {
                valueToProcess = value;
            }
        }
        const calldata = concat([
            target,
            pad(toHex(valueToProcess), { size: 32 }),
            data
        ]);
        return encodeFunctionData({
            functionName: 'execute',
            abi: parseAbi(accountAbi),
            args: [executeMode, calldata],
        });
    }
    async signUserOpHash(userOpHash) {
        return await this.services.walletService.signUserOp(userOpHash);
    }
    async encodeBatch(targets, values, datas) {
        const executeMode = getExecuteMode({
            callType: CALL_TYPE.BATCH,
            execType: EXEC_TYPE.DEFAULT
        });
        const result = targets.map((target, index) => ({
            target: target,
            value: values[index],
            callData: datas[index]
        }));
        const convertedResult = result.map(item => ({
            ...item,
            // Convert `value` from BigNumberish to bigint
            value: typeof item.value === 'bigint' ? item.value : BigInt(item.value.toString()),
        }));
        //TODO-Test-LibraryFix identify the syntax for viem to pass array of tuple
        // const calldata = ethers.utils.defaultAbiCoder.encode(
        //   ["tuple(address target,uint256 value,bytes callData)[]"],
        //   [result]
        // );
        const calldata = encodeAbiParameters(parseAbiParameters('(address target,uint256 value,bytes callData)[]'), [convertedResult]);
        return encodeFunctionData({
            functionName: 'execute',
            abi: parseAbi(accountAbi),
            args: [executeMode, calldata],
        });
    }
}
//# sourceMappingURL=EtherspotWalletAPI.js.map