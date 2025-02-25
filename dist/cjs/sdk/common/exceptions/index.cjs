var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/sdk/common/exceptions/index.ts
var exceptions_exports = {};
__export(exceptions_exports, {
  Exception: () => Exception,
  ValidationException: () => ValidationException
});
module.exports = __toCommonJS(exceptions_exports);

// src/sdk/common/exceptions/exception.ts
var Exception = class extends Error {
  //
};

// src/sdk/common/exceptions/validation.exception.ts
var ValidationException = class _ValidationException extends Exception {
  constructor(errors) {
    super(JSON.stringify(errors, null, 2));
    this.errors = errors;
  }
  static throw(property, constraints) {
    const validationError = {
      property,
      constraints
    };
    throw new _ValidationException([validationError]);
  }
};
//# sourceMappingURL=index.cjs.map