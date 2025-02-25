"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformBigNumber = TransformBigNumber;
const class_transformer_1 = require("class-transformer");
const index_js_1 = require("../utils/index.js");
const bignumber_js_1 = require("../../types/bignumber.js");
function TransformBigNumber() {
    return (0, class_transformer_1.Transform)((params) => {
        const { type, value } = params;
        let result = null;
        switch (type) {
            case class_transformer_1.TransformationType.PLAIN_TO_CLASS:
                result = value ? bignumber_js_1.BigNumber.from(value) : null;
                break;
            case class_transformer_1.TransformationType.CLASS_TO_CLASS:
                result = value;
                break;
            case class_transformer_1.TransformationType.CLASS_TO_PLAIN:
                result = (0, index_js_1.isBigNumber)(value) ? bignumber_js_1.BigNumber.from(value).toHexString() : '0x00';
                break;
        }
        return result;
    });
}
//# sourceMappingURL=transform-big-number.js.map