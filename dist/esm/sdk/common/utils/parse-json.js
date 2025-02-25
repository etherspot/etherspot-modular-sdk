import "../../../chunk-LQXP7TCC.js";

// src/sdk/common/utils/parse-json.ts
function parseJson(raw, defaultValue = null) {
  let result;
  try {
    result = JSON.parse(raw);
  } catch (err) {
    result = defaultValue;
  }
  return result;
}
export {
  parseJson
};
//# sourceMappingURL=parse-json.js.map