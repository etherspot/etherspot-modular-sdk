"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRpcClient = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const ERC4337Utils_js_1 = require("../common/ERC4337Utils.js");
const errorHandler_service_js_1 = require("../errorHandler/errorHandler.service.js");
const index_js_1 = require("../common/utils/index.js");
const viem_1 = require("viem");
const debug = (0, debug_1.default)('aa.rpc');
class HttpRpcClient {
    constructor(bundlerUrl, entryPointAddress, chainId, publicClient) {
        this.bundlerUrl = bundlerUrl;
        this.entryPointAddress = entryPointAddress;
        this.chainId = chainId;
        try {
            this.publicClient = publicClient;
            this.initializing = this.validateChainId();
        }
        catch (err) {
            if (err.message.includes('failed response'))
                throw new errorHandler_service_js_1.ErrorHandler(err.message, 2);
            if (err.message.includes('timeout'))
                throw new errorHandler_service_js_1.ErrorHandler(err.message, 3);
            throw new Error(err.message);
        }
    }
    async validateChainId() {
        try {
            const chain = await this.publicClient.request({
                method: 'eth_chainId',
                params: []
            });
            const bundlerChain = parseInt(chain, 16);
            if (bundlerChain !== this.chainId) {
                throw new Error(`bundler ${this.bundlerUrl} is on chainId ${bundlerChain}, but provider is on chainId ${this.chainId}`);
            }
        }
        catch (err) {
            if (err.message.includes('failed response'))
                throw new errorHandler_service_js_1.ErrorHandler(err.message, 400);
            if (err.message.includes('timeout'))
                throw new errorHandler_service_js_1.ErrorHandler(err.message, 404);
            throw new Error(err.message);
        }
    }
    async getVerificationGasInfo(tx) {
        const hexifiedUserOp = (0, ERC4337Utils_js_1.deepHexlify)(await (0, index_js_1.resolveProperties)(tx));
        try {
            const response = await this.publicClient.request({
                method: 'eth_estimateUserOperationGas',
                params: [hexifiedUserOp, this.entryPointAddress]
            });
            return response;
        }
        catch (err) {
            this.handleRPCError(err);
        }
    }
    handleRPCError(err) {
        const body = this.parseViemRPCRequestError(err);
        if (body && body?.details && body?.code) {
            throw new errorHandler_service_js_1.ErrorHandler(body.details, body.code);
        }
        else {
            throw new Error(JSON.stringify(err));
        }
    }
    parseViemRPCRequestError(error) {
        if (error instanceof viem_1.RpcRequestError) {
            return JSON.parse(JSON.stringify(error));
        }
    }
    async sendUserOpToBundler(userOp1) {
        try {
            await this.initializing;
            const hexifiedUserOp = (0, ERC4337Utils_js_1.deepHexlify)(await (0, index_js_1.resolveProperties)(userOp1));
            const jsonRequestData = [hexifiedUserOp, this.entryPointAddress];
            await this.printUserOperation('eth_sendUserOperation', jsonRequestData);
            return await this.publicClient.request({
                method: 'eth_sendUserOperation',
                params: [hexifiedUserOp, this.entryPointAddress]
            });
        }
        catch (err) {
            console.log(`error inside sendUserOpToBundler: ${JSON.stringify(err)}`);
            this.handleRPCError(err);
        }
    }
    async sendAggregatedOpsToBundler(userOps1) {
        try {
            const hexifiedUserOps = await Promise.all(userOps1.map(async (userOp1) => await (0, index_js_1.resolveProperties)(userOp1)));
            return await this.publicClient.request({
                method: 'eth_sendAggregatedUserOperation',
                params: [hexifiedUserOps, this.entryPointAddress]
            });
        }
        catch (err) {
            this.handleRPCError(err);
        }
    }
    async getSkandhaGasPrice() {
        try {
            const skandhaGasPriceResponse = await this.publicClient.request({
                method: 'skandha_getGasPrice',
                params: []
            });
            const { maxFeePerGas, maxPriorityFeePerGas } = skandhaGasPriceResponse;
            return { maxFeePerGas, maxPriorityFeePerGas };
        }
        catch (err) {
            console.warn("getGas: skandha_getGasPrice failed, falling back to legacy gas price.");
            const gas = await this.publicClient.getGasPrice();
            return { maxFeePerGas: gas, maxPriorityFeePerGas: gas };
        }
    }
    async getBundlerVersion() {
        try {
            const version = await this.publicClient.request({
                method: 'web3_clientVersion',
                params: []
            });
            return version;
        }
        catch (err) {
            return null;
        }
    }
    async getUserOpsReceipt(uoHash) {
        try {
            const userOpsReceipt = await this.publicClient.request({
                method: 'eth_getUserOperationReceipt',
                params: [uoHash]
            });
            return userOpsReceipt;
        }
        catch (err) {
            return null;
        }
    }
    async printUserOperation(method, [userOp1, entryPointAddress]) {
        const userOp = await (0, index_js_1.resolveProperties)(userOp1);
        debug('sending', method, {
            ...userOp,
        }, entryPointAddress);
    }
}
exports.HttpRpcClient = HttpRpcClient;
//# sourceMappingURL=HttpRpcClient.js.map