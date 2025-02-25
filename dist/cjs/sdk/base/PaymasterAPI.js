"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymasterAPI = void 0;
class PaymasterAPI {
    async getPaymasterData(userOp) {
        return { result: { paymaster: '0x', paymasterData: '0x', paymasterPostOpGasLimit: '0x', paymasterVerificationGasLimit: '0x', preVerificationGas: '0x', verificationGasLimit: '0x', callGasLimit: '0x' } };
    }
}
exports.PaymasterAPI = PaymasterAPI;
//# sourceMappingURL=PaymasterAPI.js.map