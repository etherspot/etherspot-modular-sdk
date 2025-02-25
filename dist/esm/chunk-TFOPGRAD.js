import {
  Exception
} from "./chunk-ZHWY46SJ.js";

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

export {
  ValidationException
};
//# sourceMappingURL=chunk-TFOPGRAD.js.map