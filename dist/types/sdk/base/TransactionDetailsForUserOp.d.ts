import { BigNumberish } from "../types/bignumber.js";
/**
 * basic struct to create a UserOperation from
 */
export interface TransactionDetailsForUserOp {
    target: string | string[];
    data: string | string[];
    value?: BigNumberish;
    values?: BigNumberish[];
    gasLimit?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    maxPriorityFeePerGas?: BigNumberish;
    dummySignature?: string;
}
export interface TransactionGasInfoForUserOp {
    gasLimit?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    maxPriorityFeePerGas?: BigNumberish;
}
//# sourceMappingURL=TransactionDetailsForUserOp.d.ts.map