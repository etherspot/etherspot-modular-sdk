"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsHex32 = IsHex32;
const is_hex_validator_js_1 = require("./is-hex.validator.js");
function IsHex32(options = {}) {
    return (0, is_hex_validator_js_1.IsHex)({
        size: 32,
    }, options);
}
//# sourceMappingURL=is-hex32.validator.js.map