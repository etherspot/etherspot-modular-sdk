import { BigNumber, ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { printOp } from 'src/sdk/common/OperationUtils';
import { getViemAccount, sleep } from 'src/sdk/common';
import { ERC20_ABI } from '../../src/sdk/helpers/abi/ERC20_ABI';
import { ModularSdk, EtherspotBundler, SessionKeyValidator } from 'src';
import { encodeFunctionData, parseAbi, parseUnits } from 'viem';

dotenv.config();

// add/change these values
const recipient = '0xdE79F0eF8A1268DAd0Df02a8e527819A3Cd99d40'; // recipient wallet address
const value = '0.000001'; // transfer value
const tokenAddress = process.env.TOKEN_ADDRESS as string; // token address
const decimals = 18;
const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
const erc20SessionKeyValidator = '0x22A55192a663591586241D42E603221eac49ed09'; 

// tsx examples/sessionkeys/transfer-erc20-session-key.ts
async function main() {
  // initializating sdk...
  const modularSdk = new ModularSdk(
    getViemAccount(process.env.WALLET_PRIVATE_KEY as string),
    {
      chainId: Number(process.env.CHAIN_ID),
      bundlerProvider: new EtherspotBundler(Number(process.env.CHAIN_ID), bundlerApiKey)
    })

  // get instance  of SessionKeyValidator
  const sessionKeyModule = new SessionKeyValidator(modularSdk)

  console.log(`sessionKey SDK initialized`);

  // get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
  
    // get transferFrom encoded data
    const transactionData = encodeFunctionData({
      functionName: 'transfer',
      abi: parseAbi(ERC20_ABI),
      args: [recipient, parseUnits(value, decimals as number)]
    });

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

 const nonceBig = BigNumber.from(op.nonce);
 console.log(`Nonce: ${nonceBig}`);

  console.log(`Estimate UserOp: ${await printOp(op)}`);

  // sign the UserOp using sessionKey
  const sessionKey = process.env.SESSION_KEY as string;
  console.log(`sessionKey: ${sessionKey}`);

  const signedUserOp = await sessionKeyModule.signUserOpWithSessionKey(sessionKey, op);
  console.log(`etherspot-modular-sdk -> Signed UserOp: ${signedUserOp.signature}`);

  console.log(`Signed UserOp: ${await printOp(signedUserOp)}`);

  console.log(`UserOpNonce is: ${BigNumber.from(signedUserOp.nonce)}`);

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
