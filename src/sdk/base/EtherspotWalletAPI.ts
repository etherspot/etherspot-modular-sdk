import { BigNumber, BigNumberish, Contract, constants, ethers } from 'ethers';
import { arrayify, hexConcat } from 'ethers/lib/utils';
import { BaseApiParams, BaseAccountAPI } from './BaseAccountAPI';
import { EtherspotWallet7579Factory__factory, EtherspotWallet7579__factory } from '../contracts/factories/src/ERC7579/wallet';
import { ModularEtherspotWallet, EtherspotWallet7579Factory } from '../contracts/src/ERC7579/wallet';
import { BOOTSTRAP_ABI, BootstrapConfig, _makeBootstrapConfig, makeBootstrapConfig } from './Bootstrap';
import { DEFAULT_BOOTSTRAP_ADDRESS, DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS, Networks, DEFAULT_QUERY_PAGE_SIZE } from '../network/constants';
import { CALL_TYPE, EXEC_TYPE, MODULE_TYPE, getExecuteMode } from '../common';

// Creating a constant for the sentinel address using ethers.js
const SENTINEL_ADDRESS = ethers.utils.getAddress("0x0000000000000000000000000000000000000001");
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
    //this.publicClient = getPublicClient({ rpcUrl: Networks[params.optionsLike.chainId] });
  }

  async isModuleInstalled(moduleTypeId: MODULE_TYPE, module: string): Promise<boolean> {
    const accountContract = EtherspotWallet7579__factory.connect(await this.getAccountAddress(), this.provider);
    return await accountContract.isModuleInstalled(moduleTypeId, module, '0x');
  }

  async installModule(moduleTypeId: MODULE_TYPE, module: string, initData = '0x'): Promise<string> {
    const accountAddress = await this.getAccountAddress();
    const accountContract = EtherspotWallet7579__factory.connect(await this.getAccountAddress(), this.provider);
    if (await accountContract.isModuleInstalled(moduleTypeId, module, initData)) {
      throw new Error('the module is already installed')
    }

    return accountContract.interface.encodeFunctionData('installModule', [moduleTypeId, module, initData]);
  }

  async uninstallModule(moduleTypeId: MODULE_TYPE, module: string, deinitData: string): Promise<string> {
    const accountContract = EtherspotWallet7579__factory.connect(await this.getAccountAddress(), this.provider);
    if (!(await accountContract.isModuleInstalled(moduleTypeId, module, deinitData))) {
      throw new Error('the module is not installed in the wallet')
    }

    return accountContract.interface.encodeFunctionData('uninstallModule', [moduleTypeId, module, deinitData]);
  }

  // Function to get all executors
  async getAllExecutors(pageSize: number = DEFAULT_QUERY_PAGE_SIZE): Promise<string[]> {
    let lastAddress = SENTINEL_ADDRESS; // Assuming this is your SENTINEL value
    let totalExecutors: string[] = [];

    // Pagination loop
    let tempExecutors: string[];
    const accountContract = EtherspotWallet7579__factory.connect(await this.getAccountAddress(), this.provider);

    do {
      // Fetch a page of executors
      [tempExecutors, lastAddress] = await accountContract.getExecutorsPaginated(lastAddress, pageSize);

      // Append executors to the total list
      totalExecutors = [...totalExecutors, ...tempExecutors];

      // Break if it's the last page
      if (tempExecutors.length < pageSize || lastAddress === SENTINEL_ADDRESS || lastAddress === ethers.constants.AddressZero) {
        break;
      }
    } while (true);

    return totalExecutors;
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
    const deInitDataGenerated = ethers.utils.defaultAbiCoder.encode(
      ["address", "bytes"],
      [previousAddress, deinitDataBase]
    );

    return deInitDataGenerated;
  }

  // function to get validators
  async getAllValidators(pageSize: number = DEFAULT_QUERY_PAGE_SIZE): Promise<string[]> {
    let lastAddress = SENTINEL_ADDRESS;
    let totalValidators: string[] = [];

    // Pagination loop
    let tempValidators: string[];
    const accountContract = EtherspotWallet7579__factory.connect(await this.getAccountAddress(), this.provider);

    do {
      // Fetch a page of validators
      [tempValidators, lastAddress] = await accountContract.getValidatorPaginated(lastAddress, pageSize);

      // Append validators to the total list
      totalValidators = [...totalValidators, ...tempValidators];

      // Break if it's the last page
      if (tempValidators.length < pageSize || lastAddress === SENTINEL_ADDRESS || lastAddress === ethers.constants.AddressZero) {
        break;
      }
    } while (true);

    return totalValidators;
  }

  // function to get active hook
  async getActiveHook(): Promise<string> {
    const accountContract = EtherspotWallet7579__factory.connect(await this.getAccountAddress(), this.provider);
    return accountContract.getActiveHook();
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
    const accountContract = EtherspotWallet7579__factory.connect(address, this.provider);
    if (!(await accountContract.isOwner(this.services.walletService.EOAAddress))) {
      throw new Error('the specified accountAddress does not belong to the given EOA provider')
    }
    else {
      this.accountAddress = address;
    }
  }

  async _getAccountContract(): Promise<Contract> {
    if (this.accountContract == null) {
      this.accountContract = EtherspotWallet7579__factory.connect(await this.getAccountAddress(), this.provider);
    }
    return this.accountContract;
  }

  async getInitCodeData(): Promise<string> {
    const iface = new ethers.utils.Interface(BOOTSTRAP_ABI);
    const validators: BootstrapConfig[] = makeBootstrapConfig(this.multipleOwnerECDSAValidatorAddress, '0x');
    const executors: BootstrapConfig[] = makeBootstrapConfig(constants.AddressZero, '0x');
    const hook: BootstrapConfig = _makeBootstrapConfig(constants.AddressZero, '0x');
    const fallbacks: BootstrapConfig[] = makeBootstrapConfig(constants.AddressZero, '0x');

    const initMSAData = iface.encodeFunctionData(
      "initMSA",
      [validators, executors, hook, fallbacks]
    );

    const initCode = ethers.utils.defaultAbiCoder.encode(
      ["address", "address", "bytes"],
      [this.services.walletService.EOAAddress, this.bootstrapAddress, initMSAData]
    );

    return initCode;
  }

  /**
   * return the value to put into the "initCode" field, if the account is not yet deployed.
   * this value holds the "factory" address, followed by this account's information
   */
  async getAccountInitCode(): Promise<string> {
    if (this.factoryAddress != null && this.factoryAddress !== '') {
      this.factory = EtherspotWallet7579Factory__factory.connect(this.factoryAddress, this.provider);
    } else {
      throw new Error('no factory to get initCode');
    }

    const initCode = await this.getInitCodeData();
    const salt = ethers.utils.hexZeroPad(ethers.utils.hexValue(this.index), 32);

    return hexConcat([
      this.factoryAddress,
      this.factory.interface.encodeFunctionData('createAccount', [
        salt,
        initCode,
      ]),
    ]);
  }

  async getCounterFactualAddress(): Promise<string> {
    if (this.predefinedAccountAddress) {
      await this.checkAccountAddress(this.predefinedAccountAddress);
    }

    const salt = ethers.utils.hexZeroPad(ethers.utils.hexValue(this.index), 32);
    const initCode = await this.getInitCodeData();

    if (!this.accountAddress) {
      this.factory = EtherspotWallet7579Factory__factory.connect(this.factoryAddress, this.provider);
      this.accountAddress = await this.factory.getAddress(
        salt,
        initCode,
      );
    }
    return this.accountAddress;
  }

  async getNonce(key: BigNumber = BigNumber.from(0)): Promise<BigNumber> {
    const accountAddress = await this.getAccountAddress();
    const nonceAddressPrefix =  key.eq(0) ? this.multipleOwnerECDSAValidatorAddress : key.toHexString();

    // validate if the nonceAddressPrefix is a valid Address based on its size and also valid sequence of characters in it
    if (!ethers.utils.isAddress(nonceAddressPrefix)) {
      throw new Error(`Invalid Validator Address: ${nonceAddressPrefix}`);
    }

    const isAnExistingModularAccount = (await this.provider.getCode(accountAddress) !== '0x');

    if(isAnExistingModularAccount) {
      const isValidatorInstalled : boolean = await this.isModuleInstalled(MODULE_TYPE.VALIDATOR, nonceAddressPrefix);

      if(!isValidatorInstalled) {
        throw new Error(`Validator: ${nonceAddressPrefix} is not installed in the wallet`);
      }
    }

    const dummyKey = ethers.utils.getAddress(nonceAddressPrefix) + "00000000";
    return await this.entryPointView.getNonce(accountAddress, BigInt(dummyKey));
  }

  /**
   * encode a method call from entryPoint to our contract
   * @param target
   * @param value
   * @param data
   */
  async encodeExecute(target: string, value: BigNumberish, data: string): Promise<string> {
    const accountContract = await this._getAccountContract();
    const executeMode = getExecuteMode({
      callType: CALL_TYPE.SINGLE,
      execType: EXEC_TYPE.DEFAULT
    });

    const calldata = hexConcat([
      target,
      ethers.utils.hexZeroPad(ethers.utils.hexValue(value), 32),
      data
    ]);

    return accountContract.interface.encodeFunctionData('execute', [executeMode, calldata]);
  }

  async signUserOpHash(userOpHash: string): Promise<string> {
    const signature = await this.services.walletService.signMessage(arrayify(userOpHash));
    return signature;
  }

  get epView() {
    return this.entryPointView;
  }

  async encodeBatch(targets: string[], values: BigNumberish[], datas: string[]): Promise<string> {
    const accountContract = await this._getAccountContract();

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

    return accountContract.interface.encodeFunctionData('execute', [executeMode, calldata]);
  }
}
