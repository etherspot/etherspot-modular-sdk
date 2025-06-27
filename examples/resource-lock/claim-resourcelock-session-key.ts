import { BigNumber, ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { printOp } from '../../src/sdk/common/OperationUtils';
import { getViemAccount, sleep } from '../../src/sdk/common';
import { ModularSdk, EtherspotBundler, Networks } from '../../src';
import { ERC20_ABI } from '../../src/sdk/helpers/abi/ERC20_ABI';
import { encodeFunctionData, Hex, parseAbi, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

dotenv.config();

const chainId = 10;
const walletPrivateKey = process.env.WALLET_PRIVATE_KEY as string;
const bundlerApiKey = 'etherspot_public_key';
const user_modular_wallet_address = '';

const solverAddress = '';
const tokenAmount = '';
const tokenAddress = "";
const sessionKeyAddress = "";
const sessionPrivateKey = '';

// tsx examples/resource-lock/claim-resourcelock-session-key.ts
async function main() {
  const modularSdk = new ModularSdk(
    walletPrivateKey,
    {
      chainId: chainId,
      bundlerProvider: new EtherspotBundler(chainId, bundlerApiKey),
      index: 0,
      accountAddress: user_modular_wallet_address
    })

  // get transferFrom encoded data
  const transactionData = encodeFunctionData({
    functionName: 'transfer',
    abi: parseAbi(ERC20_ABI),
    args: [solverAddress, tokenAmount]
  });

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: tokenAddress, data: transactionData });
  console.log('transactions: ', userOpsBatch);

  const credibleAccountModuleAddress = Networks[chainId].contracts.credibleAccountModule;

  console.log(`credibleAccountModuleAddress ${credibleAccountModuleAddress} as BigNumber is: ${BigNumber.from(credibleAccountModuleAddress)}`);

  // estimate transactions added to the batch and get the fee data for the UserOp
  const op = await modularSdk.estimate({
    key: BigNumber.from(credibleAccountModuleAddress)
  });

  const nonceBig = BigNumber.from(op.nonce);
  console.log(`Nonce: ${nonceBig}`);

  console.log(`Estimate UserOp: ${await printOp(op)}`);

  const userOpHash : string = await modularSdk.getUserOpHash(op);
  console.log(`UserOpHash: ${userOpHash}`);
  
  // sign the UserOp using sessionPrivateKey (with viem)
  const sessionAccount = privateKeyToAccount(sessionPrivateKey as Hex);
  const signature = await sessionAccount.signMessage({ message: { raw: userOpHash as Hex } });

  // set the signedUserOpHash in the UserOp
  op.signature = signature;

  // sending to the bundler with isUserOpAlreadySigned true...
  const uoHash = await modularSdk.send(op, true);
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
