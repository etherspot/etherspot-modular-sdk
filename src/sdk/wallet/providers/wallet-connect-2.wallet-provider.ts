import { Address, concat, encodeAbiParameters, Hash, hashMessage, Hex, parseAbiParameters, toBytes, toHex, TransactionRequest } from 'viem';
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

  async signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    const msg = toBytes(hashMessage({raw: toBytes(message)}))
    const response: Hex = await this.provider.signer.request({
      method: 'personal_sign',
      params: [msg, this.address],
    });
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
    return this.provider.signer.request({
      method: 'personal_sign',
      params: [toHex(message), this.address],
    })
  }

  async signTypedData(typedData: any, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    const signature: Hex = await this.provider.signer.request({
      method: 'eth_signTypedData_v4',
      params: [
        this.address,
        typedData
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

  async eth_requestAccounts(address: string): Promise<string[]> {
    return [address];
  }

  async eth_accounts(address: string): Promise<string[]> {
    return [address];
  }

  async eth_sendTransaction(transaction: TransactionRequest): Promise<Hash> {
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
