// @ts-ignore
import config from "../../config.json";
import { printOp } from "../../../src/sdk/common/OperationUtils";
import { sleep } from "../../../src/sdk/common";
import { generateModularSDKInstance, getTokenMetaData } from "../../helpers/sdk-helper";
import { encodeFunctionData, getAddress, parseAbi, parseUnits } from "viem";
import { erc20Abi } from "../../../src/sdk/common/abis";

export default async function main(
  tkn: string,
  s: string,
  amt: string,
) {
  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    config.signingKey,
    config.chainId,
    config.rpcProviderUrl
  );
  const address = await modularSdk.getCounterFactualAddress();
  console.log(`Etherspot address: ${address}`)
  
  const tokenMetadata = await getTokenMetaData(config.rpcProviderUrl, tkn);
  const amount = parseUnits(amt, tokenMetadata.decimal);
  const approveData = encodeFunctionData(
    {
      functionName: 'approve',
      abi: parseAbi(erc20Abi),
      args: [getAddress(s), amount]
    });


  console.log(`Approving ${amt} ${tokenMetadata.symbol}...`);
  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  await modularSdk.addUserOpsToBatch({to: tkn, data: approveData});
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
