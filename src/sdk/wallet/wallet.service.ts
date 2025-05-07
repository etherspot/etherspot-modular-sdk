import { map, Subscription } from 'rxjs';
import {
  Address,
  Chain,
  Hash,
  Hex,
  TransactionRequest,
  WalletClient,
} from 'viem';
import { ObjectSubject, Service } from '../common/index.js';
import { Wallet, WalletOptions } from './interfaces.js';
import { KeyWalletProvider, MessagePayload, WalletClientProvider, WalletLike, WalletProvider, WalletProviderLike } from './providers/index.js';

export class WalletService extends Service {
  readonly wallet$ = new ObjectSubject<Wallet>();
  readonly rpcBundlerUrl: string;
  readonly chainId: number;
  readonly chainObject: Chain | undefined;

  provider: WalletProvider;

  constructor(
    private providerLike: WalletProviderLike,
    private options: WalletOptions,
    public rpcUrl: string,
    public chain: number
  ) {
    super();
    this.rpcBundlerUrl = rpcUrl;
    this.chainId = chain;
    this.chainObject = options.chain;
  }

  get wallet(): Wallet {
    return this.wallet$.value;
  }

  get EOAAddress(): Hex | null {
    return this.wallet ? this.wallet.address as Hex : null;
  }

  get walletProvider(): WalletProvider {
    return this.provider ? this.provider : null;
  }

  async signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    return this.provider ? this.provider.signMessage(message, validatorAddress, factoryAddress, initCode) : null;
  }

  async signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    return this.provider ? this.provider.signTypedData(msg, validatorAddress, factoryAddress, initCode) : null;
  }

  async eth_requestAccounts(address?: string): Promise<string[]> {
    return this.provider ? this.provider.eth_requestAccounts(address) : null;
  }

  async eth_accounts(address?: string): Promise<string[]> {
    return this.provider ? this.provider.eth_accounts(address) : null;
  }

  async eth_sendTransaction(transaction: TransactionRequest): Promise<Hash> {
    return this.provider ? this.provider.eth_sendTransaction(transaction) : null;
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.provider ? this.provider.eth_signTransaction(transaction) : null;
  }

  async signUserOp(message: Hex): Promise<string> {
    return this.provider ? this.provider.signUserOp(message) : null;
  }

  protected switchWalletProvider(providerLike: WalletProviderLike): void {
    let provider: WalletProvider = null;
    if (providerLike) {
      switch (typeof providerLike) {
        case 'object': {
          const { privateKey } = providerLike as WalletLike;
          const walletLike = providerLike as WalletClient;
          const isNotViemClient = walletLike?.account.address === undefined;
          if (privateKey && isNotViemClient) {
            provider = new KeyWalletProvider(this.chainId, privateKey, this.chainObject);
          } else {
            provider = new WalletClientProvider(walletLike);
          }
          break;
        }

        case 'string':
          provider = new KeyWalletProvider(this.chainId, providerLike, this.chainObject);
          break;
      }
    }

    if (!provider) {
      this.wallet$.next(null);

      this.removeSubscriptions();
    } else {
      const { networkService } = this.services;
      const { type: providerType } = provider;

      const subscriptions: Subscription[] = [];
      const { address, address$ } = provider;

      if (typeof address$ !== 'undefined') {
        subscriptions.push(
          address$
            .pipe(
              map((address) => ({
                address,
                providerType,
              })),
            )
            .subscribe((wallet) => this.wallet$.next(wallet)),
        );
      } else if (typeof address !== 'undefined') {
        this.wallet$.next({
          address,
          providerType,
        });
      } else {
        throw new Error('Invalid wallet address');
      }

      networkService.useDefaultNetwork();

      this.replaceSubscriptions(...subscriptions);
    }

    this.provider = provider;
  }

  protected onInit() {
    if (this.providerLike) {
      this.switchWalletProvider(this.providerLike);
      this.providerLike = null;
    }
  }
}
