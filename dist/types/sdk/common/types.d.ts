import { Address, Hex } from 'viem';
export type AccountType = 'erc7579-implementation';
export type InitialModules = {
    validators: Module[];
    executors: Module[];
    hooks: Module[];
    fallbacks: Module[];
};
export type ModuleType = 'validator' | 'executor' | 'fallback' | 'hook';
export type Module = {
    module: Address;
    data?: Hex;
    additionalContext?: Hex;
    type: ModuleType;
};
type ModuleTypeIds = {
    [index in ModuleType]: number;
};
export declare const moduleTypeIds: ModuleTypeIds;
export interface TypedDataField {
    name: string;
    type: string;
}
export type Bytes = ArrayLike<number>;
export type BytesLike = Uint8Array | Hex | Bytes | String;
export {};
//# sourceMappingURL=types.d.ts.map