import {
  isAddress
} from "./chunk-BFP3WTVA.js";

// src/sdk/dto/validators/is-address.validator.ts
import { registerDecorator } from "class-validator";
function IsAddress(options = {}) {
  return (object, propertyName) => {
    registerDecorator({
      propertyName,
      options: {
        message: `${propertyName} must be an address`,
        ...options
      },
      name: "isAddress",
      target: object.constructor,
      constraints: [],
      validator: {
        validate(value) {
          return isAddress(value);
        }
      }
    });
  };
}

export {
  IsAddress
};
//# sourceMappingURL=chunk-IA5TOLW2.js.map