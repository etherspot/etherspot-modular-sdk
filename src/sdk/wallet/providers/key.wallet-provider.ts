import { Hash, Hex, TransactionRequest, WalletClient, createWalletClient, http, concat, Address, encodeAbiParameters, parseAbiParameters, hashMessage, toBytes, Chain } from 'viem';
import { MessagePayload, WalletProvider } from './interfaces.js';
import { privateKeyToAccount } from 'viem/accounts';
import { Networks } from '../../network/index.js';
import { ErrorHandler } from '../../errorHandler/errorHandler.service.js';

/**
 * Wallet provider that uses a private key for signing.
 */
export class KeyWalletProvider implements WalletProvider {
  readonly type = 'Key';
  readonly address: string;
  readonly accountAddress: string;

  readonly wallet: WalletClient;

  /**
   * Create a new key wallet provider.
   * @param chainId Chain ID
   * @param privateKey Private key
   * @param chain Optional chain configuration
   */
  constructor(chainId: number, privateKey: string, chain?: Chain) {
    if (!privateKey || typeof privateKey !== 'string') {
      throw new ErrorHandler('Invalid private key provided', 1);
    }

    this.wallet = createWalletClient({
      account: privateKeyToAccount(privateKey as Hex),
      chain: Networks[chainId]?.chain ?? chain,
      transport: http()
    });

    if (!this.wallet.account) {
      throw new ErrorHandler('No account address set. Please provide a valid account address', 1);
    }

    const { address } = this.wallet.account;

    this.address = address;
    this.accountAddress = address;
  }

  async signMessage(message: string, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    if (!this.wallet.account) throw new ErrorHandler('No account set', 1);
    const signature = await this.wallet.signMessage({
      message: {raw: toBytes(hashMessage({raw : toBytes(message)}))},
      account: this.wallet.account
    })
    if (!validatorAddress) throw new ErrorHandler('No validator address provided', 1);
    if (!factoryAddress) throw new ErrorHandler('No factory address provided', 1);
    if (!initCode) throw new ErrorHandler('No init code provided', 1);
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
    if (!this.wallet.account) throw new ErrorHandler('No account set', 1);
    const signature = await this.wallet.signTypedData({
      domain: msg.domain,
      types: msg.types,
      primaryType: msg.primaryType,
      message: msg.message,
      account: this.wallet.account
    })
    if (!validatorAddress) throw new ErrorHandler('No validator address provided', 1);
    if (!factoryAddress) throw new ErrorHandler('No factory address provided', 1);
    if (!initCode) throw new ErrorHandler('No init code provided', 1);
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
    if (!this.wallet.account) throw new ErrorHandler('No account set', 1);
    return this.wallet.signMessage({
      message: { raw: message },
      account: this.wallet.account
    });
  }

  async eth_sendTransaction(transaction: TransactionRequest): Promise<Hash> {
    if (!this.wallet.account) throw new ErrorHandler('No account set', 1);
    return this.wallet.sendTransaction({
      ...transaction,
      account: this.wallet.account,
      chain: this.wallet.chain,
      kzg: undefined
    });
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    if (!this.wallet.account) throw new ErrorHandler('No account set', 1);
    return this.wallet.signTransaction({
      ...transaction,
      account: this.wallet.account,
      chain: this.wallet.chain,
      kzg: undefined
    });
  }
}
