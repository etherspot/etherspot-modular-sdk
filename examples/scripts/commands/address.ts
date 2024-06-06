// @ts-ignore
import config from "../../config.json";
import { ModularSdk } from "../../../src";

export default async function main() {
  const modularSdk = new ModularSdk({ privateKey: config.signingKey }, { chainId: 80001 })
  const address = await modularSdk.getCounterFactualAddress();

  console.log(`Etherspot address: ${address}`);
}
