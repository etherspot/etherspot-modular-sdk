var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm({
  "node_modules/viem/_esm/utils/data/isHex.js"() {
  }
});

// src/sdk/dto/validators/is-bytes-like.validator.ts
var is_bytes_like_validator_exports = {};
__export(is_bytes_like_validator_exports, {
  IsBytesLike: () => IsBytesLike
});
module.exports = __toCommonJS(is_bytes_like_validator_exports);
var import_class_validator = require("class-validator");

// node_modules/viem/_esm/index.js
init_isHex();

// src/sdk/dto/validators/is-bytes-like.validator.ts
function IsBytesLike(options = {}) {
  return (object, propertyName) => {
    (0, import_class_validator.registerDecorator)({
      propertyName,
      options: {
        message: `${propertyName} must be bytes like`,
        ...options
      },
      name: "IsBytesLike",
      target: object ? object.constructor : void 0,
      constraints: [],
      validator: {
        validate(value) {
          let result = false;
          try {
            if (value) {
              switch (typeof value) {
                case "string":
                  if (options.acceptText) {
                    result = true;
                  } else {
                    result = isHex(value) && value.length % 2 === 0;
                  }
                  break;
                case "object":
                  result = isHex(value);
                  break;
              }
            }
          } catch (err) {
          }
          return result;
        }
      }
    });
  };
}
//# sourceMappingURL=is-bytes-like.validator.cjs.map