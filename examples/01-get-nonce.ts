import { getViemAccount } from '../src/sdk/common/viem-utils';
import { EtherspotBundler, ModularSdk } from '../src';
import * as dotenv from 'dotenv';

dotenv.config();

// npx ts-node examples/01-get-nonce.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  const customBundlerUrl = '';

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      account: getViemAccount(process.env.WALLET_PRIVATE_KEY),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID),
        bundlerApiKey,
        customBundlerUrl)
    }) // Testnets dont need apiKey on bundlerProvider

  // get EtherspotWallet nonce...
  const nonce = await modularSdk.getNonce();
  console.log(`nonce is: ${nonce}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());