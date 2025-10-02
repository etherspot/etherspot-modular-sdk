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
  const chainId: number = NETWORK_NAME_TO_CHAIN_ID[NetworkNames.Arbitrum];

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

    await modularSdk.clearUserOpsFromBatch();

    const eoaAddress = modularSdk.getEOAAddress();
    console.log(`EOA address: ${eoaAddress}`);
    const deInitDataGenerated = encodeAbiParameters(parseAbiParameters('uint256, address'), [
      BigInt(MODULE_TYPE.VALIDATOR),
      address as Hex,
    ]);
    const deInitData = await modularSdk.generateModuleDeInitData(MODULE_TYPE.VALIDATOR, OLD_CAM, deInitDataGenerated);
    const removeCredibleAccountModuleValidator = encodeFunctionData({
      functionName: 'uninstallModule',
      abi: parseAbi(accountAbi),
      args: [MODULE_TYPE.VALIDATOR, OLD_CAM, deInitData],
    });
    await modularSdk.addUserOpsToBatch({
      to: address,
      data: removeCredibleAccountModuleValidator,
    });

    const addHookCalldata = encodeFunctionData({
      abi: HookMultiplexer,
      functionName: 'addHook',
      args: [CREDIBLE_ACCOUNT_MODULE_ADDRESS as Hex, parseInt(HookType.GLOBAL, 16)],
    });

    await modularSdk.addUserOpsToBatch({
      to: HOOK_MULTIPLEXER_ADDRESS_V2,
      data: addHookCalldata,
    });

    const cavInitData = encodeAbiParameters(parseAbiParameters('uint256, address'), [
      BigInt(MODULE_TYPE.VALIDATOR),
      address as Hex,
    ]);
    const cavInstallCalldata = encodeFunctionData({
      abi: parseAbi(accountAbi),
      functionName: 'installModule',
      args: [BigInt(MODULE_TYPE.VALIDATOR), CREDIBLE_ACCOUNT_MODULE_ADDRESS, cavInitData],
    });
    await modularSdk.addUserOpsToBatch({ to: address, data: cavInstallCalldata });

    const rlvInitData = encodeAbiParameters([{ type: 'address' }], [eoaAddress]);
    const rlvInstallCalldata = encodeFunctionData({
      abi: parseAbi(accountAbi),
      functionName: 'installModule',
      args: [BigInt(MODULE_TYPE.VALIDATOR), RESOURCE_LOCK_VALIDATOR_ADDRESS, rlvInitData],
    });
    await modularSdk.addUserOpsToBatch({ to: address, data: rlvInstallCalldata });

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
        installationStatus
      };
    } else {
      throw new Error('Transaction timeout - please check transaction status manually');
    }
  } catch (error) {
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