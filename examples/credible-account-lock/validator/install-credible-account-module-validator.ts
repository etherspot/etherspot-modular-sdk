import { ModularSdk } from '../../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../../src/sdk/common';

dotenv.config();

export async function installCredibleModuleValidator(modularSdk: ModularSdk, credibleAccountModuleAddress: string): Promise<string> {

  const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

  // 1. check if the account has credibleAccountModule installed as Validator
  const isValidatorInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);

  if (isValidatorInstalled) {
    throw new Error(`CredibleAccount module: ${credibleAccountModuleAddress} already exists as Validator on modularWallet: ${etherspotWalletAddress}`);
  }
  
  const uoHash = await modularSdk.installModule(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);
  
  return uoHash;
}
