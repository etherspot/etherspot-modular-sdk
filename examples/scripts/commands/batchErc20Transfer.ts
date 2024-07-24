// @ts-ignore
import config from "../../config.json";
import { printOp } from "../../../src/sdk/common/OperationUtils";
import { sleep } from "../../../src/sdk/common";
import { generateModularSDKInstance } from "../../helpers/sdk-helper";
import { encodeFunctionData, getAddress, Hex, parseAbi, parseUnits, PublicClient } from "viem";
import { erc20Abi } from "../../../src/sdk/common/abis";

// This example requires several layers of calls:
// EntryPoint
//  ┕> sender.executeBatch
//    ┕> token.transfer (recipient 1)
//    ⋮
//    ┕> token.transfer (recipient N)
export default async function main(
  tkn: string,
  t: Array<string>,
  amt: string,
) {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    config.signingKey,
    config.chainId,
    bundlerApiKey
  );

  const address = await modularSdk.getCounterFactualAddress();
  console.log(`Etherspot address: ${address}`)

  const token = getAddress(tkn);

  const publicClient: PublicClient = modularSdk.getPublicClient();

  const symbol = await publicClient.readContract({
    address: token as Hex,
    abi: parseAbi(erc20Abi),
    functionName: 'symbol',
    args: []
  })

  const decimals = await publicClient.readContract({
    address: token as Hex,
    abi: parseAbi(erc20Abi),
    functionName: 'decimals',
    args: []
  })

  const amount = parseUnits(amt, decimals as number);

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  let dest: Array<string> = [];
  let data: Array<string> = [];
  t.map((addr) => addr.trim()).forEach((addr) => {
    dest = [...dest, token];
    data = [
      ...data,
      encodeFunctionData({
        functionName: 'transfer',
        abi: parseAbi(erc20Abi),
        args: [getAddress(addr), amount],
      })
    ];
  });
  console.log(
    `Batch transferring ${amt} ${symbol} to ${dest.length} recipients...`
  );

  for (let i = 0; i < dest.length; i++) {
    await modularSdk.addUserOpsToBatch({ to: dest[i], data: data[i] })
  }

  const op = await modularSdk.estimate();
  console.log(`Estimated UserOp: ${await printOp(op)}`);

  // sign the userop and sending to the bundler...
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
