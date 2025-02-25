import { NetworkNames } from '../../network/index.js';
import { MessagePayload, Web3Provider } from './interfaces.js';
import { DynamicWalletProvider } from './dynamic.wallet-provider.js';
import { Address, Hash, Hex, TransactionRequest } from 'viem';
export declare class Web3WalletProvider extends DynamicWalletProvider {
    readonly web3: Web3Provider;
    static connect(provider: Web3Provider, type?: string): Promise<Web3WalletProvider>;
    constructor(web3: Web3Provider, type?: string);
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
    protected sendRequest<T = any>(method: string, params?: any[], from?: string): Promise<T>;
}
//# sourceMappingURL=web3.wallet-provider.d.ts.map