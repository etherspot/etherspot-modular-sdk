import {
  isBigNumber
} from "./chunk-QN43T53T.js";
import {
  BigNumber
} from "./chunk-LWM5MV7Z.js";

// src/sdk/common/transformers/transform-big-number.ts
import { Transform, TransformationType } from "class-transformer";
function TransformBigNumber() {
  return Transform((params) => {
    const { type, value } = params;
    let result = null;
    switch (type) {
      case TransformationType.PLAIN_TO_CLASS:
        result = value ? BigNumber.from(value) : null;
        break;
      case TransformationType.CLASS_TO_CLASS:
        result = value;
        break;
      case TransformationType.CLASS_TO_PLAIN:
        result = isBigNumber(value) ? BigNumber.from(value).toHexString() : "0x00";
        break;
    }
    return result;
  });
}

export {
  TransformBigNumber
};
//# sourceMappingURL=chunk-P3ASQGGB.js.map