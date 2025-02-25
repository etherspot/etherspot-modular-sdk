"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const exception_js_1 = require("./exception.js");
class ValidationException extends exception_js_1.Exception {
    static throw(property, constraints) {
        const validationError = {
            property,
            constraints,
        };
        throw new ValidationException([validationError]);
    }
    constructor(errors) {
        super(JSON.stringify(errors, null, 2));
        this.errors = errors;
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map