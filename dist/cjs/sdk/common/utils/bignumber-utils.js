"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigNumberishToBigInt = bigNumberishToBigInt;
exports.isBigNumber = isBigNumber;
exports.fromBigInt = fromBigInt;
const bignumber_js_1 = require("../../types/bignumber.js");
function bigNumberishToBigInt(value) {
    if (typeof value === 'bigint') {
        return value;
    }
    else if (typeof value === 'string' || typeof value === 'number') {
        return BigInt(value);
    }
    else if (bignumber_js_1.BigNumber.isBigNumber(value)) {
        return BigInt(value.toString());
    }
    else {
        throw new Error('Unsupported BigNumberish type');
    }
}
function isBigNumber(value) {
    return value instanceof bignumber_js_1.BigNumber;
}
function fromBigInt(value) {
    return bignumber_js_1.BigNumber.from(value.toString());
}
//# sourceMappingURL=bignumber-utils.js.map