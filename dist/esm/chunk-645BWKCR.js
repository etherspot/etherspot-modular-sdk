import {
  CHAIN_ID_TO_NETWORK_NAME,
  NETWORK_NAME_TO_CHAIN_ID
} from "./chunk-EDY4DXI5.js";

// src/sdk/network/utils/prepare-network-name.ts
function prepareNetworkName(networkNameOrChainId) {
  let result = null;
  if (networkNameOrChainId) {
    if (typeof networkNameOrChainId === "string") {
      if (networkNameOrChainId.startsWith("0x")) {
        networkNameOrChainId = parseInt(networkNameOrChainId.slice(2), 16) || 0;
      } else {
        const chainId = NETWORK_NAME_TO_CHAIN_ID[networkNameOrChainId];
        networkNameOrChainId = chainId ? chainId : parseInt(networkNameOrChainId, 10) || 0;
      }
    }
    if (typeof networkNameOrChainId === "number") {
      result = CHAIN_ID_TO_NETWORK_NAME[networkNameOrChainId] || null;
    }
  }
  return result;
}

export {
  prepareNetworkName
};
//# sourceMappingURL=chunk-645BWKCR.js.map