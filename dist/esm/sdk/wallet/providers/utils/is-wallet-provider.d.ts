import { WalletProviderLike } from '../interfaces.js';
import 'viem';
import '@walletconnect/universal-provider';
import '../../../../interfaces-q-ZvJZS9.js';
import 'viem/chains';
import '../../../common/rxjs/unique.subject.js';
import 'rxjs';

declare function isWalletProvider(provider: WalletProviderLike): boolean;

export { isWalletProvider };
