import * as dotenv from 'dotenv';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// tsx examples/basics/get-gas-fees.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  const customBundlerUrl = '';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get EtherspotWallet address...
  const gasFees: any = await modularSdk.getGasFee();
  console.log(`gasFees is: ${JSON.stringify(gasFees)}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
