import { Exception } from './exception.js';
import { ValidationError } from './interfaces.js';
export declare class ValidationException extends Exception {
    errors: ValidationError[];
    static throw(property: string, constraints: {
        [key: string]: string;
    }): void;
    constructor(errors: ValidationError[]);
}
//# sourceMappingURL=validation.exception.d.ts.map