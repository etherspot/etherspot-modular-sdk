import { ethers } from 'ethers';
import { EtherspotBundler, ModularSdk } from '../src';
import { printOp } from '../src/sdk/common/OperationUtils';
import { ERC20_ABI } from '../src/sdk/helpers/abi/ERC20_ABI';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';

dotenv.config();

// add/change these values
const recipient = '0x80a1874E1046B1cc5deFdf4D3153838B72fF94Ac'; // recipient wallet address
const value = '1'; // transfer value
const tokenAddress = process.env.TOKEN_ADDRESS as string; // token address
const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

// npx ts-node examples/03-transfer-erc20.ts
async function main() {
  // initializating sdk...
  const modularSdk = new ModularSdk({ privateKey: process.env.WALLET_PRIVATE_KEY }, 
    { chainId: Number(process.env.CHAIN_ID), 
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey) })

  console.log('address: ', modularSdk.state.EOAAddress)

  // get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const provider = new ethers.providers.JsonRpcProvider('https://polygon-amoy.drpc.org')
  // get erc20 Contract Interface
  const erc20Instance = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

  // get decimals from erc20 contract
  const decimals = await erc20Instance.functions.decimals();

  // get transferFrom encoded data
  const transactionData = erc20Instance.interface.encodeFunctionData('transfer', [recipient, ethers.utils.parseUnits(value, decimals)])

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  const userOpsBatch = await modularSdk.addUserOpsToBatch({to: tokenAddress, data: transactionData});
  console.log('transactions: ', userOpsBatch);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await modularSdk.estimate();
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp and sending to the bundler...
  const uoHash = await modularSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
