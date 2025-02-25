"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEM_SENTINEL_ADDRESS = exports.MODULE_TYPE = exports.EXEC_TYPE = exports.CALL_TYPE = exports.AddressZero = exports.onRampApiKey = exports.bufferPercent = exports.HeaderNames = void 0;
var HeaderNames;
(function (HeaderNames) {
    HeaderNames["AuthToken"] = "x-auth-token";
    HeaderNames["AnalyticsToken"] = "x-analytics-token";
    HeaderNames["ProjectMetadata"] = "x-project-metadata";
})(HeaderNames || (exports.HeaderNames = HeaderNames = {}));
exports.bufferPercent = 13;
exports.onRampApiKey = 'pk_prod_01H66WYDRFM95JBTJ4VMGY1FAX';
exports.AddressZero = "0x0000000000000000000000000000000000000000";
var CALL_TYPE;
(function (CALL_TYPE) {
    CALL_TYPE["SINGLE"] = "0x00";
    CALL_TYPE["BATCH"] = "0x01";
    CALL_TYPE["STATIC"] = "0xFE";
    CALL_TYPE["DELEGATE_CALL"] = "0xFF";
})(CALL_TYPE || (exports.CALL_TYPE = CALL_TYPE = {}));
var EXEC_TYPE;
(function (EXEC_TYPE) {
    EXEC_TYPE["DEFAULT"] = "0x00";
    EXEC_TYPE["TRY_EXEC"] = "0x01";
})(EXEC_TYPE || (exports.EXEC_TYPE = EXEC_TYPE = {}));
var MODULE_TYPE;
(function (MODULE_TYPE) {
    MODULE_TYPE["VALIDATOR"] = "0x01";
    MODULE_TYPE["EXECUTOR"] = "0x02";
    MODULE_TYPE["FALLBACK"] = "0x03";
    MODULE_TYPE["HOOK"] = "0x04";
})(MODULE_TYPE || (exports.MODULE_TYPE = MODULE_TYPE = {}));
exports.VIEM_SENTINEL_ADDRESS = '0x0000000000000000000000000000000000000001';
//# sourceMappingURL=constants.js.map