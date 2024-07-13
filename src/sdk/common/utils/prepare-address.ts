import { getAddress } from 'viem';
import { AddressZero } from '../constants';

/**
 * @ignore
 */
// TODO - test this function
export function prepareAddress(value: string, zeroAddressAsNull = false): string {
  let result: string = null;

  try {
    result = getAddress(value);

    if (result === AddressZero) {
      result = null;
    }
  } catch (err) {
    //
  }

  if (!result && zeroAddressAsNull) {
    result = AddressZero;
  }

  return result;
}
