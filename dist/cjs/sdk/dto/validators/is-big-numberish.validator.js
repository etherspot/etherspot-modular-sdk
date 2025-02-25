"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBigNumberish = IsBigNumberish;
const bignumber_js_1 = require("../../types/bignumber.js");
const class_validator_1 = require("class-validator");
function IsBigNumberish(options = {}, validationOptions = {}) {
    return (object, propertyName) => {
        const { positive } = options;
        (0, class_validator_1.registerDecorator)({
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
                        const bn = bignumber_js_1.BigNumber.from(value);
                        result = positive ? bn.gt(0) : bn.gte(0);
                    }
                    catch (err) {
                    }
                    return result;
                },
            },
        });
    };
}
//# sourceMappingURL=is-big-numberish.validator.js.map