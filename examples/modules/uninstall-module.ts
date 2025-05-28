import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// tsx examples/modules/uninstall-module.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

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
     '0x9509aae8990bfA12BE09130BB822C37F3086863E', 
     deInitDataDefault);

  console.log(`deinitData: ${deInitData}`);

  // default : 0xD6dc0A5Ca1EC90D1283A6d13642e8186059fF63B
  // 0x22A55192a663591586241D42E603221eac49ed09
  // 0xF4CDE8B11500ca9Ea108c5838DD26Ff1a4257a0c
  const uoHash = await modularSdk.uninstallModule(MODULE_TYPE.VALIDATOR, 
    '0x9509aae8990bfA12BE09130BB822C37F3086863E', deInitData);
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
