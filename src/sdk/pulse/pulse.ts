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
   * @returns Promise<string> UserOperation hash
   */
  async installPulseModules(config: PulseConfig = {}): Promise<string> {
    const {
      hookMultiplexerAddress,
      credibleAccountModuleAddress,
      resourceLockValidatorAddress,
      uninstallOldHookMultiplexer = false,
      oldHookMultiplexerAddress,
    } = config;

    // Get network config
    const chainId = this.modularSdk['chainId'];
    const networkConfig = Networks[chainId];
    if (!networkConfig) {
      throw new ErrorHandler('Network configuration not found for chain ID: ' + chainId);
    }

    // Use provided addresses or fall back to network defaults
    const HOOK_MULTIPLEXER_ADDRESS = (hookMultiplexerAddress || networkConfig.contracts.hookMultiPlexer) as Hex;
    const CREDIBLE_ACCOUNT_MODULE_ADDRESS = (credibleAccountModuleAddress ||
      networkConfig.contracts.credibleAccountModule) as Hex;
    const RESOURCE_LOCK_VALIDATOR_ADDRESS = (resourceLockValidatorAddress ||
      networkConfig.contracts.resourceLockValidator) as Hex;
    const OLD_HOOK_MULTIPLEXER_ADDRESS = oldHookMultiplexerAddress as Hex;

    if (!HOOK_MULTIPLEXER_ADDRESS || !CREDIBLE_ACCOUNT_MODULE_ADDRESS || !RESOURCE_LOCK_VALIDATOR_ADDRESS) {
      throw new ErrorHandler('Required contract addresses not found in network configuration');
    }

    // Get wallet address
    const address: Hex = (await this.modularSdk.getCounterFactualAddress()) as Hex;

    // Clear existing UserOps from batch
    await this.modularSdk.clearUserOpsFromBatch();

    // Uninstall old hook multiplexer if requested and installed
    if (uninstallOldHookMultiplexer && OLD_HOOK_MULTIPLEXER_ADDRESS) {
      await this.uninstallOldHookMultiplexer(address, OLD_HOOK_MULTIPLEXER_ADDRESS);
    }

    // Install Hook Multiplexer with Credible Account Module as subhook
    await this.installHookMultiplexer(address, HOOK_MULTIPLEXER_ADDRESS, CREDIBLE_ACCOUNT_MODULE_ADDRESS);

    // Install Credible Account Module as Validator
    await this.installCredibleAccountValidator(address, CREDIBLE_ACCOUNT_MODULE_ADDRESS);

    // Install Resource Lock Validator
    await this.installResourceLockValidator(address, RESOURCE_LOCK_VALIDATOR_ADDRESS);

    // Estimate and send the UserOp
    const op = await this.modularSdk.estimate();
    const uoHash = await this.modularSdk.send(op);

    return uoHash;
  }

  /**
   * Checks if the Pulse modules are fully installed
   */
  async isPulseModulesInstalled(config: PulseConfig = {}): Promise<{
    hookMultiplexer: boolean;
    credibleAccountValidator: boolean;
    resourceLockValidator: boolean;
  }> {
    const chainId = this.modularSdk['chainId'];
    const networkConfig = Networks[chainId];

    const HOOK_MULTIPLEXER_ADDRESS = config.hookMultiplexerAddress || networkConfig.contracts.hookMultiPlexer;
    const CREDIBLE_ACCOUNT_MODULE_ADDRESS =
      config.credibleAccountModuleAddress || networkConfig.contracts.credibleAccountModule;
    const RESOURCE_LOCK_VALIDATOR_ADDRESS =
      config.resourceLockValidatorAddress || networkConfig.contracts.resourceLockValidator;

    const [hookMultiplexer, credibleAccountValidator, resourceLockValidator] = await Promise.all([
      this.modularSdk.isModuleInstalled(MODULE_TYPE.HOOK, HOOK_MULTIPLEXER_ADDRESS),
      this.modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, CREDIBLE_ACCOUNT_MODULE_ADDRESS),
      this.modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, RESOURCE_LOCK_VALIDATOR_ADDRESS),
    ]);

    return {
      hookMultiplexer,
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
    const cavInitData = encodeAbiParameters([{ type: 'uint256' }], [BigInt(MODULE_TYPE.VALIDATOR)]);

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
      args: [hookAddress as Hex, hookType as Hex],
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
}
