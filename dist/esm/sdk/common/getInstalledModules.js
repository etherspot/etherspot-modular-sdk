import { parseAbi, zeroAddress } from 'viem';
import { VIEM_SENTINEL_ADDRESS } from './constants.js';
import { isContract } from './utils/viem-utils.js';
import { accountAbi } from './abis.js';
import { DEFAULT_QUERY_PAGE_SIZE } from '../network/constants.js';
export const getInstalledModules = async ({ client, moduleAddress, moduleTypes = ['validator', 'executor', 'hook', 'fallback'], pageSize = DEFAULT_QUERY_PAGE_SIZE }) => {
    const modules = [];
    if (await isContract({ client, address: moduleAddress })) {
        for (const moduleType of moduleTypes) {
            switch (moduleType) {
                case 'validator':
                    const validators = await getModulesPaginated({
                        client,
                        functionName: 'getValidatorPaginated',
                        walletAddress: moduleAddress,
                        pageSize: pageSize
                    });
                    validators && modules.push(...validators);
                    break;
                case 'executor':
                    const executors = await getModulesPaginated({
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
                        abi: parseAbi(accountAbi),
                        functionName: 'getActiveHook',
                    }));
                    modules.push(activeHook);
                    break;
                case 'fallback':
                // todo: implement on account or use events
            }
        }
    }
    else {
        throw new Error('Account has no init code and is not deployed');
    }
    const onlyModules = modules.filter((module) => module !== zeroAddress);
    const uniqueModules = Array.from(new Set(onlyModules));
    return uniqueModules;
};
export const getModulesPaginated = async ({ client, functionName, walletAddress, pageSize = DEFAULT_QUERY_PAGE_SIZE }) => {
    const data = (await client.readContract({
        address: walletAddress,
        abi: parseAbi(accountAbi),
        functionName: functionName,
        args: [VIEM_SENTINEL_ADDRESS, pageSize],
    }));
    return data[0];
};
//# sourceMappingURL=getInstalledModules.js.map