import { Observable } from 'rxjs';
import { NetworkConfig } from './index.js';
import { ObjectSubject, Service } from '../common/index.js';
import { NetworkNames } from './constants.js';
import { Network } from './interfaces.js';
export declare class NetworkService extends Service {
    readonly network$: ObjectSubject<Network, keyof Network>;
    readonly chainId$: Observable<number>;
    readonly defaultNetwork: Network;
    readonly supportedNetworks: Network[];
    readonly externalContractAddresses: Map<string, {
        [key: number]: string;
    }>;
    constructor(defaultChainId?: number);
    get network(): Network;
    get chainId(): number;
    useDefaultNetwork(): void;
    switchNetwork(networkName: NetworkNames): void;
    isNetworkSupported(chainId: number): boolean;
    getNetworkConfig(chainId: number): NetworkConfig;
}
//# sourceMappingURL=network.service.d.ts.map