import {
  isHex
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/dto/validators/is-bytes-like.validator.ts
import { registerDecorator } from "class-validator";
function IsBytesLike(options = {}) {
  return (object, propertyName) => {
    registerDecorator({
      propertyName,
      options: {
        message: `${propertyName} must be bytes like`,
        ...options
      },
      name: "IsBytesLike",
      target: object ? object.constructor : void 0,
      constraints: [],
      validator: {
        validate(value) {
          let result = false;
          try {
            if (value) {
              switch (typeof value) {
                case "string":
                  if (options.acceptText) {
                    result = true;
                  } else {
                    result = isHex(value) && value.length % 2 === 0;
                  }
                  break;
                case "object":
                  result = isHex(value);
                  break;
              }
            }
          } catch (err) {
          }
          return result;
        }
      }
    });
  };
}

export {
  IsBytesLike
};
//# sourceMappingURL=chunk-MZTFRCWQ.js.map