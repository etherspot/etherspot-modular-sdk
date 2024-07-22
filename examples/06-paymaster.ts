import { EtherspotBundler, ModularSdk } from '../src';
import { printOp } from '../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../src/sdk/common';
import { getViemAccount } from '../src/sdk/common/utils/viem-utils';
import { parseEther } from 'viem';
import { generateModularSDKInstance } from './helpers/sdk-helper';

dotenv.config();

const recipient = '0x80a1874E1046B1cc5deFdf4D3153838B72fF94Ac'; // recipient wallet address
const value = '0.0000001'; // transfer value
const apiKey = 'arka_public_key'; // Only testnets are available, if you need further assistance in setting up a paymaster service for your dapp, please reach out to us on discord or https://etherspot.fyi/arka/intro
const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
// tsx 
async function main() {
  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY,
    Number(process.env.CHAIN_ID),
    bundlerApiKey
  );// Testnets dont need apiKey on bundlerProvider


  console.log('address: ', modularSdk.getEOAAddress());

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
  const op = await modularSdk.estimate({
    paymasterDetails: { url: `https://arka.etherspot.io?apiKey=${apiKey}&chainId=${Number(process.env.CHAIN_ID)}`, context: { mode: 'sponsor' } }
  });
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp and sending to the bundler...
  const uoHash = await modularSdk.send(op);
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
