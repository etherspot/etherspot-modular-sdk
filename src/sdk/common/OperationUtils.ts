import { resolveProperties } from './utils/index.js';
import { BaseAccountUserOperationStruct } from '../types/user-operation-types.js';
import { toHex } from 'viem';
import { BigNumber } from '../types/bignumber.js';

/**
 * Converts a partial BaseAccountUserOperationStruct to a JSON object with all values hexlified.
 * @param op Partial user operation
 * @returns Promise resolving to a JSON object with hexlified values
 */
export async function toJSON(op: Partial<BaseAccountUserOperationStruct>): Promise<Record<string, string>> {
  return resolveProperties(op).then((userOp) =>
    Object.keys(userOp)
      .map((key) => {
        let val = (userOp as any)[key];
        if (typeof val === 'object' && BigNumber.isBigNumber(val)) {
          val = val.toHexString()
        }
        else if (typeof val !== 'string' || !val.startsWith('0x')) {
          val = toHex(val);
        }
        return [key, val as string];
      })
      .reduce(
        (set, [k, v]) => ({
          ...set,
          [k]: v,
        }),
        {} as Record<string, string>,
      ),
  );
}
export async function printOp(op: Partial<BaseAccountUserOperationStruct>): Promise<string> {
  return toJSON(op).then((userOp) => JSON.stringify(userOp, null, 2));
}
