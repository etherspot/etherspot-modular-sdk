import { EtherspotBundler, ModularSdk, SessionKeyValidator } from '../src';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';
import { KeyStore } from '../src/sdk/SessionKeyValidator';

dotenv.config();

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

  const token = process.env.TOKEN_ADDRESS;
  const functionSelector = process.env.FUNCTION_SELECTOR;
  const spendingLimit = '100000';
  const validAfter = new Date().getTime();
  const validUntil = new Date().getTime() + 24 * 60 * 60 * 1000;
  const oldSessionKey = '0xA9c5a669204EB6d96244c822D45c3441065D1148';  // session key which you want to rotate

  // get instance  of SessionKeyValidator

  const sessionKeyModule = await SessionKeyValidator.create(
    modularSdk,
    new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
  )

  const response = await sessionKeyModule.rotateSessionKey(
    token,
    functionSelector,
    spendingLimit,
    validAfter,
    validUntil,
    oldSessionKey,
    KeyStore.AWS
  );

  console.log('\x1b[33m%s\x1b[0m', `UserOpHash: `, response.userOpHash);
  console.log('\x1b[33m%s\x1b[0m', `New SessionKey: `, response.sessionKey);

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