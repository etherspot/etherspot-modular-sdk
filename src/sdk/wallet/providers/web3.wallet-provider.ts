import { BytesLike } from 'ethers';
import { Deferrable, hashMessage, toUtf8Bytes } from 'ethers/lib/utils';
import { prepareAddress, toHex } from '../../common';
import { NetworkNames, prepareNetworkName } from '../../network';
import { MessagePayload, TransactionRequest, TransactionResponse, Web3Provider } from './interfaces';
import { DynamicWalletProvider } from './dynamic.wallet-provider';

export class Web3WalletProvider extends DynamicWalletProvider {
  static async connect(provider: Web3Provider, type = 'Web3'): Promise<Web3WalletProvider> {
    const result = new Web3WalletProvider(provider, type);
    const connected = await result.refresh();
    return connected ? result : null;
  }

  constructor(readonly web3: Web3Provider, type = 'Web3') {
    super(type);
  }

  get address(): string {
    return this.address$.value;
  }

  get networkName(): NetworkNames {
    return this.networkName$.value;
  }

  async refresh(): Promise<boolean> {
    let result = false;

    const chainId = await this.sendRequest<string>('eth_chainId');
    const networkName = prepareNetworkName(chainId);

    if (networkName) {
      const accounts = await this.sendRequest<string[]>('eth_accounts');

      if (Array.isArray(accounts) && accounts.length) {
        const address = prepareAddress(accounts[0]);

        if (address) {
          this.setAddress(address);
          this.setNetworkName(networkName);

          result = true;
        }
      }
    }

    return result;
  }

  async signMessage(message: BytesLike, validatorAddress?: string, accountAddress?: string): Promise<string> {
    const msg = toUtf8Bytes(hashMessage(toUtf8Bytes(message.toString())))
    const signature = await this.sendRequest(
      'personal_sign',
      [
        msg,
        accountAddress ?? this.address, //
      ],
      this.address,
    );
    return validatorAddress + signature.slice(2);
  }

  async signUserOp(message: BytesLike): Promise<string> {
    return this.sendRequest(
      'personal_sign',
      [
        toHex(message),
        this.address, //
      ],
      this.address,
    );
  }

  async signTypedData(msg: MessagePayload, accountAddress?: string): Promise<string> {
    const signature = await this.sendRequest('eth_signTypedData', [
      accountAddress ?? this.address,
      msg
    ])
    return signature;
  }

  async eth_requestAccounts(): Promise<string[]> {
    return [this.address];
  }

  async eth_accounts(): Promise<string[]> {
    return [this.address];
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

  protected async sendRequest<T = any>(method: string, params: any[] = [], from?: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const id = Date.now();

      this.web3.send(
        {
          jsonrpc: '2.0',
          method,
          params,
          id,
          from,
        },
        (err: Error, response: { result: T }) => {
          if (err) {
            reject(err);
            return;
          }

          let result: T;

          try {
            ({ result } = response);
          } catch (err) {
            result = null;
          }

          resolve(result || null);
        },
      );
    });
  }
}
