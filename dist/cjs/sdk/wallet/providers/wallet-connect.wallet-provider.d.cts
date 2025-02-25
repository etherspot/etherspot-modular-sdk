import { Hex, Address, TransactionRequest, Hash } from 'viem';
import { DynamicWalletProvider } from './dynamic.wallet-provider.cjs';
import { WalletConnectConnector, MessagePayload } from './interfaces.cjs';
import '../../../interfaces-q-ZvJZS9.cjs';
import 'viem/chains';
import '../../common/rxjs/unique.subject.cjs';
import 'rxjs';
import '@walletconnect/universal-provider';

declare class WalletConnectWalletProvider extends DynamicWalletProvider {
    readonly connector: WalletConnectConnector;
    static connect(connector: WalletConnectConnector): WalletConnectWalletProvider;
    protected constructor(connector: WalletConnectConnector);
    signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signUserOp(message: Hex): Promise<string>;
    signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    eth_requestAccounts(): Promise<string[]>;
    eth_accounts(): Promise<string[]>;
    eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    eth_signTransaction(transaction: TransactionRequest): Promise<string>;
    protected updateSessionHandler(error: Error, payload: {
        params: {
            accounts: string[];
            chainId: number;
        };
    }): void;
}

export { WalletConnectWalletProvider };
