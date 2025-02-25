import {
  DynamicWalletProvider
} from "./chunk-VMUO65NX.js";
import {
  prepareNetworkName
} from "./chunk-645BWKCR.js";
import {
  prepareAddress
} from "./chunk-BFP3WTVA.js";
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

// src/sdk/wallet/providers/web3eip1193.wallet-provider.ts
var Web3eip1193WalletProvider = class _Web3eip1193WalletProvider extends DynamicWalletProvider {
  constructor(web3, type = "Web3") {
    super(type);
    this.web3 = web3;
  }
  static async connect(provider, type = "Web3") {
    const result = new _Web3eip1193WalletProvider(provider, type);
    const connected = await result.refresh();
    return connected ? result : null;
  }
  get address() {
    return this.address$.value;
  }
  get networkName() {
    return this.networkName$.value;
  }
  async refresh() {
    let result = false;
    const chainId = await this.sendRequest("eth_chainId");
    const networkName = prepareNetworkName(chainId);
    if (networkName) {
      const accounts = await this.sendRequest("eth_accounts");
      if (Array.isArray(accounts) && accounts.length) {
        const address = prepareAddress(accounts[0]);
        if (address) {
          this.setAddress(address);
          this.setNetworkName(networkName);
          result = true;
        }
      }
    }
    return result;
  }
  async signMessage(message, validatorAddress, factoryAddress, initCode) {
    const msg = toBytes(hashMessage({ raw: toBytes(message) }));
    const signature = await this.sendRequest("personal_sign", [msg, this.address]);
    if (initCode !== "0x") {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters("address, bytes, bytes"),
        [factoryAddress, initCode, concat([validatorAddress, signature])]
      );
      return abiCoderResult + "6492649264926492649264926492649264926492649264926492649264926492";
    }
    return validatorAddress + signature.slice(2);
  }
  async signUserOp(message) {
    return this.sendRequest("personal_sign", [toHex(message), this.address]);
  }
  async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
    const signature = await this.sendRequest("eth_signTypedData", [
      this.address,
      msg
    ]);
    if (initCode !== "0x") {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters("address, bytes, bytes"),
        [factoryAddress, initCode, concat([validatorAddress, signature])]
      );
      return abiCoderResult + "6492649264926492649264926492649264926492649264926492649264926492";
    }
    return validatorAddress + signature.slice(2);
  }
  async eth_requestAccounts() {
    return [this.address];
  }
  async eth_accounts() {
    return [this.address];
  }
  async eth_sendTransaction(transaction) {
    return this.sendRequest("eth_sendTransaction", [
      transaction
    ]);
  }
  async eth_signTransaction(transaction) {
    return this.sendRequest("eth_signTransaction", [
      transaction
    ]);
  }
  async sendRequest(method, params = []) {
    try {
      const result = await this.web3.request({
        method,
        params
      });
      return result || null;
    } catch (error) {
      return error;
    }
  }
};

export {
  Web3eip1193WalletProvider
};
//# sourceMappingURL=chunk-L6M4WISX.js.map