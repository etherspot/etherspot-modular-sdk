import { ValidationOptions } from 'class-validator';

declare function IsHex32(options?: ValidationOptions): (object: any, propertyName: string) => void;

export { IsHex32 };
