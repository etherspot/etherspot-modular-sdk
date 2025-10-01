import { createPublicClient, encodeFunctionData, Hex } from "viem";
import { http, PublicClient } from 'viem';
import { generateModularSDKInstance } from "../helpers/sdk-helper";
import * as dotenv from 'dotenv';
import { sleep } from "../../src";
dotenv.config();

export const CredibleAccountModuleAbi = [
  {
    "inputs": [
      { "internalType": "address", "name": "_sessionKey", "type": "address" }
    ],
    "name": "emergencyDisableSessionKey",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_wallet", "type": "address" }
    ],
    "name": "getSessionKeysByWallet",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

async function emergencyDisableSessionKeys(chainId: number, modularAccount: Hex, credibleAccountModuleAddress: Hex) {
  const bundlerApiKey = process.env.BUNDLER_API_KEY || 'etherspot_public_key';
  const modularSdk = generateModularSDKInstance(process.env.PULSE_ORCHESTRATOR_PRIVATE_KEY as string, chainId, bundlerApiKey);

  const client = createPublicClient({
    transport: http(modularSdk.getProviderUrl()),
  });

  const sessionKeys = await client.readContract({
    address: credibleAccountModuleAddress as Hex,
    abi: CredibleAccountModuleAbi,
    functionName: 'getSessionKeysByWallet',
    args: [modularAccount],
  });

  for (let sessionKeyIndex = 0; sessionKeyIndex < sessionKeys.length; sessionKeyIndex++) {
    const emergencyDisableSessionKeyCallData = encodeFunctionData({
      abi: CredibleAccountModuleAbi,
      functionName: 'emergencyDisableSessionKey',
      args: [sessionKeys[sessionKeyIndex]],
    });

    // Add the call to the batch (calling addHook on the Hook Multiplexer)
    await modularSdk.addUserOpsToBatch({
      to: credibleAccountModuleAddress,
      data: emergencyDisableSessionKeyCallData,
    });
  }

  // Estimate and send the UserOp
  const op = await modularSdk.estimate();
  const uoHash = await modularSdk.send(op);

  console.log(`PulseSetup UserOpHash: ${uoHash}`);

  // Await transaction hash
  console.log('Waiting for transaction...');
  let userOpsReceipt = null;
  const timeout = Date.now() + 300000; // 5 minute timeout
  while (userOpsReceipt == null && Date.now() < timeout) {
    await sleep(1000);
    userOpsReceipt = await modularSdk.getUserOpReceipt(uoHash);
  }

  if (userOpsReceipt) {
    console.log('\x1b[32m%s\x1b[0m', 'Pulse ecosystem installation completed successfully!');
    console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt);
  }
}

// tsx examples/pulse/emergency-disable-session-keys.ts
async function main() {
  const chainId = 42161;
  const modularAccount = "0x39485Eb6c0d91c7D54E521727B52F4fafB1055b0";
  const credibleAccountModuleAddress = "0xc34D2E2D9Fa0aDbCd801F13563A1423858751A12";
  await emergencyDisableSessionKeys(chainId, modularAccount as Hex, credibleAccountModuleAddress);
}


main()
  .catch(console.error)
  .finally(() => process.exit());