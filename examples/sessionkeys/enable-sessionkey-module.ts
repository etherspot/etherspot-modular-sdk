import { EtherspotBundler, ModularSdk, SessionKeyValidator } from '../../src';
import * as dotenv from 'dotenv';
import { getViemAccount, sleep } from '../../src/sdk/common';
import { KeyStore } from '../../src/sdk/SessionKeyValidator';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();
const secondsInAMonth = 30 * 24 * 60 * 60; // 2592000 seconds

// tsx examples/sessionkeys/enable-sessionkey-module.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);


  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const token = process.env.TOKEN_ADDRESS as string; // token address
  const functionSelector = process.env.FUNCTION_SELECTOR as string;
  const spendingLimit = '1000000000000000000000';
  const validAfter = getEpochTimeInSeconds() + 31; // 10 seconds from now
  const validUntil = getEpochTimeInSeconds() + secondsInAMonth;

  // get instance  of SessionKeyValidator
  const sessionKeyModule = await SessionKeyValidator.create(modularSdk);

  const response = await sessionKeyModule.enableSessionKey(
    token,
    functionSelector,
    spendingLimit,
    validAfter,
    validUntil,
    KeyStore.AWS
  );

  console.log('\x1b[33m%s\x1b[0m', `UserOpHash: `, response.userOpHash);
  console.log('\x1b[33m%s\x1b[0m', `SessionKey: `, response.sessionKey);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while ((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(response.userOpHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);

  const sessionKeys = await sessionKeyModule.getAssociatedSessionKeys();
  console.log('\x1b[33m%s\x1b[0m', `AssociatedSessionKeys: `, sessionKeys);
}

main()
  .catch(console.error)
  .finally(() => process.exit());

  const getEpochTimeInSeconds = () => Math.floor(new Date().getTime() / 1000);
