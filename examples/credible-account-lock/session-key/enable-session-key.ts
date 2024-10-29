import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { ModularSdk } from '../../../src';
import { MODULE_TYPE } from '../../../src/sdk/common';
import { printOp } from '../../../src/sdk/common/OperationUtils';
import { generateEnableSessionKeyCalldata, sessionKeyExists } from '../utils/credible-session-utils';
import { ResourceLockSessionData } from '../utils/credible-session-types';

dotenv.config();

export async function enableSessionKey(modularSdk: ModularSdk, credibleAccountModuleAddress: string, sessionData: ResourceLockSessionData) {

  const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

  console.log(`etherspotWalletAddress: ${etherspotWalletAddress}`);

  // 1. check if the account has CredibleAccount module installed as validator
  const isValidatorInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);
  if (!isValidatorInstalled) {
    throw new Error(`CredibleAccount module: ${credibleAccountModuleAddress} is not installed as Validator on modularWallet: ${etherspotWalletAddress}`);
  }

  // 2. enable SessionKey

  // check if the session key already exists
  const doesSessionKeyExists = await sessionKeyExists(credibleAccountModuleAddress, sessionData.sessionKey, etherspotWalletAddress, modularSdk.provider);

  if (doesSessionKeyExists) {
    throw new Error(`Session key ${sessionData.sessionKey} already exists`);
  }

  //3. check if the wallet has sufficient token balances for the tokens in the sessionData
  const tokenData = sessionData.tokenData;

  let errorMessage = '';

  for (let i = 0; i < tokenData.length; i++) {
    const token = tokenData[i].token;
    const amount = tokenData[i].amount;
    let tokenBalance = ethers.BigNumber.from(0);
    try {
      tokenBalance = await getTokenBalance(modularSdk.provider, token, etherspotWalletAddress);
    } catch (error) {
      errorMessage += `Error fetching balance for Token: ${token} for Wallet: ${etherspotWalletAddress} \n`;
      continue;
    }

    if (tokenBalance.toBigInt() < amount) {
      errorMessage += `Wallet: ${etherspotWalletAddress} has Token: ${token} with Actual Balance: ${tokenBalance.toString()} Wei, but Expected Balance: ${amount.toString()} Wei \n`;
    }
  }

  if (errorMessage) {
    throw new Error(`Token balance discrepancies found for session key ${sessionData.sessionKey}:\n${errorMessage}`);
  }

  // 4. generate enableSessionKey Data
  const enableSessionKeyCallData = generateEnableSessionKeyCalldata(sessionData);

  await modularSdk.clearUserOpsFromBatch();

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
