import { printOp } from '../../src/sdk/common/OperationUtils';
import * as dotenv from 'dotenv';
import { sleep } from '../../src/sdk/common';
import { encodeFunctionData, parseAbi } from 'viem';
import { generateModularSDKInstance } from '../helpers/sdk-helper';

dotenv.config();

// tsx examples/basics/add-guardians.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';

  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    process.env.WALLET_PRIVATE_KEY,
    Number(process.env.CHAIN_ID),
    bundlerApiKey
  );// Testnets dont need apiKey on bundlerProvider


  console.log('address: ', modularSdk.getEOAAddress());

  // get address of EtherspotWallet
  const address: string = await modularSdk.getCounterFactualAddress();

  // update the addresses in this array with the guardian addresses you want to set
  const guardianAddresses: string[] = [
    '0xa8430797A27A652C03C46D5939a8e7698491BEd6',
    '0xaf2D76acc5B0e496f924B08491444076219F2f35',
    '0xBF1c0A9F3239f5e7D35cE562Af06c92FB7fdF0DF',
  ];

  console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);

  const addGuardianInterface = ['function addGuardian(address _newGuardian)'];

  const addGuardianData1 =
    encodeFunctionData({
      functionName: 'addGuardian',
      abi: parseAbi(addGuardianInterface),
      args: [guardianAddresses[0]],
    });
  const addGuardianData2 =
    encodeFunctionData({
      functionName: 'addGuardian',
      abi: parseAbi(addGuardianInterface),
      args: [guardianAddresses[1]],
    });
  const addGuardianData3 = encodeFunctionData({
    functionName: 'addGuardian',
    abi: parseAbi(addGuardianInterface),
    args: [guardianAddresses[2]],
  });
  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  // add transactions to the batch
  let userOpsBatch = await modularSdk.addUserOpsToBatch({ to: address, data: addGuardianData1 });
  userOpsBatch = await modularSdk.addUserOpsToBatch({ to: address, data: addGuardianData2 });
  userOpsBatch = await modularSdk.addUserOpsToBatch({ to: address, data: addGuardianData3 });
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
  while (userOpsReceipt == null && Date.now() < timeout) {
    await sleep(2);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }
  console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
