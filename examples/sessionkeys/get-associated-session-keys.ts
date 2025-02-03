import { EtherspotBundler, ModularSdk, SessionKeyValidator } from '../../src';
import * as dotenv from 'dotenv';
import { getViemAccount, sleep } from '../../src/sdk/common';
import { KeyStore } from '../../src/sdk/SessionKeyValidator';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();
const secondsInAMonth = 30 * 24 * 60 * 60; // 2592000 seconds

// tsx examples/sessionkeys/get-associated-session-keys.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);


  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // get instance  of SessionKeyValidator
  const sessionKeyModule = await SessionKeyValidator.create(modularSdk);
  const sessionKeys = await sessionKeyModule.getAssociatedSessionKeys();
  console.log('\x1b[33m%s\x1b[0m', `AssociatedSessionKeys: `, sessionKeys);
}

main()
  .catch(console.error)
  .finally(() => process.exit());

  const getEpochTimeInSeconds = () => Math.floor(new Date().getTime() / 1000);
