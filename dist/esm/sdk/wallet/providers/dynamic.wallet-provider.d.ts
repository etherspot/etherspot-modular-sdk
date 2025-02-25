import { c as NetworkNames } from '../../../interfaces-q-ZvJZS9.js';
import { Address, Hex, TransactionRequest, Hash } from 'viem';
import { WalletProvider, MessagePayload } from './interfaces.js';
import { UniqueSubject } from '../../common/rxjs/unique.subject.js';
import 'viem/chains';
import '@walletconnect/universal-provider';
import 'rxjs';

declare abstract class DynamicWalletProvider implements WalletProvider {
    readonly type: string;
    readonly address$: UniqueSubject<string>;
    readonly networkName$: UniqueSubject<NetworkNames>;
    protected constructor(type: string);
    get address(): string;
    get networkName(): NetworkNames;
    abstract signMessage(message: any, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    abstract signUserOp(message: Hex): Promise<string>;
    abstract signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    protected setAddress(address: string): void;
    protected setNetworkName(networkNameOrChainId: string | number): void;
    abstract eth_requestAccounts(address?: string): Promise<string[]>;
    abstract eth_accounts(address?: string): Promise<string[]>;
    abstract eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    abstract eth_signTransaction(transaction: TransactionRequest): Promise<string>;
}

export { DynamicWalletProvider };
