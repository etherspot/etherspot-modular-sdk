import { ValidationOptions } from 'class-validator';

declare function IsHex(options?: {
    size?: number;
}, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;

export { IsHex };
