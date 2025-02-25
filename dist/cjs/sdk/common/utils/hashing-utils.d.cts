import { BytesLike } from '../types.cjs';
import 'viem';

declare function keccak256(data: BytesLike): string;
declare function isHex(hex: string, size?: number): boolean;
declare function toHexFromBytesLike(data: BytesLike): string;
declare function concatHex(...hex: string[]): string;

export { concatHex, isHex, keccak256, toHexFromBytesLike };
