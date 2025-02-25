import {
  isHex
} from "./chunk-5ZBZ6BDF.js";

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

export {
  isWalletProvider
};
//# sourceMappingURL=chunk-SI63LRN5.js.map