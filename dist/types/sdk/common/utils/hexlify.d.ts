import { Bytes, BytesLike } from "../index.js";
export type DataOptions = {
    allowMissingPrefix?: boolean;
    hexPad?: "left" | "right" | null;
};
export interface Hexable {
    toHexString(): string;
}
export declare function isBytesLikeValue(value: any): value is BytesLike;
export declare function isBytes(value: any): value is Bytes;
export declare function isHexString(value: any, length?: number): boolean;
export declare function checkSafeUint53(value: number, message?: string): void;
export declare function hexlifyValue(value: BytesLike | Hexable | number | bigint, options?: DataOptions): string;
//# sourceMappingURL=hexlify.d.ts.map