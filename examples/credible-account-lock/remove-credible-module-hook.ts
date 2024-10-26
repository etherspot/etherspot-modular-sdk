import { EtherspotBundler, ModularSdk } from '../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { ethers } from 'ethers';
import * as HookMultiPlexerABI from "../../src/sdk/abi/HookMultiPlexer.json";
import { printOp } from '../../src/sdk/common/OperationUtils';
import { getHookMultiPlexerInitDataWithCredibleAccountModule } from './utils/hook-multiplexer-utils';

dotenv.config();

async function removeCredibleModuleHook(modularSdk: ModularSdk, hookMultiplexerAddress: string, credibleAccountModuleAddress: string): Promise<string> {

  const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

  console.log(`removeCredibleModuleHook called on wallet: ${etherspotWalletAddress}`);

  // 1. check if the account has HookMultiplexer module installed as Hook
  const isHookInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.HOOK, hookMultiplexerAddress);

  console.log(`isHookInstalled: ${isHookInstalled}`);

  if (!isHookInstalled) {
    console.log(`HookMultiplexer module is not installed`);
    return;
  }

  // If not, remove CredibleAccountModule as SubHook to the HookMultiplexer
  const iface = new ethers.utils.Interface(HookMultiPlexerABI.abi);

  //check if the HookMultiplexer module has CredibleAccountModule as one of the GENERAL Hooks
  const provider: ethers.providers.JsonRpcProvider = modularSdk.provider;
  const hookMultiplexerContract = new ethers.Contract(hookMultiplexerAddress, HookMultiPlexerABI.abi, provider);

  //(0 for GLOBAL)
  const hookType = 0;

  const hasCredibleAccountModuleAsHook: boolean = await hookMultiplexerContract.hasHook(etherspotWalletAddress,
    credibleAccountModuleAddress, hookType);

  console.log(`hasCredibleAccountModuleAsHook: ${hasCredibleAccountModuleAsHook}`);

  if (!hasCredibleAccountModuleAsHook) {
    console.log(`CredibleAccountModule is not installed as Hook`);
    return;
  }

  console.log(`Removing CredibleAccountModule as Hook from HookMultiplexer`);

  // Encode the function call data
  const encodedData = iface.encodeFunctionData("removeHook", [
    credibleAccountModuleAddress,
    hookType
  ]);

  console.log(`Encoded Data: ${encodedData}`);

  return encodedData;
}

// npx ts-node examples/credible-account-lock/remove-credible-module-hook.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
    })

  console.log('address: ', modularSdk.state.EOAAddress);

  const hookMultiplexerAddress = '0x2dBAD2872B6AaBd4dD3cd1EEf7A46A241BaA6CAe';
  const credibleAccountModuleAddress = '0xf47600D8dFef04269206255E53c8926519BA09a9';

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const removeCredibleModuleHookData = await removeCredibleModuleHook(modularSdk, hookMultiplexerAddress, credibleAccountModuleAddress);

  await modularSdk.addUserOpsToBatch({
    to: hookMultiplexerAddress,
    data: removeCredibleModuleHookData
  });

  console.log('UserOpsBatch: ', modularSdk.userOpsBatchRequest);
  const op = await modularSdk.estimate();
  console.log(`Estimated UserOp: ${printOp(op)}`);
  const uoHash = await modularSdk.send(op);

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
