import { WalletProviderLike } from '../interfaces.cjs';
import 'viem';
import '@walletconnect/universal-provider';
import '../../../../interfaces-q-ZvJZS9.cjs';
import 'viem/chains';
import '../../../common/rxjs/unique.subject.cjs';
import 'rxjs';

declare function isWalletConnectProvider(provider: WalletProviderLike): boolean;

export { isWalletConnectProvider };
