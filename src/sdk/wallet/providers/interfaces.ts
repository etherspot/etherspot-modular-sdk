import { Hash, Hex, TransactionRequest, TypedDataDomain, WalletClient } from 'viem';
import type UniversalProvider from '@walletconnect/universal-provider';
import { UniqueSubject } from '../../common';
import { NetworkNames } from '../../network';

export interface WalletProvider {
  readonly type?: string;
  readonly wallet?: WalletClient;
  readonly address: string;
  readonly address$?: UniqueSubject<string>;
  readonly networkName?: NetworkNames;
  readonly networkName$?: UniqueSubject<NetworkNames>;

  signTypedData(msg: MessagePayload, validatorAddress?: string): Promise<string>;

  signMessage(message: Hex, validatorAddress?: string): Promise<string>;

  signUserOp(message: Hex): Promise<string>;

  eth_requestAccounts(address?: string): Promise<string[]>;

  eth_accounts(address?: string): Promise<string[]>;

  eth_sendTransaction(transaction: TransactionRequest): Promise<Hash>;

  eth_signTransaction(transaction: TransactionRequest): Promise<string>;
}

export interface Web3Provider {
  send(payload: any, callback: (err: any, response?: any) => any): any;
}

// https://eips.ethereum.org/EIPS/eip-712#parameters
export type MessagePayload = {
  domain: TypedDataDomain;
  types: { EIP712Domain: TypedDataDomain } & Record<string, TypedProperty[]>;
  primaryType: string;
  message: any;
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

export type WalletProviderLike = string | WalletLike | WalletProvider | EthereumProvider | WalletClient;
