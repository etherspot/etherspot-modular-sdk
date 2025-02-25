import { BigNumberish } from '../types/bignumber.js';
import { PublicClient } from 'viem';
export interface Gas {
    maxFeePerGas: BigNumberish;
    maxPriorityFeePerGas: BigNumberish;
}
export declare function getGasFee(publicClient: PublicClient): Promise<Gas>;
//# sourceMappingURL=getGasFee.d.ts.map