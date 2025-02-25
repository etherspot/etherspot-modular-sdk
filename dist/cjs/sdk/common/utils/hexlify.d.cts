import { BytesLike, Bytes } from '../types.cjs';
import 'viem';

type DataOptions = {
    allowMissingPrefix?: boolean;
    hexPad?: "left" | "right" | null;
};
interface Hexable {
    toHexString(): string;
}
declare function isBytesLikeValue(value: any): value is BytesLike;
declare function isBytes(value: any): value is Bytes;
declare function isHexString(value: any, length?: number): boolean;
declare function checkSafeUint53(value: number, message?: string): void;
declare function hexlifyValue(value: BytesLike | Hexable | number | bigint, options?: DataOptions): string;

export { type DataOptions, type Hexable, checkSafeUint53, hexlifyValue, isBytes, isBytesLikeValue, isHexString };
