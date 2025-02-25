import {
  concat,
  pad
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/common/utils/userop-utils.ts
var resolveProperties = async (object) => {
  const promises = Object.keys(object).map((key) => {
    const value = object[key];
    return Promise.resolve(value).then((v) => ({ key, value: v }));
  });
  const results = await Promise.all(promises);
  return results.reduce((accum, result) => {
    accum[result.key] = result.value;
    return accum;
  }, {});
};
var getExecuteMode = ({
  callType,
  execType
}) => {
  return concat([
    callType,
    // 1 byte
    execType,
    // 1 byte
    "0x00000000",
    // 4 bytes
    "0x00000000",
    // 4 bytes
    pad("0x00000000", { size: 22 })
  ]);
};

export {
  resolveProperties,
  getExecuteMode
};
//# sourceMappingURL=chunk-4KVEROXU.js.map