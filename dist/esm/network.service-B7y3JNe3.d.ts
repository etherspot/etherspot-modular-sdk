import { Subscription, Observable } from 'rxjs';
import { N as Network, c as NetworkNames, a as NetworkConfig } from './interfaces-q-ZvJZS9.js';
import { ErrorSubject } from './sdk/common/rxjs/error.subject.js';
import { Hex, Address, TransactionRequest, Hash } from 'viem';
import { ObjectSubject } from './sdk/common/rxjs/object.subject.js';
import { WalletProvider, WalletProviderLike, MessagePayload } from './sdk/wallet/providers/interfaces.js';
import { Wallet, WalletOptions } from './sdk/wallet/interfaces.js';

declare class WalletService extends Service {
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

declare class Context {
    readonly services: {
        networkService: NetworkService;
        walletService: WalletService;
    };
    readonly error$: ErrorSubject;
    private readonly attached;
    constructor(services: {
        networkService: NetworkService;
        walletService: WalletService;
    });
    attach<T extends Service>(service: T): void;
    destroy(): void;
}

declare abstract class Service {
    protected context: Context;
    private inited;
    private destroyed;
    private attachedCounter;
    private subscriptions;
    init(context: Context): void;
    destroy(): void;
    protected onInit?(): void;
    protected onDestroy?(): void;
    protected get error$(): Context['error$'];
    protected get services(): Context['services'];
    protected addSubscriptions(...subscriptions: Subscription[]): void;
    protected removeSubscriptions(): void;
    protected replaceSubscriptions(...subscriptions: Subscription[]): void;
}

declare class NetworkService extends Service {
    readonly network$: ObjectSubject<Network, keyof Network>;
    readonly chainId$: Observable<number>;
    readonly defaultNetwork: Network;
    readonly supportedNetworks: Network[];
    readonly externalContractAddresses: Map<string, {
        [key: number]: string;
    }>;
    constructor(defaultChainId?: number);
    get network(): Network;
    get chainId(): number;
    useDefaultNetwork(): void;
    switchNetwork(networkName: NetworkNames): void;
    isNetworkSupported(chainId: number): boolean;
    getNetworkConfig(chainId: number): NetworkConfig;
}

export { Context as C, NetworkService as N, Service as S, WalletService as W };
