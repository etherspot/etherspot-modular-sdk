import { c as NetworkNames } from '../../../interfaces-q-ZvJZS9.cjs';
import { Hex, Address, TransactionRequest, Hash } from 'viem';
import { DynamicWalletProvider } from './dynamic.wallet-provider.cjs';
import { Web3eip1193Provider, MessagePayload } from './interfaces.cjs';
import 'viem/chains';
import '../../common/rxjs/unique.subject.cjs';
import 'rxjs';
import '@walletconnect/universal-provider';

declare class Web3eip1193WalletProvider extends DynamicWalletProvider {
    readonly web3: Web3eip1193Provider;
    static connect(provider: Web3eip1193Provider, type?: string): Promise<Web3eip1193WalletProvider>;
    constructor(web3: Web3eip1193Provider, type?: string);
    get address(): string;
    get networkName(): NetworkNames;
    refresh(): Promise<boolean>;
    signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signUserOp(message: Hex): Promise<string>;
    signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    eth_requestAccounts(): Promise<string[]>;
    eth_accounts(): Promise<string[]>;
    eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    eth_signTransaction(transaction: TransactionRequest): Promise<string>;
    protected sendRequest<T = any>(method: string, params?: any[]): Promise<T>;
}

export { Web3eip1193WalletProvider };
