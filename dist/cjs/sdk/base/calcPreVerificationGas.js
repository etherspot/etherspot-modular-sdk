"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultGasOverheads = void 0;
exports.calcPreVerificationGas = calcPreVerificationGas;
const index_js_1 = require("../common/index.js");
const buffer_1 = require("buffer");
const viem_1 = require("viem");
exports.DefaultGasOverheads = {
    fixed: 21000,
    perUserOp: 18300,
    perUserOpWord: 4,
    zeroByte: 4,
    nonZeroByte: 16,
    bundleSize: 1,
    sigSize: 65,
};
function calcPreVerificationGas(userOp, overheads) {
    const ov = { ...exports.DefaultGasOverheads, ...(overheads ?? {}) };
    const p = {
        preVerificationGas: 21000,
        signature: (0, viem_1.toHex)(buffer_1.Buffer.alloc(ov.sigSize, 1)),
        ...userOp,
    };
    const packed = (0, viem_1.toBytes)((0, index_js_1.packUserOp)(p, false));
    const callDataCost = packed.map((x) => (x === 0 ? ov.zeroByte : ov.nonZeroByte)).reduce((sum, x) => sum + x);
    const ret = Math.round(callDataCost + ov.fixed / ov.bundleSize + ov.perUserOp + ov.perUserOpWord * packed.length);
    return ret;
}
//# sourceMappingURL=calcPreVerificationGas.js.map