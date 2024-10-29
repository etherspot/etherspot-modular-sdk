import { ModularSdk } from '../../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../../src/sdk/common';
import { getHookMultiPlexerInitDataWithCredibleAccountModule } from '../utils/hook-multiplexer-utils';

dotenv.config();

export async function installHookMultiplexer(modularSdk: ModularSdk, hookMultiplexerAddress: string, credibleAccountModuleAddress: string): Promise<string> {
  const hookMultiplexerInitData = await getHookMultiPlexerInitDataWithCredibleAccountModule(credibleAccountModuleAddress);

  const uoHash = await modularSdk.installModule(MODULE_TYPE.HOOK, hookMultiplexerAddress, hookMultiplexerInitData);
  
  return uoHash;
}
