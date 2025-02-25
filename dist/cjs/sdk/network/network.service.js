"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkService = void 0;
const index_js_1 = require("../common/index.js");
const constants_js_1 = require("./constants.js");
class NetworkService extends index_js_1.Service {
    constructor(defaultChainId) {
        super();
        this.network$ = new index_js_1.ObjectSubject(null);
        this.externalContractAddresses = new Map();
        this.supportedNetworks = constants_js_1.SupportedNetworks
            .map((chainId) => {
            const name = constants_js_1.CHAIN_ID_TO_NETWORK_NAME[chainId];
            return !name
                ? null
                : {
                    chainId,
                    name,
                };
        })
            .filter((value) => !!value);
        if (!this.supportedNetworks.length) {
            throw new index_js_1.Exception('Invalid network config');
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
        return constants_js_1.SupportedNetworks.includes(chainId);
    }
    getNetworkConfig(chainId) {
        const networkConfig = constants_js_1.Networks[chainId];
        if (!networkConfig) {
            throw new Error(`No network config found for network '${chainId}'`);
        }
        return networkConfig;
    }
}
exports.NetworkService = NetworkService;
//# sourceMappingURL=network.service.js.map