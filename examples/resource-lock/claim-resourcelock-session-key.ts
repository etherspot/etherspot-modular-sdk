import { BigNumber, ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { printOp } from '../../src/sdk/common/OperationUtils';
import { getViemAccount, sleep } from '../../src/sdk/common';
import { ModularSdk, EtherspotBundler, Networks } from '../../src';
import { ERC20_ABI } from '../../src/sdk/helpers/abi/ERC20_ABI';
import { encodeFunctionData, Hex, parseAbi, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { getSecretFromBidHashAndSessionKey } from './get-session-key-pair';
import { getSessionDetailsByWalletAddressAndSessionKey, SessionDetails } from './get-session-key-details';
import { BidSearchResult, searchBid } from './search-bid';
import { getResourceLockInfo, ResourceLockInfoResponse } from './get-resourcelock-info';
import { IntentSearchResult, searchIntent } from './search-intent';

dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY as string;
const bundlerApiKey = process.env.BUNDLER_API_KEY as string;
const bidHash = '0xf9385007459e20a6f37805309a73a1eaae824e06ec136ae3b95452229a1ce27f';

// tsx examples/resource-lock/claim-resourcelock-session-key.ts
async function main() {

  if (!walletPrivateKey || !bundlerApiKey || !bidHash) {
    console.error('Please set the user_modular_wallet_address, walletPrivateKey, bundlerApiKey, and bidHash environment variables.');
    return;
  }

  // search bid and get solver address
  const bidSearchResult: BidSearchResult[] = await searchBid(bidHash);

  if (!bidSearchResult || bidSearchResult.length === 0) {
    console.error(`No bid found for hash: ${bidHash}`);
    return;
  }

  const bidDetails = bidSearchResult[0];

  if (!bidDetails) {
    console.error(`No bid found for hash: ${bidHash}`);
    return;
  }

  const solverAddress = bidDetails.solverAddress;

  if (!solverAddress) {
    console.error(`No solver address found for bid hash: ${bidHash}`);
    return;
  }

  const intentSearchResultResponse : IntentSearchResult[] = await searchIntent(bidDetails.intentHash);

  if (!intentSearchResultResponse || intentSearchResultResponse.length === 0) {
    console.error(`No intent found for hash: ${bidDetails.intentHash}`);
    return;
  }

  const intentSearchResult: IntentSearchResult = intentSearchResultResponse[0];

  if (!intentSearchResult || !intentSearchResult.userIntent) {
    console.error(`No intent found for hash: ${bidDetails.intentHash}`);
    return;
  }

  const modularWalletAddress = intentSearchResult.userIntent.core.permittedAccounts[0].account;
  const chainId = intentSearchResult.userIntent.core.permittedAccounts[0].chainId;

  if (!modularWalletAddress) {
    console.error(`No modular wallet address found for intent hash: ${bidDetails.intentHash}`);
    return;
  }

  const resourceLockInfoResponse: ResourceLockInfoResponse = await getResourceLockInfo(bidHash);

  if (!resourceLockInfoResponse || !resourceLockInfoResponse.resourceLockInfo) {
    console.error(`No resource lock info found for bid hash: ${bidHash}`);
    return;
  }

  const sessionKeyAddress = resourceLockInfoResponse.resourceLockInfo.sessionKey;

  if (!sessionKeyAddress) {
    console.error(`No session key address found for bid hash: ${bidHash}`);
    return;
  }

  // get session key private key from AWS Secrets Manager
  const sessionPrivateKey = await getSecretFromBidHashAndSessionKey(solverAddress, sessionKeyAddress);

  if (!sessionPrivateKey) {
    console.error(`No session private key found for session key address: ${sessionKeyAddress}`);
    return;
  }

  // get the session-details from api-call
  const sessionKeyDetails: SessionDetails = await getSessionDetailsByWalletAddressAndSessionKey(
    chainId,
    modularWalletAddress,
    sessionKeyAddress
  );

  if (!sessionKeyDetails || !sessionKeyDetails.lockedTokens || sessionKeyDetails.lockedTokens.length === 0) {
    console.error(`No locked tokens found for session key address: ${sessionKeyAddress}`);
    return;
  }

  const tokenAddress = sessionKeyDetails.lockedTokens[0].token;
  const lockedAmount = sessionKeyDetails.lockedTokens[0].locked_amount;
  const claimedAmount = sessionKeyDetails.lockedTokens[0].claimed_amount;

  if (!tokenAddress || !lockedAmount || !claimedAmount) {
    console.error(`Invalid locked token details for session key address: ${sessionKeyAddress}`);
    return;
  }

  if (claimedAmount == lockedAmount || lockedAmount == '0') {
    console.error(`You have already claimed: ${claimedAmount} locked tokens`);
    return;
  }

  // prepare UserOp to transfer the locked ERC20 tokens from the user's ModularWallet to the solver address
  const modularSdk = new ModularSdk(
    walletPrivateKey,
    {
      chainId: chainId,
      bundlerProvider: new EtherspotBundler(chainId, bundlerApiKey),
      index: 0,
      accountAddress: modularWalletAddress
    })

  // get transferFrom encoded data
  const transactionData = encodeFunctionData({
    functionName: 'transfer',
    abi: parseAbi(ERC20_ABI),
    args: [solverAddress, lockedAmount]
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

  const userOpHash: string = await modularSdk.getUserOpHash(op);
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
