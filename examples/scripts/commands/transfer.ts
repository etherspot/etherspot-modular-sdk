// @ts-ignore
import config from "../../config.json";
import { printOp } from "../../../src/sdk/common/OperationUtils";
import { sleep } from "../../../src/sdk/common";
import { generateModularSDKInstance } from "../../helpers/sdk-helper";
import { getAddress, parseEther } from "viem";

export default async function main(t: string, amt: string) {
  const modularSdk = generateModularSDKInstance(
    config.signingKey,
    config.chainId,
    config.rpcProviderUrl
  );

  const target = getAddress(t);
  const value = parseEther(amt);

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();
  
  await modularSdk.addUserOpsToBatch({to: target, value});
  console.log(`Added transaction to batch`);

  const op = await modularSdk.estimate();
  console.log(`Estimated UserOp: ${await printOp(op)}`);

  // sign the userOp and sending to the bundler...
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
