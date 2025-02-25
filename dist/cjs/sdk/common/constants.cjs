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

// src/sdk/common/constants.ts
var constants_exports = {};
__export(constants_exports, {
  AddressZero: () => AddressZero,
  CALL_TYPE: () => CALL_TYPE,
  EXEC_TYPE: () => EXEC_TYPE,
  HeaderNames: () => HeaderNames,
  MODULE_TYPE: () => MODULE_TYPE,
  VIEM_SENTINEL_ADDRESS: () => VIEM_SENTINEL_ADDRESS,
  bufferPercent: () => bufferPercent,
  onRampApiKey: () => onRampApiKey
});
module.exports = __toCommonJS(constants_exports);
var HeaderNames = /* @__PURE__ */ ((HeaderNames2) => {
  HeaderNames2["AuthToken"] = "x-auth-token";
  HeaderNames2["AnalyticsToken"] = "x-analytics-token";
  HeaderNames2["ProjectMetadata"] = "x-project-metadata";
  return HeaderNames2;
})(HeaderNames || {});
var bufferPercent = 13;
var onRampApiKey = "pk_prod_01H66WYDRFM95JBTJ4VMGY1FAX";
var AddressZero = "0x0000000000000000000000000000000000000000";
var CALL_TYPE = /* @__PURE__ */ ((CALL_TYPE2) => {
  CALL_TYPE2["SINGLE"] = "0x00";
  CALL_TYPE2["BATCH"] = "0x01";
  CALL_TYPE2["STATIC"] = "0xFE";
  CALL_TYPE2["DELEGATE_CALL"] = "0xFF";
  return CALL_TYPE2;
})(CALL_TYPE || {});
var EXEC_TYPE = /* @__PURE__ */ ((EXEC_TYPE2) => {
  EXEC_TYPE2["DEFAULT"] = "0x00";
  EXEC_TYPE2["TRY_EXEC"] = "0x01";
  return EXEC_TYPE2;
})(EXEC_TYPE || {});
var MODULE_TYPE = /* @__PURE__ */ ((MODULE_TYPE2) => {
  MODULE_TYPE2["VALIDATOR"] = "0x01";
  MODULE_TYPE2["EXECUTOR"] = "0x02";
  MODULE_TYPE2["FALLBACK"] = "0x03";
  MODULE_TYPE2["HOOK"] = "0x04";
  return MODULE_TYPE2;
})(MODULE_TYPE || {});
var VIEM_SENTINEL_ADDRESS = "0x0000000000000000000000000000000000000001";
//# sourceMappingURL=constants.cjs.map