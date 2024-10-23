import { BytesLike, Deferrable } from 'ethers/lib/utils';
import { NetworkNames, prepareNetworkName } from '../../network';
import { prepareAddress, UniqueSubject } from '../../common';
import { MessagePayload, TransactionRequest, TransactionResponse, WalletProvider } from './interfaces';

export abstract class DynamicWalletProvider implements WalletProvider {
  readonly address$ = new UniqueSubject<string>();
  readonly networkName$ = new UniqueSubject<NetworkNames>();

  protected constructor(readonly type: string) {
    //
  }

  get address(): string {
    return this.address$.value;
  }

  get networkName(): NetworkNames {
    return this.networkName$.value;
  }

  abstract signMessage(message: any, validatorAddress?: string): Promise<string>;

  abstract signUserOp(message: BytesLike): Promise<string>;

  abstract signTypedData(msg: MessagePayload): Promise<string>

  protected setAddress(address: string): void {
    this.address$.next(prepareAddress(address));
  }

  protected setNetworkName(networkNameOrChainId: string | number): void {
    this.networkName$.next(prepareNetworkName(networkNameOrChainId));
  }

  abstract eth_requestAccounts(address?: string): Promise<string[]>;

  abstract eth_accounts(address?: string): Promise<string[]>;

  abstract eth_sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse>;

  abstract eth_signTransaction(transaction: TransactionRequest): Promise<string>;
}
