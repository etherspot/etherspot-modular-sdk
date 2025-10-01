import { createPublicClient, Hex } from "viem";
import { http, PublicClient } from 'viem';
import { generateModularSDKInstance } from "../helpers/sdk-helper";
import * as dotenv from 'dotenv';
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

async function getSessionKeysByModularAccount(chainId: number, modularAccount: Hex): Promise<readonly Hex[]> {
  const bundlerApiKey = process.env.BUNDLER_API_KEY || 'etherspot_public_key';
  const modularSdk = generateModularSDKInstance(process.env.WALLET_PRIVATE_KEY as string, chainId, bundlerApiKey);

  const client = createPublicClient({
    transport: http(modularSdk.getProviderUrl()),
  });

  const credibleAccountModuleAddress = '0xc34D2E2D9Fa0aDbCd801F13563A1423858751A12';

  const sessionKeys = await client.readContract({
    address: credibleAccountModuleAddress as Hex,
    abi: CredibleAccountModuleAbi,
    functionName: 'getSessionKeysByWallet',
    args: [modularAccount],
  });

  return sessionKeys;
}

// tsx examples/pulse/get-session-keys.ts
async function main() {

  const chainId = 42161;
  const modularAccount = "0x39485Eb6c0d91c7D54E521727B52F4fafB1055b0";

  const sessionKeys = await getSessionKeysByModularAccount(chainId, modularAccount as Hex);

  console.log(`sessionKeys for modularAccount: ${modularAccount} on chainId: ${chainId} are: ${sessionKeys}`);
}


main()
  .catch(console.error)
  .finally(() => process.exit());