"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._makeBootstrapConfig = _makeBootstrapConfig;
exports.makeBootstrapConfig = makeBootstrapConfig;
const viem_1 = require("viem");
const abis_js_1 = require("../common/abis.js");
function _makeBootstrapConfig(module, data) {
    const config = {
        module: "",
        data: ""
    };
    config.module = module;
    const encodedFunctionData = (0, viem_1.encodeFunctionData)({
        functionName: 'onInstall',
        abi: (0, viem_1.parseAbi)(abis_js_1.modulesAbi),
        args: [data],
    });
    config.data = encodedFunctionData;
    return config;
}
function makeBootstrapConfig(module, data) {
    const config = [];
    const encodedFunctionData = (0, viem_1.encodeFunctionData)({
        functionName: 'onInstall',
        abi: (0, viem_1.parseAbi)(abis_js_1.modulesAbi),
        args: [data],
    });
    const newConfig = {
        module: module,
        data: encodedFunctionData
    };
    config.push(newConfig);
    return config;
}
//# sourceMappingURL=Bootstrap.js.map