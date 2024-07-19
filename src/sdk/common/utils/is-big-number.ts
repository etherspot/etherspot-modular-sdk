import { BigNumber } from '../../types/bignumber';

/**
 * @ignore
 */
export function isBigNumber(value: any): boolean {
  return value instanceof BigNumber;
}
