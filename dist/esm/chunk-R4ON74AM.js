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

// src/sdk/wallet/providers/meta-mask.wallet-provider.ts
var MetaMaskWalletProvider = class _MetaMaskWalletProvider extends DynamicWalletProvider {
  static get ethereum() {
    return this.detect() ? window.ethereum : null;
  }
  static detect() {
    return !!window?.ethereum?.isMetaMask;
  }
  static async connect() {
    if (!this.instance) {
      if (!this.detect()) {
        throw new Error("MetaMask not found");
      }
      this.instance = new _MetaMaskWalletProvider();
      await this.instance.connect();
    }
    if (!this.instance.address) {
      throw new Error("Can not connect to MetaMask");
    }
    return this.instance;
  }
  static instance;
  constructor() {
    super("MetaMask");
  }
  async signMessage(message, validatorAddress, factoryAddress, initCode) {
    const msg = toBytes(hashMessage({ raw: toBytes(message) }));
    const signature = await this.sendRequest("personal_sign", [
      msg,
      this.address
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
  async signUserOp(message) {
    return this.sendRequest("personal_sign", [
      toHex(message),
      this.address
    ]);
  }
  async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
    const signature = await this.sendRequest("eth_signTypedData_v4", [
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
  async eth_requestAccounts(address) {
    return [address];
  }
  async eth_accounts(address) {
    return [address];
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
  async connect() {
    const { ethereum } = window;
    ethereum.autoRefreshOnNetworkChange = false;
    ethereum.on("accountsChanged", ([address]) => this.setAddress(address));
    ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    try {
      const chainId = await this.sendRequest("eth_chainId");
      this.setNetworkName(chainId);
      const [address] = await this.sendRequest("eth_requestAccounts");
      this.setAddress(address);
    } catch (err) {
    }
  }
  async sendRequest(method, params) {
    const { ethereum } = window;
    return ethereum.request({
      method,
      params
    });
  }
};

export {
  MetaMaskWalletProvider
};
//# sourceMappingURL=chunk-R4ON74AM.js.map