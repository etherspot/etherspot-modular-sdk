"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitData = void 0;
const viem_1 = require("viem");
const abis_js_1 = require("./abis.js");
const getInitData = ({ initCode, }) => {
    const { args: initCodeArgs } = (0, viem_1.decodeFunctionData)({
        abi: (0, viem_1.parseAbi)(abis_js_1.factoryAbi),
        data: (0, viem_1.slice)(initCode, 20),
    });
    if (initCodeArgs?.length !== 2) {
        throw new Error('Invalid init code');
    }
    const initCallData = (0, viem_1.decodeAbiParameters)([
        { name: 'bootstrap', type: 'address' },
        { name: 'initCallData', type: 'bytes' },
    ], initCodeArgs[1]);
    const { args: initCallDataArgs } = (0, viem_1.decodeFunctionData)({
        abi: (0, viem_1.parseAbi)(abis_js_1.bootstrapAbi),
        data: initCallData[1],
    });
    if (initCallDataArgs?.length !== 4) {
        throw new Error('Invalid init code');
    }
    return {
        validators: initCallDataArgs[0],
        executors: initCallDataArgs[1],
        hooks: [initCallDataArgs[2]],
        fallbacks: initCallDataArgs[3],
    };
};
exports.getInitData = getInitData;
//# sourceMappingURL=getInitData.js.map