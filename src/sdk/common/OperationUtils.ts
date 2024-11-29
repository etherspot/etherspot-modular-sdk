import { resolveProperties } from './utils';
import { BaseAccountUserOperationStruct } from '../types/user-operation-types';
import { toHex } from 'viem';

export function toJSON(op: Partial<BaseAccountUserOperationStruct>): Promise<any> {
  return resolveProperties(op).then((userOp) =>
    Object.keys(userOp)
      .map((key) => {
        let val = (userOp as any)[key];
        if (typeof val !== 'string' || !val.startsWith('0x')) {
          val = toHex(val);
        }
        return [key, val];
      })
      .reduce(
        (set, [k, v]) => ({
          ...set,
          [k]: v,
        }),
        {},
      ),
  );
}
export async function printOp(op: Partial<BaseAccountUserOperationStruct>): Promise<string> {
  return toJSON(op).then((userOp) => JSON.stringify(userOp, null, 2));
}
