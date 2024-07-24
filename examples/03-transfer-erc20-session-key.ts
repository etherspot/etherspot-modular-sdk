import { BigNumber, ethers } from 'ethers';
import { EtherspotBundler, ModularSdk, SessionKeyValidator } from '../src';
import { printOp } from '../src/sdk/common/OperationUtils';
import { ERC20_ABI } from '../src/sdk/helpers/abi/ERC20_ABI';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';

dotenv.config();

// add/change these values
const recipient = '0xdE79F0eF8A1268DAd0Df02a8e527819A3Cd99d40'; // recipient wallet address
const value = '0.1'; // transfer value
const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

async function main() {
  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, { chainId: Number(process.env.CHAIN_ID), bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey) })

  const sessionKeyModule = new SessionKeyValidator(
    modularSdk,
    new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
  )

  // get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const provider = new ethers.providers.JsonRpcProvider(process.env.BUNDLER_URL)
  // get erc20 Contract Interface
  const erc20Instance = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  // get decimals from erc20 contract
  const decimals = await erc20Instance.functions.decimals();

  // get transferFrom encoded data
  const transactionData = erc20Instance.interface.encodeFunctionData('transfer', [recipient, ethers.utils.parseUnits(value, decimals)])

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: tokenAddress, data: transactionData });
  console.log('transactions: ', userOpsBatch);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await modularSdk.estimate({
    key: BigNumber.from('0x60Da6Cc14d817a88DC354d6dB6314DCD41b7aA54')
  });
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp using sessionKey
  const sessionKey = '0xD74f84E5908139fD8B0E525b8F3eB6a6dDdC0fcA'; // session key which you want to use for sign the userOp

  const signedUserOp = await sessionKeyModule.signUserOpWithSessionKey(sessionKey, op);

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
