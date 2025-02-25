import { packUserOp } from '../common/index.js';
import { Buffer } from 'buffer';
import { toBytes, toHex } from 'viem';
export const DefaultGasOverheads = {
    fixed: 21000,
    perUserOp: 18300,
    perUserOpWord: 4,
    zeroByte: 4,
    nonZeroByte: 16,
    bundleSize: 1,
    sigSize: 65,
};
/**
 * calculate the preVerificationGas of the given UserOperation
 * preVerificationGas (by definition) is the cost overhead that can't be calculated on-chain.
 * it is based on parameters that are defined by the Ethereum protocol for external transactions.
 * @param userOp filled userOp to calculate. The only possible missing fields can be the signature and preVerificationGas itself
 * @param overheads gas overheads to use, to override the default values
 */
export function calcPreVerificationGas(userOp, overheads) {
    const ov = { ...DefaultGasOverheads, ...(overheads ?? {}) };
    const p = {
        // dummy values, in case the UserOp is incomplete.
        preVerificationGas: 21000, // dummy value, just for calldata cost
        signature: toHex(Buffer.alloc(ov.sigSize, 1)), // dummy signature
        ...userOp,
    };
    const packed = toBytes(packUserOp(p, false));
    const callDataCost = packed.map((x) => (x === 0 ? ov.zeroByte : ov.nonZeroByte)).reduce((sum, x) => sum + x);
    const ret = Math.round(callDataCost + ov.fixed / ov.bundleSize + ov.perUserOp + ov.perUserOpWord * packed.length);
    return ret;
}
//# sourceMappingURL=calcPreVerificationGas.js.map