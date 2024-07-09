import { PublicClient, Address, createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';

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


export const getPublicClient = ({ rpcUrl }: { rpcUrl: string }) => {
  return createPublicClient({
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
  });
}

export const getWalletClient = ({ rpcUrl, privateKey }: { rpcUrl: string, privateKey: string }) => {
  return createWalletClient({
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
    account: privateKeyToAccount(privateKey as `0x${string}`),
  });
}