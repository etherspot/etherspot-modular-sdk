import { encodeFunctionData, parseAbi } from "viem";
import { modulesAbi } from "../common/abis.js";

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

export function makeBootstrapConfigForModules(modules: string[], moduleInitDataItems: string[]): BootstrapConfig[] {
    const config: BootstrapConfig[] = [];

    for (const [index, moduleEntry] of modules.entries()) {

        if (!moduleEntry) {
            throw new Error(`Module name is not provided for index ${index}.`);
        }

        const data = moduleInitDataItems[index];

        if (!data) {
            throw new Error(`Module init data for module ${moduleEntry} is not provided.`);
        }

        const encodedFunctionData = encodeFunctionData({
            functionName: 'onInstall',
            abi: parseAbi(modulesAbi),
            args: [data],
        });

        const newConfig: BootstrapConfig = {
            module: moduleEntry,
            data: encodedFunctionData,
        };

        config.push(newConfig);
    }

    return config;
}