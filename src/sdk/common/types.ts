import { Address, Hex, Account } from 'viem'

export type AccountType = 'erc7579-implementation'

// export type Account = {
//   address: Address
//   initCode?: Hex
//   type: AccountType
//   deployedOnChains: Number[]
// }

export type InitialModules = {
  validators: Module[]
  executors: Module[]
  hooks: Module[]
  fallbacks: Module[]
}

export type ModuleType = 'validator' | 'executor' | 'fallback' | 'hook'

export type Module = {
  module: Address
  data?: Hex
  additionalContext?: Hex
  type: ModuleType
}

type ModuleTypeIds = {
  [index in ModuleType]: number
}

export const moduleTypeIds: ModuleTypeIds = {
  validator: 1,
  executor: 2,
  fallback: 3,
  hook: 4,
}

export interface TypedDataField {
  name: string;
  type: string;
};

export type Bytes = ArrayLike<number>;

export type BytesLike = Uint8Array | Hex | Bytes | String
