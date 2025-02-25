import { entryPointErrorMsg, errorMsg } from "./constants.js";
export class ErrorHandler extends Error {
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
}
//# sourceMappingURL=errorHandler.service.js.map