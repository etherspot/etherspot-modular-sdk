"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUrl = IsUrl;
const class_validator_1 = require("class-validator");
const index_js_1 = require("../../common/index.js");
function IsUrl(validationOptions = {}) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
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
                    return (0, index_js_1.isUrl)(value);
                },
            },
        });
    };
}
//# sourceMappingURL=is-url.validator.js.map