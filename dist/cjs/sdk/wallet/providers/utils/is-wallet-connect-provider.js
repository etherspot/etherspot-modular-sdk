"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWalletConnectProvider = isWalletConnectProvider;
function isWalletConnectProvider(provider) {
    return typeof provider === 'object' && provider?.isWalletConnect;
}
//# sourceMappingURL=is-wallet-connect-provider.js.map