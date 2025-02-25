import {
  DynamicWalletProvider
} from "./chunk-MXCZZR5O.js";
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

// src/sdk/wallet/providers/wallet-connect.wallet-provider.ts
var WalletConnectWalletProvider = class _WalletConnectWalletProvider extends DynamicWalletProvider {
  constructor(connector) {
    super("WalletConnect");
    this.connector = connector;
    try {
      const {
        accounts: [address],
        chainId
      } = connector;
      this.setAddress(address);
      this.setNetworkName(chainId);
    } catch (err) {
    }
    this.updateSessionHandler = this.updateSessionHandler.bind(this);
    connector.on("connect", this.updateSessionHandler);
    connector.on("session_update", this.updateSessionHandler);
    connector.on("disconnect", () => {
      this.setAddress(null);
      this.setNetworkName(null);
    });
  }
  static connect(connector) {
    return new _WalletConnectWalletProvider(connector);
  }
  async signMessage(message, validatorAddress, factoryAddress, initCode) {
    const msg = toBytes(hashMessage({ raw: toBytes(message) }));
    const response = await this.connector.signPersonalMessage([
      msg,
      //
      this.address
    ]);
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
    return this.connector.signPersonalMessage([
      toHex(message),
      //
      this.address
    ]);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
    const signature = await this.connector.request({
      method: "eth_signTypedData_v4",
      params: [
        this.address,
        msg
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
  async eth_requestAccounts() {
    return [this.address];
  }
  async eth_accounts() {
    return [this.address];
  }
  async eth_sendTransaction(transaction) {
    return this.connector.request({ method: "eth_sendTransaction", params: [
      transaction
    ] });
  }
  async eth_signTransaction(transaction) {
    return this.connector.request({ method: "eth_signTransaction", params: [
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
  WalletConnectWalletProvider
};
//# sourceMappingURL=chunk-VMTTOTSA.js.map