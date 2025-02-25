"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicWalletProvider = void 0;
const index_js_1 = require("../../network/index.js");
const index_js_2 = require("../../common/index.js");
class DynamicWalletProvider {
    constructor(type) {
        this.type = type;
        this.address$ = new index_js_2.UniqueSubject();
        this.networkName$ = new index_js_2.UniqueSubject();
    }
    get address() {
        return this.address$.value;
    }
    get networkName() {
        return this.networkName$.value;
    }
    setAddress(address) {
        this.address$.next((0, index_js_2.prepareAddress)(address));
    }
    setNetworkName(networkNameOrChainId) {
        this.networkName$.next((0, index_js_1.prepareNetworkName)(networkNameOrChainId));
    }
}
exports.DynamicWalletProvider = DynamicWalletProvider;
//# sourceMappingURL=dynamic.wallet-provider.js.map