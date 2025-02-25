import { resolveProperties } from './utils/index.js';
import { toHex } from 'viem';
import { BigNumber } from '../types/bignumber.js';
export function toJSON(op) {
    return resolveProperties(op).then((userOp) => Object.keys(userOp)
        .map((key) => {
        let val = userOp[key];
        if (typeof val === 'object' && BigNumber.isBigNumber(val)) {
            val = val.toHexString();
        }
        else if (typeof val !== 'string' || !val.startsWith('0x')) {
            val = toHex(val);
        }
        return [key, val];
    })
        .reduce((set, [k, v]) => ({
        ...set,
        [k]: v,
    }), {}));
}
export async function printOp(op) {
    return toJSON(op).then((userOp) => JSON.stringify(userOp, null, 2));
}
//# sourceMappingURL=OperationUtils.js.map