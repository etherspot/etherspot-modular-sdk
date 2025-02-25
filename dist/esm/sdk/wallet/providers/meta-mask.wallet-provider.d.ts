import { DynamicWalletProvider } from './dynamic.wallet-provider.js';
import { MessagePayload } from './interfaces.js';
import { Hex, Address, TransactionRequest, Hash } from 'viem';
import '../../../interfaces-q-ZvJZS9.js';
import 'viem/chains';
import '../../common/rxjs/unique.subject.js';
import 'rxjs';
import '@walletconnect/universal-provider';

declare const window: Window & {
    ethereum: {
        isMetaMask: boolean;
        autoRefreshOnNetworkChange: boolean;
        networkVersion: string;
        selectedAddress: string;
        enable(): Promise<string[]>;
        on<T>(event: string, callback: (data: T) => any): void;
        request<T = any>(args: {
            method: string;
            params?: any[];
        }): Promise<T>;
    };
};
declare class MetaMaskWalletProvider extends DynamicWalletProvider {
    static get ethereum(): typeof window['ethereum'];
    static detect(): boolean;
    static connect(): Promise<MetaMaskWalletProvider>;
    private static instance;
    protected constructor();
    signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signUserOp(message: Hex): Promise<string>;
    signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    eth_requestAccounts(address: string): Promise<string[]>;
    eth_accounts(address: string): Promise<string[]>;
    eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    eth_signTransaction(transaction: TransactionRequest): Promise<string>;
    protected connect(): Promise<void>;
    protected sendRequest<T = any>(method: string, params?: any): Promise<T>;
}

export { MetaMaskWalletProvider };
