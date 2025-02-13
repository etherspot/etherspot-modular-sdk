import * as dotenv from 'dotenv';
import { MODULE_TYPE } from '../../src/sdk/common';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// tsx examples/modules/is-module-installed.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';

  console.log(`inside is-module-installed script:`);

  // initializating sdk for index 0...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY,
    Number(process.env.CHAIN_ID),
    bundlerApiKey
  );// Testnets dont need apiKey on bundlerProvider

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const isModuleInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, '0xFE14F6d4e407850b24D160B9ACfBb042D32BE492');
  console.log(`isModuleInstalled: ${isModuleInstalled}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
