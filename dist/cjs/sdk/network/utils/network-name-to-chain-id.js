"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORK_NAME_TO_CHAIN_ID = void 0;
exports.networkNameToChainId = networkNameToChainId;
const constants_js_1 = require("../constants.js");
Object.defineProperty(exports, "NETWORK_NAME_TO_CHAIN_ID", { enumerable: true, get: function () { return constants_js_1.NETWORK_NAME_TO_CHAIN_ID; } });
function networkNameToChainId(networkName) {
    return constants_js_1.NETWORK_NAME_TO_CHAIN_ID[networkName] || null;
}
//# sourceMappingURL=network-name-to-chain-id.js.map