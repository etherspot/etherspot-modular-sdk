var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm({
  "node_modules/viem/_esm/utils/data/isHex.js"() {
  }
});

// src/sdk/wallet/providers/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  isWalletConnectProvider: () => isWalletConnectProvider,
  isWalletProvider: () => isWalletProvider
});
module.exports = __toCommonJS(utils_exports);

// node_modules/viem/_esm/index.js
init_isHex();

// src/sdk/wallet/providers/utils/is-wallet-provider.ts
function isWalletProvider(provider) {
  let result = false;
  if (provider) {
    switch (typeof provider) {
      case "string":
        result = isHex(provider);
        break;
      case "object":
        const { privateKey } = provider;
        if (isHex(privateKey)) {
          result = true;
        } else {
          const { type, signMessage } = provider;
          result = !!type && typeof signMessage === "function";
        }
        break;
    }
  }
  return result;
}

// src/sdk/wallet/providers/utils/is-wallet-connect-provider.ts
function isWalletConnectProvider(provider) {
  return typeof provider === "object" && provider?.isWalletConnect;
}
//# sourceMappingURL=index.cjs.map