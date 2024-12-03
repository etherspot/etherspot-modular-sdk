import { Address, concat, Hash, hashMessage, hashTypedData, Hex, toBytes, TransactionRequest, WalletClient } from 'viem';
import { MessagePayload, WalletProvider } from './interfaces';

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

  async signMessage(message: Hex, validatorAddress?: Address): Promise<string> {
    const msg = toBytes(hashMessage({raw: toBytes(message)}));
    return concat([
      validatorAddress,
      await this.wallet.signMessage({
        message: {raw: msg},
        account: this.wallet.account
      })
    ]);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg: MessagePayload, validatorAddress?: Address): Promise<string> {
    const typedDataEncoder = hashTypedData({domain: msg.domain, types: msg.types, primaryType: msg.primaryType, message: msg.message});
    return concat([
      validatorAddress,
      await this.wallet.signMessage({
        message: {raw: toBytes(typedDataEncoder)},
        account: this.wallet.account
      })]
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
