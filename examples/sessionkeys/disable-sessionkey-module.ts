import { EtherspotBundler, ModularSdk, SessionKeyValidator } from '../../src';
import * as dotenv from 'dotenv';
import { getViemAccount, sleep } from '../../src/sdk/common';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

const sessionKey = '0x476595CD5ed26D40Fd299F266350e5E85A7DF0D3';

// tsx examples/sessionkeys/disable-sessionkey-module.ts
async function main() {
  const bundlerApiKey = 'etherspot_public_key';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(process.env.WALLET_PRIVATE_KEY as string, 
    Number(process.env.CHAIN_ID), bundlerApiKey);
  
  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // get instance  of SessionKeyValidator
  const sessionKeyModule = await SessionKeyValidator.create(modularSdk);

  const response = await sessionKeyModule.disableSessionKey(sessionKey);

  console.log('\x1b[33m%s\x1b[0m', `UserOpHash: `, response.userOpHash);
  console.log('\x1b[33m%s\x1b[0m', `SessionKey: `, response.sessionKey);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while ((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(response.userOpHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);

  const sessionKeys = await sessionKeyModule.getAssociatedSessionKeys();
  console.log('\x1b[33m%s\x1b[0m', `AssociatedSessionKeys: `, sessionKeys);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
