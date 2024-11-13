import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../src/sdk/common';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// npx ts-node examples/modules/generate-module-uninstall-deinitdata.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk for index 0...
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
  const deInitData = '0x00';
  const deinitData = await modularSdk.generateModuleDeInitData(MODULE_TYPE.VALIDATOR, '0x1417aDC5308a32265E0fA0690ea1408FFA62F37c', deInitData);
  console.log(`deinitData: ${deinitData}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
