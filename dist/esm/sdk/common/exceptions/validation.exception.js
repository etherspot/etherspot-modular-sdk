import { Exception } from './exception.js';
export class ValidationException extends Exception {
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
//# sourceMappingURL=validation.exception.js.map