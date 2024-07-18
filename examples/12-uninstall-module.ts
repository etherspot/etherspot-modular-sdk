import { EtherspotBundler, ModularSdk } from '../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../src/sdk/common';
import { getViemAccount } from '../src/sdk/common/utils/viem-utils';

dotenv.config();

// tsx examples/12-uninstall-module.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, { chainId: Number(process.env.CHAIN_ID),  account: getViemAccount(process.env.WALLET_PRIVATE_KEY), bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey) })

  console.log('address: ', modularSdk.state.EOAAddress);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  //this should be previous node address of the module to be uninstalled and the deinit data
  //deinit data is the data that is passed to the module to be uninstalled
  // here we need to call the function which can find out the address of previous node of the module to be uninstalled
  // and the deinit data can be 0x00 as default value
  const deInitDataDefault = '0x00';

  //generate deinit data...
  const deInitData = await modularSdk.generateModuleDeInitData(
      MODULE_TYPE.VALIDATOR,
     '0xf47600D8dFef04269206255E53c8926519BA09a9', 
     deInitDataDefault);

  console.log(`deinitData: ${deInitData}`);

  // default : 0xD6dc0A5Ca1EC90D1283A6d13642e8186059fF63B
  const uoHash = await modularSdk.uninstallModule(MODULE_TYPE.VALIDATOR, 
    '0xf47600D8dFef04269206255E53c8926519BA09a9', deInitData);
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
