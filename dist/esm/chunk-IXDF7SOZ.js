// src/sdk/common/constants.ts
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

export {
  HeaderNames,
  bufferPercent,
  onRampApiKey,
  AddressZero,
  CALL_TYPE,
  EXEC_TYPE,
  MODULE_TYPE,
  VIEM_SENTINEL_ADDRESS
};
//# sourceMappingURL=chunk-IXDF7SOZ.js.map