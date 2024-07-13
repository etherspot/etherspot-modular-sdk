import { BigNumber, BigNumberish } from "ethers";

// Function to convert BigNumberish to bigint
export function bigNumberishToBigInt(value: BigNumberish): bigint {
    if (typeof value === 'bigint') {
      return value;
    } else if (typeof value === 'string' || typeof value === 'number') {
      return BigInt(value);
    } else if (BigNumber.isBigNumber(value)) {
      return BigInt(value.toString());
    } else {
      throw new Error('Unsupported BigNumberish type');
    }
  }