import { BigNumberish, BigNumber } from '../../types/bignumber.js';

declare function bigNumberishToBigInt(value: BigNumberish): bigint;
declare function isBigNumber(value: any): boolean;
declare function fromBigInt(value: bigint): BigNumber;

export { bigNumberishToBigInt, fromBigInt, isBigNumber };
