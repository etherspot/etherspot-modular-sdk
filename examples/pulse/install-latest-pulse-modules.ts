import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import { Hex } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { NETWORK_NAME_TO_CHAIN_ID, NetworkConfig, Networks, NetworkNames } from '../../src';

dotenv.config();

const bundlerApiKey = process.env.API_KEY || 'etherspot_public_key';

// tsx examples/pulse/install-latest-pulse-modules.ts
async function main() {
  const chainId: number = NETWORK_NAME_TO_CHAIN_ID[NetworkNames.Sepolia];

  // Init SDK
  const modularSdk = generateModularSDKInstance(process.env.WALLET_PRIVATE_KEY as string, chainId, bundlerApiKey);

  const networkConfig: NetworkConfig = Networks[chainId];
  const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0xe8bC0032846DEFDA434B08514034CDccD8db5318' as Hex;
  const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0x566f9d697FF95D13643A35B3F11BB4812B2aaF15' as Hex;

  // Get counterfactual of ModularEtherspotWallet...
  const address: Hex = (await modularSdk.getCounterFactualAddress()) as Hex;
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // Get native balance
  const balance = await modularSdk.getNativeBalance();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet native balance: ${balance}`);

  /*//////////////////////////////////////////////////////////////
                    PULSE ECOSYSTEM INSTALLATION
  //////////////////////////////////////////////////////////////*/

  console.log('\x1b[33m%s\x1b[0m', 'Starting Pulse ecosystem installation...');

  try {
    // Install the complete Pulse ecosystem using the new Pulse class
    const uoHash = await modularSdk.pulse.installPulseModules({
      credibleAccountModuleAddress: CREDIBLE_ACCOUNT_MODULE_ADDRESS,
      resourceLockValidatorAddress: RESOURCE_LOCK_VALIDATOR_ADDRESS,
      uninstallOldHookMultiplexer: false,
    });

    console.log(`PulseSetup UserOpHash: ${uoHash}`);

    // Await transaction hash
    console.log('Waiting for transaction...');
    let userOpsReceipt = null;
    const timeout = Date.now() + 300000; // 5 minute timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
      await sleep(2);
      userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
    }

    if (userOpsReceipt) {
      console.log('\x1b[32m%s\x1b[0m', 'Pulse ecosystem installation completed successfully!');
      console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);

      // Verify installation
      const installationStatus = await modularSdk.pulse.isPulseModulesInstalled({
        credibleAccountModuleAddress: CREDIBLE_ACCOUNT_MODULE_ADDRESS,
        resourceLockValidatorAddress: RESOURCE_LOCK_VALIDATOR_ADDRESS,
      });

      console.log('\x1b[33m%s\x1b[0m', 'Installation Status:', installationStatus);

      if (
        installationStatus.hookMultiPlexer &&
        installationStatus.credibleAccountValidator &&
        installationStatus.resourceLockValidator
      ) {
        console.log('\x1b[32m%s\x1b[0m', 'All Pulse modules installed successfully!');
      } else {
        console.log('\x1b[31m%s\x1b[0m', 'Some modules may not have been installed correctly');
      }
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'Transaction timeout - please check transaction status manually');
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Error during Pulse ecosystem installation:', error);
    throw error;
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit());
