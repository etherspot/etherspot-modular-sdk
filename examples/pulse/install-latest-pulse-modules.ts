import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import { encodeAbiParameters, encodeFunctionData, parseAbi, Hex } from 'viem';
import { MODULE_TYPE } from '../../src/sdk/common/index.js';
import { accountAbi } from '../../src/sdk/common/abis.js';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { HookMultiplexer } from '../../src/sdk/pulse/utils.js';
import { NETWORK_NAME_TO_CHAIN_ID, NetworkConfig, Networks, NetworkNames } from '../../src';
import { HookType } from '../../src/sdk/pulse/constants';

dotenv.config();

const bundlerApiKey = process.env.BUNDLER_API_KEY || 'etherspot_public_key';

// tsx examples/pulse/install-latest-pulse-modules.ts
async function main() {
  const chainId: number = NETWORK_NAME_TO_CHAIN_ID[NetworkNames.Arbitrum];

  // Init SDK
  const modularSdk = generateModularSDKInstance(process.env.WALLET_PRIVATE_KEY as string, chainId, bundlerApiKey);

  const networkConfig: NetworkConfig = Networks[chainId];
  const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0xe8bC0032846DEFDA434B08514034CDccD8db5318' as Hex;
  const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0x566f9d697FF95D13643A35B3F11BB4812B2aaF15' as Hex;
  const OLD_CAM = '0xeF085141B983B76618348104851122472DF6D4af' as Hex;

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

    // Use provided addresses or fall back to network defaults
    const HOOK_MULTIPLEXER_ADDRESS_V2 = networkConfig.contracts.hookMultiPlexerV2 as Hex;

    // Get wallet address
    const address: Hex = (await modularSdk.getCounterFactualAddress()) as Hex;

    // Clear existing UserOps from batch
    await modularSdk.clearUserOpsFromBatch();

    // Remove existing Credible Account Module as subhook on Hook Multiplexer
    const removeHookCalldata = encodeFunctionData({
      abi: HookMultiplexer,
      functionName: 'removeHook',
      args: [OLD_CAM as Hex, HookType.GLOBAL as Hex],
    });

    // Add the call to the batch (calling addHook on the Hook Multiplexer)
    await modularSdk.addUserOpsToBatch({
      to: HOOK_MULTIPLEXER_ADDRESS_V2,
      data: removeHookCalldata,
    });

    // Install Hook Multiplexer with Credible Account Module as subhook
    await modularSdk.pulse.addHook(CREDIBLE_ACCOUNT_MODULE_ADDRESS, HookType.GLOBAL, HOOK_MULTIPLEXER_ADDRESS_V2);

    // Install Credible Account Module as Validator
    const cavInitData = encodeAbiParameters([{ type: 'uint256' }], [BigInt(MODULE_TYPE.VALIDATOR)]);
    const cavInstallCalldata = encodeFunctionData({
      abi: parseAbi(accountAbi),
      functionName: 'installModule',
      args: [BigInt(MODULE_TYPE.VALIDATOR), CREDIBLE_ACCOUNT_MODULE_ADDRESS, cavInitData],
    });
    await modularSdk.addUserOpsToBatch({ to: address, data: cavInstallCalldata });

    // Install Resource Lock Validator
    const rlvInitData = encodeAbiParameters([{ type: 'address' }], [modularSdk.getEOAAddress()]);
    const rlvInstallCalldata = encodeFunctionData({
      abi: parseAbi(accountAbi),
      functionName: 'installModule',
      args: [BigInt(MODULE_TYPE.VALIDATOR), RESOURCE_LOCK_VALIDATOR_ADDRESS, rlvInitData],
    });
    const batchUserOpsRequest = await modularSdk.addUserOpsToBatch({ to: address, data: rlvInstallCalldata });

    // Estimate and send the UserOp
    const op = await modularSdk.estimate();
    const uoHash = await modularSdk.send(op);

    console.log(`PulseSetup UserOpHash: ${uoHash}`);

    // Await transaction hash
    console.log('Waiting for transaction...');
    let userOpsReceipt = null;
    const timeout = Date.now() + 300000; // 5 minute timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
      await sleep(1000);
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