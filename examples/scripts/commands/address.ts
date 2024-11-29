// @ts-ignore
import config from "../../config.json";
import { generateModularSDKInstance } from "../../helpers/sdk-helper";

export default async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  // initializating sdk...
  const modularSdk = generateModularSDKInstance(
    config.signingKey,
    80001,
    bundlerApiKey
  );// Testnets dont need apiKey on bundlerProvider
  const address = await modularSdk.getCounterFactualAddress();
  console.log(`Etherspot address: ${address}`);
}
