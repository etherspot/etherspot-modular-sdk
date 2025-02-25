import { ValidationOptions } from 'class-validator';

declare function IsAddress(options?: ValidationOptions): (object: any, propertyName: string) => void;

export { IsAddress };
