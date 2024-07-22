import { encodePacked, Hex } from "viem";
import { isAddress } from "./viem-utils";
import { BytesLike } from "../types";
import { utils } from "ethers";
import { isHex as isAHex, stringToBytes} from 'viem';

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
  
  export function isHex(hex: string, size = 0): boolean {
    let result = isAHex(hex);
  
    if (result && size > 0) {
      result = hex.length === size * 2 + 2;
    }
  
    return result;
  }
  
  export function toHexFromBytesLike(data: BytesLike): string {
    let result: string = null;
  
    if (data !== null) {
      switch (typeof data) {
        case 'string':
          if (isHex(data)) {
            result = data;
          } else {
            result = toHexFromBytesLike(stringToBytes(data));
          }
          break;
  
        case 'object':
          try {
            result = toHexFromBytesLike(data as any);
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
  
  export function concatHex(...hex: string[]): string {
    return hex.map((item, index) => (index ? item.slice(2) : item)).join('');
  }
  