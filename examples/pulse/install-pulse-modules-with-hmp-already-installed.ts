import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import { encodeAbiParameters, encodeFunctionData, parseAbi, parseAbiParameters, Hex } from 'viem';
import { MODULE_TYPE } from '../../src/sdk/common/index.js';
import { accountAbi } from '../../src/sdk/common/abis.js';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { HookMultiplexer } from '../../src/sdk/pulse/utils.js';
import { NETWORK_NAME_TO_CHAIN_ID, NetworkConfig, Networks, NetworkNames } from '../../src';
import { HookType } from '../../src/sdk/pulse/constants';

dotenv.config();

const bundlerApiKey = process.env.API_KEY || 'etherspot_public_key';

interface InstallationResult {
  success: boolean;
  userOpsReceipt: any;
  userOpHash: string;
  installationStatus: {
    hookMultiPlexer: boolean;
    credibleAccountValidator: boolean;
    resourceLockValidator: boolean;
  };
}

async function main(): Promise<InstallationResult> {
  const chainId: number = NETWORK_NAME_TO_CHAIN_ID[NetworkNames.Mainnet];

  const modularSdk = generateModularSDKInstance(process.env.WALLET_PRIVATE_KEY as string, chainId, bundlerApiKey);

  const networkConfig: NetworkConfig = Networks[chainId];
  const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0xe8bC0032846DEFDA434B08514034CDccD8db5318' as Hex;
  const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0x566f9d697FF95D13643A35B3F11BB4812B2aaF15' as Hex;
  const OLD_CAM = '0xeF085141B983B76618348104851122472DF6D4af' as Hex;

  const address: Hex = (await modularSdk.getCounterFactualAddress()) as Hex;
  console.log(`Wallet address: ${address}`);

  const balance = await modularSdk.getNativeBalance();
  console.log(`Wallet balance: ${balance}`);

  try {
    const HOOK_MULTIPLEXER_ADDRESS_V2 = networkConfig.contracts.hookMultiPlexerV2 as Hex;
    const address: Hex = (await modularSdk.getCounterFactualAddress()) as Hex;

    console.log('[Debug] HookMultiplexer V2 address:', HOOK_MULTIPLEXER_ADDRESS_V2);
    console.log('[Debug] Credible Account Module address:', CREDIBLE_ACCOUNT_MODULE_ADDRESS);
    console.log('[Debug] Resource Lock Validator address:', RESOURCE_LOCK_VALIDATOR_ADDRESS);

    await modularSdk.clearUserOpsFromBatch();

    const eoaAddress = modularSdk.getEOAAddress();
    console.log(`EOA address: ${eoaAddress}`);
    const deInitDataGenerated = encodeAbiParameters(parseAbiParameters('uint256, address'), [
      BigInt(MODULE_TYPE.VALIDATOR),
      address as Hex,
    ]);
    // const deInitData = await modularSdk.generateModuleDeInitData(MODULE_TYPE.VALIDATOR, OLD_CAM, deInitDataGenerated);
    // const removeCredibleAccountModuleValidator = encodeFunctionData({
    //   functionName: 'uninstallModule',
    //   abi: parseAbi(accountAbi),
    //   args: [MODULE_TYPE.VALIDATOR, OLD_CAM, deInitData],
    // });
    // await modularSdk.addUserOpsToBatch({
    //   to: address,
    //   data: removeCredibleAccountModuleValidator,
    // });

    console.log('[Debug] Adding Credible Account Module as hook to HookMultiplexer...');
    console.log('[Debug] HookType.GLOBAL:', HookType.GLOBAL);
    console.log('[Debug] HookType.GLOBAL parsed as int:', parseInt(HookType.GLOBAL, 16));

    const addHookCalldata = encodeFunctionData({
      abi: HookMultiplexer,
      functionName: 'addHook',
      args: [CREDIBLE_ACCOUNT_MODULE_ADDRESS as Hex, parseInt(HookType.GLOBAL, 16)],
    });

    console.log('[Debug] addHook calldata:', addHookCalldata);

    await modularSdk.addUserOpsToBatch({
      to: HOOK_MULTIPLEXER_ADDRESS_V2,
      data: addHookCalldata,
    });
    console.log('[Debug] Added addHook to batch');

    console.log('[Debug] Preparing Credible Account Validator installation...');
    const cavInitData = encodeAbiParameters(parseAbiParameters('uint256, address'), [
      BigInt(MODULE_TYPE.VALIDATOR),
      address as Hex,
    ]);
    console.log('[Debug] Credible Account Validator initData:', cavInitData);
    const cavInstallCalldata = encodeFunctionData({
      abi: parseAbi(accountAbi),
      functionName: 'installModule',
      args: [BigInt(MODULE_TYPE.VALIDATOR), CREDIBLE_ACCOUNT_MODULE_ADDRESS, cavInitData],
    });
    console.log(
      '[Debug] Credible Account Validator installModule calldata:',
      cavInstallCalldata.substring(0, 66) + '...',
    );
    await modularSdk.addUserOpsToBatch({ to: address, data: cavInstallCalldata });
    console.log('[Debug] Added Credible Account Validator installation to batch');

    // console.log('[Debug] Preparing Resource Lock Validator installation...');
    // const rlvInitData = encodeAbiParameters([{ type: 'address' }], [eoaAddress]);
    // console.log('[Debug] Resource Lock Validator initData:', rlvInitData);

    // const rlvInstallCalldata = encodeFunctionData({
    //   abi: parseAbi(accountAbi),
    //   functionName: 'installModule',
    //   args: [BigInt(MODULE_TYPE.VALIDATOR), RESOURCE_LOCK_VALIDATOR_ADDRESS, rlvInitData],
    // });
    // console.log('[Debug] Resource Lock Validator installModule calldata:', rlvInstallCalldata.substring(0, 66) + '...');
    // await modularSdk.addUserOpsToBatch({ to: address, data: rlvInstallCalldata });
    // console.log('[Debug] Added Resource Lock Validator installation to batch');

    // Log all batch operations before estimation
    const batch = (modularSdk as any).userOpsBatch;
    console.log('[Debug] Total operations in batch:', batch.to.length);
    for (let i = 0; i < batch.to.length; i++) {
      console.log(`[Debug] Batch[${i}] - to: ${batch.to[i]}, data: ${batch.data[i].substring(0, 66)}...`);
    }

    console.log('[Debug] Estimating UserOperation...');
    const op = await modularSdk.estimate();
    console.log('UserOperation estimated successfully');

    const uoHash = await modularSdk.send(op);
    console.log(`UserOperation hash: ${uoHash}`);

    let userOpsReceipt = null;
    const timeout = Date.now() + 300000; // 5 minute timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
      await sleep(1000);
      userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
    }

    if (userOpsReceipt) {
      const installationStatus = await modularSdk.pulse.isPulseModulesInstalled({
        credibleAccountModuleAddress: CREDIBLE_ACCOUNT_MODULE_ADDRESS,
        resourceLockValidatorAddress: RESOURCE_LOCK_VALIDATOR_ADDRESS,
      });

      return {
        success: true,
        userOpsReceipt: userOpsReceipt,
        userOpHash: uoHash,
        installationStatus,
      };
    } else {
      throw new Error('Transaction timeout - please check transaction status manually');
    }
  } catch (error: any) {
    console.error('[Debug] Full error:', error);
    console.error('[Debug] Error message:', error?.message);
    console.error('[Debug] Error stack:', error?.stack);
    if (error?.rawError) console.error('[Debug] Raw error:', error.rawError);
    if (error?.code) console.error('[Debug] Error code:', error.code);
    throw new Error(`Pulse ecosystem installation failed: ${error}`);
  }
}

main()
  .then((result) => {
    console.log('Installation completed:', result);
  })
  .catch((error) => {
    console.error('Installation failed:', error);
    process.exit(1);
  });
