import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import {  MODULE_TYPE, sleep } from '../../src/sdk/common';
import { encodeAbiParameters, encodeFunctionData, Hex, parseAbi } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { getHookMultiPlexerInitData } from './utils';
import { accountAbi } from '../../src/sdk/common/abis';

dotenv.config();

const bundlerApiKey = 'etherspot_public_key';
const credibleAccountModule = "0x566f9d697FF95D13643A35B3F11BB4812B2aaF15";
const resourceLockValidator = "0xe8bC0032846DEFDA434B08514034CDccD8db5318";
const hookMultiplexer = "0x2dbad2872b6aabd4dd3cd1eef7a46a241baa6cae";

// tsx examples/paymaster/paymaster.ts
async function main() {
  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY,
    Number(process.env.CHAIN_ID),
    bundlerApiKey
  );// Testnets dont need apiKey on bundlerProvider

  // get address of EtherspotWallet...
  const address: Hex = (await modularSdk.getCounterFactualAddress()) as Hex;
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // get balance of the account address
  const balance = await modularSdk.getNativeBalance();

  console.log('balances: ', balance);

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // install hook multiplexer with credible account module as subhook
  let initData = getHookMultiPlexerInitData([credibleAccountModule]);
  const hookMultiplexerModuleInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.HOOK), hookMultiplexer, initData]
  });
  await modularSdk.addUserOpsToBatch({to: address, data: hookMultiplexerModuleInstallCalldata});

  // install creidble account module as validator
  initData = encodeAbiParameters([{ type: 'uint256' }], [BigInt(1)]);
  const credibleAccountModuleInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.VALIDATOR), credibleAccountModule, initData]
  });
  await modularSdk.addUserOpsToBatch({to: address, data: credibleAccountModuleInstallCalldata});

  // install resource lock validator

  const op = await modularSdk.estimate();
  console.log(`Estimate UserOp: ${await printOp(op)}`);
  const uoHash = await modularSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 1200000; // 1 minute timeout
  while ((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());