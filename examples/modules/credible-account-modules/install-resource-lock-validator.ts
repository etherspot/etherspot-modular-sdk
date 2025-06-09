import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../../src/sdk/common';
import { generateModularSDKInstance } from '../../helpers/sdk-helper';
import { encodeAbiParameters } from 'viem';
import { NetworkConfig, Networks } from '../../../src';

dotenv.config();

// tsx examples/modules/credible-account-modules/install-resource-lock-validator.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';
  const chainId = Number(process.env.CHAIN_ID);

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     chainId, bundlerApiKey);

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  let rlvInitData = encodeAbiParameters([{ type: 'address' }], [modularSdk.getEOAAddress()]);

  const networkConfig : NetworkConfig = Networks[chainId];
  const uoHash = await modularSdk.installModule(MODULE_TYPE.VALIDATOR, networkConfig.contracts.resourceLockValidator, rlvInitData);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while ((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
