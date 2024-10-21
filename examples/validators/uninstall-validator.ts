import { ethers } from 'ethers';
import { EtherspotBundler, ModularSdk } from '../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';

dotenv.config();

// npx ts-node examples/validators/uninstall-validator.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  
  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, { chainId: Number(process.env.CHAIN_ID), bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey) })

  console.log('address: ', modularSdk.state.EOAAddress);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const validatorAddress = '0xE340d86e447D2c290AcF1e574399A06924DAF78c';

  //this should be previous node address of the module to be uninstalled and the deinit data
  //deinit data is the data that is passed to the module to be uninstalled
  // here we need to call the function which can find out the address of previous node of the module to be uninstalled
  // and the deinit data can be 0x00 as default value
  const deInitDataDefault = '0x00';

  const prevAddr = await modularSdk.getPreviousAddress(MODULE_TYPE.VALIDATOR, validatorAddress);
  console.log(`Previous Address: ${prevAddr}`);

  //generate deinit data...
  const deInitData = await modularSdk.generateModuleDeInitData(MODULE_TYPE.VALIDATOR, validatorAddress, deInitDataDefault);

  console.log(`deinitData: ${deInitData}`);

  // default : 0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143
  const uoHash = await modularSdk.uninstallModule(MODULE_TYPE.VALIDATOR, validatorAddress, deInitData);
  console.log(`UserOpHash: ${uoHash}`);

  // // get transaction hash...
  // console.log('Waiting for transaction...');
  // let userOpsReceipt = null;
  // const timeout = Date.now() + 60000; // 1 minute timeout
  // while ((userOpsReceipt == null) && (Date.now() < timeout)) {
  //   await sleep(2);
  //   userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  // }
  // console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
