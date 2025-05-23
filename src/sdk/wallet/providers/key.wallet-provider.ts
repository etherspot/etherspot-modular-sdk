import { Hash, Hex, TransactionRequest, WalletClient, createWalletClient, http, concat, Address, encodeAbiParameters, parseAbiParameters, hashMessage, toBytes, Chain } from 'viem';
import { MessagePayload, WalletProvider } from './interfaces.js';
import { privateKeyToAccount } from 'viem/accounts';
import { Networks } from '../../network/index.js';

export class KeyWalletProvider implements WalletProvider {
  readonly type = 'Key';
  readonly address: string;
  readonly accountAddress: string;

  readonly wallet: WalletClient;

  constructor(chainId: number, privateKey: string, chain?: Chain) {
    this.wallet = createWalletClient({
      account: privateKeyToAccount(privateKey as Hex),
      chain: Networks[chainId]?.chain ?? chain,
      transport: http()
    });

    if (!this.wallet.account) throw new Error('No account address set. Please provide a valid accountaddress');

    const { address } = this.wallet.account;

    this.address = address;
  }

  async signMessage(message: string, validatorAddress?: Address, factoryAddress?: Address, initCode?: Hex): Promise<string> {
    if (!this.wallet.account) throw new Error('No account set');
    const signature = await this.wallet.signMessage({
      message: {raw: toBytes(hashMessage({raw : toBytes(message)}))},
      account: this.wallet.account
    })
    if (!validatorAddress) throw new Error('No validator address provided');
    if (!factoryAddress) throw new Error('No factory address provided');
    if (!initCode) throw new Error('No init code provided');
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
    if (!this.wallet.account) throw new Error('No account set');
    const signature = await this.wallet.signTypedData({
      domain: msg.domain,
      types: msg.types,
      primaryType: msg.primaryType,
      message: msg.message,
      account: this.wallet.account
    })
    if (!validatorAddress) throw new Error('No validator address provided');
    if (!factoryAddress) throw new Error('No factory address provided');
    if (!initCode) throw new Error('No init code provided');
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
    if (!this.wallet.account) throw new Error('No account set');
    return this.wallet.signMessage({
      message: { raw: message },
      account: this.wallet.account
    });
  }

  async eth_sendTransaction(transaction: TransactionRequest): Promise<Hash> {
    if (!this.wallet.account) throw new Error('No account set');
    return this.wallet.sendTransaction({
      ...transaction,
      account: this.wallet.account,
      chain: this.wallet.chain,
      kzg: undefined
    });
  }

  async eth_signTransaction(transaction: TransactionRequest): Promise<string> {
    if (!this.wallet.account) throw new Error('No account set');
    return this.wallet.signTransaction({
      ...transaction,
      account: this.wallet.account,
      chain: this.wallet.chain,
      kzg: undefined
    });
  }
}
