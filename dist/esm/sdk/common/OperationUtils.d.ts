import { BaseAccountUserOperationStruct } from '../types/user-operation-types.js';
import './types.js';
import 'viem';
import '../types/bignumber.js';

declare function toJSON(op: Partial<BaseAccountUserOperationStruct>): Promise<any>;
declare function printOp(op: Partial<BaseAccountUserOperationStruct>): Promise<string>;

export { printOp, toJSON };
