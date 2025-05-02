import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../../src/sdk/common';
import { encodeAbiParameters, encodeFunctionData, Hex, parseAbi } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { getHookMultiPlexerInitData } from '../pulse/utils';
import { accountAbi } from '../../src/sdk/common/abis';

dotenv.config();

// Sepolia
// HookMultiPlexer: 0xC5992461712AF117bb08a50B00B5e32840eBf6a6
// ProofVerifier: 0x28B962b6B7543A729dBf9ffdD64e9e519980061f
// CredibleAccountModule: 0xca7b76b01fd911fC57b87573334174b81cb9271D
// ResourceLockValidator: 0x2BEAa7d17BF6ef8BE63Ad755F34B5554c0F46AF9

// ArbSepolia
// HookMultiPlexer: 0x6515Cb061c5826a1DEe0b83D5eD634A4FA30440A
// ProofVerifier: 0x26FeC24b0D467C9de105217B483931e8f944ff50
// CredibleAccountModule: 0x97582036A5d1b1180D2bD2C802cf661BFfe61313
// ResourceLockValidator: 0xC9938c7EC0Fc35dC4818623e2aE005435Af1c65E


// BaseSepolia
// HookMultiPlexer: 0xE9a88F0d543d3a0C14E487bed884B3dA49529e48
// ProofVerifier: 0x8cb8bA53C83999416110816B010ee4B34F38c08d
// CredibleAccountModule: 0xE66DACBae15Cf2F3D8A5E5ef26205E8301cD9CE5
// ResourceLockValidator: 0x3c4e0A61619D4405d4c4905816D8ea3358Bd5918

const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
const SEPOLIA_CHAIN_ID = '84532';
const HOOK_MULTIPLEXER_ADDRESS = '0xE9a88F0d543d3a0C14E487bed884B3dA49529e48'; // BASE SEPOLIA
const RESOURCE_LOCK_VALIDATOR_ADDRESS = '0x3c4e0A61619D4405d4c4905816D8ea3358Bd5918'; // BASE SEPOLIA
const CREDIBLE_ACCOUNT_MODULE_ADDRESS = '0xE66DACBae15Cf2F3D8A5E5ef26205E8301cD9CE5'; // BASE SEPOLIA

// tsx examples/credible-accounts/credible-account-ecosystem-install.ts
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
