"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAccountAPI = void 0;
const index_js_1 = require("../common/index.js");
const calcPreVerificationGas_js_1 = require("./calcPreVerificationGas.js");
const index_js_2 = require("../index.js");
const context_js_1 = require("../context.js");
const viem_1 = require("viem");
const abis_js_1 = require("../common/abis.js");
const index_js_3 = require("../common/utils/index.js");
const bignumber_js_1 = require("../types/bignumber.js");
const index_js_4 = require("../wallet/index.js");
const index_js_5 = require("../network/index.js");
class BaseAccountAPI {
    constructor(params) {
        this.isPhantom = true;
        const optionsLike = params.optionsLike;
        const { chainId, rpcProviderUrl, factoryWallet, bundlerProvider, } = optionsLike;
        this.services = {
            networkService: new index_js_2.NetworkService(chainId),
            walletService: new index_js_4.WalletService(params.wallet, { provider: rpcProviderUrl }, bundlerProvider.url, chainId),
        };
        this.context = new context_js_1.Context(this.services);
        this.factoryUsed = factoryWallet;
        this.overheads = params.overheads;
        this.entryPointAddress = params.entryPointAddress;
        this.accountAddress = params.accountAddress;
        this.factoryAddress = params.factoryAddress;
        this.publicClient = params.publicClient;
        this.validatorAddress = index_js_5.Networks[params.optionsLike.chainId]?.contracts?.multipleOwnerECDSAValidator ?? index_js_5.DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS;
    }
    get error$() {
        return this.context.error$;
    }
    get supportedNetworks() {
        return this.services.networkService.supportedNetworks;
    }
    destroy() {
        this.context.destroy();
    }
    async signMessage(dto) {
        const { message } = await (0, index_js_2.validateDto)(dto, index_js_2.SignMessageDto);
        await this.require({
            network: false,
        });
        const initCode = await this.getInitCode();
        return this.services.walletService.signMessage(message, `0x${this.validatorAddress.slice(2)}`, `0x${this.factoryAddress.slice(2)}`, `0x${initCode.substring(42)}`);
    }
    async setPaymasterApi(paymaster) {
        this.paymasterAPI = paymaster;
    }
    async require(options = {}) {
        options = {
            network: true,
            wallet: true,
            ...options,
        };
    }
    getNetworkChainId(networkName = null) {
        let result;
        if (!networkName) {
            ({ chainId: result } = this.services.networkService);
        }
        else {
            const network = this.supportedNetworks.find(({ name }) => name === networkName);
            if (!network) {
                throw new index_js_1.Exception('Unsupported network');
            }
            ({ chainId: result } = network);
        }
        return result;
    }
    async validateResolveName(options = {}) {
        options = {
            ...options,
        };
        const { networkService } = this.services;
        if (options.network && !networkService.chainId) {
            throw new index_js_1.Exception('Unknown network');
        }
        if (!options.name) {
            throw new index_js_1.Exception('Require name');
        }
    }
    async init() {
        if ((await this.publicClient.getCode({ address: this.entryPointAddress })) === '0x') {
            throw new Error(`entryPoint not deployed at ${this.entryPointAddress}`);
        }
        await this.getAccountAddress();
        return this;
    }
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
    async getCounterFactualAddress() {
        const initCode = await this.getAccountInitCode();
        try {
            await this.publicClient.simulateContract({
                address: this.entryPointAddress,
                abi: (0, viem_1.parseAbi)(abis_js_1.entryPointAbi),
                functionName: 'getSenderAddress',
                args: [initCode]
            });
        }
        catch (e) {
            return e.errorArgs.sender;
        }
        throw new Error('must handle revert');
    }
    async getInitCode() {
        if (await this.checkAccountPhantom()) {
            return await this.getAccountInitCode();
        }
        return '0x';
    }
    async getVerificationGasLimit() {
        return 100000;
    }
    async getPreVerificationGas(userOp) {
        const p = await (0, index_js_3.resolveProperties)(userOp);
        return (0, calcPreVerificationGas_js_1.calcPreVerificationGas)(p, this.overheads);
    }
    packUserOp(userOp) {
        return (0, index_js_1.packUserOp)(userOp, false);
    }
    async encodeUserOpCallDataAndGasLimit(detailsForUserOp) {
        function parseNumber(a) {
            if (a == null || a === '')
                return null;
            return bignumber_js_1.BigNumber.from(a.toString());
        }
        const value = parseNumber(detailsForUserOp.value) ?? bignumber_js_1.BigNumber.from(0);
        let callData;
        const data = detailsForUserOp.data;
        let target = detailsForUserOp.target;
        if (typeof data === 'string') {
            if (typeof target !== 'string') {
                throw new Error('must have target address if data is single value');
            }
            callData = await this.encodeExecute(target, value, data);
        }
        else {
            if (typeof target === 'string') {
                target = Array(data.length).fill(target);
            }
            callData = await this.encodeBatch(target, detailsForUserOp.values, data);
        }
        const callGasLimit = parseNumber(detailsForUserOp.gasLimit) ?? bignumber_js_1.BigNumber.from(35000);
        return {
            callData,
            callGasLimit,
        };
    }
    async getUserOpHash(userOp) {
        const op = await (0, index_js_3.resolveProperties)(userOp);
        const chainId = await this.publicClient.getChainId();
        return (0, index_js_1.getUserOpHash)(op, this.entryPointAddress, chainId);
    }
    async getAccountAddress() {
        if (this.senderAddress == null) {
            if (this.accountAddress != null) {
                this.senderAddress = this.accountAddress;
            }
            else {
                this.senderAddress = await this.getCounterFactualAddress();
            }
        }
        return this.senderAddress;
    }
    async estimateCreationGas(initCode) {
        if (initCode == null || initCode === '0x')
            return 0;
        const deployerAddress = initCode.substring(0, 42);
        const deployerCallData = '0x' + initCode.substring(42);
        const estimatedGas = await this.publicClient.estimateGas({
            to: deployerAddress,
            data: deployerCallData,
        });
        return estimatedGas ? estimatedGas : 0;
    }
    async getFeeData() {
        const maxFeePerGasResponse = await this.publicClient.estimateFeesPerGas();
        const maxPriorityFeePerGasResponse = await this.publicClient.estimateMaxPriorityFeePerGas();
        const maxFeePerGas = maxFeePerGasResponse ? bignumber_js_1.BigNumber.from(maxFeePerGasResponse.maxFeePerGas) : null;
        const maxPriorityFeePerGas = maxPriorityFeePerGasResponse ? bignumber_js_1.BigNumber.from(maxPriorityFeePerGasResponse.toString()) : null;
        return { maxFeePerGas, maxPriorityFeePerGas };
    }
    async createUnsignedUserOp(info, key = bignumber_js_1.BigNumber.from(0)) {
        const { callData, callGasLimit } = await this.encodeUserOpCallDataAndGasLimit(info);
        const factoryData = await this.getInitCode();
        const initGas = await this.estimateCreationGas(factoryData);
        const verificationGasLimit = bignumber_js_1.BigNumber.from(await this.getVerificationGasLimit()).add(initGas);
        let { maxFeePerGas, maxPriorityFeePerGas } = info;
        if (maxFeePerGas == null || maxPriorityFeePerGas == null) {
            let feeData = {};
            try {
                feeData = await this.getFeeData();
            }
            catch (err) {
                console.warn("getGas: eth_maxPriorityFeePerGas failed, falling back to legacy gas price.");
                const gas = await this.publicClient.getGasPrice();
                feeData = { maxFeePerGas: gas, maxPriorityFeePerGas: gas };
            }
            if (maxFeePerGas == null) {
                maxFeePerGas = feeData.maxFeePerGas ?? undefined;
            }
            if (maxPriorityFeePerGas == null) {
                maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? undefined;
            }
        }
        let partialUserOp;
        if (factoryData !== '0x') {
            partialUserOp = {
                sender: await this.getAccountAddress(),
                nonce: await this.getNonce(key),
                factory: this.factoryAddress,
                factoryData: '0x' + factoryData.substring(42),
                callData,
                callGasLimit,
                verificationGasLimit,
                maxFeePerGas,
                maxPriorityFeePerGas,
            };
        }
        else {
            partialUserOp = {
                sender: await this.getAccountAddress(),
                nonce: await this.getNonce(key),
                factoryData: '0x' + factoryData.substring(42),
                callData,
                callGasLimit,
                verificationGasLimit,
                maxFeePerGas,
                maxPriorityFeePerGas,
            };
        }
        let paymasterData = null;
        if (this.paymasterAPI != null) {
            const userOpForPm = {
                ...partialUserOp,
                preVerificationGas: this.getPreVerificationGas(partialUserOp),
            };
            paymasterData = (await this.paymasterAPI.getPaymasterData(userOpForPm));
            partialUserOp.verificationGasLimit = paymasterData.result.verificationGasLimit;
            partialUserOp.preVerificationGas = paymasterData.result.preVerificationGas;
            partialUserOp.callGasLimit = paymasterData.result.callGasLimit;
            partialUserOp.paymaster = paymasterData.result.paymaster;
            partialUserOp.paymasterVerificationGasLimit = paymasterData.result.paymasterVerificationGasLimit;
            partialUserOp.paymasterPostOpGasLimit = paymasterData.result.paymasterPostOpGasLimit;
        }
        partialUserOp.paymasterData = paymasterData ? paymasterData.result.paymasterData : '0x';
        return {
            ...partialUserOp,
            preVerificationGas: this.getPreVerificationGas(partialUserOp),
            signature: info.dummySignature ?? '0x',
        };
    }
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
            signature,
        };
    }
    async createSignedUserOp(info, key = bignumber_js_1.BigNumber.from(0)) {
        return await this.signUserOp(await this.createUnsignedUserOp(info, key));
    }
    async getUserOpReceipt(userOpHash, timeout = 30000, interval = 5000) {
        const endtime = Date.now() + timeout;
        while (Date.now() < endtime) {
            const response = await this.publicClient.request({
                method: 'eth_getUserOperationReceipt',
                params: [
                    userOpHash
                ]
            });
            if (response && response.receipt !== undefined) {
                return response.receipt.transactionHash;
            }
            await new Promise((resolve) => setTimeout(resolve, interval));
        }
        return null;
    }
    async signTypedData(msg) {
        const initCode = await this.getInitCode();
        return await this.services.walletService.signTypedData(msg, `0x${this.validatorAddress.slice(2)}`, `0x${this.factoryAddress.slice(2)}`, `0x${initCode.substring(42)}`);
    }
}
exports.BaseAccountAPI = BaseAccountAPI;
//# sourceMappingURL=BaseAccountAPI.js.map