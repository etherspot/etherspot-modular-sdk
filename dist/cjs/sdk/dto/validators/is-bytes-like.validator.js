"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBytesLike = IsBytesLike;
const class_validator_1 = require("class-validator");
const viem_1 = require("viem");
function IsBytesLike(options = {}) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            propertyName,
            options: {
                message: `${propertyName} must be bytes like`,
                ...options,
            },
            name: 'IsBytesLike',
            target: object ? object.constructor : undefined,
            constraints: [],
            validator: {
                validate(value) {
                    let result = false;
                    try {
                        if (value) {
                            switch (typeof value) {
                                case 'string':
                                    if (options.acceptText) {
                                        result = true;
                                    }
                                    else {
                                        result = (0, viem_1.isHex)(value) && value.length % 2 === 0;
                                    }
                                    break;
                                case 'object':
                                    result = (0, viem_1.isHex)(value);
                                    break;
                            }
                        }
                    }
                    catch (err) {
                    }
                    return result;
                },
            },
        });
    };
}
//# sourceMappingURL=is-bytes-like.validator.js.map