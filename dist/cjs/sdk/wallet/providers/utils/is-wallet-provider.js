"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWalletProvider = isWalletProvider;
const viem_1 = require("viem");
function isWalletProvider(provider) {
    let result = false;
    if (provider) {
        switch (typeof provider) {
            case 'string':
                result = (0, viem_1.isHex)(provider);
                break;
            case 'object':
                const { privateKey } = provider;
                if ((0, viem_1.isHex)(privateKey)) {
                    result = true;
                }
                else {
                    const { type, signMessage } = provider;
                    result = !!type && typeof signMessage === 'function';
                }
                break;
        }
    }
    return result;
}
//# sourceMappingURL=is-wallet-provider.js.map