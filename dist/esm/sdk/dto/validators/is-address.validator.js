import { registerDecorator } from 'class-validator';
import { isAddress } from '../../common/index.js';
export function IsAddress(options = {}) {
    return (object, propertyName) => {
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
                validate(value) {
                    return isAddress(value);
                },
            },
        });
    };
}
//# sourceMappingURL=is-address.validator.js.map