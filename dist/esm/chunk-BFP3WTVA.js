import {
  privateKeyToAccount
} from "./chunk-XZTC7YZW.js";
import {
  Networks,
  chains_exports
} from "./chunk-EDY4DXI5.js";
import {
  AddressZero
} from "./chunk-IXDF7SOZ.js";
import {
  createPublicClient,
  createWalletClient,
  extractChain,
  http
} from "./chunk-VOPA75Q5.js";
import {
  getAddress
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/common/utils/viem-utils.ts
var isContract = async ({
  client,
  address
}) => {
  const bytecode = await client.getBytecode({
    address
  });
  return bytecode && bytecode !== "0x";
};
var getPublicClient = ({ chainId, transport }) => {
  const publicClient = createPublicClient({
    chain: Networks[chainId].chain,
    transport
  });
  return publicClient;
};
var getWalletClientFromPrivateKey = ({ rpcUrl, chainId, privateKey }) => {
  return createWalletClient({
    account: privateKeyToAccount(privateKey),
    chain: Networks[chainId].chain,
    transport: http(rpcUrl)
    // Asserting to `any` to bypass the deep instantiation check
  });
};
var getWalletClientFromAccount = ({ rpcUrl, chainId, account }) => {
  return createWalletClient({
    account,
    chain: Networks[chainId].chain,
    transport: http(rpcUrl)
    // Asserting to `any` to bypass the deep instantiation check
  });
};
var getViemAccount = (privateKey) => {
  return privateKeyToAccount(privateKey);
};
var getViemAddress = (address) => {
  return getAddress(address);
};
var getChain = (chainId) => {
  return extractChain({
    chains: Object.values(chains_exports),
    id: chainId
  });
};
function prepareAddress(value, zeroAddressAsNull = false) {
  let result = null;
  try {
    result = getAddress(value);
    if (result === AddressZero) {
      result = null;
    }
  } catch (err) {
  }
  if (!result && zeroAddressAsNull) {
    result = AddressZero;
  }
  return result;
}
function prepareAddresses(data, ...keys) {
  const result = {
    ...data
  };
  for (const key of keys) {
    if (!result[key]) {
      continue;
    }
    try {
      if (Array.isArray(result[key])) {
        const addresses = result[key].map((item) => {
          let result2 = item;
          if (item) {
            const address = prepareAddress(item);
            if (address) {
              result2 = address;
            }
          }
          return result2;
        });
        result[key] = addresses;
      } else {
        const address = prepareAddress(result[key]);
        if (address) {
          result[key] = address;
        }
      }
    } catch (err) {
    }
  }
  return result;
}
function addressesEqual(address1, address2) {
  return (address1 || "").toLowerCase() === (address2 || "").toLowerCase();
}
function isAddress(value) {
  let result = false;
  if (value && value !== AddressZero) {
    try {
      const address = getAddress(value);
      if (address) {
        result = address === value;
      }
    } catch (err) {
      result = false;
    }
  } else if (value === AddressZero) {
    result = true;
  }
  return result;
}

export {
  isContract,
  getPublicClient,
  getWalletClientFromPrivateKey,
  getWalletClientFromAccount,
  getViemAccount,
  getViemAddress,
  getChain,
  prepareAddress,
  prepareAddresses,
  addressesEqual,
  isAddress
};
//# sourceMappingURL=chunk-BFP3WTVA.js.map