"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = parseJson;
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
//# sourceMappingURL=parse-json.js.map