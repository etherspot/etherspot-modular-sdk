import { Address, PublicClient, parseAbi, zeroAddress } from 'viem'
import { ModuleType } from './types'
import { VIEM_SENTINEL_ADDRESS } from './constants'
import { isContract } from './utils/viem-utils'
import { accountAbi } from './abis'
import { DEFAULT_QUERY_PAGE_SIZE } from '../network/constants'

export const getInstalledModules = async ({
  client,
  moduleAddress,
  moduleTypes = ['validator', 'executor', 'hook', 'fallback'],
  pageSize = DEFAULT_QUERY_PAGE_SIZE
}: {
  client: PublicClient
  moduleAddress: Address
  moduleTypes?: ModuleType[]
  pageSize: number
}): Promise<Address[]> => {
  const modules: Address[] = []
  if (await isContract({ client, address: moduleAddress })) {
    for (const moduleType of moduleTypes) {
      switch (moduleType) {
        case 'validator':
          const validators = await getModulesPaginated({
            client,
            functionName: 'getValidatorPaginated',
            walletAddress: moduleAddress,
            pageSize: pageSize
          })
          validators && modules.push(...validators)
          break
        case 'executor':
          const executors = await getModulesPaginated({
            client,
            functionName: 'getExecutorsPaginated',
            walletAddress: moduleAddress,
            pageSize: pageSize
          })
          executors && modules.push(...executors)
          break
        case 'hook':
          const activeHook = (await client.readContract({
            address: moduleAddress,
            abi: parseAbi(accountAbi),
            functionName: 'getActiveHook',
          })) as Address
          modules.push(activeHook)
          break
        case 'fallback':
        // todo: implement on account or use events
      }
    }
  } else {
    throw new Error('Account has no init code and is not deployed')
  }
  const onlyModules = modules.filter((module) => module !== zeroAddress)
  const uniqueModules = Array.from(new Set(onlyModules))
  return uniqueModules
}

export const getModulesPaginated = async ({
  client,
  functionName,
  walletAddress,
  pageSize = DEFAULT_QUERY_PAGE_SIZE
}: {
  client: PublicClient
  functionName: string
  walletAddress: Address
  pageSize?: number
}) => {
  const data = (await client.readContract({
    address: walletAddress,
    abi: parseAbi(accountAbi),
    functionName: functionName,
    args: [VIEM_SENTINEL_ADDRESS, pageSize],
  })) as [Address[], Address]
  return data[0]
}