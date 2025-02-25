import { WalletClient, Address, Hex, TransactionRequest, Hash } from 'viem';
import { WalletProvider, MessagePayload } from './interfaces.cjs';
import '@walletconnect/universal-provider';
import '../../../interfaces-q-ZvJZS9.cjs';
import 'viem/chains';
import '../../common/rxjs/unique.subject.cjs';
import 'rxjs';

declare class KeyWalletProvider implements WalletProvider {
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

export { KeyWalletProvider };
