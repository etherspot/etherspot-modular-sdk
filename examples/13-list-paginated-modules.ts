import {  NETWORK_NAME_TO_CHAIN_ID, NetworkNames } from '../src';
import * as dotenv from 'dotenv';
import { Networks } from '../src/sdk/network/constants';
import { getPublicClient, getViemAddress } from '../src/sdk/common/utils/viem-utils';
import { getModulesPaginated } from '../src/sdk/common/getInstalledModules';
import { PublicClient } from 'viem';

dotenv.config();

// npx ts-node examples/13-list-paginated-modules.ts
async function main() {
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
