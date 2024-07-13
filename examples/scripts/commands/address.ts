// @ts-ignore
import config from "../../config.json";
import { ModularSdk } from "../../../src";
import { getViemAccount } from "src/sdk/common/viem-utils";

export default async function main() {
  const modularSdk = new ModularSdk({ privateKey: config.signingKey }, { chainId: 80001, account: getViemAccount(config.signingKey) })
  const address = await modularSdk.getCounterFactualAddress();

  console.log(`Etherspot address: ${address}`);
}
