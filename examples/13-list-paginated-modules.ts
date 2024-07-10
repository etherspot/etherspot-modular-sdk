import { ethers } from 'ethers';
import { EtherspotBundler, ModularSdk, NETWORK_NAME_TO_CHAIN_ID, NetworkNames } from '../src';
import * as dotenv from 'dotenv';
import { MODULE_TYPE, sleep } from '../src/sdk/common';
import { Networks } from '../src/sdk/network/constants';
import { getPublicClient, getViemAddress } from '../src/sdk/common/viem-utils';
import { getModulesPaginated } from '../src/sdk/common/getInstalledModules';
import { PublicClient } from 'viem';

dotenv.config();

// npx ts-node examples/13-list-paginated-modules.ts
async function main() {
  const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
  const privateKey = process.env.WALLET_PRIVATE_KEY as string;
  const chainId : number = NETWORK_NAME_TO_CHAIN_ID[NetworkNames.Sepolia];
  const rpcProviderUrl = Networks[chainId].bundler;
  const walletAddress = "0x8E367D39368fc545E64c4a8C30Af7dF05edDf789";

  console.log(`rpcProviderUrl: ${rpcProviderUrl}`);

  const viemPublicClient = getPublicClient ({ rpcUrl: rpcProviderUrl, chainId: chainId });

  const addresses = await getModulesPaginated({
    client: viemPublicClient as PublicClient,
    functionName: 'getValidatorPaginated',
    walletAddress: getViemAddress(walletAddress),
  });

  console.log(`addresses are: ${addresses}`);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
