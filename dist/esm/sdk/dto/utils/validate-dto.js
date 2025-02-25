import { validate } from 'class-validator';
import { ValidationException, prepareAddresses } from '../../common/index.js';
/**
 * @ignore
 */
export async function validateDto(dto, DtoConstructor, options = {}) {
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
            dtoWithoutUndefined = prepareAddresses(dtoWithoutUndefined, ...addressKeys);
        }
        Object.assign(result, dtoWithoutUndefined);
    }
    catch (err) {
        //
    }
    const errors = await validate(result, {
        forbidUnknownValues: true,
        validationError: {
            target: false,
            value: false,
        },
    });
    if (errors && errors.length) {
        throw new ValidationException(errors);
    }
    return result;
}
//# sourceMappingURL=validate-dto.js.map