import { ModularSdk } from '../../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../../src/sdk/common';
import { ethers } from 'ethers';
import * as CredibleAccountModuleABI from '../../../src/sdk/abi/CredibleAccountModule.json';
import { sessionKeyExists } from '../utils/credible-session-utils';
import { printOp } from '../../../src/sdk/common/OperationUtils';
dotenv.config();

export async function disableSessionKey(modularSdk: ModularSdk, credibleAccountModuleAddress: string, sessionKey: string) {

  const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

  console.log(`etherspotWalletAddress: ${etherspotWalletAddress}`);

  // 1. check if the account has CredibleAccount module installed as validator
  const isValidatorInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);
  if (!isValidatorInstalled) {
    throw new Error(`CredibleAccount module: ${credibleAccountModuleAddress} is not installed as Validator on modularWallet: ${etherspotWalletAddress}`);
  }

  // 2. disable SessionKey

  // check if the session key already exists
  const doesSessionKeyExists = await sessionKeyExists(credibleAccountModuleAddress, sessionKey, etherspotWalletAddress, modularSdk.provider);

  if (!doesSessionKeyExists) {
    throw new Error(`Session key ${sessionKey} doesnot exists`);
  }

  // 4. generate disableSessionKey Data

  const credibleAccountModuleInterface = new ethers.utils.Interface(CredibleAccountModuleABI.abi);

  // Encode the function call data with the function selector and the encoded session data
  const disableSessionKeyCallData = credibleAccountModuleInterface.encodeFunctionData("disableSessionKey", [sessionKey]);

  await modularSdk.clearUserOpsFromBatch();

  await modularSdk.addUserOpsToBatch({
    to: credibleAccountModuleAddress,
    data: disableSessionKeyCallData
  });

  const op = await modularSdk.estimate();

  const upserOpString = await printOp(op);
  console.log(`Estimated UserOp: ${upserOpString}`);

  const uoHash = await modularSdk.send(op);

  return uoHash;
}
