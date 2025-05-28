import { EtherspotBundler, ModularSdk } from '../../src';
import * as dotenv from 'dotenv';
import { getViemAccount } from '../../src/sdk/common/utils';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// tsx examples/modules/list-modules.ts
async function main() {
  const bundlerApiKey = 'etherspot_3ZXobjcWrPVsHC6sXZRBtmLV';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const moduleInfo = await modularSdk.getAllModules();
  console.log(`moduleInfo: ${JSON.stringify(moduleInfo)}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
