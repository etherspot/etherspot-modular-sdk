import { ValidationOptions } from 'class-validator';

declare function IsBigNumberish(options?: {
    positive?: boolean;
}, validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;

export { IsBigNumberish };
