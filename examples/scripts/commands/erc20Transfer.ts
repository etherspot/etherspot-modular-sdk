// @ts-ignore
import config from "../../config.json";
import { printOp } from "../../../src/sdk/common/OperationUtils";
import { sleep } from "../../../src/sdk/common";
import { generateModularSDKInstance, getTokenMetaData } from "../../helpers/sdk-helper";
import { encodeFunctionData, getAddress, parseAbi, parseUnits } from "viem";
import { erc20Abi } from "../../../src/sdk/common/abis";

export default async function main(
  tokenAddress: string,
  recipientAddress: string,
  transferAmount: string,
) {
  const modularSdk = generateModularSDKInstance(
    config.signingKey,
    config.chainId,
    config.rpcProviderUrl
  );

  const tokenMetadata = await getTokenMetaData(config.rpcProviderUrl, tokenAddress);

  const amount = parseUnits(transferAmount, tokenMetadata.decimal);
  console.log(`Transferring ${transferAmount} ${tokenMetadata.symbol}...`);
  const transferData = encodeFunctionData({
    functionName: 'transfer',
    abi: parseAbi(erc20Abi),
    args: [getAddress(recipientAddress), amount]
  });

  // clear the transaction batch
  await modularSdk.clearUserOpsFromBatch();

  await modularSdk.addUserOpsToBatch({to: tokenAddress, data: transferData});
  console.log(`Added transaction to batch`);

  const op = await modularSdk.estimate();
  console.log(`Estimated UserOp: ${await printOp(op)}`);

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
