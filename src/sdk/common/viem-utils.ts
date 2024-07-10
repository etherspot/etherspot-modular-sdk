import { get } from 'http';
import { PublicClient, Address, createPublicClient, createWalletClient, http, Account, Chain, getAddress, extractChain, Hex } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import * as chains from "viem/chains";
import { Networks } from '../network/constants';

export const isContract = async ({
  client,
  address,
}: {
  client: PublicClient
  address: Address
}) => {
  const bytecode = await client.getBytecode({
    address: address,
  })
  return bytecode && bytecode !== '0x'
}


export const getPublicClient = ({ chainId, rpcUrl }: { chainId: number, rpcUrl: string }) => {
  const publicClient = createPublicClient({
    chain: Networks[chainId].chain,
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
  });
  return publicClient;
}

export const getWalletClientFromPrivateKey = ({ rpcUrl, privateKey }: { rpcUrl: string, privateKey: string }) => {
  console.log(`privateKey: ${JSON.stringify(privateKey)}`)
  console.log(`rpcUrl: ${JSON.stringify(rpcUrl)}`)
  return createWalletClient({
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
    account: privateKeyToAccount(privateKey as `0x${string}`),
  });
}

export const toHex = (value: string | number): Hex => {
  return value as Hex;
}

export const getViemAccount = (privateKey: string): Account => {
  return privateKeyToAccount(privateKey as `0x${string}`);
}

export const getWalletClientFromViemAccount = ({ rpcUrl, account }: { rpcUrl: string, account: Account }) => {
  return createWalletClient({
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
    account: account,
  });
}

export const getViemAddress = (address: string): Address => {
  return getAddress(address);
}

/**
 * Utility method for converting a chainId to a {@link Chain} object
 *
 * @param chainId
 * @returns a {@link Chain} object for the given chainId
 * @throws if the chainId is not found
 */
// export const getChain = (chainId: number) : Chain => {
//   return extractChain({
//     chains: Object.values(chains) as Chain[],
//     chainId: chainId,
//   });
// }

