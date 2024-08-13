import { EtherspotBundler, ModularSdk, SessionKeyValidator } from '../src';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';
import { KeyStore } from '../src/sdk/SessionKeyValidator';

dotenv.config();

// npx ts-node examples/13-enable-sessionkey-module.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
    })

  console.log('address: ', modularSdk.state.EOAAddress);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const token = process.env.TOKEN_ADDRESS as string;
  const functionSelector = process.env.FUNCTION_SELECTOR as string;
  const spendingLimit = '1000000000000000000000';
  const validUntil = new Date().getTime() + 1000 * 60 * 60 * 1000;

  // get instance  of SessionKeyValidator
  const sessionKeyModule = new SessionKeyValidator(
    modularSdk,
    new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
  )

  const response = await sessionKeyModule.enableSessionKey(
    token,
    functionSelector,
    spendingLimit,
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

  const sessionData = await sessionKeyModule.sessionData(response.sessionKey);
  console.log('\x1b[33m%s\x1b[0m', `SessionData: `, sessionData);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
