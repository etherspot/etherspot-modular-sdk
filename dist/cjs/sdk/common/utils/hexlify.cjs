"use strict";
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

// src/sdk/common/utils/hexlify.ts
var hexlify_exports = {};
__export(hexlify_exports, {
  checkSafeUint53: () => checkSafeUint53,
  hexlifyValue: () => hexlifyValue,
  isBytes: () => isBytes,
  isBytesLikeValue: () => isBytesLikeValue,
  isHexString: () => isHexString
});
module.exports = __toCommonJS(hexlify_exports);
function isHexableValue(value) {
  return !!value.toHexString;
}
function isBytesLikeValue(value) {
  return isHexString(value) && !(value.length % 2) || isBytes(value);
}
function isInteger(value) {
  return typeof value === "number" && value == value && value % 1 === 0;
}
function isBytes(value) {
  if (value == null) {
    return false;
  }
  if (value.constructor === Uint8Array) {
    return true;
  }
  if (typeof value === "string") {
    return false;
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const v = value[i];
    if (!isInteger(v) || v < 0 || v >= 256) {
      return false;
    }
  }
  return true;
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) {
    return false;
  }
  return true;
}
function checkSafeUint53(value, message) {
  if (typeof value !== "number") {
    return;
  }
  if (message == null) {
    message = "value not safe";
  }
  if (value < 0 || value >= 9007199254740991) {
    throw new Error(`Invalid Hexlify value - CheckSafeInteger Failed due to out-of-safe-range value: ${value}`);
  }
  if (value % 1) {
    throw new Error(`Invalid Hexlify value - CCheckSafeInteger Failed due to non-integer value: ${value}`);
  }
}
var HexCharacters = "0123456789abcdef";
function hexlifyValue(value, options) {
  if (!options) {
    options = {};
  }
  if (typeof value === "number") {
    checkSafeUint53(value);
    let hex = "";
    while (value) {
      hex = HexCharacters[value & 15] + hex;
      value = Math.floor(value / 16);
    }
    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex;
      }
      return "0x" + hex;
    }
    return "0x00";
  }
  if (typeof value === "bigint") {
    value = value.toString(16);
    if (value.length % 2) {
      return "0x0" + value;
    }
    return "0x" + value;
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value;
  }
  if (isHexableValue(value)) {
    return value.toHexString();
  }
  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2);
      } else if (options.hexPad === "right") {
        value += "0";
      } else {
        throw new Error(`invalid hexlify value - hex data is odd-length for value: ${value}`);
      }
    }
    return value.toLowerCase();
  }
  if (isBytes(value)) {
    let result = "0x";
    for (let i = 0; i < value.length; i++) {
      const v = value[i];
      result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15];
    }
    return result;
  }
  throw new Error(`invalid hexlify value - ${value}`);
}
//# sourceMappingURL=hexlify.cjs.map