import { ModularSdk } from '../../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../../src/sdk/common';
import { ethers } from 'ethers';

dotenv.config();

export async function uninstallCredibleModuleValidator(modularSdk: ModularSdk, credibleAccountModuleAddress: string): Promise<string> {

  const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

  // 1. check if the account has credibleAccountModule installed as Validator
  const isValidatorInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);

  if (!isValidatorInstalled) {
    throw new Error(`CredibleAccount module: ${credibleAccountModuleAddress} doesn't exist as Validator on modularWallet: ${etherspotWalletAddress}`);
  }
  
  // prepare deInitData for CredibleAccountModule
  // encode ModuleType.VALIDATOR and etherspotWalletAddress to deInitData
  const credibleAccountModuleDeInitData = ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [MODULE_TYPE.VALIDATOR, etherspotWalletAddress]);

  const prevAddr = await modularSdk.getPreviousAddress(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);

  //generate deinit data...
  const deInitData = await modularSdk.generateModuleDeInitData(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress, credibleAccountModuleDeInitData);

  const uoHash = await modularSdk.uninstallModule(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress, deInitData);
  
  return uoHash;
}
