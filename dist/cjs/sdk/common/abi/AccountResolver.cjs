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

// src/sdk/common/abi/AccountResolver.ts
var AccountResolver_exports = {};
__export(AccountResolver_exports, {
  AccountResolverAbi: () => AccountResolverAbi
});
module.exports = __toCommonJS(AccountResolver_exports);
var AccountResolverAbi = [
  {
    inputs: [
      { internalType: "address", name: "_v1Factory", type: "address" },
      { internalType: "address", name: "_v2Factory", type: "address" },
      { internalType: "address", name: "_ecdsaModule", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "ecdsaOwnershipModule",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_eoa", type: "address" },
      { internalType: "uint8", name: "_maxIndex", type: "uint8" }
    ],
    name: "resolveAddresses",
    outputs: [
      {
        components: [
          { internalType: "address", name: "accountAddress", type: "address" },
          { internalType: "address", name: "factoryAddress", type: "address" },
          {
            internalType: "address",
            name: "currentImplementation",
            type: "address"
          },
          { internalType: "string", name: "currentVersion", type: "string" },
          { internalType: "string", name: "factoryVersion", type: "string" },
          { internalType: "uint256", name: "deploymentIndex", type: "uint256" }
        ],
        internalType: "struct IAddressResolver.SmartAccountResult[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_eoa", type: "address" },
      { internalType: "uint8", name: "_maxIndex", type: "uint8" },
      { internalType: "address", name: "_moduleAddress", type: "address" },
      { internalType: "bytes", name: "_moduleSetupData", type: "bytes" }
    ],
    name: "resolveAddressesFlexibleForV2",
    outputs: [
      {
        components: [
          { internalType: "address", name: "accountAddress", type: "address" },
          { internalType: "address", name: "factoryAddress", type: "address" },
          {
            internalType: "address",
            name: "currentImplementation",
            type: "address"
          },
          { internalType: "string", name: "currentVersion", type: "string" },
          { internalType: "string", name: "factoryVersion", type: "string" },
          { internalType: "uint256", name: "deploymentIndex", type: "uint256" }
        ],
        internalType: "struct IAddressResolver.SmartAccountResult[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_eoa", type: "address" },
      { internalType: "uint8", name: "_maxIndex", type: "uint8" }
    ],
    name: "resolveAddressesV1",
    outputs: [
      {
        components: [
          { internalType: "address", name: "accountAddress", type: "address" },
          { internalType: "address", name: "factoryAddress", type: "address" },
          {
            internalType: "address",
            name: "currentImplementation",
            type: "address"
          },
          { internalType: "string", name: "currentVersion", type: "string" },
          { internalType: "string", name: "factoryVersion", type: "string" },
          { internalType: "uint256", name: "deploymentIndex", type: "uint256" }
        ],
        internalType: "struct IAddressResolver.SmartAccountResult[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "smartAccountFactoryV1",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "smartAccountFactoryV2",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  }
];
//# sourceMappingURL=AccountResolver.cjs.map