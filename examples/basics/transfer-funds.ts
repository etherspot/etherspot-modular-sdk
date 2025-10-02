import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import { Hex, parseEther } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

const recipient = '0x56e0d1120B54368017b591dAD42770D2843f2184'; // recipient wallet address
const value = '0.0000001'; // transfer value
const bundlerApiKey = process.env.BUNDLER_API_KEY as string;

// tsx examples/basics/transfer-funds.ts
async function main() {
  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);


  // get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  const transactionBatch = await modularSdk.addUserOpsToBatch({ to: recipient, value: parseEther(value) });
  console.log('transactions: ', transactionBatch);

  // get balance of the account address
  const balance = await modularSdk.getNativeBalance();

  console.log('balances: ', balance);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await modularSdk.estimate();
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp and sending to the bundler...
  const uoHash = await modularSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);

  // get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 1200000; // 1 minute timeout
  while ((userOpsReceipt == null) && (Date.now() < timeout)) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
