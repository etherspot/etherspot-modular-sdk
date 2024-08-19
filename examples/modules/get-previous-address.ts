import { EtherspotBundler, ModularSdk } from '../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../src/sdk/common';
import { getViemAccount } from '../../src/sdk/common/utils/viem-utils';

dotenv.config();

// tsx examples/modules/get-previous-address.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk(
    getViemAccount(process.env.WALLET_PRIVATE_KEY),
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
    })

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const previousAddress = await modularSdk.getPreviousAddress(MODULE_TYPE.VALIDATOR, '0xFE14F6d4e407850b24D160B9ACfBb042D32BE492');
  console.log(`previousAddress: ${previousAddress}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
