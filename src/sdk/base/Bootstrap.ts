import { encodeFunctionData, parseAbi } from "viem";
import { modulesAbi } from "../common/abis";

export interface BootstrapConfig {
    module: string;
    data: string;
}

export function _makeBootstrapConfig(module: string, data: string): BootstrapConfig {
    const config: BootstrapConfig = {
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

export function makeBootstrapConfig(module: string, data: string): BootstrapConfig[] {
    const config: BootstrapConfig[] = [];
    const encodedFunctionData = encodeFunctionData({
        functionName: 'onInstall',
        abi: parseAbi(modulesAbi),
        args: [data],
      });
    const newConfig: BootstrapConfig = {
        module: module,
        data: encodedFunctionData
    };
    config.push(newConfig);
    return config;
}
