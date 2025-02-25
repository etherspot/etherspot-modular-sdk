import { BaseAccountUserOperationStruct } from '../types/user-operation-types.cjs';
import '../common/types.cjs';
import 'viem';
import '../types/bignumber.cjs';

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
