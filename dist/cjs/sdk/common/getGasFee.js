"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGasFee = getGasFee;
const bignumber_js_1 = require("../types/bignumber.js");
const constants_js_1 = require("./constants.js");
async function getGasFee(publicClient) {
    try {
        const gasFeeResponse = await publicClient.request({
            method: 'eth_maxPriorityFeePerGas',
            params: [],
        });
        if (!gasFeeResponse) {
            throw new Error('failed to get priorityFeePerGas');
        }
        const [fee, block] = gasFeeResponse;
        if (bignumber_js_1.BigNumber.from(0).eq(fee)) {
            throw new Error('failed to get priorityFeePerGas');
        }
        const tip = bignumber_js_1.BigNumber.from(fee);
        const buffer = tip.div(100).mul(constants_js_1.bufferPercent);
        const maxPriorityFeePerGas = tip.add(buffer);
        const maxFeePerGas = block.baseFeePerGas != null ? block.baseFeePerGas.mul(2).add(maxPriorityFeePerGas) : maxPriorityFeePerGas;
        return { maxFeePerGas, maxPriorityFeePerGas };
    }
    catch (err) {
        console.warn("getGas: eth_maxPriorityFeePerGas failed, falling back to legacy gas price.");
        const gas = await publicClient.getGasPrice();
        return { maxFeePerGas: gas, maxPriorityFeePerGas: gas };
    }
}
//# sourceMappingURL=getGasFee.js.map