"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = toJSON;
exports.printOp = printOp;
const index_js_1 = require("./utils/index.js");
const viem_1 = require("viem");
const bignumber_js_1 = require("../types/bignumber.js");
function toJSON(op) {
    return (0, index_js_1.resolveProperties)(op).then((userOp) => Object.keys(userOp)
        .map((key) => {
        let val = userOp[key];
        if (typeof val === 'object' && bignumber_js_1.BigNumber.isBigNumber(val)) {
            val = val.toHexString();
        }
        else if (typeof val !== 'string' || !val.startsWith('0x')) {
            val = (0, viem_1.toHex)(val);
        }
        return [key, val];
    })
        .reduce((set, [k, v]) => ({
        ...set,
        [k]: v,
    }), {}));
}
async function printOp(op) {
    return toJSON(op).then((userOp) => JSON.stringify(userOp, null, 2));
}
//# sourceMappingURL=OperationUtils.js.map