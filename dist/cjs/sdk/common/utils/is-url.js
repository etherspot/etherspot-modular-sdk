"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrl = isUrl;
const tslib_1 = require("tslib");
const validator_1 = tslib_1.__importDefault(require("validator"));
function isUrl(url) {
    return validator_1.default.isURL(url, {
        protocols: ['http', 'https'],
        require_tld: false,
        require_host: true,
        require_protocol: true,
    });
}
//# sourceMappingURL=is-url.js.map