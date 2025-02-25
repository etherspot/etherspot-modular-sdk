import {
  Exception
} from "./chunk-ZHWY46SJ.js";
import {
  ObjectSubject
} from "./chunk-CEKGUPTO.js";
import {
  Service
} from "./chunk-2DVWPQWH.js";
import {
  CHAIN_ID_TO_NETWORK_NAME,
  Networks,
  SupportedNetworks
} from "./chunk-EDY4DXI5.js";

// src/sdk/network/network.service.ts
var NetworkService = class extends Service {
  constructor(defaultChainId) {
    super();
    this.network$ = new ObjectSubject(null);
    this.externalContractAddresses = /* @__PURE__ */ new Map();
    this.supportedNetworks = SupportedNetworks.map((chainId) => {
      const name = CHAIN_ID_TO_NETWORK_NAME[chainId];
      return !name ? null : {
        chainId,
        name
      };
    }).filter((value) => !!value);
    if (!this.supportedNetworks.length) {
      throw new Exception("Invalid network config");
    }
    this.defaultNetwork = defaultChainId ? this.supportedNetworks.find(({ chainId }) => chainId === defaultChainId) : this.supportedNetworks[0];
    if (!this.defaultNetwork) {
      this.defaultNetwork = this.supportedNetworks.find(({ chainId }) => chainId === 1);
    }
    this.chainId$ = this.network$.observeKey("chainId");
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
};

export {
  NetworkService
};
//# sourceMappingURL=chunk-5PDIONI2.js.map