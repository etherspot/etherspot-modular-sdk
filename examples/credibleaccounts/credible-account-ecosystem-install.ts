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
const HOOK_MULTIPLEXER_ADDRESS = '0xC5992461712AF117bb08a50B00B5e32840eBf6a6'; // SEPOLIA
const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0x2BEAa7d17BF6ef8BE63Ad755F34B5554c0F46AF9'; // SEPOLIA
const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0xca7b76b01fd911fC57b87573334174b81cb9271D'; // SEPOLIA

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
  INSTALL HOOK MULTIPLEXER WITH CREDIBLE ACCOUNT MODULE - AS HOOK
  //////////////////////////////////////////////////////////////*/

  // Get HookMultiPlexer init data with CredibleAccountHook as global subhook
  let hmpInitData = getHookMultiPlexerInitData([CREDIBLE_ACCOUNT_MODULE_ADDRESS]);
  const hmpInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.HOOK), HOOK_MULTIPLEXER_ADDRESS, hmpInitData],
  });
  // Add UserOp to batch
  await modularSdk.addUserOpsToBatch({ to: address, data: hmpInstallCalldata });

  /*//////////////////////////////////////////////////////////////
            INSTALL CREDIBLE ACCOUNT MODULE - AS VALIDATOR
  //////////////////////////////////////////////////////////////*/

  // Get CredibleAccountValidator init data
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
