import { EtherspotBundler, ModularSdk } from '../../src';
import * as dotenv from 'dotenv';
import { getSessionData, getSessionKeysByWalletAddress, sessionKeyExists } from './utils/credible-session-utils';

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

  const credibleAccountModuleAddress = '0xf47600D8dFef04269206255E53c8926519BA09a9';

  // get address of EtherspotWallet
  const etherspotWalletAddress: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${etherspotWalletAddress}`);

  const sessionKeys = await getSessionKeysByWalletAddress(credibleAccountModuleAddress, etherspotWalletAddress, modularSdk.provider);  
  console.log('Session Keys: ', sessionKeys);  

  const sessionKey: string = '0xb849845BE2c6D56624C3648bf9a9fC4CEb31FB2B';
  const sessionData = await getSessionData(credibleAccountModuleAddress, sessionKey, etherspotWalletAddress, modularSdk.provider);
  console.log('Session Data: ', sessionData);
}


// npx ts-node examples/credible-account-lock/query-credible-module.ts
main()
  .catch(console.error)
  .finally(() => process.exit());
