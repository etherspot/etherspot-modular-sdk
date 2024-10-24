import { EtherspotBundler, ModularSdk } from '../../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { getHookMultiPlexerInitDataWithCredibleAccountModule } from '../hooks/hook-multiplexer-utils';
import { ethers } from 'ethers';
import * as HookMultiPlexerABI from "../../src/sdk/abi/HookMultiPlexer.json";
import { TokenData, SessionData } from './credible-session-types';
import { generateEnableSessionKeyCalldata } from './credible-session-utils';

dotenv.config();

async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY },
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
    })

  console.log('address: ', modularSdk.state.EOAAddress);

  const hookMultiplexerAddress = '0x370e65e9921f4F496e0Cb7c454B24DdC632eC862';
  const credibleAccountModuleAddress = '0x5F43Bf56479f09E0aD5ed22117e8b66fe2429746';

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // Define the TokenData array
  const tokenData: TokenData[] = [
    {
      token: "0xa0Cb889707d426A7A386870A03bc70d1b0697598", // USDC address
      amount: BigInt(10000000) // newAmounts[0]
    },
    {
      token: "0x5991A2dF15A8F6A256D3Ec51E99254Cd3fb576A9", // DAI address
      amount: BigInt(40000000000000000000) // newAmounts[1]
    }
  ];

  // Get the current time in epoch seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Define the SessionData object
  const sessionData: SessionData = {
    sessionKey: "0xB071527c3721215A46958d172A42E7E3BDd1DF46", // dummySessionKey
    validAfter: currentTime + 10, // validAfter should be greater than current time
    validUntil: currentTime + 300, // validUntil should be 5 minutes from current time
    live: true, // Assuming the session is active
    tokenData: tokenData
  };

  console.log('validAfter: ', sessionData.validAfter);
  console.log('validUntil: ', sessionData.validUntil);

  await initialiseCredibleAccountModules(modularSdk, hookMultiplexerAddress, credibleAccountModuleAddress, sessionData);
  console.log('UserOpsBatch: ', modularSdk.userOpsBatchRequest);
  // const op = await modularSdk.estimate();
  // const uoHash = await modularSdk.send(op);
  // return uoHash;
}

async function initialiseCredibleAccountModules(modularSdk: ModularSdk, hookMultiplexerAddress: string, credibleAccountModuleAddress: string, sessionData: SessionData) {
  // 1. check if the account has HookMultiplexer module installed as Hook
  const isHookInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.HOOK, hookMultiplexerAddress);

  await modularSdk.clearUserOpsFromBatch();

  const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

  if (!isHookInstalled) {
    // install HookMultiplexer module
    const hookMultiplexerInitData = await getHookMultiPlexerInitDataWithCredibleAccountModule(credibleAccountModuleAddress);
    console.log(`Hook Multiplexer Init Data: ${hookMultiplexerInitData}`);
    const hookInstallData = await modularSdk.generateModuleInstallData(MODULE_TYPE.HOOK, hookMultiplexerAddress, hookMultiplexerInitData);
    await modularSdk.addUserOpsToBatch({
      to: etherspotWalletAddress,
      data: hookInstallData
    });
  } else {

    // If not, add CredibleAccountModule as SubHook to the HookMultiplexer
    const iface = new ethers.utils.Interface(HookMultiPlexerABI.abi);

    //check if the HookMultiplexer module has CredibleAccountModule as one of the GENERAL Hooks
    const provider: ethers.providers.JsonRpcProvider = modularSdk.provider;
    const hookMultiplexerContract = new ethers.Contract(hookMultiplexerAddress, HookMultiPlexerABI.abi, provider);

    const etherspotWalletAddress = await modularSdk.getCounterFactualAddress();

    //(0 for GLOBAL)
    const hookType = 0;

    const hasCredibleAccountModuleAsHook: boolean = await hookMultiplexerContract.hasHook(etherspotWalletAddress,
      credibleAccountModuleAddress, hookType);

    if (!hasCredibleAccountModuleAsHook) {

      console.log(`Adding CredibleAccountModule as Hook to HookMultiplexer`);

      // Encode the function call data
      const encodedData = iface.encodeFunctionData("addHook", [
        credibleAccountModuleAddress,
        hookType
      ]);

      await modularSdk.addUserOpsToBatch({
        to: hookMultiplexerAddress,
        data: encodedData
      });
    }
  }

  // 2. check if the account has CredibleAccount module installed as validator
  const isValidatorInstalled = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, credibleAccountModuleAddress);

  if (!isValidatorInstalled) {

    // install CredibleAccountModule as validator
    const initData = ethers.utils.defaultAbiCoder.encode(["uint256"], [1]);
    const validatorInstallData = await modularSdk.generateModuleInstallData(MODULE_TYPE.VALIDATOR,
      credibleAccountModuleAddress, initData);

    console.log(`Validator Install Data: ${validatorInstallData}`);

    await modularSdk.addUserOpsToBatch({
      to: etherspotWalletAddress,
      data: validatorInstallData
    });
  }

  // 3. enable SessionKey
  const enableSessionKeyCallData = generateEnableSessionKeyCalldata(sessionData);

  console.log(`Enable Session Key Call Data: ${enableSessionKeyCallData}`);

  await modularSdk.addUserOpsToBatch({
    to: credibleAccountModuleAddress,
    data: enableSessionKeyCallData
  });

}

// npx ts-node examples/credible-account-lock/init-credible-account-modules.ts
main()
  .catch(console.error)
  .finally(() => process.exit());
