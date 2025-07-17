import { encodePacked, Hex } from "viem";
import { isAddress } from "./viem-utils.js";
import { BytesLike } from "../index.js";
import { isHex as isAHex, stringToBytes} from 'viem';

/**
 * Computes the keccak256 hash of the input data.
 * Handles string, address, hex, and object (Uint8Array/Buffer) types.
 * @param data Input data to hash
 * @returns Keccak256 hash as a string
 */
export function keccak256(data: BytesLike): string {
    let result = '';

    if (data) {
      switch (typeof data) {
        case 'string':
          if (isAddress(data)) {
            result = keccak256(encodePacked(['address'], [data as Hex]))  
          } else if (isAHex(data)) {
            result = keccak256(encodePacked(['bytes'], [data as Hex]));
          } else {
            result = keccak256(encodePacked(['string'], [data as Hex]));
          }
          break;
        case 'object': {
          // LibraryFix: Only handle Uint8Array or Buffer for object input
          if (data instanceof Uint8Array || (typeof Buffer !== 'undefined' && data instanceof Buffer)) {
            // Convert to hex string first
            const hexString = Array.from(data).map(b => b.toString(16).padStart(2, '0')).join('');
            result = keccak256(encodePacked(['bytes'], [`0x${hexString}` as Hex]));
          } else {
            // Warn and throw for unsupported object types
            console.warn('keccak256: Unsupported object type for hashing. Only Uint8Array or Buffer are supported.');
            throw new Error('Unsupported object type for keccak256 hashing');
          }
          break;
        }
        default:
          throw new Error('Unsupported data type for keccak256 hashing');
      }
    }

    return result;
}

export function isHex(hex: string, size = 0): boolean {
    let result = isAHex(hex);

    if (result && size > 0) {
      result = hex.length === size * 2 + 2;
    }

    return result;
}

export function toHexFromBytesLike(data: BytesLike): string {
    let result = '';

    if (data !== null) {
      switch (typeof data) {
        case 'string':
          if (isAddress(data)) {
            result = data;
          } else if (isAHex(data)) {
            result = data;
          } else {
            const bytes = stringToBytes(data);
            result = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
          }
          break;

        case 'object':
          try {
            if (data instanceof Uint8Array || (typeof Buffer !== 'undefined' && data instanceof Buffer)) {
              result = Array.from(data).map(b => b.toString(16).padStart(2, '0')).join('');
            } else {
              throw new Error('Unsupported object type');
            }
          } catch (error) {
            throw new Error('invalid hex data');
          }
          break;
      }
    }

    if (!result) {
      throw new Error('invalid hex data');
    }

    return result;
}

export function concatHex(...hex: string[]): string {
    return hex.map((item, index) => (index ? item.slice(2) : item)).join('');
}
  