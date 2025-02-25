"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModulesPaginated = exports.getInstalledModules = void 0;
const viem_1 = require("viem");
const constants_js_1 = require("./constants.js");
const viem_utils_js_1 = require("./utils/viem-utils.js");
const abis_js_1 = require("./abis.js");
const constants_js_2 = require("../network/constants.js");
const getInstalledModules = async ({ client, moduleAddress, moduleTypes = ['validator', 'executor', 'hook', 'fallback'], pageSize = constants_js_2.DEFAULT_QUERY_PAGE_SIZE }) => {
    const modules = [];
    if (await (0, viem_utils_js_1.isContract)({ client, address: moduleAddress })) {
        for (const moduleType of moduleTypes) {
            switch (moduleType) {
                case 'validator':
                    const validators = await (0, exports.getModulesPaginated)({
                        client,
                        functionName: 'getValidatorPaginated',
                        walletAddress: moduleAddress,
                        pageSize: pageSize
                    });
                    validators && modules.push(...validators);
                    break;
                case 'executor':
                    const executors = await (0, exports.getModulesPaginated)({
                        client,
                        functionName: 'getExecutorsPaginated',
                        walletAddress: moduleAddress,
                        pageSize: pageSize
                    });
                    executors && modules.push(...executors);
                    break;
                case 'hook':
                    const activeHook = (await client.readContract({
                        address: moduleAddress,
                        abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
                        functionName: 'getActiveHook',
                    }));
                    modules.push(activeHook);
                    break;
                case 'fallback':
            }
        }
    }
    else {
        throw new Error('Account has no init code and is not deployed');
    }
    const onlyModules = modules.filter((module) => module !== viem_1.zeroAddress);
    const uniqueModules = Array.from(new Set(onlyModules));
    return uniqueModules;
};
exports.getInstalledModules = getInstalledModules;
const getModulesPaginated = async ({ client, functionName, walletAddress, pageSize = constants_js_2.DEFAULT_QUERY_PAGE_SIZE }) => {
    const data = (await client.readContract({
        address: walletAddress,
        abi: (0, viem_1.parseAbi)(abis_js_1.accountAbi),
        functionName: functionName,
        args: [constants_js_1.VIEM_SENTINEL_ADDRESS, pageSize],
    }));
    return data[0];
};
exports.getModulesPaginated = getModulesPaginated;
//# sourceMappingURL=getInstalledModules.js.map