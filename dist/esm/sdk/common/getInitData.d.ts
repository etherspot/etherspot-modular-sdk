import { Hex } from 'viem';
import { InitialModules } from './types.js';

declare const getInitData: ({ initCode, }: {
    initCode: Hex;
}) => InitialModules;

export { getInitData };
