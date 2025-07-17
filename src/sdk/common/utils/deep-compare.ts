import { BigNumber } from '../../types/bignumber.js';
import { isBigNumber } from './bignumber-utils.js';

/**
 * Deeply compares two values for equality, supporting BigNumber, Date, arrays, and objects.
 * Throws an error if an unexpected type is encountered.
 * @param a First value
 * @param b Second value
 * @returns True if equal, false otherwise
 */
export function deepCompare(a: unknown, b: unknown): boolean {
  let result = false;

  const aType = typeof a;
  if (aType === typeof b) {
    switch (aType) {
      case 'object':
        if (a === null || b === null) {
          result = a === b;
        } else if (a === b) {
          result = true;
        } else if (isBigNumber(a) && isBigNumber(b)) {
          result = (a as BigNumber).eq(b as BigNumber);
        } else if (a instanceof Date && b instanceof Date) {
          result = a.getTime() === b.getTime();
        } else {
          const aIsArray = Array.isArray(a);
          const bIsArray = Array.isArray(b);

          if (aIsArray && bIsArray) {
            const aLength = (a as unknown[]).length;
            const bLength = (b as unknown[]).length;

            if (aLength === bLength) {
              result = true;

              for (let index = 0; index < aLength; index += 1) {
                if (!deepCompare((a as unknown[])[index], (b as unknown[])[index])) {
                  result = false;
                  break;
                }
              }
            }
          } else if (!aIsArray && !bIsArray) {
            const aKeys = Object.keys(a as object);
            const bKeys = Object.keys(b as object);

            if (aKeys.length === bKeys.length) {
              result = true;

              for (const key of aKeys) {
                if (!deepCompare((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
                  result = false;
                  break;
                }
              }
            }
          } else {
            throw new Error('deepCompare: Mismatched array/object types');
          }
        }
        break;

      case 'function':
        result = true;
        break;

      case 'undefined':
      case 'boolean':
      case 'number':
      case 'string':
        result = a === b;
        break;

      default:
        throw new Error(`deepCompare: Unexpected type '${aType}' encountered`);
    }
  }

  return result;
}
