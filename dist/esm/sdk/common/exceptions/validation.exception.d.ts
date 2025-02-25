import { Exception } from './exception.js';
import { ValidationError } from './interfaces.js';

declare class ValidationException extends Exception {
    errors: ValidationError[];
    static throw(property: string, constraints: {
        [key: string]: string;
    }): void;
    constructor(errors: ValidationError[]);
}

export { ValidationException };
