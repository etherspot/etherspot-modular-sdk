import "../../chunk-VOPA75Q5.js";
import "../../chunk-UFWBG2KU.js";
import {
  encodeFunctionData,
  parseAbi
} from "../../chunk-5ZBZ6BDF.js";
import "../../chunk-LQXP7TCC.js";

// src/sdk/base/EtherspotWalletFactory.ts
var EtherspotWalletFactoryAPI = class {
  static createAccount(factoryAddress, registry, owner, salt) {
    const abi = ["function createAccount(address, _registry, address owner, uint256 salt) returns(address)"];
    const encodedData = encodeFunctionData({
      functionName: "createAccount",
      abi: parseAbi(abi),
      args: [
        registry,
        owner,
        salt
      ]
    });
    return encodedData;
  }
};
export {
  EtherspotWalletFactoryAPI
};
//# sourceMappingURL=EtherspotWalletFactory.js.map