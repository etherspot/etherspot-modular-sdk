import { PublicClient, Address, createPublicClient, createWalletClient, http, Account, Chain, getAddress, extractChain, Hex, Transport } from 'viem'
import { privateKeyToAccount } from 'viem/accounts';
import * as chains from "viem/chains";
import { Networks } from '../../network/index.js';
import { AddressZero } from '../constants.js';

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

export const getPublicClientByChain = ({ chain, transport }: { chain: Chain, transport: Transport }) => {
  const publicClient = createPublicClient({
    chain: chain,
    transport: transport
  });
  return publicClient;
}

export const getWalletClientFromPrivateKey = ({ rpcUrl, chainId, privateKey }: { rpcUrl: string, chainId: number, privateKey: string }): ReturnType<typeof createWalletClient> => {
  return createWalletClient({
    account: privateKeyToAccount(privateKey as Hex),
    chain: Networks[chainId].chain,
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
  });
}

export const getWalletClientFromAccount = ({ rpcUrl, chainId, account }: { rpcUrl: string, chainId: number, account: Account }): ReturnType<typeof createWalletClient> => {
  return createWalletClient({
    account: account,
    chain: Networks[chainId].chain,
    transport: http(rpcUrl) as any, // Asserting to `any` to bypass the deep instantiation check
  });
}
export const getViemAccount = (privateKey: string): Account => {
  return privateKeyToAccount(privateKey as Hex);
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

export function prepareAddress(value: string, zeroAddressAsNull = false): string {
  let result = '';

  try {
    result = getAddress(value);

    if (result === AddressZero) {
      result = '';
    }
  } catch (err) {
    //
  }

  if (!result && zeroAddressAsNull) {
    result = AddressZero;
  }

  return result;
}

export function prepareAddresses<T extends {}>(data: T, ...keys: (keyof T)[]): T {
  const result = {
    ...data,
  };

  for (const key of keys) {
    if (!result[key]) {
      continue;
    }

    try {
      if (Array.isArray(result[key])) {
        const addresses: any = ((result[key] as any) as string[]).map((item) => {
          let result = item;

          if (item) {
            const address = prepareAddress(item);

            if (address) {
              result = address;
            }
          }

          return result;
        });

        result[key] = addresses;
      } else {
        const address: any = prepareAddress(result[key] as any);

        if (address) {
          result[key] = address;
        }
      }
    } catch (err) {
      //
    }
  }

  return result;
}

export function addressesEqual(address1: string, address2: string): boolean {
  return (address1 || '').toLowerCase() === (address2 || '').toLowerCase();
}

export function isAddress(value: string): boolean {
  let result = false;

  if (value && value !== AddressZero) {
    try {
      const address = getAddress(value);

      if (address) {
        result = address === value;
      }
    } catch (err) {
      result = false;
    }
  } else if (value === AddressZero) {
    result = true;
  }

  return result;
}
