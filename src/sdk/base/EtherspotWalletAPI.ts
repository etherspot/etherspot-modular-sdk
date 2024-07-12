import { BigNumber, BigNumberish, ethers } from 'ethers';
import { BaseApiParams, BaseAccountAPI } from './BaseAccountAPI';
import { ModularEtherspotWallet, EtherspotWallet7579Factory } from '../contracts/src/ERC7579/wallet';
import { BootstrapConfig, _makeBootstrapConfig, makeBootstrapConfig } from './Bootstrap';
import { DEFAULT_BOOTSTRAP_ADDRESS, DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS, Networks, DEFAULT_QUERY_PAGE_SIZE } from '../network/constants';
import { CALL_TYPE, EXEC_TYPE, MODULE_TYPE, getExecuteMode } from '../common';
import { encodeFunctionData, parseAbi, encodeAbiParameters, parseAbiParameters, WalletClient, PublicClient, toBytes, concat, getAddress, pad, toHex, isBytes } from 'viem';
import { accountAbi, bootstrapAbi, factoryAbi } from '../common/abis';
import { getInstalledModules } from '../common/getInstalledModules';
import { getViemAddress } from '../common/viem-utils';

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
  factoryAddress?: string;
  index: number;
  accountAddress?: string;
  predefinedAccountAddress?: string;
  bootstrapAddress?: string;
  multipleOwnerECDSAValidatorAddress?: string;
  walletClient: WalletClient;
  publicClient: PublicClient

  /**
   * our account contract.
   * should support the "execFromEntryPoint" and "nonce" methods
   */
  accountContract?: ModularEtherspotWallet;

  factory?: EtherspotWallet7579Factory;

  constructor(params: EtherspotWalletApiParams) {
    super(params);
    this.factoryAddress = params.factoryAddress;
    this.index = params.index ?? 0;
    this.predefinedAccountAddress = params.predefinedAccountAddress ?? null;
    this.bootstrapAddress = Networks[params.optionsLike.chainId]?.contracts?.bootstrap ?? DEFAULT_BOOTSTRAP_ADDRESS;
    this.multipleOwnerECDSAValidatorAddress = Networks[params.optionsLike.chainId]?.contracts?.multipleOwnerECDSAValidator ?? DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS;
    this.publicClient = params.publicClient;
    this.walletClient = params.walletClient;
  }

  async isModuleInstalled(moduleTypeId: MODULE_TYPE, module: string, initData = '0x'): Promise<boolean> {
    const accountAddress = await this.getAccountAddress();
    if (!accountAddress) throw new Error('Account address not found');
    const response = await this.publicClient.readContract({
      address: accountAddress as `0x${string}`,
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
      [previousAddress as `0x${string}`, deinitDataBase as `0x${string}`]
    )

    return deInitDataGenerated;
  }

  // function to get validators
  async getAllValidators(pageSize: number = DEFAULT_QUERY_PAGE_SIZE): Promise<string[]> {
    return await getInstalledModules({ client: this.publicClient, moduleAddress: getViemAddress(this.accountAddress), moduleTypes: ['validator'], pageSize: pageSize });
  }

  // function to get active hook
  async getActiveHook(): Promise<string> {
    const activeHook = await this.publicClient.readContract({
      address: this.accountAddress as `0x${string}`,
      abi: parseAbi(accountAbi),
      functionName: 'getActiveHook',
    });

    return activeHook as `0x${string}`;
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
    const isOwner = await this.publicClient.readContract({
      address: address  as `0x${string}`,
      abi: parseAbi(accountAbi),
      functionName: 'isOwner',
      args: [this.services.walletService.EOAAddress]
    }) as boolean;
    if (!isOwner) {
      throw new Error('the specified accountAddress does not belong to the given EOA provider')
    } else {
      this.accountAddress = address;
    }
  }

  async getInitCodeData(): Promise<string> {
    const validators: BootstrapConfig[] = makeBootstrapConfig(this.multipleOwnerECDSAValidatorAddress, '0x');
    const executors: BootstrapConfig[] = makeBootstrapConfig(ADDRESS_ZERO, '0x');
    const hook: BootstrapConfig = _makeBootstrapConfig(ADDRESS_ZERO, '0x');
    const fallbacks: BootstrapConfig[] = makeBootstrapConfig(ADDRESS_ZERO, '0x');

    const initMSAData = encodeFunctionData({
      functionName: 'initMSA',
      abi: parseAbi(bootstrapAbi),
      args: [validators, executors, hook, fallbacks],
    });

    const initCode = encodeAbiParameters(
      parseAbiParameters('address, address, bytes'),
      [this.services.walletService.EOAAddress as `0x${string}`, this.bootstrapAddress as `0x${string}`, initMSAData]
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
      this.factoryAddress as `0x${string}`,
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
        address: this.factoryAddress as `0x${string}`,
        abi: parseAbi(factoryAbi),
        functionName: 'getAddress',
        args: [salt, initCode]
      })) as `0x${string}`;
    }
    return this.accountAddress;
  }

  async getNonce(key: BigNumber = BigNumber.from(0)): Promise<BigNumber> {
    const accountAddress = await this.getAccountAddress();
    const dummyKey = key.eq(0)
      ? getAddress(this.multipleOwnerECDSAValidatorAddress) + "00000000"
      : getAddress(key.toHexString()) + "00000000";

    return await this.entryPointView.getNonce(accountAddress, BigInt(dummyKey));
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
      target as `0x${string}`,
      pad(toHex(valueToProcess), { size: 32 }) as `0x${string}`,
      data as `0x${string}`
    ]);

    return encodeFunctionData({
      functionName: 'execute',
      abi: parseAbi(accountAbi),
      args: [executeMode, calldata],
    });
  }

  async signUserOpHash(userOpHash: string): Promise<string> {
    const signature = await this.services.walletService.signMessage(toBytes(userOpHash));
    return signature;
  }

  async encodeBatch(targets: string[], values: BigNumberish[], datas: string[]): Promise<string> {

    const executeMode = getExecuteMode({
      callType: CALL_TYPE.BATCH,
      execType: EXEC_TYPE.DEFAULT
    });

    const result = targets.map((target, index) => ({
      target: target,
      value: values[index],
      callData: datas[index]
    }));

    const calldata = ethers.utils.defaultAbiCoder.encode(
      ["tuple(address target,uint256 value,bytes callData)[]"],
      [result]
    );

    // const calldata1 = encodeAbiParameters(
    //   parseAbiParameters('(address target,uint256 value,bytes callData)[]'),
    //   [result]
    // )

    return encodeFunctionData({
      functionName: 'execute',
      abi: parseAbi(accountAbi),
      args: [executeMode, calldata],
    });
  }
}
