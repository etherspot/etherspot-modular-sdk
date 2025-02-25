import { Service, ObjectSubject } from '../common/index.js';
import { WalletProvider, WalletProviderLike, MessagePayload } from './providers/index.js';
import { Wallet, WalletOptions } from './interfaces.js';
import { Hex, TransactionRequest, Hash, Address } from 'viem';
export declare class WalletService extends Service {
    private providerLike;
    private options;
    rpcUrl: string;
    chain: number;
    readonly wallet$: ObjectSubject<Wallet, keyof Wallet>;
    readonly rpcBundlerUrl: string;
    readonly chainId: number;
    provider: WalletProvider;
    constructor(providerLike: WalletProviderLike, options: WalletOptions, rpcUrl: string, chain: number);
    get wallet(): Wallet;
    get EOAAddress(): Hex | null;
    get walletProvider(): WalletProvider;
    signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string>;
    eth_requestAccounts(address?: string): Promise<string[]>;
    eth_accounts(address?: string): Promise<string[]>;
    eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;
    eth_signTransaction(transaction: TransactionRequest): Promise<string>;
    signUserOp(message: Hex): Promise<string>;
    protected switchWalletProvider(providerLike: WalletProviderLike): void;
    protected onInit(): void;
}
//# sourceMappingURL=wallet.service.d.ts.map