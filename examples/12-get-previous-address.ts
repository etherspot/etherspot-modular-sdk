import { ethers } from 'ethers';
import { EtherspotBundler, ModularSdk } from '../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../src/sdk/common';

dotenv.config();

// npx ts-node examples/11-get-previous-address.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, { chainId: Number(process.env.CHAIN_ID), bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey) })

  console.log('address: ', modularSdk.state.EOAAddress);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const previousAddress = await modularSdk.getPreviousAddress(MODULE_TYPE.VALIDATOR, '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143');
  console.log(`previousAddress: ${previousAddress}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
