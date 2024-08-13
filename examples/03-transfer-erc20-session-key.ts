import { BigNumber, ethers } from 'ethers';
import { EtherspotBundler, ModularSdk, SessionKeyValidator } from '../src';
import { printOp } from '../src/sdk/common/OperationUtils';
import { ERC20_ABI } from '../src/sdk/helpers/abi/ERC20_ABI';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';

dotenv.config();

// add/change these values
const recipient = '0xdE79F0eF8A1268DAd0Df02a8e527819A3Cd99d40'; // recipient wallet address
const value = '1'; // transfer value
const tokenAddress = process.env.TOKEN_ADDRESS as string; // token address
const decimals = 18;
const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
const erc20SessionKeyValidator = '0xF4CDE8B11500ca9Ea108c5838DD26Ff1a4257a0c'; 

// npx ts-node examples/03-transfer-erc20-session-key.ts
async function main() {
  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, 
    { chainId: Number(process.env.CHAIN_ID), 
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey) })

  const sessionKeyModule = new SessionKeyValidator(
    modularSdk,
    new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
  )

  console.log(`sessionKey SDK initialized`);

  // get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const provider = new ethers.providers.JsonRpcProvider(process.env.BUNDLER_URL)
  // get erc20 Contract Interface
  const erc20Instance = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  // get transferFrom encoded data
  const transactionData = erc20Instance.interface.encodeFunctionData('transfer', 
    [recipient, ethers.utils.parseUnits(value, decimals)])

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();


  // add transactions to the batch
  const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: tokenAddress, data: transactionData });
  console.log('transactions: ', userOpsBatch);

  console.log(`erc20SessionKeyValidator ${erc20SessionKeyValidator} as BigNumber is: ${BigNumber.from(erc20SessionKeyValidator)}`);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await modularSdk.estimate({
    key: BigNumber.from(erc20SessionKeyValidator)
  });
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp using sessionKey
  const sessionKey = process.env.SESSION_KEY as string;
  console.log(`sessionKey: ${sessionKey}`);

  const signedUserOp = await sessionKeyModule.signUserOpWithSessionKey(sessionKey, op);
  console.log(`etherspot-modular-sdk -> Signed UserOp: ${signedUserOp.signature}`);

  console.log(`Signed UserOp: ${await printOp(signedUserOp)}`);

  const userOpHashFromSignedUserOp = await modularSdk.getUserOpHash(signedUserOp);
  console.log(`UserOpHash from Signed UserOp: ${userOpHashFromSignedUserOp}`);

  // sending to the bundler with isUserOpAlreadySigned true...
  const uoHash = await modularSdk.send(signedUserOp, true);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while ((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
