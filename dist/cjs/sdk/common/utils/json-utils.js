"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = parseJson;
exports.stringifyJson = stringifyJson;
function parseJson(raw, defaultValue = null) {
    let result;
    try {
        result = JSON.parse(raw);
    }
    catch (err) {
        result = defaultValue;
    }
    return result;
}
function stringifyJson(value, space) {
    return JSON.stringify(value, null, space);
}
//# sourceMappingURL=json-utils.js.map