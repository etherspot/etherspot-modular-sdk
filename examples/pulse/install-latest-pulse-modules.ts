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
  const chainId: number = NETWORK_NAME_TO_CHAIN_ID[NetworkNames.Mainnet];

  // Init SDK
  const modularSdk = generateModularSDKInstance(process.env.WALLET_PRIVATE_KEY as string, chainId, bundlerApiKey);

  const networkConfig: NetworkConfig = Networks[chainId];
  const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0xF2f12F197700BF5740e94e18bde637392421043c' as Hex;
  const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0x6C32CC106de33BC97acdcA72897d26eb30edADA4' as Hex;

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
      sequential: true, // Install modules one at a time (avoids batch gas limit issues)
    });

    console.log(`PulseSetup UserOpHash: ${uoHash}`);

    // Await transaction hash
    console.log('Waiting for transaction...');
    let userOpsReceipt = null;
    const timeout = Date.now() + 300000; // 5 minute timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
      await sleep(2000); // Wait 2 seconds between checks
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
