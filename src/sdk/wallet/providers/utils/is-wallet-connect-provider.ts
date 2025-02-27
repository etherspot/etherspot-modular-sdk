import { EthereumProvider, WalletProviderLike } from '../interfaces.js';

export function isWalletConnectProvider(provider: WalletProviderLike): boolean {
  return typeof provider === 'object' && (provider as EthereumProvider)?.isWalletConnect;
}
