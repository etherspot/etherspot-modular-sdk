import { BytesLike } from 'ethers';
import { Deferrable, hashMessage, toUtf8Bytes } from 'ethers/lib/utils';
import { DynamicWalletProvider } from './dynamic.wallet-provider';
import { MessagePayload, TransactionRequest, TransactionResponse, WalletConnectConnector } from './interfaces';
import { toHex } from '../../common';

export class WalletConnectWalletProvider extends DynamicWalletProvider {
  static connect(connector: WalletConnectConnector): WalletConnectWalletProvider {
    return new WalletConnectWalletProvider(connector);
  }

  protected constructor(readonly connector: WalletConnectConnector) {
    super('WalletConnect');

    try {
      const {
        accounts: [address],
        chainId,
      } = connector;

      this.setAddress(address);
      this.setNetworkName(chainId);
    } catch (err) {
      //
    }

    this.updateSessionHandler = this.updateSessionHandler.bind(this);

    connector.on('connect', this.updateSessionHandler);
    connector.on('session_update', this.updateSessionHandler);
    connector.on('disconnect', () => {
      this.setAddress(null);
      this.setNetworkName(null);
    });
  }

  async signMessage(message: BytesLike, validatorAddress?: string, accountAddress?: string): Promise<string> {
    const msg = toUtf8Bytes(hashMessage(toUtf8Bytes(message.toString())));
    const response = await this.connector.signPersonalMessage([
      msg, //
      accountAddress ?? this.address,
    ]);

    return typeof response === 'string' ? validatorAddress + response.slice(2) : null;
  }

  async signUserOp(message: BytesLike): Promise<string> {
    return this.connector.signPersonalMessage([
      toHex(message), //
      this.address,
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg: MessagePayload, accountAddress?: string): Promise<string> {
    const signature = await this.connector.request({
      method: 'eth_signTypedData', 
      params: [
        accountAddress ?? this.address,
        msg
      ]
    })
    return typeof signature === 'string' ? signature : null;
  }

  async eth_requestAccounts(): Promise<string[]> {
    return [this.address];
  }

  async eth_accounts(): Promise<string[]> {
    return [this.address];
  }

  async eth_sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse> {
    return this.connector.request({method: 'eth_sendTransaction', params: [
      transaction
    ]});
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.connector.request({method: 'eth_signTransaction', params: [
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
