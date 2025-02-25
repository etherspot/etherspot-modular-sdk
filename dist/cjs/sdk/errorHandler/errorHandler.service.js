"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const constants_js_1 = require("./constants.js");
class ErrorHandler extends Error {
    constructor(error, code) {
        super(error);
        this.error = error;
        this.code = code;
        this.rawError = null;
        this.rawError = error;
        this.code = code;
        if (code) {
            this.message = constants_js_1.errorMsg[code.toString()];
            if (constants_js_1.entryPointErrorMsg[error]) {
                this.message = constants_js_1.entryPointErrorMsg[error];
            }
        }
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.service.js.map