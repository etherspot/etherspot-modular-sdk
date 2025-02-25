export function parseJson(raw, defaultValue = null) {
    let result;
    try {
        result = JSON.parse(raw);
    }
    catch (err) {
        result = defaultValue;
    }
    return result;
}
export function stringifyJson(value, space) {
    return JSON.stringify(value, null, space);
}
//# sourceMappingURL=json-utils.js.map