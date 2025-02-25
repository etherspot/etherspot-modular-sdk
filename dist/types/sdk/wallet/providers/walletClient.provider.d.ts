import { Address, Hash, Hex, TransactionRequest, WalletClient } from 'viem';
import { MessagePayload, WalletProvider } from './interfaces.js';
export declare class WalletClientProvider implements WalletProvider {
    readonly type = "WalletClient";
    readonly address: string;
    readonly accountAddress: string;
    readonly wallet: WalletClient;
    constructor(walletClient: WalletClient);
    signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    eth_requestAccounts(address: string): Promise<string[]>;
    eth_accounts(address: string): Promise<string[]>;
    signUserOp(message: Hex): Promise<string>;
    eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    eth_signTransaction(transaction: TransactionRequest): Promise<string>;
}
//# sourceMappingURL=walletClient.provider.d.ts.map