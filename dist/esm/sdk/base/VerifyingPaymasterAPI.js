import fetch from 'cross-fetch';
import { calcPreVerificationGas } from './calcPreVerificationGas.js';
import { PaymasterAPI } from './PaymasterAPI.js';
import { toJSON } from '../common/OperationUtils.js';
import { resolveProperties } from '../common/utils/index.js';
import { BigNumber } from '../types/bignumber.js';
const DUMMY_SIGNATURE = '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c';
export class VerifyingPaymasterAPI extends PaymasterAPI {
    constructor(paymasterUrl, entryPoint, context) {
        super();
        this.paymasterUrl = paymasterUrl;
        this.entryPoint = entryPoint;
        this.context = context;
    }
    async getPaymasterData(userOp) {
        // Hack: userOp includes empty paymasterData which calcPreVerificationGas requires.
        try {
            // userOp.preVerificationGas contains a promise that will resolve to an error.
            await resolveProperties(userOp);
            // eslint-disable-next-line no-empty
        }
        catch (_) { }
        let pmOp;
        if (userOp.factoryData !== "0x") {
            pmOp = {
                sender: userOp.sender,
                nonce: userOp.nonce,
                factory: userOp.factory,
                factoryData: userOp.factoryData,
                callData: userOp.callData,
                callGasLimit: userOp.callGasLimit,
                verificationGasLimit: userOp.verificationGasLimit,
                maxFeePerGas: userOp.maxFeePerGas,
                maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
                signature: DUMMY_SIGNATURE,
            };
        }
        else {
            pmOp = {
                sender: userOp.sender,
                nonce: userOp.nonce,
                factoryData: userOp.factoryData,
                callData: userOp.callData,
                callGasLimit: userOp.callGasLimit,
                verificationGasLimit: userOp.verificationGasLimit,
                maxFeePerGas: userOp.maxFeePerGas,
                maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
                signature: DUMMY_SIGNATURE,
            };
        }
        const op = await resolveProperties(pmOp);
        op.preVerificationGas = calcPreVerificationGas(op);
        // Ask the paymaster to sign the transaction and return a valid paymasterData value.
        const paymasterData = await fetch(this.paymasterUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ method: 'pm_sponsorUserOperation', params: [await toJSON(op), this.entryPoint, this.context], jsonrpc: '2', id: 2 }),
        })
            .then(async (res) => {
            const response = await await res.json();
            if (response.error) {
                throw new Error(response.error);
            }
            // Since the value of paymasterVerificationGasLimit is defined by the paymaster provider itself, it could be number in string
            if (response.result && response.result.paymasterVerificationGasLimit)
                response.result.paymasterVerificationGasLimit = BigNumber.from(response.result.paymasterVerificationGasLimit).toHexString();
            return response;
        })
            .catch((err) => {
            throw new Error(err.message);
        });
        return paymasterData;
    }
}
export const getVerifyingPaymaster = (paymasterUrl, entryPoint, context) => new VerifyingPaymasterAPI(paymasterUrl, entryPoint, context);
//# sourceMappingURL=VerifyingPaymasterAPI.js.map