import {
  bootstrapAbi,
  factoryAbi
} from "../../chunk-ZJ2O6KOQ.js";
import {
  decodeFunctionData
} from "../../chunk-VOPA75Q5.js";
import "../../chunk-UFWBG2KU.js";
import {
  decodeAbiParameters,
  parseAbi,
  slice
} from "../../chunk-5ZBZ6BDF.js";
import "../../chunk-LQXP7TCC.js";

// src/sdk/common/getInitData.ts
var getInitData = ({
  initCode
}) => {
  const { args: initCodeArgs } = decodeFunctionData({
    abi: parseAbi(factoryAbi),
    data: slice(initCode, 20)
  });
  if (initCodeArgs?.length !== 2) {
    throw new Error("Invalid init code");
  }
  const initCallData = decodeAbiParameters(
    [
      { name: "bootstrap", type: "address" },
      { name: "initCallData", type: "bytes" }
    ],
    initCodeArgs[1]
  );
  const { args: initCallDataArgs } = decodeFunctionData({
    abi: parseAbi(bootstrapAbi),
    data: initCallData[1]
  });
  if (initCallDataArgs?.length !== 4) {
    throw new Error("Invalid init code");
  }
  return {
    validators: initCallDataArgs[0],
    executors: initCallDataArgs[1],
    hooks: [initCallDataArgs[2]],
    fallbacks: initCallDataArgs[3]
  };
};
export {
  getInitData
};
//# sourceMappingURL=getInitData.js.map