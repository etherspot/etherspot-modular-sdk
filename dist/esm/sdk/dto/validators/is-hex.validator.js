import { registerDecorator } from 'class-validator';
import { isHex } from '../../common/index.js';
export function IsHex(options = {}, validationOptions = {}) {
    return (object, propertyName) => {
        const { size } = options;
        let message = `${propertyName} must be hex`;
        if (size > 0) {
            message = `${message} with ${size} size`;
        }
        registerDecorator({
            propertyName,
            options: {
                message,
                ...validationOptions,
            },
            name: 'isHex',
            target: object.constructor,
            constraints: [],
            validator: {
                validate(value) {
                    let result = isHex(value);
                    if (result && size > 0) {
                        result = value.length === size * 2 + 2;
                    }
                    return result;
                },
            },
        });
    };
}
//# sourceMappingURL=is-hex.validator.js.map