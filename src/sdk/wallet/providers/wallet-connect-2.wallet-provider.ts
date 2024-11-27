import { hashMessage, Hex, toBytes, toHex, TransactionReceipt, TransactionRequest } from 'viem';
import { DynamicWalletProvider } from './dynamic.wallet-provider';
import { EthereumProvider } from './interfaces';

export class WalletConnect2WalletProvider extends DynamicWalletProvider {
  constructor(readonly provider: EthereumProvider) {
    super('WalletConnect2');

    try {
      const {
        accounts: [address],
        chainId,
      } = provider;

      this.setAddress(address);
      this.setNetworkName(chainId);
    } catch (err) {
      //
    }

    this.updateSessionHandler = this.updateSessionHandler.bind(this);

    provider.on('connect', this.updateSessionHandler);
    provider.on('session_event', this.updateSessionHandler);
    provider.on('disconnect', () => {
      this.setAddress(null);
      this.setNetworkName(null);
    });
  }

  async signMessage(message: Hex, validatorAddress?: string, accountAddress?: string): Promise<string> {
    const msg = toBytes(hashMessage(message.toString()));
    const response = await this.provider.signer.request({
      method: 'personal_sign',
      params: [msg, accountAddress ?? this.address],
    });

    return typeof response === 'string' ? validatorAddress + response.slice(2) : null;
  }

  async signUserOp(message: Hex): Promise<string> {
    return this.provider.signer.request({
      method: 'personal_sign',
      params: [toHex(message), this.address],
    })
  }

  async signTypedData(typedData: any, accountAddress?: string): Promise<string> {
    const signature = await this.provider.signer.request({
      method: 'eth_signTypedData_v4', 
      params: [
        accountAddress ?? this.address,
        typedData
      ]
    })
    return typeof signature === 'string' ? signature : null;
  }

  async eth_requestAccounts(address: string): Promise<string[]> {
    return [address];
  }

  async eth_accounts(address: string): Promise<string[]> {
    return [address];
  }

  async eth_sendTransaction(transaction: TransactionRequest): Promise<TransactionReceipt> {
    return this.provider.signer.request({method: 'eth_sendTransaction', params: [
      transaction
    ]});
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.provider.signer.request({method: 'eth_signTransaction', params: [
      transaction
    ]});
  }

  protected updateSessionHandler(error: Error, payload: { params: { accounts: string[]; chainId: number } }): void {
    let address: string = null;
    let chainId: number = null;

    if (!error) {
      try {
        ({
          accounts: [address],
          chainId,
        } = payload.params[0]);
      } catch (err) {
        address = null;
        chainId = null;
      }
    }

    this.setAddress(address);
    this.setNetworkName(chainId);
  }
}
