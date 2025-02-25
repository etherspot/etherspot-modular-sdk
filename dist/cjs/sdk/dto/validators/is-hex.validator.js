"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsHex = IsHex;
const class_validator_1 = require("class-validator");
const index_js_1 = require("../../common/index.js");
function IsHex(options = {}, validationOptions = {}) {
    return (object, propertyName) => {
        const { size } = options;
        let message = `${propertyName} must be hex`;
        if (size > 0) {
            message = `${message} with ${size} size`;
        }
        (0, class_validator_1.registerDecorator)({
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
                    let result = (0, index_js_1.isHex)(value);
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