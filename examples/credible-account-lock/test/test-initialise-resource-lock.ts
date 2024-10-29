import { EtherspotBundler, ModularSdk } from '../../../src';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import { sleep } from '../../../src/sdk/common';
import { ResourceLockSessionData, TokenData } from '../utils/credible-session-types';
import { initialiseCredibleAccountModules } from '../session-key/initialise-resource-lock';

dotenv.config();

async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID))
    })

  console.log('address: ', modularSdk.state.EOAAddress);

  const hookMultiplexerAddress = '0x2dbad2872b6aabd4dd3cd1eef7a46a241baa6cae';
  const credibleAccountModuleAddress = '0xf47600D8dFef04269206255E53c8926519BA09a9';

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // Define the TokenData array
  const tokenData: TokenData[] = [
    {
      token: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // USDC address
      amount: ethers.utils.parseUnits('10', 6).toBigInt()
    },
    {
      token: "0x493f198225647DB41FB966ddCd5f63E8EE1012d3", // USDT address
      amount: ethers.utils.parseUnits('12', 6).toBigInt()
    },
  ];

  // Get the current time in epoch seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Define the SessionData object
  const sessionData: ResourceLockSessionData = {
    sessionKey: "0x94c054B7191aAF22342F0caB29acfb1851C5331D", // dummySessionKey
    validAfter: currentTime + 10, // validAfter should be greater than current time
    validUntil: currentTime + 300, // validUntil should be 5 minutes from current time
    tokenData: tokenData
  };

  console.log('validAfter: ', sessionData.validAfter);
  console.log('validUntil: ', sessionData.validUntil);

  const uoHash = await initialiseCredibleAccountModules(modularSdk, hookMultiplexerAddress, credibleAccountModuleAddress, sessionData);

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

  return uoHash;
}

// npx ts-node examples/credible-account-lock/test/test-initialise-resource-lock.ts
main()
  .catch(console.error)
  .finally(() => process.exit());
