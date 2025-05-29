import { Hex, concat, encodeAbiParameters, encodeFunctionData, getAddress, isAddress, isBytes, pad, parseAbi, parseAbiParameters, toHex } from 'viem';
import { accountAbi, bootstrapAbi, entryPointAbi, factoryAbi } from '../common/abis.js';
import { getInstalledModules } from '../common/getInstalledModules.js';
import { CALL_TYPE, EXEC_TYPE, MODULE_TYPE, getExecuteMode } from '../common/index.js';
import { getViemAddress } from '../common/utils/viem-utils.js';
import { DEFAULT_BOOTSTRAP_ADDRESS, DEFAULT_QUERY_PAGE_SIZE, Networks } from '../network/constants.js';
import { BigNumber, BigNumberish } from '../types/bignumber.js';
import { BaseAccountAPI, BaseApiParams } from './BaseAccountAPI.js';
import { BootstrapConfig, _makeBootstrapConfig, makeBootstrapConfig, makeBootstrapConfigForModules } from './Bootstrap.js';
import { getHookMultiPlexerInitData } from '../../../examples/pulse/utils.js';

// Creating a constant for the sentinel address using viem
const SENTINEL_ADDRESS = getAddress("0x0000000000000000000000000000000000000001");
const ADDRESS_ZERO = getAddress("0x0000000000000000000000000000000000000000");

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
export class EtherspotWalletAPI extends BaseAccountAPI {
  index: number;
  predefinedAccountAddress?: string | null;
  bootstrapAddress?: string | null;
  eoaAddress: Hex;

  constructor(params: EtherspotWalletApiParams) {
    super(params);
    this.index = params.index ?? 0;
    this.predefinedAccountAddress = params.predefinedAccountAddress ?? null;
    if (params?.optionsLike) {
      this.bootstrapAddress = params.optionsLike?.bootstrapAddress ?? Networks[params.optionsLike.chainId]?.contracts?.bootstrap ?? DEFAULT_BOOTSTRAP_ADDRESS;
    } else {
      this.bootstrapAddress = DEFAULT_BOOTSTRAP_ADDRESS;
    }
  }

  public getEOAAddress(): Hex {
    return this.services.walletService.EOAAddress ?? '0x';
  }

  async isModuleInstalled(moduleTypeId: MODULE_TYPE, module: string, initData = '0x'): Promise<boolean> {
    const accountAddress = await this.getAccountAddress();
    if (!accountAddress) throw new Error('Account address not found');
    const response = await this.publicClient.readContract({
      address: accountAddress as Hex,
      abi: parseAbi(accountAbi),
      functionName: 'isModuleInstalled',
      args: [moduleTypeId, module, initData]
    });
    return response as boolean;
  }

  async isModuleInitialised(moduleTypeId: MODULE_TYPE, module: string, initData = '0x'): Promise<boolean> {
    const accountAddress = await this.getAccountAddress();
    if (!accountAddress) throw new Error('Account address not found');
    const response = await this.publicClient.readContract({
      address: accountAddress as Hex,
      abi: parseAbi(accountAbi),
      functionName: 'isModuleInstalled',
      args: [moduleTypeId, module, initData]
    });
    return response as boolean;
  }

  async installModule(moduleTypeId: MODULE_TYPE, module: string, initData = '0x'): Promise<string> {
    const accountAddress = await this.getAccountAddress();
    if (!accountAddress) throw new Error('Account address not found');

    if (await this.isModuleInstalled(moduleTypeId, module, initData)) {
      throw new Error('the module is already installed');
    }
    return encodeFunctionData({
      functionName: 'installModule',
      abi: parseAbi(accountAbi),
      args: [moduleTypeId, module, initData],
    });
  }

  async uninstallModule(moduleTypeId: MODULE_TYPE, module: string, deinitData: string): Promise<string> {
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

  async getAllExecutors(pageSize: number = DEFAULT_QUERY_PAGE_SIZE): Promise<string[]> {
    if (!this.accountAddress) {
      throw new Error('Account address not found');
    }
    return await getInstalledModules({ client: this.publicClient, moduleAddress: getViemAddress(this.accountAddress), moduleTypes: ['executor'], pageSize: pageSize });
  }

  async getPreviousAddress(targetAddress: string, moduleTypeId: MODULE_TYPE): Promise<string> {

    if (moduleTypeId !== MODULE_TYPE.EXECUTOR && moduleTypeId !== MODULE_TYPE.VALIDATOR) {
      throw new Error("Unsupported module type");
    }

    const insalledModules = moduleTypeId === MODULE_TYPE.EXECUTOR ? await this.getAllExecutors() : await this.getAllValidators()

    const index = insalledModules.indexOf(targetAddress)
    if (index === 0) {
      return SENTINEL_ADDRESS
    } else if (index > 0) {
      return insalledModules[index - 1]
    } else {
      throw new Error(`Module ${targetAddress} not found in installed modules`)
    }
  }

  // here its users responsibility to prepare deInit Data
  // deinitData is prepared as bytes data made of the previous node address and the deinit data
  // the deinit data is the data that is passed to the module to be uninstalled
  async generateModuleDeInitData(moduleTypeId: MODULE_TYPE, module: string, deinitDataBase: string): Promise<string> {

    // this is applicable only for Executor and Validator modules
    // if the module type is not Executor or Validator, throw an error
    if (moduleTypeId !== MODULE_TYPE.EXECUTOR && moduleTypeId !== MODULE_TYPE.VALIDATOR) {
      throw new Error("Unsupported module type");
    }

    // Get the previous address in the list
    const previousAddress = await this.getPreviousAddress(module, moduleTypeId);

    // Prepare the deinit data
    const deInitDataGenerated = encodeAbiParameters(
      parseAbiParameters('address, bytes'),
      [previousAddress as Hex, deinitDataBase as Hex]
    )

    return deInitDataGenerated;
  }

  // function to get validators
  async getAllValidators(pageSize: number = DEFAULT_QUERY_PAGE_SIZE): Promise<string[]> {
    if (!this.accountAddress) {
      throw new Error('Account address not found');
    }
    return await getInstalledModules({ client: this.publicClient, moduleAddress: getViemAddress(this.accountAddress), moduleTypes: ['validator'], pageSize: pageSize });
  }

  // function to get active hook
  async getActiveHook(): Promise<string> {
    const activeHook = await this.publicClient.readContract({
      address: this.accountAddress as Hex,
      abi: parseAbi(accountAbi),
      functionName: 'getActiveHook',
    });

    return activeHook as Hex;
  }

  async getFallbacks(): Promise<any[]> {
    return [];
  }

  // function to club the response of getAllExecutors, getAllValidators and getActiveHook
  // return should be a wrapper of tis way
  // prepare a schema like above and return the response
  async getAllModules(pageSize: number = DEFAULT_QUERY_PAGE_SIZE): Promise<ModuleInfo> {
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


  async checkAccountAddress(address: string): Promise<void> {
    const eoaAddress = await this.getEOAAddress();
    const isOwner = await this.publicClient.readContract({
      address: address as Hex,
      abi: parseAbi(accountAbi),
      functionName: 'isOwner',
      args: [eoaAddress]
    }) as boolean;
    if (!isOwner) {
      throw new Error('the specified accountAddress does not belong to the given EOA provider')
    } else {
      this.accountAddress = address;
    }
  }

  async getInitCodeData(): Promise<string> {
    if (!this.validatorAddress) {
      throw new Error('Validator address not found');
    }
    const validators: BootstrapConfig[] = makeBootstrapConfigForModules([this.validatorAddress, this.credibleAccountModuleAddress as Hex] , ['0x', '0x']);
    const executors: BootstrapConfig[] = makeBootstrapConfig(ADDRESS_ZERO, '0x');

    //Get HookMultiPlexer init data with CredibleAccountHook as global subhook
    let hmpInitData = this.credibleAccountModuleAddress == ADDRESS_ZERO ? '0x' : getHookMultiPlexerInitData([this.credibleAccountModuleAddress as Hex]);
    const hook: BootstrapConfig = _makeBootstrapConfig(this.hookMultiplexerAddress as Hex, hmpInitData);

    const fallbacks: BootstrapConfig[] = makeBootstrapConfig(ADDRESS_ZERO, '0x');

    const initMSAData = encodeFunctionData({
      functionName: 'initMSA',
      abi: parseAbi(bootstrapAbi),
      args: [validators, executors, hook, fallbacks],
    });
    const eoaAddress = await this.getEOAAddress();

    const initCode = encodeAbiParameters(
      parseAbiParameters('address, address, bytes'),
      [eoaAddress, this.bootstrapAddress as Hex, initMSAData]
    )

    return initCode;
  }

  /**
   * return the value to put into the "initCode" field, if the account is not yet deployed.
   * this value holds the "factory" address, followed by this account's information
   */
  async getAccountInitCode(): Promise<string> {
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
    })

    return concat([
      this.factoryAddress as Hex,
      functionData,
    ]);
  }

  async getCounterFactualAddress(): Promise<string> {
    if (this.predefinedAccountAddress) {
      await this.checkAccountAddress(this.predefinedAccountAddress);
    }

    const salt = pad(toHex(this.index), { size: 32 });
    const initCode = await this.getInitCodeData();

    if (!this.accountAddress) {
      this.accountAddress = (await this.publicClient.readContract({
        address: this.factoryAddress as Hex,
        abi: parseAbi(factoryAbi),
        functionName: 'getAddress',
        args: [salt, initCode]
      })) as Hex;
    }
    return this.accountAddress;
  }

  async getNonce(key: BigNumber = BigNumber.from(0)): Promise<BigNumber> {
    const accountAddress = await this.getAccountAddress();

    const nonceKey = key.eq(0) ? this.validatorAddress : key.toHexString();

    if (!nonceKey) {
      throw new Error('nonce key not defined');
    }

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

      } catch (e) {
        console.error(`Error caught : ${e}`);
        throw new Error(`Invalid Validator Address: ${nonceKey}`);
      }
    }

    const dummyKey = getAddress(nonceKey) + "00000000"

    const nonceResponse = await this.publicClient.readContract({
      address: this.entryPointAddress as Hex,
      abi: parseAbi(entryPointAbi),
      functionName: 'getNonce',
      args: [accountAddress, BigInt(dummyKey)]
    });
    return nonceResponse as BigNumber;
  }

  /**
   * encode a method call from entryPoint to our contract
   * @param target
   * @param value
   * @param data
   */
  async encodeExecute(target: string, value: BigNumberish, data: string): Promise<string> {
    const executeMode = getExecuteMode({
      callType: CALL_TYPE.SINGLE,
      execType: EXEC_TYPE.DEFAULT
    });

    // Assuming toHex is a function that accepts string | number | bigint | boolean | Uint8Array
    // Convert BigNumberish to a string if it's a BigNumber
    // Convert BigNumberish or Bytes to a compatible type
    let valueToProcess: string | number | bigint | boolean | Uint8Array;

    if (BigNumber.isBigNumber(value)) {
      valueToProcess = value.toString(); // Convert BigNumber to string
    } else if (isBytes(value)) {
      valueToProcess = new Uint8Array(value); // Convert Bytes to Uint8Array
    } else {
      // Here, TypeScript is unsure about the type of `value`
      // You need to ensure `value` is of a type compatible with `valueToProcess`
      // If `value` can only be string, number, bigint, boolean, or Uint8Array, this assignment is safe
      // If `value` can be of other types (like Bytes), you need an explicit conversion or handling here
      // For example, if there's a chance `value` is still `Bytes`, you could handle it like so:
      if (typeof value === 'object' && value !== null && 'length' in value) {
        // Assuming this condition is sufficient to identify Bytes-like objects
        // Convert it to Uint8Array
        valueToProcess = new Uint8Array(Object.values(value));
      } else {
        valueToProcess = value as string | number | bigint | boolean | Uint8Array;
      }
    }

    const calldata = concat([
      target as Hex,
      pad(toHex(valueToProcess), { size: 32 }) as Hex,
      data as Hex
    ]);

    return encodeFunctionData({
      functionName: 'execute',
      abi: parseAbi(accountAbi),
      args: [executeMode, calldata],
    });
  }

  async signUserOpHash(userOpHash: string): Promise<string> {
    return await this.services.walletService.signUserOp(userOpHash as Hex);
  }

  async encodeBatch(targets: string[], values: BigNumberish[], datas: string[]): Promise<string> {

    const executeMode = getExecuteMode({
      callType: CALL_TYPE.BATCH,
      execType: EXEC_TYPE.DEFAULT
    });

    const result = targets.map((target, index) => ({
      target: target as Hex,
      value: values[index],
      callData: datas[index] as Hex
    }));

    const convertedResult = result.map(item => ({
      ...item,
      // Convert `value` from BigNumberish to bigint
      value: typeof item.value === 'bigint' ? item.value : BigNumber.from(item.value.toString()).toBigInt(),
    }));

    //TODO-Test-LibraryFix identify the syntax for viem to pass array of tuple
    // const calldata = ethers.utils.defaultAbiCoder.encode(
    //   ["tuple(address target,uint256 value,bytes callData)[]"],
    //   [result]
    // );

    const calldata = encodeAbiParameters(
      parseAbiParameters('(address target,uint256 value,bytes callData)[]'),
      [convertedResult]
    )

    return encodeFunctionData({
      functionName: 'execute',
      abi: parseAbi(accountAbi),
      args: [executeMode, calldata],
    });
  }
}
