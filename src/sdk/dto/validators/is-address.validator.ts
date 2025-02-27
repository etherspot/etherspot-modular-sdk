import { registerDecorator, ValidationOptions } from 'class-validator';
import { isAddress } from '../../common/index.js';

export function IsAddress(options: ValidationOptions = {}) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      options: {
        message: `${propertyName} must be an address`,
        ...options,
      },
      name: 'isAddress',
      target: object.constructor,
      constraints: [],
      validator: {
        validate(value: any): boolean {
          return isAddress(value);
        },
      },
    });
  };
}
