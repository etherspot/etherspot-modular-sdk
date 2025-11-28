import { Hex } from 'viem';
import { BigNumberish } from '../types/bignumber.js';

export interface PulseConfig {
  credibleAccountModuleAddress: string;
  resourceLockValidatorAddress: string;
  uninstallOldHookMultiplexer?: boolean;
  callGasLimit?: BigNumberish;
  sequential?: boolean; // If true, installs modules one-by-one instead of batching
}

export interface SigHookInit {
  sig: string;
  subHooks: Hex[];
}
