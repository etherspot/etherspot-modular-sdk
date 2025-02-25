import { registerDecorator, ValidationOptions } from 'class-validator';
import { isUrl } from '../../common/index.js';

export function IsUrl(validationOptions: ValidationOptions = {}) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      options: {
        message: `${propertyName} must be url`,
        ...validationOptions,
      },
      name: 'isUrl',
      target: object.constructor,
      constraints: [],
      validator: {
        validate(value: string): boolean {
          return isUrl(value);
        },
      },
    });
  };
}
