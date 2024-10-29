import { ModularSdk } from '../../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../../src/sdk/common';
import { ethers } from 'ethers';
import * as HookMultiPlexerABI from "../../../src/sdk/abi/HookMultiPlexer.json";
import { printOp } from '../../../src/sdk/common/OperationUtils';

dotenv.config();

export async function removeCredibleModuleHook(modularSdk: ModularSdk, hookMultiplexerAddress: string, credibleAccountModuleAddress: string): Promise<string> {

  const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

  console.log(`removeCredibleModuleHook called on wallet: ${etherspotWalletAddress}`);

  // 1. check if the account has HookMultiplexer module installed as Hook
  const isHookInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.HOOK, hookMultiplexerAddress);

  console.log(`isHookInstalled: ${isHookInstalled}`);

  if (!isHookInstalled) {
    console.log(`HookMultiplexer module is not installed`);
    return;
  }

  // If not, remove CredibleAccountModule as SubHook to the HookMultiplexer
  const iface = new ethers.utils.Interface(HookMultiPlexerABI.abi);

  //check if the HookMultiplexer module has CredibleAccountModule as one of the GENERAL Hooks
  const provider: ethers.providers.JsonRpcProvider = modularSdk.provider;
  const hookMultiplexerContract = new ethers.Contract(hookMultiplexerAddress, HookMultiPlexerABI.abi, provider);

  //(0 for GLOBAL)
  const hookType = 0;

  const hasCredibleAccountModuleAsHook: boolean = await hookMultiplexerContract.hasHook(etherspotWalletAddress,
    credibleAccountModuleAddress, hookType);

  console.log(`hasCredibleAccountModuleAsHook: ${hasCredibleAccountModuleAsHook}`);

  if (!hasCredibleAccountModuleAsHook) {
    console.log(`CredibleAccountModule is not installed as Hook`);
    return;
  }

  console.log(`Removing CredibleAccountModule as Hook from HookMultiplexer`);

  // Encode the function call data
  const removeCredibleModuleHookData = iface.encodeFunctionData("removeHook", [
    credibleAccountModuleAddress,
    hookType
  ]);

  await modularSdk.addUserOpsToBatch({
    to: hookMultiplexerAddress,
    data: removeCredibleModuleHookData
  });

  console.log('UserOpsBatch: ', modularSdk.userOpsBatchRequest);
  const op = await modularSdk.estimate();
  console.log(`Estimated UserOp: ${printOp(op)}`);
  const uoHash = await modularSdk.send(op);
  return uoHash;
}
