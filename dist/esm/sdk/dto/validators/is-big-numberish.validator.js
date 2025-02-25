import { BigNumber } from '../../types/bignumber.js';
import { registerDecorator } from 'class-validator';
export function IsBigNumberish(options = {}, validationOptions = {}) {
    return (object, propertyName) => {
        const { positive } = options;
        registerDecorator({
            propertyName,
            options: {
                message: `${propertyName} must be ${positive ? 'positive ' : ''}big numberish`,
                ...validationOptions,
            },
            name: 'IsBigNumberish',
            target: object.constructor,
            constraints: [],
            validator: {
                validate(value) {
                    let result = false;
                    try {
                        const bn = BigNumber.from(value);
                        result = positive ? bn.gt(0) : bn.gte(0);
                    }
                    catch (err) {
                        //
                    }
                    return result;
                },
            },
        });
    };
}
//# sourceMappingURL=is-big-numberish.validator.js.map