var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/sdk/base/PaymasterAPI.ts
var PaymasterAPI_exports = {};
__export(PaymasterAPI_exports, {
  PaymasterAPI: () => PaymasterAPI
});
module.exports = __toCommonJS(PaymasterAPI_exports);
var PaymasterAPI = class {
  /**
   * @param userOp a partially-filled UserOperation (without signature and paymasterData
   *  note that the "preVerificationGas" is incomplete: it can't account for the
   *  paymasterData value, which will only be returned by this method..
   * @returns the value to put into the PaymasterData, undefined to leave it empty
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getPaymasterData(userOp) {
    return { result: { paymaster: "0x", paymasterData: "0x", paymasterPostOpGasLimit: "0x", paymasterVerificationGasLimit: "0x", preVerificationGas: "0x", verificationGasLimit: "0x", callGasLimit: "0x" } };
  }
};
//# sourceMappingURL=PaymasterAPI.cjs.map