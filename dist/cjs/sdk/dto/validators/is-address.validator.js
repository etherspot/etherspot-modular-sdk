"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAddress = IsAddress;
const class_validator_1 = require("class-validator");
const index_js_1 = require("../../common/index.js");
function IsAddress(options = {}) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
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
                    return (0, index_js_1.isAddress)(value);
                },
            },
        });
    };
}
//# sourceMappingURL=is-address.validator.js.map