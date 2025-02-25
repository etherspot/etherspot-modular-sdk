import { ObjectSubject, Service, Exception } from '../common/index.js';
import { Networks, CHAIN_ID_TO_NETWORK_NAME, SupportedNetworks } from './constants.js';
export class NetworkService extends Service {
    constructor(defaultChainId) {
        super();
        this.network$ = new ObjectSubject(null);
        this.externalContractAddresses = new Map();
        this.supportedNetworks = SupportedNetworks
            .map((chainId) => {
            const name = CHAIN_ID_TO_NETWORK_NAME[chainId];
            return !name
                ? null
                : {
                    chainId,
                    name,
                };
        })
            .filter((value) => !!value);
        if (!this.supportedNetworks.length) {
            throw new Exception('Invalid network config');
        }
        this.defaultNetwork = defaultChainId
            ? this.supportedNetworks.find(({ chainId }) => chainId === defaultChainId)
            : this.supportedNetworks[0];
        if (!this.defaultNetwork) {
            this.defaultNetwork = this.supportedNetworks.find(({ chainId }) => chainId === 1);
        }
        this.chainId$ = this.network$.observeKey('chainId');
    }
    get network() {
        return this.network$.value;
    }
    get chainId() {
        return this.network ? this.network.chainId : null;
    }
    useDefaultNetwork() {
        this.network$.next(this.defaultNetwork);
    }
    switchNetwork(networkName) {
        this.network$.next(this.supportedNetworks.find(({ name }) => name === networkName) || null);
    }
    isNetworkSupported(chainId) {
        return SupportedNetworks.includes(chainId);
    }
    getNetworkConfig(chainId) {
        const networkConfig = Networks[chainId];
        if (!networkConfig) {
            throw new Error(`No network config found for network '${chainId}'`);
        }
        return networkConfig;
    }
}
//# sourceMappingURL=network.service.js.map