import { Hex } from 'viem';

export interface PulseConfig {
  credibleAccountModuleAddress: string;
  resourceLockValidatorAddress: string;
  uninstallOldHookMultiplexer?: boolean;
}

export interface SigHookInit {
  sig: string;
  subHooks: Hex[];
}
