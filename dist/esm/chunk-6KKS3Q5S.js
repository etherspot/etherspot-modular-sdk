import {
  isAddress
} from "./chunk-BFP3WTVA.js";
import {
  encodePacked
} from "./chunk-VOPA75Q5.js";
import {
  isHex,
  stringToBytes
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/common/utils/hashing-utils.ts
function keccak256(data) {
  let result = null;
  if (data) {
    switch (typeof data) {
      case "string":
        if (isAddress(data)) {
          result = keccak256(encodePacked(["address"], [data]));
        } else if (isHex2(data)) {
          result = keccak256(encodePacked(["bytes"], [data]));
        } else {
          result = keccak256(encodePacked(["string"], [data]));
        }
        break;
      case "object": {
        result = keccak256(encodePacked(["bytes"], [data.toString()]));
        break;
      }
    }
  }
  return result;
}
function isHex2(hex, size = 0) {
  let result = isHex(hex);
  if (result && size > 0) {
    result = hex.length === size * 2 + 2;
  }
  return result;
}
function toHexFromBytesLike(data) {
  let result = null;
  if (data !== null) {
    switch (typeof data) {
      case "string":
        if (isHex2(data)) {
          result = data;
        } else {
          result = toHexFromBytesLike(stringToBytes(data));
        }
        break;
      case "object":
        try {
          result = toHexFromBytesLike(data);
        } catch (err) {
          result = null;
        }
        break;
    }
  }
  if (!result) {
    throw new Error("invalid hex data");
  }
  return result;
}
function concatHex(...hex) {
  return hex.map((item, index) => index ? item.slice(2) : item).join("");
}

export {
  keccak256,
  isHex2 as isHex,
  toHexFromBytesLike,
  concatHex
};
//# sourceMappingURL=chunk-6KKS3Q5S.js.map