import { utils, BytesLike } from 'ethers';
import { isAddress } from './is-address';
import { isHex } from './is-hex';
import { encodePacked, Hex } from 'viem';

/**
 * @ignore
 */
export function keccak256(data: BytesLike): string {
  let result: string = null;

  if (data) {
    switch (typeof data) {
      case 'string':
        if (isAddress(data)) {
          result = keccak256(encodePacked(['address'], [data as Hex]))  
        } else if (isHex(data)) {
          result = keccak256(encodePacked(['bytes'], [data as Hex]));
        } else {
          result = keccak256(encodePacked(['string'], [data as Hex]));
        }
        break;
      case 'object':
        result = utils.solidityKeccak256(['bytes'], [data]);
        break;
    }
  }

  return result;
}
