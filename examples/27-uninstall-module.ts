import { ethers } from 'ethers';
import { EtherspotBundler, ModularSdk } from '../src';
import { printOp } from '../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../src/sdk/common';

dotenv.config();

async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, { chainId: Number(process.env.CHAIN_ID), bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey) })

  console.log('address: ', modularSdk.state.EOAAddress);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const deInitData = ethers.utils.defaultAbiCoder.encode(
    ["address", "bytes"],
    ['0x0000000000000000000000000000000000000001', '0x00']
  );

  // get uninstallData of module
  const uninstallData = await modularSdk.uninstallModule(MODULE_TYPE.VALIDATOR, '0x6a00da4DEEf677Ad854B7c14F17Ed9312c2B5fDf', deInitData);

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: address, data: uninstallData });
  console.log('transactions: ', userOpsBatch);

  // sign transactions added to the batch
  const op = await modularSdk.estimate();
  console.log(`Estimated UserOp: ${await printOp(op)}`);

  // sign the userOps and sending to the bundler...
  const uoHash = await modularSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
