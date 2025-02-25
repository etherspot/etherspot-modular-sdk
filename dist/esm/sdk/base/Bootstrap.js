import { encodeFunctionData, parseAbi } from "viem";
import { modulesAbi } from "../common/abis.js";
export function _makeBootstrapConfig(module, data) {
    const config = {
        module: "",
        data: ""
    };
    config.module = module;
    const encodedFunctionData = encodeFunctionData({
        functionName: 'onInstall',
        abi: parseAbi(modulesAbi),
        args: [data],
    });
    config.data = encodedFunctionData;
    return config;
}
export function makeBootstrapConfig(module, data) {
    const config = [];
    const encodedFunctionData = encodeFunctionData({
        functionName: 'onInstall',
        abi: parseAbi(modulesAbi),
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