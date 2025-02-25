import { WalletClient, Hex, Address, TransactionRequest, Hash } from 'viem';
import { WalletProvider, MessagePayload } from './interfaces.js';
import '@walletconnect/universal-provider';
import '../../../interfaces-q-ZvJZS9.js';
import 'viem/chains';
import '../../common/rxjs/unique.subject.js';
import 'rxjs';

declare class WalletClientProvider implements WalletProvider {
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

export { WalletClientProvider };
