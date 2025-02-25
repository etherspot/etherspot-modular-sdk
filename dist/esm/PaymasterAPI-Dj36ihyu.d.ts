import { UserOperationStruct } from './sdk/types/user-operation-types.js';
import { UserOperation } from './sdk/common/ERC4337Utils.js';

interface PaymasterResponse {
    result: {
        paymaster: string;
        paymasterData: string;
        preVerificationGas: string;
        verificationGasLimit: string;
        callGasLimit: string;
        paymasterVerificationGasLimit: string;
        paymasterPostOpGasLimit: string;
    };
}
declare class VerifyingPaymasterAPI extends PaymasterAPI {
    private paymasterUrl;
    private entryPoint;
    private context;
    constructor(paymasterUrl: string, entryPoint: string, context: any);
    getPaymasterData(userOp: Partial<UserOperation>): Promise<PaymasterResponse>;
}
declare const getVerifyingPaymaster: (paymasterUrl: string, entryPoint: string, context: any) => VerifyingPaymasterAPI;

declare class PaymasterAPI {
    getPaymasterData(userOp: Partial<UserOperationStruct>): Promise<PaymasterResponse | undefined>;
}

export { PaymasterAPI as P, VerifyingPaymasterAPI as V, type PaymasterResponse as a, getVerifyingPaymaster as g };
