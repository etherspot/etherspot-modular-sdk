"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModularSdk = void 0;
const interfaces_js_1 = require("./interfaces.js");
const index_js_1 = require("./common/index.js");
const index_js_2 = require("./wallet/index.js");
const index_js_3 = require("./network/index.js");
const index_js_4 = require("./base/index.js");
const index_js_5 = require("./dto/index.js");
const errorHandler_service_js_1 = require("./errorHandler/errorHandler.service.js");
const index_js_6 = require("./bundler/index.js");
const viem_1 = require("viem");
const bignumber_js_1 = require("./types/bignumber.js");
class ModularSdk {
    constructor(walletProvider, optionsLike) {
        this.userOpsBatch = { to: [], data: [], value: [] };
        let walletConnectProvider;
        if ((0, index_js_2.isWalletConnectProvider)(walletProvider)) {
            walletConnectProvider = new index_js_2.WalletConnect2WalletProvider(walletProvider);
        }
        else if (!(0, index_js_2.isWalletProvider)(walletProvider)) {
            throw new index_js_1.Exception('Invalid wallet provider');
        }
        const { index, chainId, rpcProviderUrl, accountAddress, } = optionsLike;
        this.chainId = chainId;
        this.index = index ?? 0;
        if (!optionsLike.bundlerProvider) {
            optionsLike.bundlerProvider = new index_js_6.EtherspotBundler(chainId);
        }
        this.factoryUsed = optionsLike.factoryWallet ?? interfaces_js_1.Factory.ETHERSPOT;
        let viemClientUrl = '';
        if (rpcProviderUrl) {
            viemClientUrl = rpcProviderUrl;
        }
        else {
            viemClientUrl = optionsLike.bundlerProvider.url;
        }
        this.providerUrl = viemClientUrl;
        this.publicClient = (0, index_js_1.getPublicClient)({
            chainId: chainId,
            transport: (0, viem_1.http)(viemClientUrl)
        });
        let entryPointAddress = '', walletFactoryAddress = '';
        if (index_js_3.Networks[chainId]) {
            entryPointAddress = index_js_3.Networks[chainId].contracts.entryPoint;
            if (index_js_3.Networks[chainId].contracts.walletFactory == '')
                throw new index_js_1.Exception('The selected factory is not deployed in the selected chain_id');
            walletFactoryAddress = index_js_3.Networks[chainId].contracts.walletFactory;
        }
        if (optionsLike.entryPointAddress)
            entryPointAddress = optionsLike.entryPointAddress;
        if (optionsLike.walletFactoryAddress)
            walletFactoryAddress = optionsLike.walletFactoryAddress;
        if (entryPointAddress == '')
            throw new index_js_1.Exception('entryPointAddress not set on the given chain_id');
        if (walletFactoryAddress == '')
            throw new index_js_1.Exception('walletFactoryAddress not set on the given chain_id');
        this.account = this.account;
        this.etherspotWallet = new index_js_4.EtherspotWalletAPI({
            optionsLike,
            entryPointAddress,
            factoryAddress: walletFactoryAddress,
            predefinedAccountAddress: accountAddress,
            index: this.index,
            wallet: walletConnectProvider ?? walletProvider,
            publicClient: this.publicClient,
        });
        this.bundler = new index_js_4.HttpRpcClient(optionsLike.bundlerProvider.url, entryPointAddress, chainId, this.publicClient);
    }
    get supportedNetworks() {
        return this.etherspotWallet.services.networkService.supportedNetworks;
    }
    destroy() {
        this.etherspotWallet.context.destroy();
    }
    getPublicClient() {
        return this.publicClient;
    }
    getProviderUrl() {
        return this.providerUrl;
    }
    async signMessage(dto) {
        await (0, index_js_5.validateDto)(dto, index_js_5.SignMessageDto);
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
            throw new errorHandler_service_js_1.ErrorHandler('cannot sign empty transaction batch', 1);
        }
        if (paymasterDetails?.url) {
            const paymasterAPI = new index_js_4.VerifyingPaymasterAPI(paymasterDetails.url, this.etherspotWallet.entryPointAddress, paymasterDetails.context ?? {});
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
            partialtx.callGasLimit = bignumber_js_1.BigNumber.from(callGasLimit).toHexString();
        }
        if (await this.etherspotWallet.checkAccountPhantom()) {
            partialtx.factory = this.etherspotWallet.factoryAddress;
        }
        const bundlerGasEstimate = await this.bundler.getVerificationGasInfo(partialtx);
        if (gasDetails?.maxFeePerGas && gasDetails?.maxPriorityFeePerGas) {
            partialtx.maxFeePerGas = gasDetails.maxFeePerGas;
            partialtx.maxPriorityFeePerGas = gasDetails.maxPriorityFeePerGas;
        }
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
            partialtx.preVerificationGas = bignumber_js_1.BigNumber.from(bundlerGasEstimate.preVerificationGas);
            partialtx.verificationGasLimit = bignumber_js_1.BigNumber.from(bundlerGasEstimate.verificationGasLimit ?? bundlerGasEstimate.verificationGas);
            const expectedCallGasLimit = bignumber_js_1.BigNumber.from(bundlerGasEstimate.callGasLimit);
            if (!callGasLimit)
                partialtx.callGasLimit = expectedCallGasLimit;
            else if (bignumber_js_1.BigNumber.from(callGasLimit).lt(expectedCallGasLimit))
                throw new errorHandler_service_js_1.ErrorHandler(`CallGasLimit is too low. Expected atleast ${expectedCallGasLimit.toString()}`);
        }
        return partialtx;
    }
    async getGasFee() {
        const version = await this.bundler.getBundlerVersion();
        if (version && version.includes('skandha'))
            return this.bundler.getSkandhaGasPrice();
        return (0, index_js_1.getGasFee)(this.publicClient);
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
        const balance = await this.publicClient.getBalance({ address: (0, index_js_1.getViemAddress)(this.etherspotWallet.accountAddress) });
        return (0, viem_1.formatEther)(balance);
    }
    async getUserOpReceipt(userOpHash) {
        return await this.etherspotWallet.getUserOpReceipt(userOpHash);
    }
    async getUserOpHash(userOp) {
        return this.etherspotWallet.getUserOpHash(userOp);
    }
    async addUserOpsToBatch(tx) {
        if (!tx.data && !tx.value)
            throw new errorHandler_service_js_1.ErrorHandler('Data and Value both cannot be empty', 1);
        this.userOpsBatch.to.push(tx.to);
        this.userOpsBatch.value.push(tx.value ?? bignumber_js_1.BigNumber.from(0));
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
    async getAllModules(pageSize = index_js_3.DEFAULT_QUERY_PAGE_SIZE) {
        const modules = await this.etherspotWallet.getAllModules(pageSize);
        return modules;
    }
    async totalGasEstimated(userOp) {
        const callGasLimit = bignumber_js_1.BigNumber.from(await userOp.callGasLimit);
        const verificationGasLimit = bignumber_js_1.BigNumber.from(await userOp.verificationGasLimit);
        const preVerificationGas = bignumber_js_1.BigNumber.from(await userOp.preVerificationGas);
        return callGasLimit.add(verificationGasLimit).add(preVerificationGas);
    }
    async getNonce(key = bignumber_js_1.BigNumber.from(0)) {
        const nonce = await this.etherspotWallet.getNonce(key);
        return nonce;
    }
}
exports.ModularSdk = ModularSdk;
//# sourceMappingURL=sdk.js.map