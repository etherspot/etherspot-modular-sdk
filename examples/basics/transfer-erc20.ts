import { EtherspotBundler, ModularSdk } from '../../src';
import { printOp } from '../../src/sdk/common/OperationUtils';
import { ERC20_ABI } from '../../src/sdk/helpers/abi/ERC20_ABI';
import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import { getPublicClient, getViemAccount } from '../../src/sdk/common/utils/viem-utils';
import { encodeFunctionData, Hex, http, parseAbi, parseUnits } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';
import { erc20Abi } from '../../src/sdk/common/abis';

dotenv.config();

// add/change these values
const recipient = '0x80a1874E1046B1cc5deFdf4D3153838B72fF94Ac'; // recipient wallet address
const value = '0.1'; // transfer value
const tokenAddress = '0xf7e6a76F138817c39dC0b5fCb409f642490CcEdD'; // token address
const bundlerApiKey = 'etherspot_public_key';

// tsx examples/basics/transfer-erc20.ts
async function main() {
  // initializating sdk...
  const bundlerProvider = new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey);
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const publicClient = getPublicClient({
    chainId: Number(process.env.CHAIN_ID),
    transport: http(bundlerProvider.url)
  });

  // get decimals from erc20 contract
  
  const decimals = await publicClient.readContract({
    address: tokenAddress as Hex,
    abi: parseAbi(erc20Abi),
    functionName: 'decimals',
    args: []
  })
  
  // get transferFrom encoded data
  const transactionData = encodeFunctionData({
    functionName: 'transfer',
    abi: parseAbi(ERC20_ABI),
    args: [recipient, parseUnits(value, decimals as number)]
  });
  
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
