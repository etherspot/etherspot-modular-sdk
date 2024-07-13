import { BundlerProviderLike } from './bundler';
import { StateStorage } from './state';
import { Account } from 'viem';

export interface PaymasterApi {
  url: string;
  context?: any;
}

export enum Factory {
  ETHERSPOT = 'etherspot',
}

export interface SdkOptions {
  chainId: number;
  account: Account;
  bundlerProvider?: BundlerProviderLike;
  stateStorage?: StateStorage;
  rpcProviderUrl?: string;
  factoryWallet?: Factory;
  walletFactoryAddress?: string;
  entryPointAddress?: string;
  accountAddress?: string;
  index?: number;
}
