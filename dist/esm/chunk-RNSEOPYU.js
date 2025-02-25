import {
  modulesAbi
} from "./chunk-ZJ2O6KOQ.js";
import {
  encodeFunctionData,
  parseAbi
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/base/Bootstrap.ts
function _makeBootstrapConfig(module, data) {
  const config = {
    module: "",
    data: ""
  };
  config.module = module;
  const encodedFunctionData = encodeFunctionData({
    functionName: "onInstall",
    abi: parseAbi(modulesAbi),
    args: [data]
  });
  config.data = encodedFunctionData;
  return config;
}
function makeBootstrapConfig(module, data) {
  const config = [];
  const encodedFunctionData = encodeFunctionData({
    functionName: "onInstall",
    abi: parseAbi(modulesAbi),
    args: [data]
  });
  const newConfig = {
    module,
    data: encodedFunctionData
  };
  config.push(newConfig);
  return config;
}

export {
  _makeBootstrapConfig,
  makeBootstrapConfig
};
//# sourceMappingURL=chunk-RNSEOPYU.js.map