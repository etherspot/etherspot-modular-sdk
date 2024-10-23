import { Wallet, BytesLike } from 'ethers';
import { Deferrable } from 'ethers/lib/utils';
import { MessagePayload, TransactionRequest, TransactionResponse, WalletProvider } from './interfaces';

export class KeyWalletProvider implements WalletProvider {
  readonly type = 'Key';
  readonly address: string;
  readonly accountAddress: string;

  readonly wallet: Wallet;

  constructor(privateKey: string) {
    this.wallet = new Wallet(privateKey);

    const { address } = this.wallet;

    this.address = address;
  }

  async signMessage(message: BytesLike): Promise<string> {
    return this.wallet.signMessage(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg: MessagePayload): Promise<string> {
    return this.wallet._signTypedData(msg.domain, msg.types, msg.message)
  }

  async eth_requestAccounts(address: string): Promise<string[]> {
    return [address];
  }

  async eth_accounts(address: string): Promise<string[]> {
    return [address];
  }

  async signUserOp(message: BytesLike): Promise<string> {
    return this.wallet.signMessage(message);
  }

  async eth_sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse> {
    return this.wallet.sendTransaction(transaction);
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    return this.wallet.signTransaction(transaction);
  }

}
