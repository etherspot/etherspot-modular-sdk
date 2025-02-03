import * as dotenv from 'dotenv';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

const bundlerApiKey = 'etherspot_public_key';

// tsx examples/basics/get-multiple-accounts.ts
async function main() {
  // initializating sdk for index 0...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get EtherspotWallet address for index 0...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address for index 0: ${address}`);

  // initializating sdk for index 1...
  const modularSdk1 = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY,
    Number(process.env.CHAIN_ID),
    bundlerApiKey,
    1
  );// Testnets dont need apiKey on bundlerProvider

  // get EtherspotWallet address for index 1...
  const address1: string = await modularSdk1.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address for index 1: ${address1}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
