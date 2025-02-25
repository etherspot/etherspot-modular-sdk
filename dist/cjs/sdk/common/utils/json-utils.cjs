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

// src/sdk/common/utils/json-utils.ts
var json_utils_exports = {};
__export(json_utils_exports, {
  parseJson: () => parseJson,
  stringifyJson: () => stringifyJson
});
module.exports = __toCommonJS(json_utils_exports);
function parseJson(raw, defaultValue = null) {
  let result;
  try {
    result = JSON.parse(raw);
  } catch (err) {
    result = defaultValue;
  }
  return result;
}
function stringifyJson(value, space) {
  return JSON.stringify(value, null, space);
}
//# sourceMappingURL=json-utils.cjs.map