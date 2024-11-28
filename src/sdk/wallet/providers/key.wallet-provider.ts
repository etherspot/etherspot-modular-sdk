import { Hash, Hex, TransactionRequest, WalletClient, createWalletClient, http, concat, Address } from 'viem';
import { MessagePayload, WalletProvider } from './interfaces';
import { privateKeyToAccount } from 'viem/accounts';
import { Networks } from '../../network/constants';

export class KeyWalletProvider implements WalletProvider {
  readonly type = 'Key';
  readonly address: string;
  readonly accountAddress: string;

  readonly wallet: WalletClient;

  constructor(chainId: number, privateKey: string) {
    this.wallet = createWalletClient({
      account: privateKeyToAccount(privateKey as Hex),
      chain: Networks[chainId].chain,
      transport: http()
    });

    const { address } = this.wallet.account;

    this.address = address;
  }

  async signMessage(message: Hex, validatorAddress?: Address): Promise<string> {
    return concat([
      validatorAddress,
      await this.wallet.signMessage({
        message: message,
        account: this.wallet.account
      })]
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg: MessagePayload, validatorAddress?: Address): Promise<string> {
    return concat([
      validatorAddress,
      await this.wallet.signTypedData({
        domain: msg.domain,
        types: msg.types,
        message: msg.message,
        account: this.wallet.account,
        primaryType: ''
      })
    ])
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
