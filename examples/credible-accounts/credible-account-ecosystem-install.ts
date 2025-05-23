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
// const HOOK_MULTIPLEXER_ADDRESS = '0xE9a88F0d543d3a0C14E487bed884B3dA49529e48'; 
// const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0x3c4e0A61619D4405d4c4905816D8ea3358Bd5918'; 
// const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0x1593208c9BFAF66dDE9A650519885b44e0C8b9FF';

// const CHAIN_ID = '11155111';
// const HOOK_MULTIPLEXER_ADDRESS = '0xC5992461712AF117bb08a50B00B5e32840eBf6a6'; 
// const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0xf3EC920e4a50A3deB71D96E1aBAbb4d02Ee84E53'; 
// const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0xE5Ad901d6B904F8138e2f05AD3eF1a6FF66319A4';

const CHAIN_ID = '80002';
const HOOK_MULTIPLEXER_ADDRESS = '0x05EfC108e1Cf2096c8E9DA94b56a44749dDCF99A'; 
const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0x8069C75e01Dd782Cf2bEeBF58Bac145f050DFddD';
const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0x99652037eb21ca2654807005789DdEE3Ef6A08DB'; 

// tsx examples/credible-accounts/credible-account-ecosystem-install.ts
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
  let rlvInitData = encodeAbiParameters([{ type: 'address' }], [modularSdk.getEOAAddress()]);
  const rlvInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.VALIDATOR), RESOURCE_LOCK_VALIDATOR_ADDRESS, rlvInitData],
  });
  // Add UserOp to batch
  await modularSdk.addUserOpsToBatch({ to: address, data: rlvInstallCalldata });

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
