import { isHex as isAHex} from 'viem';

/**
 * @ignore
 */
export function isHex(hex: string, size = 0): boolean {
  let result = isAHex(hex);

  if (result && size > 0) {
    result = hex.length === size * 2 + 2;
  }

  return result;
}
