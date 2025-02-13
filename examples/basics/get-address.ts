import * as dotenv from 'dotenv';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// tsx examples/basics/get-address.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';
  const customBundlerUrl = '';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get EtherspotWallet address...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
