import { ModularSdk } from '../sdk.js';
import { MODULE_TYPE } from '../common/index.js';
import { Networks } from '../network/index.js';
import { ErrorHandler } from '../errorHandler/errorHandler.service.js';
import { encodeAbiParameters, encodeFunctionData, parseAbi, Hex } from 'viem';
import { accountAbi } from '../common/abis.js';
import { _makeBootstrapConfig } from '../base/Bootstrap.js';
import { PulseConfig } from './interfaces.js';
import { HookType } from './constants.js';
import { getHookMultiPlexerInitData, HookMultiplexer } from './utils.js';

export class Pulse {
  private modularSdk: ModularSdk;

  constructor(modularSdk: ModularSdk) {
    this.modularSdk = modularSdk;
  }

  /**
   * Installs the complete Pulse ecosystem including:
   * - Hook Multiplexer with Credible Account Module as subhook
   * - Credible Account Module as Validator
   * - Resource Lock Validator
   *
   * @param config Configuration options for the installation
   * @returns Promise<string> UserOperation hash (or final hash if sequential)
   */
  async installPulseModules(config: PulseConfig): Promise<string> {
    const { credibleAccountModuleAddress, resourceLockValidatorAddress, uninstallOldHookMultiplexer = false, callGasLimit, sequential = false } = config;

    // Get network config
    const chainId = this.modularSdk['chainId'];
    const networkConfig = Networks[chainId];
    if (!networkConfig) {
      throw new ErrorHandler('Network configuration not found for chain ID: ' + chainId);
    }

    // Use provided addresses or fall back to network defaults
    const HOOK_MULTIPLEXER_ADDRESS_V2 = networkConfig.contracts.hookMultiPlexerV2 as Hex;
    const CREDIBLE_ACCOUNT_MODULE_ADDRESS = credibleAccountModuleAddress as Hex;
    const RESOURCE_LOCK_VALIDATOR_ADDRESS = resourceLockValidatorAddress as Hex;
    const HOOK_MULTIPLEXER_ADDRESS = networkConfig.contracts.hookMultiPlexer as Hex;

    if (!HOOK_MULTIPLEXER_ADDRESS_V2 || !CREDIBLE_ACCOUNT_MODULE_ADDRESS || !RESOURCE_LOCK_VALIDATOR_ADDRESS) {
      throw new ErrorHandler('Required contract addresses not found in network configuration');
    }

    // Get wallet address
    const address: Hex = (await this.modularSdk.getCounterFactualAddress()) as Hex;

    // If sequential installation is requested, install modules one at a time
    if (sequential) {
      return await this.installPulseModulesSequentially(
        address,
        HOOK_MULTIPLEXER_ADDRESS_V2,
        HOOK_MULTIPLEXER_ADDRESS,
        CREDIBLE_ACCOUNT_MODULE_ADDRESS,
        RESOURCE_LOCK_VALIDATOR_ADDRESS,
        uninstallOldHookMultiplexer,
        callGasLimit
      );
    }

    // Batch installation (all modules in single UserOp)
    await this.modularSdk.clearUserOpsFromBatch();

    // Uninstall old hook multiplexer if requested and installed
    if (uninstallOldHookMultiplexer && HOOK_MULTIPLEXER_ADDRESS) {
      await this.uninstallOldHookMultiplexer(address, HOOK_MULTIPLEXER_ADDRESS);
    }

    // Install Hook Multiplexer with Credible Account Module as subhook
    await this.installHookMultiplexer(address, HOOK_MULTIPLEXER_ADDRESS_V2, CREDIBLE_ACCOUNT_MODULE_ADDRESS);

    // Install Credible Account Module as Validator
    await this.installCredibleAccountValidator(address, CREDIBLE_ACCOUNT_MODULE_ADDRESS);

    // Install Resource Lock Validator
    await this.installResourceLockValidator(address, RESOURCE_LOCK_VALIDATOR_ADDRESS);

    // Estimate and send the UserOp
    const op = await this.modularSdk.estimate({ callGasLimit });
    const uoHash = await this.modularSdk.send(op);

    return uoHash;
  }

  /**
   * Installs Pulse modules sequentially (one UserOp per module)
   * This is slower and costs more gas, but avoids potential OOG issues with batching
   * @private
   */
  private async installPulseModulesSequentially(
    address: Hex,
    hookMultiplexerAddressV2: Hex,
    hookMultiplexerAddress: Hex,
    credibleAccountModuleAddress: Hex,
    resourceLockValidatorAddress: Hex,
    uninstallOldHookMultiplexer: boolean,
    callGasLimit?: any
  ): Promise<string> {
    let lastHash = '';

    // Check what's already installed
    const isHMPInstalled = await this.modularSdk.isModuleInstalled(MODULE_TYPE.HOOK, hookMultiplexerAddressV2);
    const isCAVInstalled = await this.modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);
    const isRLVInstalled = await this.modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, resourceLockValidatorAddress);

    // Step 1: Uninstall old hook multiplexer if requested
    if (uninstallOldHookMultiplexer && hookMultiplexerAddress) {
      await this.modularSdk.clearUserOpsFromBatch();
      await this.uninstallOldHookMultiplexer(address, hookMultiplexerAddress);
      const op = await this.modularSdk.estimate({ callGasLimit });
      lastHash = await this.modularSdk.send(op);
    }

    // Step 2: Install Hook Multiplexer with Credible Account Module as subhook
    if (!isHMPInstalled) {
      await this.modularSdk.clearUserOpsFromBatch();
      await this.installHookMultiplexer(address, hookMultiplexerAddressV2, credibleAccountModuleAddress);
      let op = await this.modularSdk.estimate({ callGasLimit });
      lastHash = await this.modularSdk.send(op);
    }

    // Step 3: Install Credible Account Module as Validator
    if (!isCAVInstalled) {
      await this.modularSdk.clearUserOpsFromBatch();
      await this.installCredibleAccountValidator(address, credibleAccountModuleAddress);
      let op = await this.modularSdk.estimate({ callGasLimit });
      lastHash = await this.modularSdk.send(op);
    }

    // Step 4: Install Resource Lock Validator
    if (!isRLVInstalled) {
      await this.modularSdk.clearUserOpsFromBatch();
      await this.installResourceLockValidator(address, resourceLockValidatorAddress);
      let op = await this.modularSdk.estimate({ callGasLimit });
      lastHash = await this.modularSdk.send(op);
    }

    return lastHash;
  }

  /**
   * Checks if the Pulse modules are fully installed
   */
  async isPulseModulesInstalled(config: PulseConfig): Promise<{
    hookMultiPlexer: boolean;
    credibleAccountValidator: boolean;
    resourceLockValidator: boolean;
  }> {
    const chainId = this.modularSdk['chainId'];
    const networkConfig = Networks[chainId];

    const HOOK_MULTIPLEXER_ADDRESS_V2 = networkConfig.contracts.hookMultiPlexerV2;
    const CREDIBLE_ACCOUNT_MODULE_ADDRESS = config.credibleAccountModuleAddress;
    const RESOURCE_LOCK_VALIDATOR_ADDRESS = config.resourceLockValidatorAddress;

    const [hookMultiPlexer, credibleAccountValidator, resourceLockValidator] = await Promise.all([
      this.modularSdk.isModuleInstalled(MODULE_TYPE.HOOK, HOOK_MULTIPLEXER_ADDRESS_V2),
      this.modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, CREDIBLE_ACCOUNT_MODULE_ADDRESS),
      this.modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, RESOURCE_LOCK_VALIDATOR_ADDRESS),
    ]);

    return {
      hookMultiPlexer,
      credibleAccountValidator,
      resourceLockValidator,
    };
  }

  private async uninstallOldHookMultiplexer(address: Hex, oldHookMultiplexerAddress: Hex): Promise<void> {
    const isOldModuleInstalled = await this.modularSdk.isModuleInstalled(MODULE_TYPE.HOOK, oldHookMultiplexerAddress);
    if (isOldModuleInstalled) {
      const hmpDeinitData = encodeAbiParameters([{ type: 'uint256' }], [BigInt(MODULE_TYPE.HOOK)]);
      const oldHmpUninstallCalldata = encodeFunctionData({
        abi: parseAbi(accountAbi),
        functionName: 'uninstallModule',
        args: [BigInt(MODULE_TYPE.HOOK), oldHookMultiplexerAddress, hmpDeinitData],
      });
      await this.modularSdk.addUserOpsToBatch({ to: address, data: oldHmpUninstallCalldata });
    }
  }

  private async installHookMultiplexer(
    address: Hex,
    hookMultiplexerAddress: Hex,
    credibleAccountModuleAddress: Hex,
  ): Promise<void> {
    const hmpInitData = getHookMultiPlexerInitData([credibleAccountModuleAddress]);
    // const config = _makeBootstrapConfig(hookMultiplexerAddress, hmpInitData);

    const hmpInstallCalldata = encodeFunctionData({
      abi: parseAbi(accountAbi),
      functionName: 'installModule',
      args: [BigInt(MODULE_TYPE.HOOK), hookMultiplexerAddress, hmpInitData],
    });
    await this.modularSdk.addUserOpsToBatch({ to: address, data: hmpInstallCalldata });
  }

  private async installCredibleAccountValidator(address: Hex, credibleAccountModuleAddress: Hex): Promise<void> {
    const cavInitData = encodeAbiParameters(
      [{ type: 'uint256' }, { type: 'address' }],
      [BigInt(MODULE_TYPE.VALIDATOR), address]
    );

    const cavInstallCalldata = encodeFunctionData({
      abi: parseAbi(accountAbi),
      functionName: 'installModule',
      args: [BigInt(MODULE_TYPE.VALIDATOR), credibleAccountModuleAddress, cavInitData],
    });

    await this.modularSdk.addUserOpsToBatch({ to: address, data: cavInstallCalldata });
  }

  private async installResourceLockValidator(address: Hex, resourceLockValidatorAddress: Hex): Promise<void> {
    const rlvInitData = encodeAbiParameters([{ type: 'address' }], [this.modularSdk.getEOAAddress()]);
    const rlvInstallCalldata = encodeFunctionData({
      abi: parseAbi(accountAbi),
      functionName: 'installModule',
      args: [BigInt(MODULE_TYPE.VALIDATOR), resourceLockValidatorAddress, rlvInitData],
    });
    await this.modularSdk.addUserOpsToBatch({ to: address, data: rlvInstallCalldata });
  }

  async addHook(hookAddress: string, hookType: HookType, hookMultiplexerAddress?: string): Promise<string> {
    // Get network config
    const chainId = this.modularSdk['chainId'];
    const networkConfig = Networks[chainId];
    if (!networkConfig) {
      throw new ErrorHandler('Network configuration not found for chain ID: ' + chainId);
    }

    // Use provided address or fall back to network default
    const HOOK_MULTIPLEXER_ADDRESS = (hookMultiplexerAddress || networkConfig.contracts.hookMultiPlexer) as Hex;

    if (!HOOK_MULTIPLEXER_ADDRESS) {
      throw new ErrorHandler('Hook Multiplexer address not found in network configuration');
    }

    const address: Hex = (await this.modularSdk.getCounterFactualAddress()) as Hex;

    // Clear existing UserOps from batch
    await this.modularSdk.clearUserOpsFromBatch();

    // Encode the addHook function call
    const addHookCalldata = encodeFunctionData({
      abi: HookMultiplexer,
      functionName: 'addHook',
      args: [hookAddress as Hex, parseInt(hookType, 16)],
    });

    // Add the call to the batch (calling addHook on the Hook Multiplexer)
    await this.modularSdk.addUserOpsToBatch({
      to: HOOK_MULTIPLEXER_ADDRESS,
      data: addHookCalldata,
    });

    // Estimate and send the UserOp
    const op = await this.modularSdk.estimate();
    const uoHash = await this.modularSdk.send(op);

    return uoHash;
  }

  async removeHook(hookAddress: string, hookType: HookType, hookMultiplexerAddress?: string): Promise<string> {
    // Get network config
    const chainId = this.modularSdk['chainId'];
    const networkConfig = Networks[chainId];
    if (!networkConfig) {
      throw new ErrorHandler('Network configuration not found for chain ID: ' + chainId);
    }

    // Use provided address or fall back to network default
    const HOOK_MULTIPLEXER_ADDRESS = (hookMultiplexerAddress || networkConfig.contracts.hookMultiPlexer) as Hex;

    if (!HOOK_MULTIPLEXER_ADDRESS) {
      throw new ErrorHandler('Hook Multiplexer address not found in network configuration');
    }

    const address: Hex = (await this.modularSdk.getCounterFactualAddress()) as Hex;

    // Clear existing UserOps from batch
    await this.modularSdk.clearUserOpsFromBatch();

    // Encode the removeHook function call
    const removeHookCalldata = encodeFunctionData({
      abi: HookMultiplexer,
      functionName: 'removeHook',
      args: [hookAddress as Hex, parseInt(hookType, 16)],
    });

    // Add the call to the batch (calling removeHook on the Hook Multiplexer)
    await this.modularSdk.addUserOpsToBatch({
      to: HOOK_MULTIPLEXER_ADDRESS,
      data: removeHookCalldata,
    });

    // Estimate and send the UserOp
    const op = await this.modularSdk.estimate();
    const uoHash = await this.modularSdk.send(op);

    return uoHash;
  }
}
