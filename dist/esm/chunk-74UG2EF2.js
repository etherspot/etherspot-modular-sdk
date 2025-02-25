import {
  Exception
} from "./chunk-ZHWY46SJ.js";
import {
  getNetworkConfig
} from "./chunk-EDY4DXI5.js";

// src/sdk/bundler/providers/EtherspotBundler.ts
var EtherspotBundler = class {
  constructor(chainId, apiKey, bundlerUrl) {
    if (!bundlerUrl) {
      const networkConfig = getNetworkConfig(chainId);
      if (!networkConfig || networkConfig.bundler == "") throw new Exception("No bundler url provided");
      bundlerUrl = networkConfig.bundler;
    }
    if (apiKey) {
      if (bundlerUrl.includes("?api-key=")) this.url = bundlerUrl + apiKey;
      else this.url = bundlerUrl + "?api-key=" + apiKey;
    } else this.url = bundlerUrl;
    this.apiKey = apiKey;
  }
};

export {
  EtherspotBundler
};
//# sourceMappingURL=chunk-74UG2EF2.js.map