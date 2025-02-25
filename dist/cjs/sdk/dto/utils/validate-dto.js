"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = validateDto;
const class_validator_1 = require("class-validator");
const index_js_1 = require("../../common/index.js");
async function validateDto(dto, DtoConstructor, options = {}) {
    const result = new DtoConstructor();
    const { addressKeys } = options;
    try {
        let dtoWithoutUndefined = Object.entries(dto).reduce((result, [key, value]) => {
            if (typeof value !== 'undefined') {
                result = {
                    ...result,
                    [key]: value,
                };
            }
            return result;
        }, {});
        if (addressKeys) {
            dtoWithoutUndefined = (0, index_js_1.prepareAddresses)(dtoWithoutUndefined, ...addressKeys);
        }
        Object.assign(result, dtoWithoutUndefined);
    }
    catch (err) {
    }
    const errors = await (0, class_validator_1.validate)(result, {
        forbidUnknownValues: true,
        validationError: {
            target: false,
            value: false,
        },
    });
    if (errors && errors.length) {
        throw new index_js_1.ValidationException(errors);
    }
    return result;
}
//# sourceMappingURL=validate-dto.js.map