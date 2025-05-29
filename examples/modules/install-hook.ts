import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { encodeAbiParameters, encodeFunctionData, Hex, parseAbi } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { getHookMultiPlexerInitData } from '../pulse/utils';
import { accountAbi } from '../../src/sdk/common/abis';

dotenv.config();

const bundlerApiKey = 'etherspot_public_key';
const CHAIN_ID = '1';
const HOOK_MULTIPLEXER_ADDRESS = '0xDcA918dd23456d321282DF9507F6C09A50522136'; 

// tsx examples/modules/install-hook.ts
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
  let hmpInitData = getHookMultiPlexerInitData([]);
  const hmpInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.HOOK), HOOK_MULTIPLEXER_ADDRESS, hmpInitData],
  });
  // // Add UserOp to batch
  await modularSdk.addUserOpsToBatch({ to: address, data: hmpInstallCalldata });

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
