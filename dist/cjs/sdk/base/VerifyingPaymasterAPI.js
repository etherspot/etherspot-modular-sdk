"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerifyingPaymaster = exports.VerifyingPaymasterAPI = void 0;
const tslib_1 = require("tslib");
const cross_fetch_1 = tslib_1.__importDefault(require("cross-fetch"));
const calcPreVerificationGas_js_1 = require("./calcPreVerificationGas.js");
const PaymasterAPI_js_1 = require("./PaymasterAPI.js");
const OperationUtils_js_1 = require("../common/OperationUtils.js");
const index_js_1 = require("../common/utils/index.js");
const bignumber_js_1 = require("../types/bignumber.js");
const DUMMY_SIGNATURE = '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c';
class VerifyingPaymasterAPI extends PaymasterAPI_js_1.PaymasterAPI {
    constructor(paymasterUrl, entryPoint, context) {
        super();
        this.paymasterUrl = paymasterUrl;
        this.entryPoint = entryPoint;
        this.context = context;
    }
    async getPaymasterData(userOp) {
        try {
            await (0, index_js_1.resolveProperties)(userOp);
        }
        catch (_) { }
        let pmOp;
        if (userOp.factoryData !== "0x") {
            pmOp = {
                sender: userOp.sender,
                nonce: userOp.nonce,
                factory: userOp.factory,
                factoryData: userOp.factoryData,
                callData: userOp.callData,
                callGasLimit: userOp.callGasLimit,
                verificationGasLimit: userOp.verificationGasLimit,
                maxFeePerGas: userOp.maxFeePerGas,
                maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
                signature: DUMMY_SIGNATURE,
            };
        }
        else {
            pmOp = {
                sender: userOp.sender,
                nonce: userOp.nonce,
                factoryData: userOp.factoryData,
                callData: userOp.callData,
                callGasLimit: userOp.callGasLimit,
                verificationGasLimit: userOp.verificationGasLimit,
                maxFeePerGas: userOp.maxFeePerGas,
                maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
                signature: DUMMY_SIGNATURE,
            };
        }
        const op = await (0, index_js_1.resolveProperties)(pmOp);
        op.preVerificationGas = (0, calcPreVerificationGas_js_1.calcPreVerificationGas)(op);
        const paymasterData = await (0, cross_fetch_1.default)(this.paymasterUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ method: 'pm_sponsorUserOperation', params: [await (0, OperationUtils_js_1.toJSON)(op), this.entryPoint, this.context], jsonrpc: '2', id: 2 }),
        })
            .then(async (res) => {
            const response = await await res.json();
            if (response.error) {
                throw new Error(response.error);
            }
            if (response.result && response.result.paymasterVerificationGasLimit)
                response.result.paymasterVerificationGasLimit = bignumber_js_1.BigNumber.from(response.result.paymasterVerificationGasLimit).toHexString();
            return response;
        })
            .catch((err) => {
            throw new Error(err.message);
        });
        return paymasterData;
    }
}
exports.VerifyingPaymasterAPI = VerifyingPaymasterAPI;
const getVerifyingPaymaster = (paymasterUrl, entryPoint, context) => new VerifyingPaymasterAPI(paymasterUrl, entryPoint, context);
exports.getVerifyingPaymaster = getVerifyingPaymaster;
//# sourceMappingURL=VerifyingPaymasterAPI.js.map