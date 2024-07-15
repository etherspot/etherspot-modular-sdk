import { EtherspotBundler, ModularSdk } from '../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../src/sdk/common';
import { getViemAccount } from '../src/sdk/common/utils/viem-utils';

dotenv.config();

// npx ts-node examples/11-is-module-installed.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  console.log(`inside is-module-installed script:`);

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      account: getViemAccount(process.env.WALLET_PRIVATE_KEY),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
    })

  console.log('address: ', modularSdk.state.EOAAddress);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const isModuleInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, '0xD6dc0A5Ca1EC90D1283A6d13642e8186059fF63B');
  console.log(`isModuleInstalled: ${isModuleInstalled}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
