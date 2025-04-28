import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { encodeAbiParameters, encodeFunctionData, Hex, parseAbi } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { getHookMultiPlexerInitData } from '../pulse/utils';
import { accountAbi } from '../../src/sdk/common/abis';

dotenv.config();

const bundlerApiKey = 'etherspot_public_key';
const SEPOLIA_CHAIN_ID = '11155111';
const HOOK_MULTIPLEXER_ADDRESS = '0x32651A82b40d0EBFb6B9Bd52E3cbF3534E0Cd1d5'; // SEPOLIA
const CREDIBLE_ACCOUNT_HOOK_ADDRESS = '0x892A1e814fD0E6392465B01D619d06145DEf8D06'; // SEPOLIA
const CREDIBLE_ACCOUNT_VALIDATOR_ADDRESS = '0xcCeE6e4191632F3dcF3194D53fA892cF96c8Ee59'; // SEPOLIA
const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0x75e6990466479f531241Db1FD6598A27e0bBE60E'; // SEPOLIA

async function main() {
  // Init SDK
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
    Number(SEPOLIA_CHAIN_ID),
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
        INSTALL HOOK MULTIPLEXER WITH CREDIBLE ACCOUNT HOOK
  //////////////////////////////////////////////////////////////*/

  // Get HookMultiPlexer init data with CredibleAccountHook as global subhook
  let hmpInitData = getHookMultiPlexerInitData([CREDIBLE_ACCOUNT_HOOK_ADDRESS]);
  const hmpInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.HOOK), HOOK_MULTIPLEXER_ADDRESS, hmpInitData],
  });
  // Add UserOp to batch
  await modularSdk.addUserOpsToBatch({ to: address, data: hmpInstallCalldata });

  /*//////////////////////////////////////////////////////////////
                INSTALL CREDIBLE ACCOUNT VALIDATOR
  //////////////////////////////////////////////////////////////*/

  // Get CredibleAccountValidator init data
  let cavInitData = encodeAbiParameters([{ type: 'uint256' }], [BigInt(1)]);
  const cavInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.VALIDATOR), CREDIBLE_ACCOUNT_VALIDATOR_ADDRESS, cavInitData],
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
