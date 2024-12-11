import { Address, concat, encodeAbiParameters, Hash, hashMessage, Hex, parseAbiParameters, toBytes, toHex, TransactionRequest } from 'viem';
import { DynamicWalletProvider } from './dynamic.wallet-provider';
import { MessagePayload, WalletConnectConnector } from './interfaces';

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

  async signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    const msg = toBytes(hashMessage({raw: toBytes(message)}))
    const response: Hex = await this.connector.signPersonalMessage([
      msg, //
      this.address,
    ]);
    if (initCode !== '0x') {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters('address, bytes, bytes'),
        [factoryAddress, initCode, concat([validatorAddress, response])]
      )
      return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492'; //magicBytes
    }

    return typeof response === 'string' ? validatorAddress + response.slice(2) : null;
  }

  async signUserOp(message: Hex): Promise<string> {
    return this.connector.signPersonalMessage([
      toHex(message), //
      this.address,
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    const signature: Hex = await this.connector.request({
      method: 'eth_signTypedData_v4',
      params: [
        this.address,
        msg
      ]
    })
    if (initCode !== '0x') {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters('address, bytes, bytes'),
        [factoryAddress, initCode, concat([validatorAddress, signature])]
      )
      return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492'; //magicBytes
    }
    return typeof signature === 'string' ? validatorAddress + signature.slice(2) : null;
  }

  async eth_requestAccounts(): Promise<string[]> {
    return [this.address];
  }

  async eth_accounts(): Promise<string[]> {
    return [this.address];
  }

  async eth_sendTransaction(transaction: TransactionRequest): Promise<Hash> {
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
