import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// tsx examples/modules/install-module.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const uoHash = await modularSdk.installModule(MODULE_TYPE.VALIDATOR, '0xF4CDE8B11500ca9Ea108c5838DD26Ff1a4257a0c');
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
