import { BigNumberish } from '../types/bignumber.cjs';
import { PublicClient } from 'viem';

interface Gas {
    maxFeePerGas: BigNumberish;
    maxPriorityFeePerGas: BigNumberish;
}
declare function getGasFee(publicClient: PublicClient): Promise<Gas>;

export { type Gas, getGasFee };
