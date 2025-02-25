import { Exception } from './exception.cjs';
import { ValidationError } from './interfaces.cjs';

declare class ValidationException extends Exception {
    errors: ValidationError[];
    static throw(property: string, constraints: {
        [key: string]: string;
    }): void;
    constructor(errors: ValidationError[]);
}

export { ValidationException };
