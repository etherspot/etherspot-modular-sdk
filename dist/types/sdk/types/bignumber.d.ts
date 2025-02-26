export type Bytes = ArrayLike<number>;
export declare const version = "logger/5.7.0";
export interface Hexable {
    toHexString(): string;
}
export type BigNumberish = BigNumber | Bytes | bigint | string | number;
export declare function isBigNumberish(value: any): value is BigNumberish;
export declare class BigNumber implements Hexable {
    readonly _hex: string;
    readonly _isBigNumber: boolean;
    constructor(constructorGuard: any, hex: string);
    fromTwos(value: number): BigNumber;
    toTwos(value: number): BigNumber;
    abs(): BigNumber;
    add(other: BigNumberish): BigNumber;
    sub(other: BigNumberish): BigNumber;
    div(other: BigNumberish): BigNumber;
    mul(other: BigNumberish): BigNumber;
    mod(other: BigNumberish): BigNumber;
    pow(other: BigNumberish): BigNumber;
    and(other: BigNumberish): BigNumber;
    or(other: BigNumberish): BigNumber;
    xor(other: BigNumberish): BigNumber;
    mask(value: number): BigNumber;
    shl(value: number): BigNumber;
    shr(value: number): BigNumber;
    eq(other: BigNumberish): boolean;
    lt(other: BigNumberish): boolean;
    lte(other: BigNumberish): boolean;
    gt(other: BigNumberish): boolean;
    gte(other: BigNumberish): boolean;
    isNegative(): boolean;
    isZero(): boolean;
    toNumber(): number;
    toBigInt(): bigint;
    toString(): string;
    toHexString(): string;
    toJSON(key?: string): any;
    static from(value: any): BigNumber;
    static isBigNumber(value: any): value is BigNumber;
}
export declare function _base36To16(value: string): string | undefined;
export declare function _base16To36(value: string): string | undefined;
export declare function throwFault(fault: string, operation: string, value?: any): never;
//# sourceMappingURL=bignumber.d.ts.map