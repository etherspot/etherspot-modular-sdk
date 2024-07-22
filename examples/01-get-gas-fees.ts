import { getViemAccount } from '../src/sdk/common/utils/viem-utils';
import { EtherspotBundler, ModularSdk } from '../src';
import * as dotenv from 'dotenv';
import { generateModularSDKInstance } from './helpers/sdk-helper';

dotenv.config();

// npx ts-node examples/01-get-gas-fees.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  const customBundlerUrl = '';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY,
    Number(process.env.CHAIN_ID),
    bundlerApiKey
  );// Testnets dont need apiKey on bundlerProvider

  // get EtherspotWallet address...
  const gasFees: any = await modularSdk.getGasFee();
  console.log(`gasFees is: ${gasFees}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
