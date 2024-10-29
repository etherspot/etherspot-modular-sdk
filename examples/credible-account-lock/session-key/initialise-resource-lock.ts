import { ModularSdk } from '../../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../../src/sdk/common';
import { getHookMultiPlexerInitDataWithCredibleAccountModule } from '../utils/hook-multiplexer-utils';
import { ethers } from 'ethers';
import * as HookMultiPlexerABI from "../../../src/sdk/abi/HookMultiPlexer.json";
import { ResourceLockSessionData } from '../utils/credible-session-types';
import { generateEnableSessionKeyCalldata, sessionKeyExists } from '../utils/credible-session-utils';
import { printOp } from '../../../src/sdk/common/OperationUtils';
dotenv.config();

export async function initialiseCredibleAccountModules(modularSdk: ModularSdk, hookMultiplexerAddress: string, credibleAccountModuleAddress: string, sessionData: ResourceLockSessionData) {

  const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

  console.log(`credibleAccountModuleAddress: ${credibleAccountModuleAddress}`);
  console.log(`hookMultiplexerAddress is: ${hookMultiplexerAddress}`);

  console.log(`Initialising CredibleAccountModule on wallet: ${etherspotWalletAddress} for Session Key: ${sessionData.sessionKey}`);

  // 1. check if the account has HookMultiplexer module installed as Hook
  const isHookInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.HOOK, hookMultiplexerAddress);

  console.log(`isHookInstalled: ${isHookInstalled}`);

  await modularSdk.clearUserOpsFromBatch();

  console.log(`etherspotWalletAddress: ${etherspotWalletAddress}`);

  if (!isHookInstalled) {

    console.log(`Installing HookMultiplexer module`);

    // install HookMultiplexer module
    const hookMultiplexerInitData = await getHookMultiPlexerInitDataWithCredibleAccountModule(credibleAccountModuleAddress);
    console.log(`Hook Multiplexer Init Data: ${hookMultiplexerInitData}`);
    const hookInstallData = await modularSdk.generateModuleInstallData(MODULE_TYPE.HOOK, hookMultiplexerAddress, hookMultiplexerInitData);
    await modularSdk.addUserOpsToBatch({
      to: etherspotWalletAddress,
      data: hookInstallData
    });

  } else {

    // If not, add CredibleAccountModule as SubHook to the HookMultiplexer
    const iface = new ethers.utils.Interface(HookMultiPlexerABI.abi);

    //check if the HookMultiplexer module has CredibleAccountModule as one of the GENERAL Hooks
    const provider: ethers.providers.JsonRpcProvider = modularSdk.provider;
    const hookMultiplexerContract = new ethers.Contract(hookMultiplexerAddress, HookMultiPlexerABI.abi, provider);

    const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

    //(0 for GLOBAL)
    const hookType = 0;

    const hasCredibleAccountModuleAsHook: boolean = await hookMultiplexerContract.hasHook(etherspotWalletAddress,
      credibleAccountModuleAddress, hookType);

    console.log(`hasCredibleAccountModuleAsHook: ${hasCredibleAccountModuleAsHook}`);

    if (!hasCredibleAccountModuleAsHook) {

      console.log(`Adding CredibleAccountModule as Hook to HookMultiplexer`);

      // Encode the function call data
      const encodedData = iface.encodeFunctionData("addHook", [
        credibleAccountModuleAddress,
        hookType
      ]);

      await modularSdk.addUserOpsToBatch({
        to: hookMultiplexerAddress,
        data: encodedData
      });
    }
  }

  // 2. check if the account has CredibleAccount module installed as validator
  const isValidatorInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);

  console.log(`isValidatorInstalled: ${isValidatorInstalled}`);

  if (!isValidatorInstalled) {

    // install CredibleAccountModule as validator
    const initData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);
    const validatorInstallData = await modularSdk.generateModuleInstallData(MODULE_TYPE.VALIDATOR,
      credibleAccountModuleAddress, initData);

    console.log(`Validator Install Data: ${validatorInstallData}`);

    await modularSdk.addUserOpsToBatch({
      to: etherspotWalletAddress,
      data: validatorInstallData
    });
  }

  // 3. enable SessionKey

  // check if the session key already exists
  // const doesSessionKeyExists = await sessionKeyExists(credibleAccountModuleAddress, sessionData.sessionKey, etherspotWalletAddress, modularSdk.provider);

  // if (doesSessionKeyExists) {
  //   throw new Error(`Session key ${sessionData.sessionKey} already exists`);
  // }

  // check if the wallet has sufficient token balances for the tokens in the sessionData
  const tokenData = sessionData.tokenData;

  let errorMessage = '';

  for (let i = 0; i < tokenData.length; i++) {
    const token = tokenData[i].token;
    const amount = tokenData[i].amount;

    const tokenBalance = await getTokenBalance(modularSdk.provider, token, etherspotWalletAddress);

    console.log(`Wallet: ${etherspotWalletAddress} has Token: ${token} with Balance: ${tokenBalance}`);

    if (tokenBalance.toBigInt() < amount) {
      errorMessage += `Wallet: ${etherspotWalletAddress} has Token: ${token} with Actual Balance: ${tokenBalance.toString()} Wei, but Expected Balance: ${amount.toString()} Wei \n`;
    }
  }

  if (errorMessage) {
    throw new Error(`Token balance discrepancies found for session key ${sessionData.sessionKey}:\n${errorMessage}`);
  }

  const enableSessionKeyCallData = generateEnableSessionKeyCalldata(sessionData);

  console.log(`Enable Session Key Call Data: ${enableSessionKeyCallData}`);

  await modularSdk.addUserOpsToBatch({
    to: credibleAccountModuleAddress,
    data: enableSessionKeyCallData
  });

  const op = await modularSdk.estimate();

  const upserOpString = await printOp(op);
  console.log(`Estimated UserOp: ${upserOpString}`);

  const uoHash = await modularSdk.send(op);

  return uoHash;
}

export async function getTokenBalance(provider: ethers.providers.JsonRpcProvider, token: string, walletAddress: string): Promise<ethers.BigNumber> {
  const tokenContract = new ethers.Contract(token, ['function balanceOf(address) view returns (uint256)'], provider);
  return await tokenContract.balanceOf(walletAddress);
}
