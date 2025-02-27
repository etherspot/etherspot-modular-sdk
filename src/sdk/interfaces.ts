import { BundlerProviderLike } from './bundler/index.js';

export interface PaymasterApi {
  url: string;
  context?: any;
}

export enum Factory {
  ETHERSPOT = 'etherspot',
}

export interface SdkOptions {
  chainId: number;
  bundlerProvider?: BundlerProviderLike;
  rpcProviderUrl?: string;
  factoryWallet?: Factory;
  walletFactoryAddress?: string;
  entryPointAddress?: string;
  accountAddress?: string;
  index?: number;
}
