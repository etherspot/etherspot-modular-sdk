import { PublicClient, Address, createPublicClient, createWalletClient, http, Account, Chain, getAddress, extractChain, Hex, Transport } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import * as chains from "viem/chains";
import { Networks } from '../../network/constants';

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


export const getPublicClient = ({ chainId, transport }: { chainId: number, transport: Transport }) => {
  const publicClient = createPublicClient({
    chain: Networks[chainId].chain,
    transport: transport
  });
  return publicClient;
}

export const getWalletClientFromPrivateKey = ({ rpcUrl, chainId, privateKey }: { rpcUrl: string,  chainId: number, privateKey: string }) => {
  return createWalletClient({
    account: privateKeyToAccount(privateKey as `0x${string}`),
    chain: Networks[chainId].chain,
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
  });
}

export const getWalletClientFromAccount = ({ rpcUrl, chainId, account }: { rpcUrl: string,  chainId: number, account: Account }) => {
  return createWalletClient({
    account: account,
    chain: Networks[chainId].chain,
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
  });
}

// export const toHex = (value: string | number): Hex => {
//   return value as Hex;
// }

export const getViemAccount = (privateKey: string): Account => {
  return privateKeyToAccount(privateKey as `0x${string}`);
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
export const getChain = (chainId: number) : Chain => {
  return extractChain({
    chains: Object.values(chains) as Chain[],
    id: chainId,
  });
}

