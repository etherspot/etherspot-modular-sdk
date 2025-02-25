import {
  KeyWalletProvider
} from "./chunk-DIECYCKK.js";
import {
  WalletClientProvider
} from "./chunk-BZJCUZRI.js";
import {
  ObjectSubject
} from "./chunk-LY6TS44P.js";
import {
  Service
} from "./chunk-VJKFSPZG.js";

// src/sdk/wallet/wallet.service.ts
import { map } from "rxjs/operators";
var WalletService = class extends Service {
  constructor(providerLike, options, rpcUrl, chain) {
    super();
    this.providerLike = providerLike;
    this.options = options;
    this.rpcUrl = rpcUrl;
    this.chain = chain;
    this.rpcBundlerUrl = rpcUrl;
    this.chainId = chain;
  }
  wallet$ = new ObjectSubject();
  rpcBundlerUrl;
  chainId;
  provider;
  get wallet() {
    return this.wallet$.value;
  }
  get EOAAddress() {
    return this.wallet ? this.wallet.address : null;
  }
  get walletProvider() {
    return this.provider ? this.provider : null;
  }
  async signMessage(message, validatorAddress, factoryAddress, initCode) {
    return this.provider ? this.provider.signMessage(message, validatorAddress, factoryAddress, initCode) : null;
  }
  async signTypedData(msg, validatorAddress, factoryAddress, initCode) {
    return this.provider ? this.provider.signTypedData(msg, validatorAddress, factoryAddress, initCode) : null;
  }
  async eth_requestAccounts(address) {
    return this.provider ? this.provider.eth_requestAccounts(address) : null;
  }
  async eth_accounts(address) {
    return this.provider ? this.provider.eth_accounts(address) : null;
  }
  async eth_sendTransaction(transaction) {
    return this.provider ? this.provider.eth_sendTransaction(transaction) : null;
  }
  async eth_signTransaction(transaction) {
    return this.provider ? this.provider.eth_signTransaction(transaction) : null;
  }
  async signUserOp(message) {
    return this.provider ? this.provider.signUserOp(message) : null;
  }
  switchWalletProvider(providerLike) {
    let provider = null;
    if (providerLike) {
      switch (typeof providerLike) {
        case "object": {
          const { privateKey } = providerLike;
          const walletLike = providerLike;
          const isNotViemClient = walletLike?.account.address === void 0;
          if (privateKey && isNotViemClient) {
            provider = new KeyWalletProvider(this.chainId, privateKey);
          } else {
            provider = new WalletClientProvider(walletLike);
          }
          break;
        }
        case "string":
          provider = new KeyWalletProvider(this.chainId, providerLike);
          break;
      }
    }
    if (!provider) {
      this.wallet$.next(null);
      this.removeSubscriptions();
    } else {
      const { networkService } = this.services;
      const { type: providerType } = provider;
      const subscriptions = [];
      const { address, address$ } = provider;
      if (typeof address$ !== "undefined") {
        subscriptions.push(
          address$.pipe(
            map((address2) => ({
              address: address2,
              providerType
            }))
          ).subscribe((wallet) => this.wallet$.next(wallet))
        );
      } else if (typeof address !== "undefined") {
        this.wallet$.next({
          address,
          providerType
        });
      } else {
        throw new Error("Invalid wallet address");
      }
      networkService.useDefaultNetwork();
      this.replaceSubscriptions(...subscriptions);
    }
    this.provider = provider;
  }
  onInit() {
    if (this.providerLike) {
      this.switchWalletProvider(this.providerLike);
      this.providerLike = null;
    }
  }
};

export {
  WalletService
};
//# sourceMappingURL=chunk-EGN3VPUB.js.map