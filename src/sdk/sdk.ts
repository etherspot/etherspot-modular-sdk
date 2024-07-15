import { BehaviorSubject } from 'rxjs';
import { State, StateService } from './state';
import {
  EthereumProvider,
  isWalletConnectProvider,
  isWalletProvider,
  WalletConnect2WalletProvider,
  WalletProviderLike
} from './wallet';
import { Factory, PaymasterApi, SdkOptions } from './interfaces';
import { Network } from "./network";
import { BatchUserOpsRequest, Exception, getGasFee, MODULE_TYPE, onRampApiKey, openUrl, UserOperation, UserOpsRequest } from "./common";
import { TypedDataField, ethers, providers } from 'ethers';
import { DEFAULT_QUERY_PAGE_SIZE, Networks, onRamperAllNetworks } from './network/constants';
import { EtherspotWalletAPI, HttpRpcClient, VerifyingPaymasterAPI } from './base';
import { TransactionDetailsForUserOp, TransactionGasInfoForUserOp } from './base/TransactionDetailsForUserOp';
import { OnRamperDto, SignMessageDto, validateDto } from './dto';
import { ErrorHandler } from './errorHandler/errorHandler.service';
import { EtherspotBundler } from './bundler';
import { ModuleInfo } from './base/EtherspotWalletAPI';
import { Account, Hex, http, type PublicClient, type WalletClient } from 'viem';
import { getPublicClient, getWalletClientFromAccount } from './common/utils/viem-utils';
import { BigNumber, BigNumberish } from './types/bignumber';

/**
 * Modular-Sdk
 *
 * @category Modular-Sdk
 */
export class ModularSdk {

  private etherspotWallet: EtherspotWalletAPI;
  private bundler: HttpRpcClient;
  private chainId: number;
  private factoryUsed: Factory;
  private index: number;
  private walletClient: WalletClient;
  private publicClient: PublicClient;
  private account: Account;

  private userOpsBatch: BatchUserOpsRequest = { to: [], data: [], value: [] };

  constructor(walletProvider: WalletProviderLike, optionsLike: SdkOptions) {

    let walletConnectProvider;
    if (isWalletConnectProvider(walletProvider)) {
      walletConnectProvider = new WalletConnect2WalletProvider(walletProvider as EthereumProvider);
    } else if (!isWalletProvider(walletProvider)) {
      throw new Exception('Invalid wallet provider');
    }

    const {
      index,
      chainId,
      rpcProviderUrl,
      accountAddress,
      account
    } = optionsLike;

    if(!account) throw new Exception('Account object is required');

    this.account = account;
    this.chainId = chainId;
    this.index = index ?? 0;

    if (!optionsLike.bundlerProvider) {
      optionsLike.bundlerProvider = new EtherspotBundler(chainId);
    }

    this.factoryUsed = optionsLike.factoryWallet ?? Factory.ETHERSPOT;

    let provider;
    let viemClientUrl = '';

    if (rpcProviderUrl) {
      provider = new providers.JsonRpcProvider(rpcProviderUrl);
      viemClientUrl = rpcProviderUrl;
    } else {
      provider = new providers.JsonRpcProvider(optionsLike.bundlerProvider.url);
      viemClientUrl = optionsLike.bundlerProvider.url;
    }

    // TODO wallet provider need not always be a string, this needs to be changed
    this.walletClient = getWalletClientFromAccount({
      rpcUrl: viemClientUrl,
      chainId: chainId,
      account: this.account
    });

    this.publicClient = getPublicClient({
      chainId: chainId,
      transport: http(
        viemClientUrl
      )
    }) as PublicClient;

    let entryPointAddress = '', walletFactoryAddress = '';
    if (Networks[chainId]) {
      entryPointAddress = Networks[chainId].contracts.entryPoint;
      if (Networks[chainId].contracts.walletFactory == '') throw new Exception('The selected factory is not deployed in the selected chain_id')
      walletFactoryAddress = Networks[chainId].contracts.walletFactory;
    }

    if (optionsLike.entryPointAddress) entryPointAddress = optionsLike.entryPointAddress;
    if (optionsLike.walletFactoryAddress) walletFactoryAddress = optionsLike.walletFactoryAddress;

    if (entryPointAddress == '') throw new Exception('entryPointAddress not set on the given chain_id')
    if (walletFactoryAddress == '') throw new Exception('walletFactoryAddress not set on the given chain_id')
    this.account = optionsLike.account;
    this.etherspotWallet = new EtherspotWalletAPI({
      provider,
      walletProvider: walletConnectProvider ?? walletProvider,
      optionsLike,
      entryPointAddress,
      factoryAddress: walletFactoryAddress,
      predefinedAccountAddress: accountAddress,
      index: this.index,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    })
    this.bundler = new HttpRpcClient(optionsLike.bundlerProvider.url, entryPointAddress, chainId, this.walletClient, this.publicClient);
  }


  // exposes
  get state(): StateService {
    return this.etherspotWallet.services.stateService;
  }

  get state$(): BehaviorSubject<State> {
    return this.etherspotWallet.services.stateService.state$;
  }

  get supportedNetworks(): Network[] {
    return this.etherspotWallet.services.networkService.supportedNetworks;
  }

  /**
   * destroys
   */
  destroy(): void {
    this.etherspotWallet.context.destroy();
  }

  // wallet

  /**
   * signs message
   * @param dto
   * @return Promise<string>
   */
  async signMessage(dto: SignMessageDto): Promise<string> {
    const { message } = await validateDto(dto, SignMessageDto);

    await this.etherspotWallet.require({
      network: false,
    });

    return this.walletClient.signMessage({
      message: message as Hex,
      account: this.account
    });
  }

  async getCounterFactualAddress(): Promise<string> {
    return this.etherspotWallet.getCounterFactualAddress();
  }

  async estimate(params: {
    paymasterDetails?: PaymasterApi,
    gasDetails?: TransactionGasInfoForUserOp,
    callGasLimit?: BigNumberish,
    key?: BigNumber
  } = {}) {
    const { paymasterDetails, gasDetails, callGasLimit, key } = params;
    const dummySignature = "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";

    if (this.userOpsBatch.to.length < 1) {
      throw new ErrorHandler('cannot sign empty transaction batch', 1);
    }

    if (paymasterDetails?.url) {
      const paymasterAPI = new VerifyingPaymasterAPI(paymasterDetails.url, this.etherspotWallet.entryPointAddress, paymasterDetails.context ?? {})
      this.etherspotWallet.setPaymasterApi(paymasterAPI)
    } else this.etherspotWallet.setPaymasterApi(null);

    const tx: TransactionDetailsForUserOp = {
      target: this.userOpsBatch.to,
      values: this.userOpsBatch.value,
      data: this.userOpsBatch.data,
      dummySignature: dummySignature,
      ...gasDetails,
    }

    const gasInfo = await this.getGasFee();

    const partialtx = await this.etherspotWallet.createUnsignedUserOp({
      ...tx,
      maxFeePerGas: gasInfo.maxFeePerGas,
      maxPriorityFeePerGas: gasInfo.maxPriorityFeePerGas,
    }, key);

    if (callGasLimit) {
      partialtx.callGasLimit = BigNumber.from(callGasLimit).toHexString();
    }

    if (await this.etherspotWallet.checkAccountPhantom()) {
      partialtx.factory = this.etherspotWallet.factoryAddress;
    }

    const bundlerGasEstimate = await this.bundler.getVerificationGasInfo(partialtx);

    // if user has specified the gas prices then use them
    if (gasDetails?.maxFeePerGas && gasDetails?.maxPriorityFeePerGas) {
      partialtx.maxFeePerGas = gasDetails.maxFeePerGas;
      partialtx.maxPriorityFeePerGas = gasDetails.maxPriorityFeePerGas;
    }
    // if estimation has gas prices use them, otherwise fetch them in a separate call
    else if (bundlerGasEstimate.maxFeePerGas && bundlerGasEstimate.maxPriorityFeePerGas) {
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
    if (version && version.includes('skandha'))
      return this.bundler.getSkandhaGasPrice();
    return getGasFee(this.publicClient);
  }

  async send(userOp: any) {
    const signedUserOp = await this.etherspotWallet.signUserOp(userOp);
    return this.bundler.sendUserOpToBundler(signedUserOp);
  }

  async signTypedData(
    DataFields: TypedDataField[],
    message: any
  ) {
    return this.etherspotWallet.signTypedData(DataFields, message);
  }

  async getNativeBalance() {
    if (!this.etherspotWallet.accountAddress) {
      await this.getCounterFactualAddress();
    }
    const balance = await this.etherspotWallet.provider.getBalance(this.etherspotWallet.accountAddress);
    return ethers.utils.formatEther(balance);
  }

  async getUserOpReceipt(userOpHash: string) {
    //return this.bundler.getUserOpsReceipt(userOpHash);
    return await this.etherspotWallet.getUserOpReceipt(userOpHash);
  }

  async getUserOpHash(userOp: UserOperation) {
    return this.etherspotWallet.getUserOpHash(userOp);
  }

  async addUserOpsToBatch(
    tx: UserOpsRequest,
  ): Promise<BatchUserOpsRequest> {
    if (!tx.data && !tx.value) throw new ErrorHandler('Data and Value both cannot be empty', 1);
    this.userOpsBatch.to.push(tx.to);
    this.userOpsBatch.value.push(tx.value ?? BigNumber.from(0));
    this.userOpsBatch.data.push(tx.data ?? '0x');
    return this.userOpsBatch;
  }

  async clearUserOpsFromBatch(): Promise<void> {
    this.userOpsBatch.to = [];
    this.userOpsBatch.data = [];
    this.userOpsBatch.value = [];
  }
  
  async isModuleInstalled(moduleTypeId: MODULE_TYPE, module: string): Promise<boolean> {
    return this.etherspotWallet.isModuleInstalled(moduleTypeId, module);
  }

  async installModule(moduleTypeId: MODULE_TYPE, module: string, initData?: string): Promise<string> {
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

  async getPreviousModuleAddress(moduleTypeId: MODULE_TYPE, module: string): Promise<string> {
    return this.etherspotWallet.getPreviousAddress(module, moduleTypeId);
  }

  async generateModuleDeInitData(moduleTypeId: MODULE_TYPE, module: string, moduleDeInitData: string): Promise<string> {
    return await this.etherspotWallet.generateModuleDeInitData(moduleTypeId, module, moduleDeInitData);
  }

  async getPreviousAddress(moduleTypeId: MODULE_TYPE, targetAddress: string): Promise<string> {
    return await this.etherspotWallet.getPreviousAddress(targetAddress, moduleTypeId);
  }

  async uninstallModule(moduleTypeId: MODULE_TYPE, module: string, deinitData: string): Promise<string> {
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

  async getAllModules(pageSize: number = DEFAULT_QUERY_PAGE_SIZE): Promise<ModuleInfo> {
    const modules = await this.etherspotWallet.getAllModules(pageSize);
    return modules;
  }

  async totalGasEstimated(userOp: UserOperation): Promise<BigNumber> {
    const callGasLimit = BigNumber.from(await userOp.callGasLimit);
    const verificationGasLimit = BigNumber.from(await userOp.verificationGasLimit);
    const preVerificationGas = BigNumber.from(await userOp.preVerificationGas);
    return callGasLimit.add(verificationGasLimit).add(preVerificationGas);
  }

  async getNonce(key: BigNumber = BigNumber.from(0)): Promise<BigNumber> {
    const nonce = await this.etherspotWallet.getNonce(key);
    return nonce;
  }

  async getFiatOnRamp(params: OnRamperDto = {}) {
    if (!params.onlyCryptoNetworks) params.onlyCryptoNetworks = onRamperAllNetworks.join(',');
    else {
      const networks = params.onlyCryptoNetworks.split(',');
      for (const network in networks) {
        if (!onRamperAllNetworks.includes(network)) throw new ErrorHandler('Included Networks which are not supported. Please Check', 1);
      }
    }

    const url = `https://buy.onramper.com/?networkWallets=ETHEREUM:${await this.getCounterFactualAddress()}` +
      `&apiKey=${onRampApiKey}` +
      `&onlyCryptoNetworks=${params.onlyCryptoNetworks}` +
      `${params.defaultCrypto ? `&defaultCrypto=${params.defaultCrypto}` : ``}` +
      `${params.excludeCryptos ? `&excludeCryptos=${params.excludeCryptos}` : ``}` +
      `${params.onlyCryptos ? `&onlyCryptos=${params.onlyCryptos}` : ``}` +
      `${params.excludeCryptoNetworks ? `&excludeCryptoNetworks=${params.excludeCryptoNetworks}` : ``}` +
      `${params.defaultAmount ? `&defaultCrypto=${params.defaultAmount}` : ``}` +
      `${params.defaultFiat ? `&defaultFiat=${params.defaultFiat}` : ``}` +
      `${params.isAmountEditable ? `&isAmountEditable=${params.isAmountEditable}` : ``}` +
      `${params.onlyFiats ? `&onlyFiats=${params.onlyFiats}` : ``}` +
      `${params.excludeFiats ? `&excludeFiats=${params.excludeFiats}` : ``}` +
      `&themeName=${params.themeName ?? 'dark'}`;

    if (typeof window === 'undefined') {
      openUrl(url);
    } else {
      window.open(url);
    }

    return url;
  }
}
