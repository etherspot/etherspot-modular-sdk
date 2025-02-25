import {
  isUrl
} from "./chunk-ZOZG64B5.js";

// src/sdk/dto/validators/is-url.validator.ts
import { registerDecorator } from "class-validator";
function IsUrl(validationOptions = {}) {
  return (object, propertyName) => {
    registerDecorator({
      propertyName,
      options: {
        message: `${propertyName} must be url`,
        ...validationOptions
      },
      name: "isUrl",
      target: object.constructor,
      constraints: [],
      validator: {
        validate(value) {
          return isUrl(value);
        }
      }
    });
  };
}

export {
  IsUrl
};
//# sourceMappingURL=chunk-MHVYE5E2.js.map