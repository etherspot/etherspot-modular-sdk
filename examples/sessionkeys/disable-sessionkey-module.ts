import { EtherspotBundler, ModularSdk, SessionKeyValidator } from '../../src';
import * as dotenv from 'dotenv';
import { getViemAccount, sleep } from '../../src/sdk/common';

dotenv.config();

const sessionKey = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';

// tsx examples/sessionkeys/disable-sessionkey-module.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk(
    getViemAccount(process.env.WALLET_PRIVATE_KEY as string),
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
    })

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // get instance  of SessionKeyValidator
  const sessionKeyModule = await SessionKeyValidator.create(modularSdk);

  const response = await sessionKeyModule.disableSessionKey(sessionKey);

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