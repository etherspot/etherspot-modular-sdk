import {
  packUserOp
} from "./chunk-DDDNIC7V.js";
import {
  toBytes,
  toHex
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/base/calcPreVerificationGas.ts
import { Buffer } from "buffer";
var DefaultGasOverheads = {
  fixed: 21e3,
  perUserOp: 18300,
  perUserOpWord: 4,
  zeroByte: 4,
  nonZeroByte: 16,
  bundleSize: 1,
  sigSize: 65
};
function calcPreVerificationGas(userOp, overheads) {
  const ov = { ...DefaultGasOverheads, ...overheads ?? {} };
  const p = {
    // dummy values, in case the UserOp is incomplete.
    preVerificationGas: 21e3,
    // dummy value, just for calldata cost
    signature: toHex(Buffer.alloc(ov.sigSize, 1)),
    // dummy signature
    ...userOp
  };
  const packed = toBytes(packUserOp(p, false));
  const callDataCost = packed.map((x) => x === 0 ? ov.zeroByte : ov.nonZeroByte).reduce((sum, x) => sum + x);
  const ret = Math.round(callDataCost + ov.fixed / ov.bundleSize + ov.perUserOp + ov.perUserOpWord * packed.length);
  return ret;
}

export {
  DefaultGasOverheads,
  calcPreVerificationGas
};
//# sourceMappingURL=chunk-VJN3GYFI.js.map