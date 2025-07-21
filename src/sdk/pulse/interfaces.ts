import { Hex } from 'viem';

export interface PulseConfig {
  hookMultiplexerAddress?: string;
  credibleAccountModuleAddress?: string;
  resourceLockValidatorAddress?: string;
  uninstallOldHookMultiplexer?: boolean;
  oldHookMultiplexerAddress?: string;
}

export interface SigHookInit {
  sig: string;
  subHooks: Hex[];
}
