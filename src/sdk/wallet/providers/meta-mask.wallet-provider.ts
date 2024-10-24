import { BytesLike } from 'ethers';
import { Deferrable, hashMessage, toUtf8Bytes } from 'ethers/lib/utils';
import { DynamicWalletProvider } from './dynamic.wallet-provider';
import { MessagePayload, TransactionRequest, TransactionResponse } from './interfaces';
import { toHex } from '../../common';

declare const window: Window & {
  ethereum: {
    isMetaMask: boolean;
    autoRefreshOnNetworkChange: boolean;
    networkVersion: string;
    selectedAddress: string;

    enable(): Promise<string[]>;

    on<T>(event: string, callback: (data: T) => any): void;

    request<T = any>(args: { method: string; params?: any[] }): Promise<T>;
  };
};

export class MetaMaskWalletProvider extends DynamicWalletProvider {
  static get ethereum(): typeof window['ethereum'] {
    return this.detect() ? window.ethereum : null;
  }

  static detect(): boolean {
    return !!window?.ethereum?.isMetaMask;
  }

  static async connect(): Promise<MetaMaskWalletProvider> {
    if (!this.instance) {
      if (!this.detect()) {
        throw new Error('MetaMask not found');
      }

      this.instance = new MetaMaskWalletProvider();

      await this.instance.connect();
    }

    if (!this.instance.address) {
      throw new Error('Can not connect to MetaMask');
    }

    return this.instance;
  }

  private static instance: MetaMaskWalletProvider;

  protected constructor() {
    super('MetaMask');
  }

  async signMessage(message: BytesLike, validatorAddress?: string, accountAddress?: string): Promise<string> {
    const msg = toUtf8Bytes(hashMessage(toUtf8Bytes(message.toString())))
    const signature = await this.sendRequest('personal_sign', [
      msg,
      accountAddress ?? this.address, //
    ]);
    return validatorAddress + signature.slice(2);
  }

  async signUserOp(message: BytesLike): Promise<string> {
    return this.sendRequest('personal_sign', [
      toHex(message),
      this.address
    ])
  }

  async signTypedData(msg: MessagePayload, accountAddress?: string): Promise<string> {
    const signature = await this.sendRequest('eth_signTypedData_v4', [
      accountAddress ?? this.address,
      msg
    ])
    return signature
  }

  async eth_requestAccounts(address: string): Promise<string[]> {
    return [address];
  }

  async eth_accounts(address: string): Promise<string[]> {
    return [address];
  }

  async eth_sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse> {
    return this.sendRequest('eth_sendTransaction', [
      transaction
    ]);
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.sendRequest('eth_signTransaction', [
      transaction
    ]);
  }

  protected async connect(): Promise<void> {
    const { ethereum } = window;

    ethereum.autoRefreshOnNetworkChange = false;
    ethereum.on<string>('accountsChanged', ([address]) => this.setAddress(address));
    ethereum.on<string>('chainChanged', () => {
      window.location.reload();
    });

    try {
      const chainId = await this.sendRequest<string>('eth_chainId');

      this.setNetworkName(chainId);

      const [address] = await this.sendRequest<string[]>('eth_requestAccounts');

      this.setAddress(address);
    } catch (err) {
      //
    }
  }

  protected async sendRequest<T = any>(method: string, params?: any): Promise<T> {
    const { ethereum } = window;

    return ethereum.request({
      method,
      params,
    });
  }
}
