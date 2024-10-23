import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Deferrable } from 'ethers/lib/utils';
import { BytesLike, ethers, providers, Wallet as EtherWallet } from 'ethers';
import { Service, ObjectSubject } from '../common';
import { WalletProvider, WalletProviderLike, KeyWalletProvider, WalletLike, MessagePayload, TransactionRequest, TransactionResponse } from './providers';
import { Wallet, WalletOptions } from './interfaces';

export class WalletService extends Service {
  readonly wallet$ = new ObjectSubject<Wallet>();
  readonly EOAAddress$: Observable<string>;
  readonly rpcBundlerUrl: string;
  readonly chainId: number;

  provider: WalletProvider;

  constructor(private providerLike: WalletProviderLike, private options: WalletOptions, public rpcUrl: string, public chain: number) {
    super();
    this.rpcBundlerUrl = rpcUrl;
    this.chainId = chain;
    this.EOAAddress$ = this.wallet$.observeKey('address');
  }

  get wallet(): Wallet {
    return this.wallet$.value;
  }

  get etherWallet(): Partial<EtherWallet> {
    return this.wallet$.value;
  }

  get EOAAddress(): string {
    return this.wallet ? this.wallet.address : null;
  }

  get walletProvider(): WalletProvider {
    return this.provider ? this.provider : null;
  }

  getWalletProvider(): providers.JsonRpcProvider {
    if (this.rpcUrl) return new ethers.providers.JsonRpcProvider(this.rpcUrl)
    return new ethers.providers.JsonRpcProvider(this.rpcBundlerUrl)
  }

  async signMessage(message: BytesLike, validatorAddress?: string, accountAddress?: string): Promise<string> {
    return this.provider ? this.provider.signMessage(message, validatorAddress, accountAddress) : null;
  }

  async signTypedData(msg: MessagePayload, accountAddress?: string): Promise<string> {
    return this.provider ? this.provider.signTypedData(msg, accountAddress) : null;
  }

  async eth_requestAccounts(address?: string): Promise<string[]> {
    return this.provider ? this.provider.eth_requestAccounts(address) : null;
  }

  async eth_accounts(address?: string): Promise<string[]> {
    return this.provider ? this.provider.eth_accounts(address) : null;
  }

  async eth_sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse> {
    return this.provider ? this.provider.eth_sendTransaction(transaction) : null;
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.provider ? this.provider.eth_signTransaction(transaction) : null;
  }

  async signUserOp(message: BytesLike): Promise<string> {
    return this.provider ? this.provider.signUserOp(message) : null;
  }

  protected switchWalletProvider(providerLike: WalletProviderLike): void {
    let provider: WalletProvider = null;
    if (providerLike) {
      switch (typeof providerLike) {
        case 'object': {
          const { privateKey } = providerLike as WalletLike;
          const walletLike = providerLike as EtherWallet;
          const isNotJsonRpcProvider = walletLike.provider?.constructor.name !== 'JsonRpcProvider';
          if (privateKey && isNotJsonRpcProvider) {
            provider = new KeyWalletProvider(privateKey);
          } else {
            provider = providerLike as WalletProvider;
          }
          break;
        }

        case 'string':
          provider = new KeyWalletProvider(providerLike);
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
