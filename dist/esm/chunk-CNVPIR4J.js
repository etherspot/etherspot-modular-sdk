import {
  hashMessage,
  hashTypedData
} from "./chunk-VOPA75Q5.js";
import {
  concat,
  encodeAbiParameters,
  parseAbiParameters,
  toBytes
} from "./chunk-5ZBZ6BDF.js";

// src/sdk/wallet/providers/walletClient.provider.ts
var WalletClientProvider = class {
  constructor(walletClient) {
    this.type = "WalletClient";
    this.wallet = walletClient;
    const { address } = this.wallet.account;
    this.address = address;
  }
  async signMessage(message, validatorAddress, factoryAddress, initCode) {
    const msg = toBytes(hashMessage({ raw: toBytes(message) }));
    const signature = await this.wallet.signMessage({
      message: { raw: msg },
      account: this.wallet.account
    });
    if (initCode !== "0x") {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters("address, bytes, bytes"),
        [factoryAddress, initCode, concat([validatorAddress, signature])]
      );
      return abiCoderResult + "6492649264926492649264926492649264926492649264926492649264926492";
    }
    return concat([
      validatorAddress,
      signature
    ]);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
    const typedDataEncoder = hashTypedData({ domain: msg.domain, types: msg.types, primaryType: msg.primaryType, message: msg.message });
    const signature = await this.wallet.signMessage({
      message: { raw: toBytes(typedDataEncoder) },
      account: this.wallet.account
    });
    if (initCode !== "0x") {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters("address, bytes, bytes"),
        [factoryAddress, initCode, concat([validatorAddress, signature])]
      );
      return abiCoderResult + "6492649264926492649264926492649264926492649264926492649264926492";
    }
    return concat(
      [
        validatorAddress,
        signature
      ]
    );
  }
  async eth_requestAccounts(address) {
    return [address];
  }
  async eth_accounts(address) {
    return [address];
  }
  async signUserOp(message) {
    return this.wallet.signMessage({
      message: { raw: message },
      account: this.wallet.account
    });
  }
  async eth_sendTransaction(transaction) {
    return this.wallet.sendTransaction({
      ...transaction,
      account: this.wallet.account,
      chain: this.wallet.chain,
      kzg: void 0
    });
  }
  async eth_signTransaction(transaction) {
    return this.wallet.signTransaction({
      ...transaction,
      account: this.wallet.account,
      chain: this.wallet.chain,
      kzg: void 0
    });
  }
};

export {
  WalletClientProvider
};
//# sourceMappingURL=chunk-CNVPIR4J.js.map