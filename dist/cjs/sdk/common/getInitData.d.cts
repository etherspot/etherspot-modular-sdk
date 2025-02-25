import { Hex } from 'viem';
import { InitialModules } from './types.cjs';

declare const getInitData: ({ initCode, }: {
    initCode: Hex;
}) => InitialModules;

export { getInitData };
