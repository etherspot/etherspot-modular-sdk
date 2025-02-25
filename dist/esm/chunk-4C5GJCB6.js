// src/sdk/wallet/providers/utils/is-wallet-connect-provider.ts
function isWalletConnectProvider(provider) {
  return typeof provider === "object" && provider?.isWalletConnect;
}

export {
  isWalletConnectProvider
};
//# sourceMappingURL=chunk-4C5GJCB6.js.map