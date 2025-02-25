import { Address, PublicClient } from 'viem';
import { ModuleType } from './types.js';
export declare const getInstalledModules: ({ client, moduleAddress, moduleTypes, pageSize }: {
    client: PublicClient;
    moduleAddress: Address;
    moduleTypes?: ModuleType[];
    pageSize: number;
}) => Promise<Address[]>;
export declare const getModulesPaginated: ({ client, functionName, walletAddress, pageSize }: {
    client: PublicClient;
    functionName: string;
    walletAddress: Address;
    pageSize?: number;
}) => Promise<`0x${string}`[]>;
//# sourceMappingURL=getInstalledModules.d.ts.map