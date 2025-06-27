import * as dotenv from 'dotenv';
dotenv.config();

import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export async function getSecretFromBidHashAndSessionKey(bidHash: string, sessionKey: string) {
  const secretName = `${sessionKey}-${bidHash}`;
  console.log(`Fetching secret for: ${secretName}`);
  if (!secretName) {
    throw new Error("Secret name is required");
  }
  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);
  if (response.SecretString) {
    console.log(`Secret found for: ${secretName} as: ${response.SecretString}`);
    return `0x${response.SecretString}`;
  }
  throw new Error("Secret not found");
}

// tsx examples/resource-lock/get-session-key-pair.ts
// (async () => {
//   const bidHash = '0x7931e1aca917a4673d583cdc599bcfe6ff19496922aa75a11499e726884b9aec';
//   const sessionKey = '0xd0Df09FD15E6a4b2940A22a684EEC2F377E36a8C';
//   const secret = await getSecretFromBidHashAndSessionKey(bidHash, sessionKey);
//   console.log(secret);
// })();