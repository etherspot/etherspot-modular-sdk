import { isHex } from 'viem';
import { WalletLike, WalletProvider, WalletProviderLike } from '../interfaces';

export function isWalletProvider(provider: WalletProviderLike): boolean {
  let result = false;

  if (provider) {
    switch (typeof provider) {
      case 'string':
        result = isHex(provider);
        break;

      case 'object':
        const { privateKey } = provider as WalletLike;
        if (isHex(privateKey)) {
          result = true;
        } else {
          const { type, signMessage } = provider as WalletProvider;

          result = !!type && typeof signMessage === 'function';
        }
        break;
    }
  }

  return result;
}
