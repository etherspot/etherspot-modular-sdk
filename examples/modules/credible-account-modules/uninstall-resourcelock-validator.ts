import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../../src/sdk/common';
import { generateModularSDKInstance } from '../../helpers/sdk-helper';
import { encodeAbiParameters, Hex } from 'viem';
import { NetworkConfig, Networks } from '../../../src';

dotenv.config();

// tsx examples/modules/credible-account-modules/uninstall-resourcelock-validator.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';

  const chainId = Number(process.env.CHAIN_ID);

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     chainId, bundlerApiKey);

  // get address of EtherspotWallet
  const etherspotWalletAddress: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${etherspotWalletAddress}`);

  const networkConfig : NetworkConfig = Networks[chainId];
  
  //this should be previous node address of the module to be uninstalled and the deinit data
  //deinit data is the data that is passed to the module to be uninstalled
  // here we need to call the function which can find out the address of previous node of the module to be uninstalled
  // and the deinit data can be 0x00 as default value
  const deInitDataDefault = '0x00';
    //generate deinit data...
  const deInitData = await modularSdk.generateModuleDeInitData(
      MODULE_TYPE.VALIDATOR,
     networkConfig.contracts.resourceLockValidator, 
     deInitDataDefault);

  const uoHash = await modularSdk.uninstallModule(MODULE_TYPE.VALIDATOR, 
    networkConfig.contracts.resourceLockValidator, deInitData);
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
