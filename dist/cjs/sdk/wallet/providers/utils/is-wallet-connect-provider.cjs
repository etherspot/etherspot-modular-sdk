var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/sdk/wallet/providers/utils/is-wallet-connect-provider.ts
var is_wallet_connect_provider_exports = {};
__export(is_wallet_connect_provider_exports, {
  isWalletConnectProvider: () => isWalletConnectProvider
});
module.exports = __toCommonJS(is_wallet_connect_provider_exports);
function isWalletConnectProvider(provider) {
  return typeof provider === "object" && provider?.isWalletConnect;
}
//# sourceMappingURL=is-wallet-connect-provider.cjs.map