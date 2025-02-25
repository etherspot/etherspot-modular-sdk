/**
 * @ignore
 */
export var HeaderNames;
(function (HeaderNames) {
    HeaderNames["AuthToken"] = "x-auth-token";
    HeaderNames["AnalyticsToken"] = "x-analytics-token";
    HeaderNames["ProjectMetadata"] = "x-project-metadata";
})(HeaderNames || (HeaderNames = {}));
export const bufferPercent = 13; // Buffer in percent
export const onRampApiKey = 'pk_prod_01H66WYDRFM95JBTJ4VMGY1FAX';
export const AddressZero = "0x0000000000000000000000000000000000000000";
export var CALL_TYPE;
(function (CALL_TYPE) {
    CALL_TYPE["SINGLE"] = "0x00";
    CALL_TYPE["BATCH"] = "0x01";
    CALL_TYPE["STATIC"] = "0xFE";
    CALL_TYPE["DELEGATE_CALL"] = "0xFF";
})(CALL_TYPE || (CALL_TYPE = {}));
export var EXEC_TYPE;
(function (EXEC_TYPE) {
    EXEC_TYPE["DEFAULT"] = "0x00";
    EXEC_TYPE["TRY_EXEC"] = "0x01";
})(EXEC_TYPE || (EXEC_TYPE = {}));
export var MODULE_TYPE;
(function (MODULE_TYPE) {
    MODULE_TYPE["VALIDATOR"] = "0x01";
    MODULE_TYPE["EXECUTOR"] = "0x02";
    MODULE_TYPE["FALLBACK"] = "0x03";
    MODULE_TYPE["HOOK"] = "0x04";
})(MODULE_TYPE || (MODULE_TYPE = {}));
export const VIEM_SENTINEL_ADDRESS = '0x0000000000000000000000000000000000000001';
//# sourceMappingURL=constants.js.map