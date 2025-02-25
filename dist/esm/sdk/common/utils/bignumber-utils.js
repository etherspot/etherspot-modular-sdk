import { BigNumber } from '../../types/bignumber.js';
// Function to convert BigNumberish to bigint
export function bigNumberishToBigInt(value) {
    if (typeof value === 'bigint') {
        return value;
    }
    else if (typeof value === 'string' || typeof value === 'number') {
        return BigInt(value);
    }
    else if (BigNumber.isBigNumber(value)) {
        return BigInt(value.toString());
    }
    else {
        throw new Error('Unsupported BigNumberish type');
    }
}
export function isBigNumber(value) {
    return value instanceof BigNumber;
}
export function fromBigInt(value) {
    return BigNumber.from(value.toString());
}
//# sourceMappingURL=bignumber-utils.js.map