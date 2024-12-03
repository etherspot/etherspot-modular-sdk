import { BigNumber, BigNumberish, BytesLike, Transaction, Wallet } from 'ethers';
import { AccessListish, Deferrable } from 'ethers/lib/utils';
import type UniversalProvider from '@walletconnect/universal-provider';
import { UniqueSubject } from '../../common';
import { NetworkNames } from '../../network';

export interface WalletProvider {
  readonly type?: string;
  readonly wallet?: Wallet;
  readonly address: string;
  readonly address$?: UniqueSubject<string>;
  readonly networkName?: NetworkNames;
  readonly networkName$?: UniqueSubject<NetworkNames>;

  signTypedData(msg: MessagePayload, validatorAddress?: string, factoryAddress?: string, initCode?: string): Promise<string>;

  signMessage(message: BytesLike, validatorAddress?: string, factoryAddress?: string, initCode?: string): Promise<string>;

  signUserOp(message: BytesLike): Promise<string>;

  eth_requestAccounts(address?: string): Promise<string[]>;

  eth_accounts(address?: string): Promise<string[]>;

  eth_sendTransaction(transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse>;

  eth_signTransaction(transaction: TransactionRequest): Promise<string>;
}

export interface Web3Provider {
  send(payload: any, callback: (err: any, response?: any) => any): any;
}

export interface TransactionResponse extends Transaction {
  hash: string;

  // Only if a transaction has been mined
  blockNumber?: number,
  blockHash?: string,
  timestamp?: number,

  confirmations: number,

  // Not optional (as it is in Transaction)
  from: string;

  // The raw transaction
  raw?: string,

  // This function waits until the transaction has been mined
  wait: (confirmations?: number) => Promise<TransactionReceipt>
};

export interface TransactionReceipt {
  to: string;
  from: string;
  contractAddress: string,
  transactionIndex: number,
  root?: string,
  gasUsed: BigNumber,
  logsBloom: string,
  blockHash: string,
  transactionHash: string,
  logs: Array<Log>,
  blockNumber: number,
  confirmations: number,
  cumulativeGasUsed: BigNumber,
  effectiveGasPrice: BigNumber,
  byzantium: boolean,
  type: number;
  status?: number
};

export interface Log {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;

  removed: boolean;

  address: string;
  data: string;

  topics: Array<string>;

  transactionHash: string;
  logIndex: number;
}

export type TransactionRequest = {
  to?: string,
  from?: string,
  nonce?: BigNumberish,

  gasLimit?: BigNumberish,
  gasPrice?: BigNumberish,

  data?: BytesLike,
  value?: BigNumberish,
  chainId?: number

  type?: number;
  accessList?: AccessListish;

  maxPriorityFeePerGas?: BigNumberish;
  maxFeePerGas?: BigNumberish;

  customData?: Record<string, any>;
  ccipReadEnabled?: boolean;
}

// https://eips.ethereum.org/EIPS/eip-712#parameters
export type MessagePayload = {
  domain: EIP712Domain;
  types: Record<string, TypedProperty[]>;
  primaryType?: string;
  message: any;
};

// https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator
type EIP712Domain = {
  name?: string;
  version?: string;
  chainId?: number;
  verifyingContract?: string;
  salt?: string;
};

// https://eips.ethereum.org/EIPS/eip-712#definition-of-typed-structured-data-%F0%9D%95%8A
type TypedProperty = {
  name: string;
  type: string;
};


export interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}
export interface Web3eip1193Provider {
  request(args: RequestArguments): any;
}

export interface WalletConnectConnector {
  accounts: string[];
  chainId: number;
  signPersonalMessage(params: any[]): Promise<any>;
  request<T = unknown>(args: RequestArguments): Promise<T>;
  on(event: string, callback: (error: Error | null, payload: any | null) => void): void;
}

export interface WalletLike {
  privateKey: string;
}

export declare class EthereumProvider {
  accounts: string[];
  signer: InstanceType<typeof UniversalProvider>;
  chainId: number;
  request<T = unknown>(args: RequestArguments): Promise<T>;
  sendAsync(args: RequestArguments, callback: (error: Error | null, response: any) => void): void;
  disconnect(): Promise<void>;
  on(event: string, callback: (error: Error | null, payload: any | null) => void): void;
  once(event: string, callback: (error: Error | null, payload: any | null) => void): void;
  removeListener(event: string, callback: (error: Error | null, payload: any | null) => void): void;
  off(event: string, callback: (error: Error | null, payload: any | null) => void): void;
  readonly isWalletConnect?: boolean;
}

export type WalletProviderLike = string | WalletLike | WalletProvider | EthereumProvider;
