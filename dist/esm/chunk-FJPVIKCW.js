import {
  BigNumber
} from "./chunk-LWM5MV7Z.js";

// src/sdk/dto/validators/is-big-numberish.validator.ts
import { registerDecorator } from "class-validator";
function IsBigNumberish(options = {}, validationOptions = {}) {
  return (object, propertyName) => {
    const { positive } = options;
    registerDecorator({
      propertyName,
      options: {
        message: `${propertyName} must be ${positive ? "positive " : ""}big numberish`,
        ...validationOptions
      },
      name: "IsBigNumberish",
      target: object.constructor,
      constraints: [],
      validator: {
        validate(value) {
          let result = false;
          try {
            const bn = BigNumber.from(value);
            result = positive ? bn.gt(0) : bn.gte(0);
          } catch (err) {
          }
          return result;
        }
      }
    });
  };
}

export {
  IsBigNumberish
};
//# sourceMappingURL=chunk-FJPVIKCW.js.map