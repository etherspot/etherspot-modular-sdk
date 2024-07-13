import { getAddress } from 'viem';
import { AddressZero } from '../constants';

/**
 * @ignore
 */
export function isAddress(value: string): boolean {
  let result = false;

  if (value && value !== AddressZero) {
    try {
      const address = getAddress(value);

      if (address) {
        result = address === value;
      }
    } catch (err) {
      result = false;
    }
  } else if (value === AddressZero) {
    result = true;
  }

  return result;
}
