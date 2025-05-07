import { Chain } from "viem";

export interface Wallet {
  address: string;
  providerType: string;
}

export interface WalletOptions {
  provider?: string;
  chain?: Chain;
}
