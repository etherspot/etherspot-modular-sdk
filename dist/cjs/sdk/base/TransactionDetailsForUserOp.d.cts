import { BigNumberish } from '../types/bignumber.cjs';

interface TransactionDetailsForUserOp {
    target: string | string[];
    data: string | string[];
    value?: BigNumberish;
    values?: BigNumberish[];
    gasLimit?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    maxPriorityFeePerGas?: BigNumberish;
    dummySignature?: string;
}
interface TransactionGasInfoForUserOp {
    gasLimit?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    maxPriorityFeePerGas?: BigNumberish;
}

export type { TransactionDetailsForUserOp, TransactionGasInfoForUserOp };
