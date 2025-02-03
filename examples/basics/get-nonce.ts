import * as dotenv from 'dotenv';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// tsx examples/basics/get-nonce.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';
  const customBundlerUrl = '';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get EtherspotWallet nonce...
  const nonce = await modularSdk.getNonce();
  console.log(`nonce is: ${nonce}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
