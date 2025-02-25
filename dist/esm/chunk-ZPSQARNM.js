import {
  WalletService
} from "./chunk-EGN3VPUB.js";
import {
  isWalletConnectProvider
} from "./chunk-4C5GJCB6.js";
import {
  isWalletProvider
} from "./chunk-SI63LRN5.js";
import {
  WalletConnect2WalletProvider
} from "./chunk-CHR2G5TD.js";
import {
  NetworkService
} from "./chunk-7Y4ZOR77.js";
import {
  HttpRpcClient
} from "./chunk-RMYTR7WV.js";
import {
  ErrorHandler
} from "./chunk-NNQEX6PF.js";
import {
  VerifyingPaymasterAPI
} from "./chunk-IUUB4F7U.js";
import {
  calcPreVerificationGas
} from "./chunk-VJN3GYFI.js";
import {
  validateDto
} from "./chunk-RYKQDQQJ.js";
import {
  SignMessageDto
} from "./chunk-A5JWHM74.js";
import {
  _makeBootstrapConfig,
  makeBootstrapConfig
} from "./chunk-RNSEOPYU.js";
import {
  getInstalledModules
} from "./chunk-ACHZ4ZIC.js";
import {
  accountAbi,
  bootstrapAbi,
  entryPointAbi,
  factoryAbi
} from "./chunk-ZJ2O6KOQ.js";
import {
  EtherspotBundler
} from "./chunk-QRHPTBCF.js";
import {
  Context
} from "./chunk-LT6TVN3Y.js";
import {
  Exception
} from "./chunk-ZHWY46SJ.js";
import {
  getExecuteMode,
  resolveProperties
} from "./chunk-4KVEROXU.js";
import {
  getGasFee
} from "./chunk-QWCJZTVT.js";
import {
  getPublicClient,
  getViemAddress
} from "./chunk-BFP3WTVA.js";
import {
  DEFAULT_BOOTSTRAP_ADDRESS,
  DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS,
  DEFAULT_QUERY_PAGE_SIZE,
  Networks
} from "./chunk-EDY4DXI5.js";
import {
  getUserOpHash,
  packUserOp
} from "./chunk-DDDNIC7V.js";
import {
  BigNumber
} from "./chunk-LWM5MV7Z.js";
import {
  http,
  isBytes
} from "./chunk-VOPA75Q5.js";
import {
  concat,
  encodeAbiParameters,
  encodeFunctionData,
  formatEther,
  getAddress,
  isAddress,
  pad,
  parseAbi,
  parseAbiParameters,
  toHex
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/base/EtherspotWalletAPI.ts
var SENTINEL_ADDRESS = getAddress("0x0000000000000000000000000000000000000001");
var ADDRESS_ZERO = getAddress("0x0000000000000000000000000000000000000000");
var EtherspotWalletAPI = class extends BaseAccountAPI {
  index;
  predefinedAccountAddress;
  bootstrapAddress;
  eoaAddress;
  constructor(params) {
    super(params);
    this.index = params.index ?? 0;
    this.predefinedAccountAddress = params.predefinedAccountAddress ?? null;
    this.bootstrapAddress = Networks[params.optionsLike.chainId]?.contracts?.bootstrap ?? DEFAULT_BOOTSTRAP_ADDRESS;
  }
  getEOAAddress() {
    return this.services.walletService.EOAAddress;
  }
  async isModuleInstalled(moduleTypeId, module, initData = "0x") {
    const accountAddress = await this.getAccountAddress();
    if (!accountAddress) throw new Error("Account address not found");
    const response = await this.publicClient.readContract({
      address: accountAddress,
      abi: parseAbi(accountAbi),
      functionName: "isModuleInstalled",
      args: [moduleTypeId, module, initData]
    });
    return response;
  }
  async installModule(moduleTypeId, module, initData = "0x") {
    const accountAddress = await this.getAccountAddress();
    if (!accountAddress) throw new Error("Account address not found");
    if (await this.isModuleInstalled(moduleTypeId, module, initData)) {
      throw new Error("the module is already installed");
    }
    return encodeFunctionData({
      functionName: "installModule",
      abi: parseAbi(accountAbi),
      args: [moduleTypeId, module, initData]
    });
  }
  async uninstallModule(moduleTypeId, module, deinitData) {
    const isModuleInstalled = await this.isModuleInstalled(moduleTypeId, module, deinitData);
    if (!isModuleInstalled) {
      throw new Error("he module is not installed in the wallet");
    }
    if (moduleTypeId === "0x02" /* EXECUTOR */ || moduleTypeId === "0x01" /* VALIDATOR */) {
      const installedModules = moduleTypeId === "0x02" /* EXECUTOR */ ? await this.getAllExecutors() : await this.getAllValidators();
      if (installedModules.length === 1) {
        throw new Error("Cannot uninstall the only module");
      }
    }
    return encodeFunctionData({
      functionName: "uninstallModule",
      abi: parseAbi(accountAbi),
      args: [moduleTypeId, module, deinitData]
    });
  }
  async getAllExecutors(pageSize = DEFAULT_QUERY_PAGE_SIZE) {
    return await getInstalledModules({ client: this.publicClient, moduleAddress: getViemAddress(this.accountAddress), moduleTypes: ["executor"], pageSize });
  }
  async getPreviousAddress(targetAddress, moduleTypeId) {
    if (moduleTypeId !== "0x02" /* EXECUTOR */ && moduleTypeId !== "0x01" /* VALIDATOR */) {
      throw new Error("Unsupported module type");
    }
    const insalledModules = moduleTypeId === "0x02" /* EXECUTOR */ ? await this.getAllExecutors() : await this.getAllValidators();
    const index = insalledModules.indexOf(targetAddress);
    if (index === 0) {
      return SENTINEL_ADDRESS;
    } else if (index > 0) {
      return insalledModules[index - 1];
    } else {
      throw new Error(`Module ${targetAddress} not found in installed modules`);
    }
  }
  // here its users responsibility to prepare deInit Data
  // deinitData is prepared as bytes data made of the previous node address and the deinit data
  // the deinit data is the data that is passed to the module to be uninstalled
  async generateModuleDeInitData(moduleTypeId, module, deinitDataBase) {
    if (moduleTypeId !== "0x02" /* EXECUTOR */ && moduleTypeId !== "0x01" /* VALIDATOR */) {
      throw new Error("Unsupported module type");
    }
    const previousAddress = await this.getPreviousAddress(module, moduleTypeId);
    const deInitDataGenerated = encodeAbiParameters(
      parseAbiParameters("address, bytes"),
      [previousAddress, deinitDataBase]
    );
    return deInitDataGenerated;
  }
  // function to get validators
  async getAllValidators(pageSize = DEFAULT_QUERY_PAGE_SIZE) {
    return await getInstalledModules({ client: this.publicClient, moduleAddress: getViemAddress(this.accountAddress), moduleTypes: ["validator"], pageSize });
  }
  // function to get active hook
  async getActiveHook() {
    const activeHook = await this.publicClient.readContract({
      address: this.accountAddress,
      abi: parseAbi(accountAbi),
      functionName: "getActiveHook"
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
      address,
      abi: parseAbi(accountAbi),
      functionName: "isOwner",
      args: [eoaAddress]
    });
    if (!isOwner) {
      throw new Error("the specified accountAddress does not belong to the given EOA provider");
    } else {
      this.accountAddress = address;
    }
  }
  async getInitCodeData() {
    const validators = makeBootstrapConfig(this.validatorAddress, "0x");
    const executors = makeBootstrapConfig(ADDRESS_ZERO, "0x");
    const hook = _makeBootstrapConfig(ADDRESS_ZERO, "0x");
    const fallbacks = makeBootstrapConfig(ADDRESS_ZERO, "0x");
    const initMSAData = encodeFunctionData({
      functionName: "initMSA",
      abi: parseAbi(bootstrapAbi),
      args: [validators, executors, hook, fallbacks]
    });
    const eoaAddress = await this.getEOAAddress();
    const initCode = encodeAbiParameters(
      parseAbiParameters("address, address, bytes"),
      [eoaAddress, this.bootstrapAddress, initMSAData]
    );
    return initCode;
  }
  /**
   * return the value to put into the "initCode" field, if the account is not yet deployed.
   * this value holds the "factory" address, followed by this account's information
   */
  async getAccountInitCode() {
    if (this.factoryAddress == null || this.factoryAddress == "") {
      throw new Error("no factory to get initCode");
    }
    const initCode = await this.getInitCodeData();
    const salt = pad(toHex(this.index), { size: 32 });
    const functionData = encodeFunctionData({
      functionName: "createAccount",
      abi: parseAbi(factoryAbi),
      args: [
        salt,
        initCode
      ]
    });
    return concat([
      this.factoryAddress,
      functionData
    ]);
  }
  async getCounterFactualAddress() {
    if (this.predefinedAccountAddress) {
      await this.checkAccountAddress(this.predefinedAccountAddress);
    }
    const salt = pad(toHex(this.index), { size: 32 });
    const initCode = await this.getInitCodeData();
    if (!this.accountAddress) {
      this.accountAddress = await this.publicClient.readContract({
        address: this.factoryAddress,
        abi: parseAbi(factoryAbi),
        functionName: "getAddress",
        args: [salt, initCode]
      });
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
        } else {
          const isModuleInstalled = await this.isModuleInstalled("0x01" /* VALIDATOR */, nonceKey);
          if (!isModuleInstalled) {
            throw new Error(`Validator: ${nonceKey} is not installed in the wallet`);
          }
        }
      } catch (e) {
        console.error(`Error caught : ${e}`);
        throw new Error(`Invalid Validator Address: ${nonceKey}`);
      }
    }
    const dummyKey = getAddress(nonceKey) + "00000000";
    const nonceResponse = await this.publicClient.readContract({
      address: this.entryPointAddress,
      abi: parseAbi(entryPointAbi),
      functionName: "getNonce",
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
      callType: "0x00" /* SINGLE */,
      execType: "0x00" /* DEFAULT */
    });
    let valueToProcess;
    if (BigNumber.isBigNumber(value)) {
      valueToProcess = value.toString();
    } else if (isBytes(value)) {
      valueToProcess = new Uint8Array(value);
    } else {
      if (typeof value === "object" && value !== null && "length" in value) {
        valueToProcess = new Uint8Array(Object.values(value));
      } else {
        valueToProcess = value;
      }
    }
    const calldata = concat([
      target,
      pad(toHex(valueToProcess), { size: 32 }),
      data
    ]);
    return encodeFunctionData({
      functionName: "execute",
      abi: parseAbi(accountAbi),
      args: [executeMode, calldata]
    });
  }
  async signUserOpHash(userOpHash) {
    return await this.services.walletService.signUserOp(userOpHash);
  }
  async encodeBatch(targets, values, datas) {
    const executeMode = getExecuteMode({
      callType: "0x01" /* BATCH */,
      execType: "0x00" /* DEFAULT */
    });
    const result = targets.map((target, index) => ({
      target,
      value: values[index],
      callData: datas[index]
    }));
    const convertedResult = result.map((item) => ({
      ...item,
      // Convert `value` from BigNumberish to bigint
      value: typeof item.value === "bigint" ? item.value : BigInt(item.value.toString())
    }));
    const calldata = encodeAbiParameters(
      parseAbiParameters("(address target,uint256 value,bytes callData)[]"),
      [convertedResult]
    );
    return encodeFunctionData({
      functionName: "execute",
      abi: parseAbi(accountAbi),
      args: [executeMode, calldata]
    });
  }
};

// src/sdk/sdk.ts
var ModularSdk = class {
  etherspotWallet;
  bundler;
  chainId;
  factoryUsed;
  index;
  publicClient;
  account;
  providerUrl;
  userOpsBatch = { to: [], data: [], value: [] };
  constructor(walletProvider, optionsLike) {
    let walletConnectProvider;
    if (isWalletConnectProvider(walletProvider)) {
      walletConnectProvider = new WalletConnect2WalletProvider(walletProvider);
    } else if (!isWalletProvider(walletProvider)) {
      throw new Exception("Invalid wallet provider");
    }
    const {
      index,
      chainId,
      rpcProviderUrl,
      accountAddress
    } = optionsLike;
    this.chainId = chainId;
    this.index = index ?? 0;
    if (!optionsLike.bundlerProvider) {
      optionsLike.bundlerProvider = new EtherspotBundler(chainId);
    }
    this.factoryUsed = optionsLike.factoryWallet ?? "etherspot" /* ETHERSPOT */;
    let viemClientUrl = "";
    if (rpcProviderUrl) {
      viemClientUrl = rpcProviderUrl;
    } else {
      viemClientUrl = optionsLike.bundlerProvider.url;
    }
    this.providerUrl = viemClientUrl;
    this.publicClient = getPublicClient({
      chainId,
      transport: http(
        viemClientUrl
      )
    });
    let entryPointAddress = "", walletFactoryAddress = "";
    if (Networks[chainId]) {
      entryPointAddress = Networks[chainId].contracts.entryPoint;
      if (Networks[chainId].contracts.walletFactory == "") throw new Exception("The selected factory is not deployed in the selected chain_id");
      walletFactoryAddress = Networks[chainId].contracts.walletFactory;
    }
    if (optionsLike.entryPointAddress) entryPointAddress = optionsLike.entryPointAddress;
    if (optionsLike.walletFactoryAddress) walletFactoryAddress = optionsLike.walletFactoryAddress;
    if (entryPointAddress == "") throw new Exception("entryPointAddress not set on the given chain_id");
    if (walletFactoryAddress == "") throw new Exception("walletFactoryAddress not set on the given chain_id");
    this.account = this.account;
    this.etherspotWallet = new EtherspotWalletAPI({
      optionsLike,
      entryPointAddress,
      factoryAddress: walletFactoryAddress,
      predefinedAccountAddress: accountAddress,
      index: this.index,
      wallet: walletConnectProvider ?? walletProvider,
      publicClient: this.publicClient
    });
    this.bundler = new HttpRpcClient(
      optionsLike.bundlerProvider.url,
      entryPointAddress,
      chainId,
      this.publicClient
    );
  }
  get supportedNetworks() {
    return this.etherspotWallet.services.networkService.supportedNetworks;
  }
  /**
   * destroys
   */
  destroy() {
    this.etherspotWallet.context.destroy();
  }
  getPublicClient() {
    return this.publicClient;
  }
  getProviderUrl() {
    return this.providerUrl;
  }
  // wallet
  /**
   * signs message
   * @param dto
   * @return Promise<string>
   */
  async signMessage(dto) {
    await validateDto(dto, SignMessageDto);
    await this.etherspotWallet.require({
      network: false
    });
    return await this.etherspotWallet.signMessage(dto);
  }
  getEOAAddress() {
    return this.etherspotWallet.getEOAAddress();
  }
  async getCounterFactualAddress() {
    return this.etherspotWallet.getCounterFactualAddress();
  }
  async estimate(params = {}) {
    const { paymasterDetails, gasDetails, callGasLimit, key } = params;
    const dummySignature = "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
    if (this.userOpsBatch.to.length < 1) {
      throw new ErrorHandler("cannot sign empty transaction batch", 1);
    }
    if (paymasterDetails?.url) {
      const paymasterAPI = new VerifyingPaymasterAPI(paymasterDetails.url, this.etherspotWallet.entryPointAddress, paymasterDetails.context ?? {});
      this.etherspotWallet.setPaymasterApi(paymasterAPI);
    } else this.etherspotWallet.setPaymasterApi(null);
    const tx = {
      target: this.userOpsBatch.to,
      values: this.userOpsBatch.value,
      data: this.userOpsBatch.data,
      dummySignature,
      ...gasDetails
    };
    const gasInfo = await this.getGasFee();
    const partialtx = await this.etherspotWallet.createUnsignedUserOp({
      ...tx,
      maxFeePerGas: gasInfo.maxFeePerGas,
      maxPriorityFeePerGas: gasInfo.maxPriorityFeePerGas
    }, key);
    if (callGasLimit) {
      partialtx.callGasLimit = BigNumber.from(callGasLimit).toHexString();
    }
    if (await this.etherspotWallet.checkAccountPhantom()) {
      partialtx.factory = this.etherspotWallet.factoryAddress;
    }
    const bundlerGasEstimate = await this.bundler.getVerificationGasInfo(partialtx);
    if (gasDetails?.maxFeePerGas && gasDetails?.maxPriorityFeePerGas) {
      partialtx.maxFeePerGas = gasDetails.maxFeePerGas;
      partialtx.maxPriorityFeePerGas = gasDetails.maxPriorityFeePerGas;
    } else if (bundlerGasEstimate.maxFeePerGas && bundlerGasEstimate.maxPriorityFeePerGas) {
      partialtx.maxFeePerGas = bundlerGasEstimate.maxFeePerGas;
      partialtx.maxPriorityFeePerGas = bundlerGasEstimate.maxPriorityFeePerGas;
    } else {
      const gas = await this.getGasFee();
      partialtx.maxFeePerGas = gas.maxFeePerGas;
      partialtx.maxPriorityFeePerGas = gas.maxPriorityFeePerGas;
    }
    if (bundlerGasEstimate.preVerificationGas) {
      partialtx.preVerificationGas = BigNumber.from(bundlerGasEstimate.preVerificationGas);
      partialtx.verificationGasLimit = BigNumber.from(bundlerGasEstimate.verificationGasLimit ?? bundlerGasEstimate.verificationGas);
      const expectedCallGasLimit = BigNumber.from(bundlerGasEstimate.callGasLimit);
      if (!callGasLimit)
        partialtx.callGasLimit = expectedCallGasLimit;
      else if (BigNumber.from(callGasLimit).lt(expectedCallGasLimit))
        throw new ErrorHandler(`CallGasLimit is too low. Expected atleast ${expectedCallGasLimit.toString()}`);
    }
    return partialtx;
  }
  async getGasFee() {
    const version = await this.bundler.getBundlerVersion();
    if (version && version.includes("skandha"))
      return this.bundler.getSkandhaGasPrice();
    return getGasFee(this.publicClient);
  }
  async send(userOp, isUserOpAlreadySigned = false) {
    const signedUserOp = isUserOpAlreadySigned ? userOp : await this.etherspotWallet.signUserOp(userOp);
    return this.bundler.sendUserOpToBundler(signedUserOp);
  }
  async signTypedData(msg) {
    return this.etherspotWallet.signTypedData(msg);
  }
  async getNativeBalance() {
    if (!this.etherspotWallet.accountAddress) {
      await this.getCounterFactualAddress();
    }
    const balance = await this.publicClient.getBalance({ address: getViemAddress(this.etherspotWallet.accountAddress) });
    return formatEther(balance);
  }
  async getUserOpReceipt(userOpHash) {
    return await this.etherspotWallet.getUserOpReceipt(userOpHash);
  }
  async getUserOpHash(userOp) {
    return this.etherspotWallet.getUserOpHash(userOp);
  }
  async addUserOpsToBatch(tx) {
    if (!tx.data && !tx.value) throw new ErrorHandler("Data and Value both cannot be empty", 1);
    this.userOpsBatch.to.push(tx.to);
    this.userOpsBatch.value.push(tx.value ?? BigNumber.from(0));
    this.userOpsBatch.data.push(tx.data ?? "0x");
    return this.userOpsBatch;
  }
  async clearUserOpsFromBatch() {
    this.userOpsBatch.to = [];
    this.userOpsBatch.data = [];
    this.userOpsBatch.value = [];
  }
  async isModuleInstalled(moduleTypeId, module) {
    return this.etherspotWallet.isModuleInstalled(moduleTypeId, module);
  }
  async installModule(moduleTypeId, module, initData) {
    const installData = await this.etherspotWallet.installModule(moduleTypeId, module, initData);
    this.clearUserOpsFromBatch();
    await this.addUserOpsToBatch({
      to: this.etherspotWallet.accountAddress ?? await this.getCounterFactualAddress(),
      data: installData
    });
    const op = await this.estimate();
    const uoHash = await this.send(op);
    return uoHash;
  }
  async getPreviousModuleAddress(moduleTypeId, module) {
    return this.etherspotWallet.getPreviousAddress(module, moduleTypeId);
  }
  async generateModuleDeInitData(moduleTypeId, module, moduleDeInitData) {
    return await this.etherspotWallet.generateModuleDeInitData(moduleTypeId, module, moduleDeInitData);
  }
  async getPreviousAddress(moduleTypeId, targetAddress) {
    return await this.etherspotWallet.getPreviousAddress(targetAddress, moduleTypeId);
  }
  async uninstallModule(moduleTypeId, module, deinitData) {
    const uninstallData = await this.etherspotWallet.uninstallModule(moduleTypeId, module, deinitData);
    this.clearUserOpsFromBatch();
    await this.addUserOpsToBatch({
      to: this.etherspotWallet.accountAddress ?? await this.getCounterFactualAddress(),
      data: uninstallData
    });
    const op = await this.estimate();
    const uoHash = await this.send(op);
    return uoHash;
  }
  async getAllModules(pageSize = DEFAULT_QUERY_PAGE_SIZE) {
    const modules = await this.etherspotWallet.getAllModules(pageSize);
    return modules;
  }
  async totalGasEstimated(userOp) {
    const callGasLimit = BigNumber.from(await userOp.callGasLimit);
    const verificationGasLimit = BigNumber.from(await userOp.verificationGasLimit);
    const preVerificationGas = BigNumber.from(await userOp.preVerificationGas);
    return callGasLimit.add(verificationGasLimit).add(preVerificationGas);
  }
  async getNonce(key = BigNumber.from(0)) {
    const nonce = await this.etherspotWallet.getNonce(key);
    return nonce;
  }
};

// src/sdk/index.ts
var sdk_default = ModularSdk;

// src/sdk/base/BaseAccountAPI.ts
var BaseAccountAPI = class {
  senderAddress;
  isPhantom = true;
  services;
  context;
  overheads;
  entryPointAddress;
  accountAddress;
  paymasterAPI;
  factoryUsed;
  factoryAddress;
  validatorAddress;
  wallet;
  publicClient;
  /**
   * base constructor.
   * subclass SHOULD add parameters that define the owner (signer) of this wallet
   */
  constructor(params) {
    const optionsLike = params.optionsLike;
    const {
      chainId,
      //
      rpcProviderUrl,
      factoryWallet,
      bundlerProvider
    } = optionsLike;
    this.services = {
      networkService: new NetworkService(chainId),
      walletService: new WalletService(
        params.wallet,
        { provider: rpcProviderUrl },
        bundlerProvider.url,
        chainId
      )
    };
    this.context = new Context(this.services);
    this.factoryUsed = factoryWallet;
    this.overheads = params.overheads;
    this.entryPointAddress = params.entryPointAddress;
    this.accountAddress = params.accountAddress;
    this.factoryAddress = params.factoryAddress;
    this.publicClient = params.publicClient;
    this.validatorAddress = Networks[params.optionsLike.chainId]?.contracts?.multipleOwnerECDSAValidator ?? DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS;
  }
  get error$() {
    return this.context.error$;
  }
  get supportedNetworks() {
    return this.services.networkService.supportedNetworks;
  }
  // sdk
  /**
   * destroys
   */
  destroy() {
    this.context.destroy();
  }
  // wallet
  /**
   * signs message
   * @param dto
   * @return Promise<string>
   */
  async signMessage(dto) {
    const { message } = await validateDto(dto, SignMessageDto);
    await this.require({
      network: false
    });
    const initCode = await this.getInitCode();
    return this.services.walletService.signMessage(message, `0x${this.validatorAddress.slice(2)}`, `0x${this.factoryAddress.slice(2)}`, `0x${initCode.substring(42)}`);
  }
  async setPaymasterApi(paymaster) {
    this.paymasterAPI = paymaster;
  }
  // private
  async require(options = {}) {
    options = {
      network: true,
      wallet: true,
      ...options
    };
  }
  getNetworkChainId(networkName = null) {
    let result;
    if (!networkName) {
      ({ chainId: result } = this.services.networkService);
    } else {
      const network = this.supportedNetworks.find(({ name }) => name === networkName);
      if (!network) {
        throw new Exception("Unsupported network");
      }
      ({ chainId: result } = network);
    }
    return result;
  }
  async validateResolveName(options = {}) {
    options = {
      ...options
    };
    const { networkService } = this.services;
    if (options.network && !networkService.chainId) {
      throw new Exception("Unknown network");
    }
    if (!options.name) {
      throw new Exception("Require name");
    }
  }
  async init() {
    if (await this.publicClient.getCode({ address: this.entryPointAddress }) === "0x") {
      throw new Error(`entryPoint not deployed at ${this.entryPointAddress}`);
    }
    await this.getAccountAddress();
    return this;
  }
  /**
   * check if the contract is already deployed.
   */
  async checkAccountPhantom() {
    if (!this.isPhantom) {
      return this.isPhantom;
    }
    const accountAddress = await this.getAccountAddress();
    const senderAddressCode = await this.publicClient.getCode({ address: accountAddress });
    if (senderAddressCode && senderAddressCode.length > 2) {
      this.isPhantom = false;
    }
    return this.isPhantom;
  }
  /**
   * calculate the account address even before it is deployed
   */
  async getCounterFactualAddress() {
    const initCode = await this.getAccountInitCode();
    try {
      await this.publicClient.simulateContract({
        address: this.entryPointAddress,
        abi: parseAbi(entryPointAbi),
        functionName: "getSenderAddress",
        args: [initCode]
      });
    } catch (e) {
      return e.errorArgs.sender;
    }
    throw new Error("must handle revert");
  }
  /**
   * return initCode value to into the UserOp.
   * (either deployment code, or empty hex if contract already deployed)
   */
  async getInitCode() {
    if (await this.checkAccountPhantom()) {
      return await this.getAccountInitCode();
    }
    return "0x";
  }
  /**
   * return maximum gas used for verification.
   * NOTE: createUnsignedUserOp will add to this value the cost of creation, if the contract is not yet created.
   */
  async getVerificationGasLimit() {
    return 1e5;
  }
  /**
   * should cover cost of putting calldata on-chain, and some overhead.
   * actual overhead depends on the expected bundle size
   */
  async getPreVerificationGas(userOp) {
    const p = await resolveProperties(userOp);
    return calcPreVerificationGas(p, this.overheads);
  }
  /**
   * ABI-encode a user operation. used for calldata cost estimation
   */
  packUserOp(userOp) {
    return packUserOp(userOp, false);
  }
  async encodeUserOpCallDataAndGasLimit(detailsForUserOp) {
    function parseNumber(a) {
      if (a == null || a === "") return null;
      return BigNumber.from(a.toString());
    }
    const value = parseNumber(detailsForUserOp.value) ?? BigNumber.from(0);
    let callData;
    const data = detailsForUserOp.data;
    let target = detailsForUserOp.target;
    if (typeof data === "string") {
      if (typeof target !== "string") {
        throw new Error("must have target address if data is single value");
      }
      callData = await this.encodeExecute(target, value, data);
    } else {
      if (typeof target === "string") {
        target = Array(data.length).fill(target);
      }
      callData = await this.encodeBatch(target, detailsForUserOp.values, data);
    }
    const callGasLimit = parseNumber(detailsForUserOp.gasLimit) ?? BigNumber.from(35e3);
    return {
      callData,
      callGasLimit
    };
  }
  /**
   * return userOpHash for signing.
   * This value matches entryPoint.getUserOpHash (calculated off-chain, to avoid a view call)
   * @param userOp userOperation, (signature field ignored)
   */
  async getUserOpHash(userOp) {
    const op = await resolveProperties(userOp);
    const chainId = await this.publicClient.getChainId();
    return getUserOpHash(op, this.entryPointAddress, chainId);
  }
  /**
   * return the account's address.
   * this value is valid even before deploying the contract.
   */
  async getAccountAddress() {
    if (this.senderAddress == null) {
      if (this.accountAddress != null) {
        this.senderAddress = this.accountAddress;
      } else {
        this.senderAddress = await this.getCounterFactualAddress();
      }
    }
    return this.senderAddress;
  }
  async estimateCreationGas(initCode) {
    if (initCode == null || initCode === "0x") return 0;
    const deployerAddress = initCode.substring(0, 42);
    const deployerCallData = "0x" + initCode.substring(42);
    const estimatedGas = await this.publicClient.estimateGas({
      to: deployerAddress,
      data: deployerCallData
    });
    return estimatedGas ? estimatedGas : 0;
  }
  async getFeeData() {
    const maxFeePerGasResponse = await this.publicClient.estimateFeesPerGas();
    const maxPriorityFeePerGasResponse = await this.publicClient.estimateMaxPriorityFeePerGas();
    const maxFeePerGas = maxFeePerGasResponse ? BigNumber.from(maxFeePerGasResponse.maxFeePerGas) : null;
    const maxPriorityFeePerGas = maxPriorityFeePerGasResponse ? BigNumber.from(maxPriorityFeePerGasResponse.toString()) : null;
    return { maxFeePerGas, maxPriorityFeePerGas };
  }
  /**
   * create a UserOperation, filling all details (except signature)
   * - if account is not yet created, add initCode to deploy it.
   * - if gas or nonce are missing, read them from the chain (note that we can't fill gaslimit before the account is created)
   * @param info
   */
  async createUnsignedUserOp(info, key = BigNumber.from(0)) {
    const { callData, callGasLimit } = await this.encodeUserOpCallDataAndGasLimit(info);
    const factoryData = await this.getInitCode();
    const initGas = await this.estimateCreationGas(factoryData);
    const verificationGasLimit = BigNumber.from(await this.getVerificationGasLimit()).add(initGas);
    let { maxFeePerGas, maxPriorityFeePerGas } = info;
    if (maxFeePerGas == null || maxPriorityFeePerGas == null) {
      let feeData = {};
      try {
        feeData = await this.getFeeData();
      } catch (err) {
        console.warn(
          "getGas: eth_maxPriorityFeePerGas failed, falling back to legacy gas price."
        );
        const gas = await this.publicClient.getGasPrice();
        feeData = { maxFeePerGas: gas, maxPriorityFeePerGas: gas };
      }
      if (maxFeePerGas == null) {
        maxFeePerGas = feeData.maxFeePerGas ?? void 0;
      }
      if (maxPriorityFeePerGas == null) {
        maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? void 0;
      }
    }
    let partialUserOp;
    if (factoryData !== "0x") {
      partialUserOp = {
        sender: await this.getAccountAddress(),
        nonce: await this.getNonce(key),
        factory: this.factoryAddress,
        factoryData: "0x" + factoryData.substring(42),
        callData,
        callGasLimit,
        verificationGasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas
      };
    } else {
      partialUserOp = {
        sender: await this.getAccountAddress(),
        nonce: await this.getNonce(key),
        factoryData: "0x" + factoryData.substring(42),
        callData,
        callGasLimit,
        verificationGasLimit,
        maxFeePerGas,
        maxPriorityFeePerGas
      };
    }
    let paymasterData = null;
    if (this.paymasterAPI != null) {
      const userOpForPm = {
        ...partialUserOp,
        preVerificationGas: this.getPreVerificationGas(partialUserOp)
      };
      paymasterData = await this.paymasterAPI.getPaymasterData(userOpForPm);
      partialUserOp.verificationGasLimit = paymasterData.result.verificationGasLimit;
      partialUserOp.preVerificationGas = paymasterData.result.preVerificationGas;
      partialUserOp.callGasLimit = paymasterData.result.callGasLimit;
      partialUserOp.paymaster = paymasterData.result.paymaster;
      partialUserOp.paymasterVerificationGasLimit = paymasterData.result.paymasterVerificationGasLimit;
      partialUserOp.paymasterPostOpGasLimit = paymasterData.result.paymasterPostOpGasLimit;
    }
    partialUserOp.paymasterData = paymasterData ? paymasterData.result.paymasterData : "0x";
    return {
      ...partialUserOp,
      preVerificationGas: this.getPreVerificationGas(partialUserOp),
      signature: info.dummySignature ?? "0x"
    };
  }
  /**
   * Sign the filled userOp.
   * @param userOp the UserOperation to sign (with signature field ignored)
   */
  async signUserOp(userOp) {
    if (this.paymasterAPI != null) {
      const paymasterData = await this.paymasterAPI.getPaymasterData(userOp);
      userOp.verificationGasLimit = paymasterData.result.verificationGasLimit;
      userOp.preVerificationGas = paymasterData.result.preVerificationGas;
      userOp.callGasLimit = paymasterData.result.callGasLimit;
      userOp.paymaster = paymasterData.result.paymaster;
      userOp.paymasterVerificationGasLimit = paymasterData.result.paymasterVerificationGasLimit;
      userOp.paymasterPostOpGasLimit = paymasterData.result.paymasterPostOpGasLimit;
    }
    const userOpHash = await this.getUserOpHash(userOp);
    const signature = await this.signUserOpHash(userOpHash);
    return {
      ...userOp,
      signature
    };
  }
  /**
   * helper method: create and sign a user operation.
   * @param info transaction details for the userOp
   */
  async createSignedUserOp(info, key = BigNumber.from(0)) {
    return await this.signUserOp(await this.createUnsignedUserOp(info, key));
  }
  /**
   * get the transaction that has this userOpHash mined, or null if not found
   * @param userOpHash returned by sendUserOpToBundler (or by getUserOpHash..)
   * @param timeout stop waiting after this timeout
   * @param interval time to wait between polls.
   * @return the transactionHash this userOp was mined, or null if not found.
   */
  async getUserOpReceipt(userOpHash, timeout = 3e4, interval = 5e3) {
    const endtime = Date.now() + timeout;
    while (Date.now() < endtime) {
      const response = await this.publicClient.request({
        method: "eth_getUserOperationReceipt",
        params: [
          userOpHash
        ]
      });
      if (response && response.receipt !== void 0) {
        return response.receipt.transactionHash;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    return null;
  }
  async signTypedData(msg) {
    const initCode = await this.getInitCode();
    return await this.services.walletService.signTypedData(
      msg,
      `0x${this.validatorAddress.slice(2)}`,
      `0x${this.factoryAddress.slice(2)}`,
      `0x${initCode.substring(42)}`
    );
  }
};

export {
  BaseAccountAPI,
  EtherspotWalletAPI,
  ModularSdk,
  sdk_default
};
//# sourceMappingURL=chunk-ZPSQARNM.js.map