import {
  entryPointErrorMsg,
  errorMsg
} from "./chunk-R7Y35C7I.js";

// src/sdk/errorHandler/errorHandler.service.ts
var ErrorHandler = class extends Error {
  constructor(error, code) {
    super(error);
    this.error = error;
    this.code = code;
    this.rawError = null;
    this.rawError = error;
    this.code = code;
    if (code) {
      this.message = errorMsg[code.toString()];
      if (entryPointErrorMsg[error]) {
        this.message = entryPointErrorMsg[error];
      }
    }
  }
};

export {
  ErrorHandler
};
//# sourceMappingURL=chunk-6LH2SJV2.js.map