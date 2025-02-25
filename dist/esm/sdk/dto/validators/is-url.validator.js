import { registerDecorator } from 'class-validator';
import { isUrl } from '../../common/index.js';
export function IsUrl(validationOptions = {}) {
    return (object, propertyName) => {
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
                validate(value) {
                    return isUrl(value);
                },
            },
        });
    };
}
//# sourceMappingURL=is-url.validator.js.map