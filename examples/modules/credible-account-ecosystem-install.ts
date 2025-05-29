import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { encodeAbiParameters, encodeFunctionData, Hex, parseAbi } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { getHookMultiPlexerInitData } from '../pulse/utils';
import { accountAbi } from '../../src/sdk/common/abis';

dotenv.config();

const bundlerApiKey = 'etherspot_public_key';
// const CHAIN_ID = '84532';
// const HOOK_MULTIPLEXER_ADDRESS = '0x61c58064640C752e950647c8AFDf1E2C0a098251'; 
// const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0x373aBcF1EA9e5802778E32870e7f72C8A6a90349'; 
// const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0xbb4D635B26a565B3722B4683459A27D3747101Ab';


// const CHAIN_ID = '11155111';
// const HOOK_MULTIPLEXER_ADDRESS = '0x0d1F23CA4092eBF61291622616a73008d5d7e9FF'; 
// const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0x56BE864234F5710C00868e29e1fbB76ad4f234e3';
// const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0xFa970f9Bd071999FD54F7fDD80cA17965Fa8f5b6'; 

const CHAIN_ID = '8453';
const HOOK_MULTIPLEXER_ADDRESS = '0xDcA918dd23456d321282DF9507F6C09A50522136'; 
const RESOURCE_LOCK_VALIDATOR_ADDRESS = ''; 
const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0xDcA918dd23456d321282DF9507F6C09A50522136';

// const CHAIN_ID = '10';
// const HOOK_MULTIPLEXER_ADDRESS = ''; 
// const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '';
// const RESOURCE_LOCK_VALIDATOR_ADDRESS = ''; 

// tsx examples/modules/credible-account-ecosystem-install.ts
async function main() {
  // Init SDK
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
    Number(CHAIN_ID),
    bundlerApiKey,
  );

  // Get counterfactual of ModularEtherspotWallet...
  const address: Hex = (await modularSdk.getCounterFactualAddress()) as Hex;
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
  // Get native balance
  const balance = await modularSdk.getNativeBalance();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet native balance: ${balance}`);
  // Clear existing UserOps from batch
  await modularSdk.clearUserOpsFromBatch();

  /*//////////////////////////////////////////////////////////////
  INSTALL HOOK MULTIPLEXER WITH CREDIBLE ACCOUNT MODULE - AS HOOK
  //////////////////////////////////////////////////////////////*/

  //Get HookMultiPlexer init data with CredibleAccountHook as global subhook
  let hmpInitData = getHookMultiPlexerInitData([CREDIBLE_ACCOUNT_MODULE_ADDRESS]);
  const hmpInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.HOOK), HOOK_MULTIPLEXER_ADDRESS, hmpInitData],
  });
  // // Add UserOp to batch
  await modularSdk.addUserOpsToBatch({ to: address, data: hmpInstallCalldata });

  /*//////////////////////////////////////////////////////////////
            INSTALL CREDIBLE ACCOUNT MODULE - AS VALIDATOR
  //////////////////////////////////////////////////////////////*/

  //Get CredibleAccountValidator init data
  let cavInitData = encodeAbiParameters([{ type: 'uint256' }], [BigInt(MODULE_TYPE.VALIDATOR)]);
  const cavInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.VALIDATOR), CREDIBLE_ACCOUNT_MODULE_ADDRESS, cavInitData],
  });
  // Add UserOp to batch
  await modularSdk.addUserOpsToBatch({ to: address, data: cavInstallCalldata });

  /*//////////////////////////////////////////////////////////////
                   INSTALL RESOURCE LOCK VALIDATOR
  //////////////////////////////////////////////////////////////*/

  // Get CredibleAccountValidator init data
  // let rlvInitData = encodeAbiParameters([{ type: 'address' }], [modularSdk.getEOAAddress()]);
  // const rlvInstallCalldata = encodeFunctionData({
  //   abi: parseAbi(accountAbi),
  //   functionName: 'installModule',
  //   args: [BigInt(MODULE_TYPE.VALIDATOR), RESOURCE_LOCK_VALIDATOR_ADDRESS, rlvInitData],
  // });
  // // Add UserOp to batch
  // await modularSdk.addUserOpsToBatch({ to: address, data: rlvInstallCalldata });

  /*//////////////////////////////////////////////////////////////
                      ESTIMATE/SEND USER OP
  //////////////////////////////////////////////////////////////*/

  // Estimate UserOp
  const op = await modularSdk.estimate();
  console.log(`Estimate UserOp: ${await printOp(op)}`);
  // Send UserOp
  const uoHash = await modularSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);
  // Await transaction hash
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 1200000; // 1 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
