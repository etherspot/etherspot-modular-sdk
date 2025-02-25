import { Factory } from './interfaces.js';
import { Exception, getGasFee, getViemAddress, getPublicClient } from "./common/index.js";
import { isWalletConnectProvider, isWalletProvider, WalletConnect2WalletProvider } from './wallet/index.js';
import { DEFAULT_QUERY_PAGE_SIZE, Networks } from './network/index.js';
import { EtherspotWalletAPI, HttpRpcClient, VerifyingPaymasterAPI } from './base/index.js';
import { SignMessageDto, validateDto } from './dto/index.js';
import { ErrorHandler } from './errorHandler/errorHandler.service.js';
import { EtherspotBundler } from './bundler/index.js';
import { formatEther, http } from 'viem';
import { BigNumber } from './types/bignumber.js';
/**
 * Modular-Sdk
 *
 * @category Modular-Sdk
 */
export class ModularSdk {
    constructor(walletProvider, optionsLike) {
        this.userOpsBatch = { to: [], data: [], value: [] };
        let walletConnectProvider;
        if (isWalletConnectProvider(walletProvider)) {
            walletConnectProvider = new WalletConnect2WalletProvider(walletProvider);
        }
        else if (!isWalletProvider(walletProvider)) {
            throw new Exception('Invalid wallet provider');
        }
        const { index, chainId, rpcProviderUrl, accountAddress, } = optionsLike;
        this.chainId = chainId;
        this.index = index ?? 0;
        if (!optionsLike.bundlerProvider) {
            optionsLike.bundlerProvider = new EtherspotBundler(chainId);
        }
        this.factoryUsed = optionsLike.factoryWallet ?? Factory.ETHERSPOT;
        let viemClientUrl = '';
        if (rpcProviderUrl) {
            viemClientUrl = rpcProviderUrl;
        }
        else {
            viemClientUrl = optionsLike.bundlerProvider.url;
        }
        this.providerUrl = viemClientUrl;
        this.publicClient = getPublicClient({
            chainId: chainId,
            transport: http(viemClientUrl)
        });
        let entryPointAddress = '', walletFactoryAddress = '';
        if (Networks[chainId]) {
            entryPointAddress = Networks[chainId].contracts.entryPoint;
            if (Networks[chainId].contracts.walletFactory == '')
                throw new Exception('The selected factory is not deployed in the selected chain_id');
            walletFactoryAddress = Networks[chainId].contracts.walletFactory;
        }
        if (optionsLike.entryPointAddress)
            entryPointAddress = optionsLike.entryPointAddress;
        if (optionsLike.walletFactoryAddress)
            walletFactoryAddress = optionsLike.walletFactoryAddress;
        if (entryPointAddress == '')
            throw new Exception('entryPointAddress not set on the given chain_id');
        if (walletFactoryAddress == '')
            throw new Exception('walletFactoryAddress not set on the given chain_id');
        this.account = this.account;
        this.etherspotWallet = new EtherspotWalletAPI({
            optionsLike,
            entryPointAddress,
            factoryAddress: walletFactoryAddress,
            predefinedAccountAddress: accountAddress,
            index: this.index,
            wallet: walletConnectProvider ?? walletProvider,
            publicClient: this.publicClient,
        });
        this.bundler = new HttpRpcClient(optionsLike.bundlerProvider.url, entryPointAddress, chainId, this.publicClient);
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
            network: false,
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
            throw new ErrorHandler('cannot sign empty transaction batch', 1);
        }
        if (paymasterDetails?.url) {
            const paymasterAPI = new VerifyingPaymasterAPI(paymasterDetails.url, this.etherspotWallet.entryPointAddress, paymasterDetails.context ?? {});
            this.etherspotWallet.setPaymasterApi(paymasterAPI);
        }
        else
            this.etherspotWallet.setPaymasterApi(null);
        const tx = {
            target: this.userOpsBatch.to,
            values: this.userOpsBatch.value,
            data: this.userOpsBatch.data,
            dummySignature: dummySignature,
            ...gasDetails,
        };
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
        }
        else {
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
        //return this.bundler.getUserOpsReceipt(userOpHash);
        return await this.etherspotWallet.getUserOpReceipt(userOpHash);
    }
    async getUserOpHash(userOp) {
        return this.etherspotWallet.getUserOpHash(userOp);
    }
    async addUserOpsToBatch(tx) {
        if (!tx.data && !tx.value)
            throw new ErrorHandler('Data and Value both cannot be empty', 1);
        this.userOpsBatch.to.push(tx.to);
        this.userOpsBatch.value.push(tx.value ?? BigNumber.from(0));
        this.userOpsBatch.data.push(tx.data ?? '0x');
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
}
//# sourceMappingURL=sdk.js.map