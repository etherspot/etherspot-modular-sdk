import { BytesLike } from '../types';
import { isHex } from './is-hex';
import { stringToBytes } from 'viem';

/**
 * @ignore
 */
export function toHex(data: BytesLike): string {
  let result: string = null;

  if (data !== null) {
    switch (typeof data) {
      case 'string':
        if (isHex(data)) {
          result = data;
        } else {
          result = toHex(stringToBytes(data));
        }
        break;

      case 'object':
        try {
          result = toHex(data as any);
        } catch (err) {
          result = null;
        }
        break;
    }
  }

  if (!result) {
    throw new Error('invalid hex data');
  }

  return result;
}
