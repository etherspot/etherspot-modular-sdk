import { Chain } from 'viem/chains';
import { NetworkNames } from './constants';

export interface Network {
  name: NetworkNames;
  chainId: number;
}

export interface NetworkConfig {
  chainId: number;
  chain: Chain;
  bundler: string;
  contracts: {
    entryPoint: string;
    walletFactory: string;
    bootstrap: string;
    multipleOwnerECDSAValidator: string;
  };
};
