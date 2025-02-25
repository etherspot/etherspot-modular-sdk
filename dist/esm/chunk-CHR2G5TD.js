import {
  DynamicWalletProvider
} from "./chunk-VMUO65NX.js";
import {
  hashMessage
} from "./chunk-VOPA75Q5.js";
import {
  concat,
  encodeAbiParameters,
  parseAbiParameters,
  toBytes,
  toHex
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/wallet/providers/wallet-connect-2.wallet-provider.ts
var WalletConnect2WalletProvider = class extends DynamicWalletProvider {
  constructor(provider) {
    super("WalletConnect2");
    this.provider = provider;
    try {
      const {
        accounts: [address],
        chainId
      } = provider;
      this.setAddress(address);
      this.setNetworkName(chainId);
    } catch (err) {
    }
    this.updateSessionHandler = this.updateSessionHandler.bind(this);
    provider.on("connect", this.updateSessionHandler);
    provider.on("session_event", this.updateSessionHandler);
    provider.on("disconnect", () => {
      this.setAddress(null);
      this.setNetworkName(null);
    });
  }
  async signMessage(message, validatorAddress, factoryAddress, initCode) {
    const msg = toBytes(hashMessage({ raw: toBytes(message) }));
    const response = await this.provider.signer.request({
      method: "personal_sign",
      params: [msg, this.address]
    });
    if (initCode !== "0x") {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters("address, bytes, bytes"),
        [factoryAddress, initCode, concat([validatorAddress, response])]
      );
      return abiCoderResult + "6492649264926492649264926492649264926492649264926492649264926492";
    }
    return typeof response === "string" ? validatorAddress + response.slice(2) : null;
  }
  async signUserOp(message) {
    return this.provider.signer.request({
      method: "personal_sign",
      params: [toHex(message), this.address]
    });
  }
  async signTypedData(typedData, validatorAddress, factoryAddress, initCode) {
    const signature = await this.provider.signer.request({
      method: "eth_signTypedData_v4",
      params: [
        this.address,
        typedData
      ]
    });
    if (initCode !== "0x") {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters("address, bytes, bytes"),
        [factoryAddress, initCode, concat([validatorAddress, signature])]
      );
      return abiCoderResult + "6492649264926492649264926492649264926492649264926492649264926492";
    }
    return typeof signature === "string" ? validatorAddress + signature.slice(2) : null;
  }
  async eth_requestAccounts(address) {
    return [address];
  }
  async eth_accounts(address) {
    return [address];
  }
  async eth_sendTransaction(transaction) {
    return this.provider.signer.request({ method: "eth_sendTransaction", params: [
      transaction
    ] });
  }
  async eth_signTransaction(transaction) {
    return this.provider.signer.request({ method: "eth_signTransaction", params: [
      transaction
    ] });
  }
  updateSessionHandler(error, payload) {
    let address = null;
    let chainId = null;
    if (!error) {
      try {
        ({
          accounts: [address],
          chainId
        } = payload.params[0]);
      } catch (err) {
        address = null;
        chainId = null;
      }
    }
    this.setAddress(address);
    this.setNetworkName(chainId);
  }
};

export {
  WalletConnect2WalletProvider
};
//# sourceMappingURL=chunk-CHR2G5TD.js.map