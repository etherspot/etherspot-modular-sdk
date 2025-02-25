import { Address, Hash, Hex, TransactionRequest } from 'viem';
import { DynamicWalletProvider } from './dynamic.wallet-provider.js';
import { EthereumProvider } from './interfaces.js';
export declare class WalletConnect2WalletProvider extends DynamicWalletProvider {
    readonly provider: EthereumProvider;
    constructor(provider: EthereumProvider);
    signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signUserOp(message: Hex): Promise<string>;
    signTypedData(typedData: any, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    eth_requestAccounts(address: string): Promise<string[]>;
    eth_accounts(address: string): Promise<string[]>;
    eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    eth_signTransaction(transaction: TransactionRequest): Promise<string>;
    protected updateSessionHandler(error: Error, payload: {
        params: {
            accounts: string[];
            chainId: number;
        };
    }): void;
}
//# sourceMappingURL=wallet-connect-2.wallet-provider.d.ts.map