"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherspotBundler = void 0;
const index_js_1 = require("../../common/index.js");
const index_js_2 = require("../../network/index.js");
class EtherspotBundler {
    constructor(chainId, apiKey, bundlerUrl) {
        if (!bundlerUrl) {
            const networkConfig = (0, index_js_2.getNetworkConfig)(chainId);
            if (!networkConfig || networkConfig.bundler == '')
                throw new index_js_1.Exception('No bundler url provided');
            bundlerUrl = networkConfig.bundler;
        }
        if (apiKey) {
            if (bundlerUrl.includes('?api-key='))
                this.url = bundlerUrl + apiKey;
            else
                this.url = bundlerUrl + '?api-key=' + apiKey;
        }
        else
            this.url = bundlerUrl;
        this.apiKey = apiKey;
    }
}
exports.EtherspotBundler = EtherspotBundler;
//# sourceMappingURL=EtherspotBundler.js.map