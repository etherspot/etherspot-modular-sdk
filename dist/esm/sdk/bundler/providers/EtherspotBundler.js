import { Exception } from "../../common/index.js";
import { getNetworkConfig } from "../../network/index.js";
export class EtherspotBundler {
    constructor(chainId, apiKey, bundlerUrl) {
        if (!bundlerUrl) {
            const networkConfig = getNetworkConfig(chainId);
            if (!networkConfig || networkConfig.bundler == '')
                throw new Exception('No bundler url provided');
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
//# sourceMappingURL=EtherspotBundler.js.map