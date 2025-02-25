import { Hex, Address } from 'viem';

type AccountType = 'erc7579-implementation';
type InitialModules = {
    validators: Module[];
    executors: Module[];
    hooks: Module[];
    fallbacks: Module[];
};
type ModuleType = 'validator' | 'executor' | 'fallback' | 'hook';
type Module = {
    module: Address;
    data?: Hex;
    additionalContext?: Hex;
    type: ModuleType;
};
type ModuleTypeIds = {
    [index in ModuleType]: number;
};
declare const moduleTypeIds: ModuleTypeIds;
interface TypedDataField {
    name: string;
    type: string;
}
type Bytes = ArrayLike<number>;
type BytesLike = Uint8Array | Hex | Bytes | String;

export { type AccountType, type Bytes, type BytesLike, type InitialModules, type Module, type ModuleType, type TypedDataField, moduleTypeIds };
