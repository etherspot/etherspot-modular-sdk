import {
  BigNumber
} from "./chunk-56W7LDOD.js";

// src/sdk/common/utils/bignumber-utils.ts
function bigNumberishToBigInt(value) {
  if (typeof value === "bigint") {
    return value;
  } else if (typeof value === "string" || typeof value === "number") {
    return BigInt(value);
  } else if (BigNumber.isBigNumber(value)) {
    return BigInt(value.toString());
  } else {
    throw new Error("Unsupported BigNumberish type");
  }
}
function isBigNumber(value) {
  return value instanceof BigNumber;
}
function fromBigInt(value) {
  return BigNumber.from(value.toString());
}

export {
  bigNumberishToBigInt,
  isBigNumber,
  fromBigInt
};
//# sourceMappingURL=chunk-XRHVIBWK.js.map