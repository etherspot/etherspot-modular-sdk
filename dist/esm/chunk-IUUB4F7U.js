import {
  PaymasterAPI
} from "./chunk-4JU7XSFU.js";
import {
  calcPreVerificationGas
} from "./chunk-VJN3GYFI.js";
import {
  toJSON
} from "./chunk-WZQO5STN.js";
import {
  resolveProperties
} from "./chunk-4KVEROXU.js";
import {
  BigNumber
} from "./chunk-LWM5MV7Z.js";

// src/sdk/base/VerifyingPaymasterAPI.ts
import fetch from "cross-fetch";
var DUMMY_SIGNATURE = "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
var VerifyingPaymasterAPI = class extends PaymasterAPI {
  paymasterUrl;
  entryPoint;
  context;
  constructor(paymasterUrl, entryPoint, context) {
    super();
    this.paymasterUrl = paymasterUrl;
    this.entryPoint = entryPoint;
    this.context = context;
  }
  async getPaymasterData(userOp) {
    try {
      await resolveProperties(userOp);
    } catch (_) {
    }
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
        signature: DUMMY_SIGNATURE
      };
    } else {
      pmOp = {
        sender: userOp.sender,
        nonce: userOp.nonce,
        factoryData: userOp.factoryData,
        callData: userOp.callData,
        callGasLimit: userOp.callGasLimit,
        verificationGasLimit: userOp.verificationGasLimit,
        maxFeePerGas: userOp.maxFeePerGas,
        maxPriorityFeePerGas: userOp.maxPriorityFeePerGas,
        signature: DUMMY_SIGNATURE
      };
    }
    const op = await resolveProperties(pmOp);
    op.preVerificationGas = calcPreVerificationGas(op);
    const paymasterData = await fetch(this.paymasterUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ method: "pm_sponsorUserOperation", params: [await toJSON(op), this.entryPoint, this.context], jsonrpc: "2", id: 2 })
    }).then(async (res) => {
      const response = await await res.json();
      if (response.error) {
        throw new Error(response.error);
      }
      if (response.result && response.result.paymasterVerificationGasLimit)
        response.result.paymasterVerificationGasLimit = BigNumber.from(response.result.paymasterVerificationGasLimit).toHexString();
      return response;
    }).catch((err) => {
      throw new Error(err.message);
    });
    return paymasterData;
  }
};
var getVerifyingPaymaster = (paymasterUrl, entryPoint, context) => new VerifyingPaymasterAPI(paymasterUrl, entryPoint, context);

export {
  VerifyingPaymasterAPI,
  getVerifyingPaymaster
};
//# sourceMappingURL=chunk-IUUB4F7U.js.map