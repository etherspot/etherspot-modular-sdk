import { Address, concat, encodeAbiParameters, Hash, hashMessage, hashTypedData, Hex, parseAbiParameters, toBytes, TransactionRequest, WalletClient } from 'viem';
import { MessagePayload, WalletProvider } from './interfaces.js';

export class WalletClientProvider implements WalletProvider {
  readonly type = 'WalletClient';
  readonly address: string;
  readonly accountAddress: string;

  readonly wallet: WalletClient;

  constructor(walletClient: WalletClient) {
    this.wallet = walletClient

    const { address } = this.wallet.account;

    this.address = address;
  }

  async signMessage(message: Hex, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    const msg = toBytes(hashMessage({raw: toBytes(message)}));
    const signature: Hex = await this.wallet.signMessage({
      message: {raw: msg},
      account: this.wallet.account
    })
    if (initCode !== '0x') {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters('address, bytes, bytes'),
        [factoryAddress, initCode, concat([validatorAddress, signature])]
      )
      return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492'; //magicBytes
    }
    return concat([
      validatorAddress,
      signature
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg: MessagePayload, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    const typedDataEncoder = hashTypedData({domain: msg.domain, types: msg.types, primaryType: msg.primaryType, message: msg.message});
    const signature = await this.wallet.signMessage({
      message: {raw: toBytes(typedDataEncoder)},
      account: this.wallet.account
    });
    if (initCode !== '0x') {
      const abiCoderResult = encodeAbiParameters(
        parseAbiParameters('address, bytes, bytes'),
        [factoryAddress, initCode, concat([validatorAddress, signature])]
      )
      return abiCoderResult + '6492649264926492649264926492649264926492649264926492649264926492'; //magicBytes
    }
    return concat([
      validatorAddress,
      signature]
    );
  }

  async eth_requestAccounts(address: string): Promise<string[]> {
    return [address];
  }

  async eth_accounts(address: string): Promise<string[]> {
    return [address];
  }

  async signUserOp(message: Hex): Promise<string> {
    return this.wallet.signMessage({
      message: { raw: message },
      account: this.wallet.account
    });
  }

  async eth_sendTransaction(transaction: TransactionRequest): Promise<Hash> {
    return this.wallet.sendTransaction({
      ...transaction,
      account: this.wallet.account,
      chain: this.wallet.chain,
      kzg: undefined
    });
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.wallet.signTransaction({
      ...transaction,
      account: this.wallet.account,
      chain: this.wallet.chain,
      kzg: undefined
    });
  }
}
