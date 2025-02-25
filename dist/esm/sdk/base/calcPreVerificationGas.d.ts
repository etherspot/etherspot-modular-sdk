import { BaseAccountUserOperationStruct } from '../types/user-operation-types.js';
import '../common/types.js';
import 'viem';
import '../types/bignumber.js';

interface GasOverheads {
    fixed: number;
    perUserOp: number;
    perUserOpWord: number;
    zeroByte: number;
    nonZeroByte: number;
    bundleSize: number;
    sigSize: number;
}
declare const DefaultGasOverheads: GasOverheads;
declare function calcPreVerificationGas(userOp: Partial<BaseAccountUserOperationStruct>, overheads?: Partial<GasOverheads>): number;

export { DefaultGasOverheads, type GasOverheads, calcPreVerificationGas };
