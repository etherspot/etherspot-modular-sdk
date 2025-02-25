import {
  resolveProperties
} from "./chunk-4KVEROXU.js";
import {
  BigNumber
} from "./chunk-56W7LDOD.js";
import {
  toHex
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/common/OperationUtils.ts
function toJSON(op) {
  return resolveProperties(op).then(
    (userOp) => Object.keys(userOp).map((key) => {
      let val = userOp[key];
      if (typeof val === "object" && BigNumber.isBigNumber(val)) {
        val = val.toHexString();
      } else if (typeof val !== "string" || !val.startsWith("0x")) {
        val = toHex(val);
      }
      return [key, val];
    }).reduce(
      (set, [k, v]) => ({
        ...set,
        [k]: v
      }),
      {}
    )
  );
}
async function printOp(op) {
  return toJSON(op).then((userOp) => JSON.stringify(userOp, null, 2));
}

export {
  toJSON,
  printOp
};
//# sourceMappingURL=chunk-7WF64U7W.js.map