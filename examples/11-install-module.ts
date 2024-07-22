import { EtherspotBundler, ModularSdk } from '../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../src/sdk/common';
import { getViemAccount } from '../src/sdk/common/utils/viem-utils';

dotenv.config();

// tsx examples/11-install-module.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk(
    getViemAccount(process.env.WALLET_PRIVATE_KEY),
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
    })

  const eoaAddress = await modularSdk.getEOAAddress();
  console.log('\x1b[33m%s\x1b[0m', `EOA Address: ${eoaAddress}`);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const uoHash = await modularSdk.installModule(MODULE_TYPE.VALIDATOR, '0xFE14F6d4e407850b24D160B9ACfBb042D32BE492');
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while ((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
