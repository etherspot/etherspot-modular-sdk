import { prepareAddress } from '../../common';
import { NetworkNames, prepareNetworkName } from '../../network';
import { MessagePayload, Web3eip1193Provider } from './interfaces';
import { DynamicWalletProvider } from './dynamic.wallet-provider';
import { hashMessage, Hex, toBytes, toHex, Hash, TransactionRequest } from 'viem';

export class Web3eip1193WalletProvider extends DynamicWalletProvider {
  static async connect(provider: Web3eip1193Provider, type = 'Web3'): Promise<Web3eip1193WalletProvider> {
    const result = new Web3eip1193WalletProvider(provider, type);
    const connected = await result.refresh();
    return connected ? result : null;
  }

  constructor(readonly web3: Web3eip1193Provider, type = 'Web3') {
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

  async signMessage(message: Hex, validatorAddress?: string): Promise<string> {
    const msg = toBytes(hashMessage(message.toString()))
    const signature = await this.sendRequest('personal_sign', [msg, this.address]);
    return validatorAddress + signature.slice(2)
  }

  async signUserOp(message: Hex): Promise<string> {
    return this.sendRequest('personal_sign', [toHex(message), this.address]);
  }

  async signTypedData(msg: MessagePayload, validatorAddress?: string): Promise<string> {
    const signature = await this.sendRequest('eth_signTypedData', [
      this.address,
      msg
    ])
    return validatorAddress + signature.slice(2);
  }

  async eth_requestAccounts(): Promise<string[]> {
    return [this.address];
  }

  async eth_accounts(): Promise<string[]> {
    return [this.address];
  }

  async eth_sendTransaction(transaction: TransactionRequest): Promise<Hash> {
    return this.sendRequest('eth_sendTransaction', [
      transaction
    ]);
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.sendRequest('eth_signTransaction', [
      transaction
    ]);
  }

  protected async sendRequest<T = any>(method: string, params: any[] = []): Promise<T> {
    try {
      const result = await this.web3.request({
        method,
        params,
      });

      return result || null;
    } catch (error) {
      return error;
    }
  }
}
