import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import { encodeFunctionData, parseAbi } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// add/change these values
const recipient = '0xD129dB5e418e389c3F7D3ae0B8771B3f76799A52'; // recipient wallet address
const tokenAddress = '0xe55C5793a52AF819fBf3e87a23B36708E6FDd2Cc';
const tokenId = 4;
const bundlerApiKey = 'etherspot_public_key';

// tsx examples/basics/transfer-nft.ts
async function main() {
  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY as string,
     Number(process.env.CHAIN_ID), bundlerApiKey);

  // get address of EtherspotWallet...
  const address: string = await modularSdk.getCounterFactualAddress();
  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const erc721Interface = [
    'function safeTransferFrom(address _from, address _to, uint256 _tokenId)'
  ];

  const erc721Data = encodeFunctionData(
    {
      functionName: 'safeTransferFrom',
      abi: parseAbi(erc721Interface),
      args: [address, recipient, tokenId]
    });

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  const userOpsBatch = await modularSdk.addUserOpsToBatch({ to: tokenAddress, data: erc721Data });
  console.log('transactions: ', userOpsBatch);

  // sign transactions added to the batch
  const op = await modularSdk.estimate();
  console.log(`Estimated UserOp: ${await printOp(op)}`);

  // sign the userOps and sending to the bundler...
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
