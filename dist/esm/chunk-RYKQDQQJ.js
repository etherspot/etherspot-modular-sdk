import {
  ValidationException
} from "./chunk-TFOPGRAD.js";
import {
  prepareAddresses
} from "./chunk-BFP3WTVA.js";

// src/sdk/dto/utils/validate-dto.ts
import { validate } from "class-validator";
async function validateDto(dto, DtoConstructor, options = {}) {
  const result = new DtoConstructor();
  const { addressKeys } = options;
  try {
    let dtoWithoutUndefined = Object.entries(dto).reduce((result2, [key, value]) => {
      if (typeof value !== "undefined") {
        result2 = {
          ...result2,
          [key]: value
        };
      }
      return result2;
    }, {});
    if (addressKeys) {
      dtoWithoutUndefined = prepareAddresses(dtoWithoutUndefined, ...addressKeys);
    }
    Object.assign(result, dtoWithoutUndefined);
  } catch (err) {
  }
  const errors = await validate(result, {
    forbidUnknownValues: true,
    validationError: {
      target: false,
      value: false
    }
  });
  if (errors && errors.length) {
    throw new ValidationException(errors);
  }
  return result;
}

export {
  validateDto
};
//# sourceMappingURL=chunk-RYKQDQQJ.js.map