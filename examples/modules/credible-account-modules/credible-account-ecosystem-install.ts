import { printOp } from '../../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../../src/sdk/common';
import { encodeAbiParameters, encodeFunctionData, Hex, parseAbi } from 'viem';
import { generateModularSDKInstance } from '../../helpers/sdk-helper';
import { getHookMultiPlexerInitData } from '../../pulse/utils';
import { accountAbi } from '../../../src/sdk/common/abis';
import { NetworkConfig, Networks } from '../../../src';
import { _makeBootstrapConfig } from '../../../src/sdk/base/Bootstrap';

dotenv.config();

const bundlerApiKey = 'etherspot_public_key';

// tsx examples/modules/credible-account-modules/credible-account-ecosystem-install.ts
async function main() {

    const chainId = Number(process.env.CHAIN_ID);

  // Init SDK
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
    chainId,
    bundlerApiKey,
  );

  const networkConfig : NetworkConfig = Networks[chainId];
  
  const HOOK_MULTIPLEXER_ADDRESS = networkConfig.contracts.hookMultiPlexer as Hex; 
  const RESOURCE_LOCK_VALIDATOR_ADDRESS = networkConfig.contracts.resourceLockValidator as Hex;  
  const CREDIBLE_ACCOUNT_MODULE_ADDRESS = networkConfig.contracts.credibleAccountModule as Hex;

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
  const config = _makeBootstrapConfig(HOOK_MULTIPLEXER_ADDRESS, hmpInitData);
  console.log('\x1b[33m%s\x1b[0m', `Credible-Setup -> HmpInitData: ${hmpInitData}`);
  const hmpInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.HOOK), HOOK_MULTIPLEXER_ADDRESS, config.data],
  });
  console.log('\x1b[33m%s\x1b[0m', `Credible-Setup -> HmpInstallCalldata: ${hmpInstallCalldata}`);
  // Add UserOp to batch
  await modularSdk.addUserOpsToBatch({ to: address, data: hmpInstallCalldata });

  /*//////////////////////////////////////////////////////////////
            INSTALL CREDIBLE ACCOUNT MODULE - AS VALIDATOR
  //////////////////////////////////////////////////////////////*/

  //Get CredibleAccountValidator init data
  let cavInitData = encodeAbiParameters([{ type: 'uint256' }], [BigInt(MODULE_TYPE.VALIDATOR)]);
  console.log('\x1b[33m%s\x1b[0m', `Credible-Setup -> CavInitData: ${cavInitData}`);
  const cavInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.VALIDATOR), CREDIBLE_ACCOUNT_MODULE_ADDRESS, cavInitData],
  });
  console.log('\x1b[33m%s\x1b[0m', `Credible-Setup -> cavInstallCalldata: ${cavInstallCalldata}`);
  //Add UserOp to batch
  await modularSdk.addUserOpsToBatch({ to: address, data: cavInstallCalldata });

  /*//////////////////////////////////////////////////////////////
                   INSTALL RESOURCE LOCK VALIDATOR
  //////////////////////////////////////////////////////////////*/

  // Get ResourceLockValidator init data
  let rlvInitData = encodeAbiParameters([{ type: 'address' }], [modularSdk.getEOAAddress()]);
  console.log('\x1b[33m%s\x1b[0m', `Credible-Setup -> RlvInitData: ${rlvInitData}`);
  const rlvInstallCalldata = encodeFunctionData({
    abi: parseAbi(accountAbi),
    functionName: 'installModule',
    args: [BigInt(MODULE_TYPE.VALIDATOR), RESOURCE_LOCK_VALIDATOR_ADDRESS, rlvInitData],
  });
  console.log('\x1b[33m%s\x1b[0m', `Credible-Setup -> RlvInstallCalldata: ${rlvInstallCalldata}`);
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
