import { PublicClient, Address } from 'viem';
import { ModuleType } from './types.js';

declare const getInstalledModules: ({ client, moduleAddress, moduleTypes, pageSize }: {
    client: PublicClient;
    moduleAddress: Address;
    moduleTypes?: ModuleType[];
    pageSize: number;
}) => Promise<Address[]>;
declare const getModulesPaginated: ({ client, functionName, walletAddress, pageSize }: {
    client: PublicClient;
    functionName: string;
    walletAddress: Address;
    pageSize?: number;
}) => Promise<`0x${string}`[]>;

export { getInstalledModules, getModulesPaginated };
