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
const SEPOLIA_CHAIN_ID = '11155111';
const recipient = '0x80a1874E1046B1cc5deFdf4D3153838B72fF94Ac'; // Recipient
const value = '0.1'; // 0.1 USDC
const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'; // USDC Sepolia
const bundlerApiKey = 'etherspot_public_key';

// tsx examples/credibleaccounts/transfer-erc20.ts
async function main() {
  // initializating sdk...
  const bundlerProvider = new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey);
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
    Number(SEPOLIA_CHAIN_ID),
    bundlerApiKey,
  );

  // Get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const publicClient = getPublicClient({
    chainId: Number(SEPOLIA_CHAIN_ID),
    transport: http(bundlerProvider.url),
  });

  const balance = await publicClient.getBalance({
    address: address as `0x${string}`,
  });
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet balance: ${balance}`);

  // Check balance of USDC on EtherspotWallet
  let usdcBalance = await publicClient.readContract({
    address: tokenAddress as Hex,
    abi: parseAbi(erc20Abi),
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet USDC balance: ${usdcBalance}`);

  // Get decimals from erc20 contract
  const decimals = await publicClient.readContract({
    address: tokenAddress as Hex,
    abi: parseAbi(erc20Abi),
    functionName: 'decimals',
    args: [],
  });

  // Get transfer encoded data
  const transactionData = encodeFunctionData({
    functionName: 'transfer',
    abi: parseAbi(ERC20_ABI),
    args: [recipient, parseUnits(value, decimals as number)],
  });

  // Clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // Add transactions to the batch
  const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: tokenAddress, data: transactionData });
  console.log('transactions: ', userOpsBatch);

  // Estimate transactions added to the batch and get the fee data for the UserOp
  const op = await modularSdk.estimate();
  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // Sign the UserOp and sending to the bundler...
  const uoHash = await modularSdk.send(op);
  console.log(`UserOpHash: ${uoHash}`);

  // Get transaction hash...
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 60000; // 1 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);

  // Check balance of USDC on EtherspotWallet
  usdcBalance = await publicClient.readContract({
    address: tokenAddress as Hex,
    abi: parseAbi(erc20Abi),
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
  });
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet USDC balance: ${usdcBalance}`);

  // Check balance of USDC on Receiver
  let usdcReceiverBalance = await publicClient.readContract({
    address: tokenAddress as Hex,
    abi: parseAbi(erc20Abi),
    functionName: 'balanceOf',
    args: [recipient as `0x${string}`],
  });
  console.log('\x1b[33m%s\x1b[0m', `Receiver USDC balance: ${usdcReceiverBalance}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
