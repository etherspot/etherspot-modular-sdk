import { Wallet, BytesLike } from 'ethers';
import { Deferrable, hashMessage } from 'ethers/lib/utils';
import { MessagePayload, TransactionRequest, TransactionResponse, WalletProvider } from './interfaces';
import { getBytes } from '../../common';

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

  async signMessage(message: BytesLike, validatorAddress?: string): Promise<string> {
    const msg = getBytes(hashMessage(getBytes(message)));
    const signature = await this.wallet.signMessage(msg);
    return validatorAddress + signature.slice(2)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async signTypedData(msg: MessagePayload, validatorAddress?: string): Promise<string> {
    if (msg.types.EIP712Domain) delete msg.types.EIP712Domain; // https://github.com/ethers-io/ethers.js/issues/687#issuecomment-714069471

    const signature = await this.wallet._signTypedData(msg.domain, msg.types, msg.message)
    return validatorAddress + signature.slice(2);
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
