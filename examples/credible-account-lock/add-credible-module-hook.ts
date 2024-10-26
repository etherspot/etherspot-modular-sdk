import { EtherspotBundler, ModularSdk } from '../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { getHookMultiPlexerInitDataWithCredibleAccountModule } from './utils/hook-multiplexer-utils';

dotenv.config();

// npx ts-node examples/hooks/add-credible-module-hook.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY },
     { chainId: Number(process.env.CHAIN_ID),
       bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey) })

  console.log('address: ', modularSdk.state.EOAAddress);

  const hookMultiplexerAddress = '0x370e65e9921f4F496e0Cb7c454B24DdC632eC862';
  const credibleAccountModuleAddress = '0x5F43Bf56479f09E0aD5ed22117e8b66fe2429746';

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const hookMultiplexerInitData = await getHookMultiPlexerInitDataWithCredibleAccountModule(credibleAccountModuleAddress);

  console.log(`Hook Multiplexer Init Data: ${hookMultiplexerInitData}`);

  const uoHash = await modularSdk.installModule(MODULE_TYPE.HOOK, hookMultiplexerAddress, hookMultiplexerInitData);
  
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

// main()
//   .catch(console.error)
//   .finally(() => process.exit());
