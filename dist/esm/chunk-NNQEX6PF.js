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
    this.rawError = error;
    this.code = code;
    if (code) {
      this.message = errorMsg[code.toString()];
      if (entryPointErrorMsg[error]) {
        this.message = entryPointErrorMsg[error];
      }
    }
  }
  rawError = null;
};

export {
  ErrorHandler
};
//# sourceMappingURL=chunk-NNQEX6PF.js.map