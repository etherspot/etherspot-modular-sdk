"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareNetworkName = prepareNetworkName;
const constants_js_1 = require("../constants.js");
function prepareNetworkName(networkNameOrChainId) {
    let result = null;
    if (networkNameOrChainId) {
        if (typeof networkNameOrChainId === 'string') {
            if (networkNameOrChainId.startsWith('0x')) {
                networkNameOrChainId = parseInt(networkNameOrChainId.slice(2), 16) || 0;
            }
            else {
                const chainId = constants_js_1.NETWORK_NAME_TO_CHAIN_ID[networkNameOrChainId];
                networkNameOrChainId = chainId ? chainId : parseInt(networkNameOrChainId, 10) || 0;
            }
        }
        if (typeof networkNameOrChainId === 'number') {
            result = constants_js_1.CHAIN_ID_TO_NETWORK_NAME[networkNameOrChainId] || null;
        }
    }
    return result;
}
//# sourceMappingURL=prepare-network-name.js.map