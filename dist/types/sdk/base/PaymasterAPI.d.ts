import { UserOperationStruct } from '../types/user-operation-types.js';
import { PaymasterResponse } from './VerifyingPaymasterAPI.js';
/**
 * an API to external a UserOperation with paymaster info
 */
export declare class PaymasterAPI {
    /**
     * @param userOp a partially-filled UserOperation (without signature and paymasterData
     *  note that the "preVerificationGas" is incomplete: it can't account for the
     *  paymasterData value, which will only be returned by this method..
     * @returns the value to put into the PaymasterData, undefined to leave it empty
     */
    getPaymasterData(userOp: Partial<UserOperationStruct>): Promise<PaymasterResponse | undefined>;
}
//# sourceMappingURL=PaymasterAPI.d.ts.map