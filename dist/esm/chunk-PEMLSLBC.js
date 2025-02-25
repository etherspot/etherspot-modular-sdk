// src/sdk/common/utils/json-utils.ts
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

export {
  parseJson,
  stringifyJson
};
//# sourceMappingURL=chunk-PEMLSLBC.js.map