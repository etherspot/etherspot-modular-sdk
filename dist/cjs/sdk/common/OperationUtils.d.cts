import { BaseAccountUserOperationStruct } from '../types/user-operation-types.cjs';
import './types.cjs';
import 'viem';
import '../types/bignumber.cjs';

declare function toJSON(op: Partial<BaseAccountUserOperationStruct>): Promise<any>;
declare function printOp(op: Partial<BaseAccountUserOperationStruct>): Promise<string>;

export { printOp, toJSON };
