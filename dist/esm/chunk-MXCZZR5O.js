import {
  prepareNetworkName
} from "./chunk-645BWKCR.js";
import {
  UniqueSubject
} from "./chunk-3YWNDOEN.js";
import {
  prepareAddress
} from "./chunk-BFP3WTVA.js";

// src/sdk/wallet/providers/dynamic.wallet-provider.ts
var DynamicWalletProvider = class {
  constructor(type) {
    this.type = type;
    this.address$ = new UniqueSubject();
    this.networkName$ = new UniqueSubject();
  }
  get address() {
    return this.address$.value;
  }
  get networkName() {
    return this.networkName$.value;
  }
  setAddress(address) {
    this.address$.next(prepareAddress(address));
  }
  setNetworkName(networkNameOrChainId) {
    this.networkName$.next(prepareNetworkName(networkNameOrChainId));
  }
};

export {
  DynamicWalletProvider
};
//# sourceMappingURL=chunk-MXCZZR5O.js.map