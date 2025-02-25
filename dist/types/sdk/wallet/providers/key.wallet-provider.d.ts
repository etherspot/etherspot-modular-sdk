import { Hash, Hex, TransactionRequest, WalletClient, Address } from 'viem';
import { MessagePayload, WalletProvider } from './interfaces.js';
export declare class KeyWalletProvider implements WalletProvider {
    readonly type = "Key";
    readonly address: string;
    readonly accountAddress: string;
    readonly wallet: WalletClient;
    constructor(chainId: number, privateKey: string);
    signMessage(message: string, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    eth_requestAccounts(address: string): Promise<string[]>;
    eth_accounts(address: string): Promise<string[]>;
    signUserOp(message: Hex): Promise<string>;
    eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    eth_signTransaction(transaction: TransactionRequest): Promise<string>;
}
//# sourceMappingURL=key.wallet-provider.d.ts.map