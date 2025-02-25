import { PaymasterAPI } from './PaymasterAPI.js';
import { UserOperation } from '../common/index.js';
export interface PaymasterResponse {
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
export declare class VerifyingPaymasterAPI extends PaymasterAPI {
    private paymasterUrl;
    private entryPoint;
    private context;
    constructor(paymasterUrl: string, entryPoint: string, context: any);
    getPaymasterData(userOp: Partial<UserOperation>): Promise<PaymasterResponse>;
}
export declare const getVerifyingPaymaster: (paymasterUrl: string, entryPoint: string, context: any) => VerifyingPaymasterAPI;
//# sourceMappingURL=VerifyingPaymasterAPI.d.ts.map