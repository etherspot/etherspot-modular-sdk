import { WalletClient, TypedDataDomain, Address, Hex, TransactionRequest, Hash } from 'viem';
import { UniversalProvider } from '@walletconnect/universal-provider';
import { c as NetworkNames } from '../../../interfaces-q-ZvJZS9.js';
import { UniqueSubject } from '../../common/rxjs/unique.subject.js';
import 'viem/chains';
import 'rxjs';

interface WalletProvider {
    readonly type?: string;
    readonly wallet?: WalletClient;
    readonly address: string;
    readonly address$?: UniqueSubject<string>;
    readonly networkName?: NetworkNames;
    readonly networkName$?: UniqueSubject<NetworkNames>;
    signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signMessage(message: string, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signUserOp(message: Hex): Promise<string>;
    eth_requestAccounts(address?: string): Promise<string[]>;
    eth_accounts(address?: string): Promise<string[]>;
    eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    eth_signTransaction(transaction: TransactionRequest): Promise<string>;
}
interface Web3Provider {
    send(payload: any, callback: (err: any, response?: any) => any): any;
}
type MessagePayload = {
    domain: TypedDataDomain;
    types: Record<string, TypedProperty[]>;
    primaryType: string;
    message: any;
};
type TypedProperty = {
    name: string;
    type: string;
};
interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}
interface Web3eip1193Provider {
    request(args: RequestArguments): any;
}
interface WalletConnectConnector {
    accounts: string[];
    chainId: number;
    signPersonalMessage(params: any[]): Promise<any>;
    request<T = unknown>(args: RequestArguments): Promise<T>;
    on(event: string, callback: (error: Error | null, payload: any | null) => void): void;
}
interface WalletLike {
    privateKey: string;
}
declare class EthereumProvider {
    accounts: string[];
    signer: InstanceType<typeof UniversalProvider>;
    chainId: number;
    request<T = unknown>(args: RequestArguments): Promise<T>;
    sendAsync(args: RequestArguments, callback: (error: Error | null, response: any) => void): void;
    disconnect(): Promise<void>;
    on(event: string, callback: (error: Error | null, payload: any | null) => void): void;
    once(event: string, callback: (error: Error | null, payload: any | null) => void): void;
    removeListener(event: string, callback: (error: Error | null, payload: any | null) => void): void;
    off(event: string, callback: (error: Error | null, payload: any | null) => void): void;
    readonly isWalletConnect?: boolean;
}
type WalletProviderLike = string | WalletLike | WalletProvider | EthereumProvider | WalletClient;

export { EthereumProvider, type MessagePayload, type RequestArguments, type WalletConnectConnector, type WalletLike, type WalletProvider, type WalletProviderLike, type Web3Provider, type Web3eip1193Provider };
