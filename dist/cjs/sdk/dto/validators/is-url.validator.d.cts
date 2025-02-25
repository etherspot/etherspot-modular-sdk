import { ValidationOptions } from 'class-validator';

declare function IsUrl(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;

export { IsUrl };
