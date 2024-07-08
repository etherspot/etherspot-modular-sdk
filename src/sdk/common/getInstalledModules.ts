import { Address, PublicClient, parseAbi, zeroAddress } from 'viem'
import { ModuleType, Account } from './types'
import { SENTINEL_ADDRESS } from './constants'
import { accountAbi } from './abis'
import { getInitData } from './getInitData'
import { isContract } from './viem-utils'

export const getInstalledModules = async ({
  client,
  account,
  moduleTypes = ['validator', 'executor', 'hook', 'fallback'],
}: {
  client: PublicClient
  account: Account
  moduleTypes?: ModuleType[]
}): Promise<Address[]> => {
  const modules: Address[] = []
  if (await isContract({ client, address: account.address })) {
    for (const moduleType of moduleTypes) {
      switch (moduleType) {
        case 'validator':
          const validators = await getModulesPaginated({
            client,
            functionName: 'getValidatorPaginated',
            accountAddress: account.address,
          })
          validators && modules.push(...validators)
          break
        case 'executor':
          const executors = await getModulesPaginated({
            client,
            functionName: 'getExecutorsPaginated',
            accountAddress: account.address,
          })
          executors && modules.push(...executors)
          break
        case 'hook':
          const activeHook = (await client.readContract({
            address: account.address,
            abi: parseAbi(accountAbi),
            functionName: 'getActiveHook',
          })) as Address
          modules.push(activeHook)
          break
        case 'fallback':
        // todo: implement on account or use events
      }
    }
  } else if (account.initCode) {
    const initialModules = getInitData({ initCode: account.initCode })
    for (const moduleType of moduleTypes) {
      switch (moduleType) {
        case 'validator':
          for (const validator of initialModules.validators) {
            modules.push(validator.module)
          }
          break
        case 'executor':
          for (const executor of initialModules.executors) {
            modules.push(executor.module)
          }
          break
        case 'hook':
          for (const hook of initialModules.hooks) {
            modules.push(hook.module)
          }
          break
        case 'fallback':
          for (const fallback of initialModules.fallbacks) {
            modules.push(fallback.module)
          }
          break
      }
    }
  } else {
    throw new Error('Account has no init code and is not deployed')
  }
  const onlyModules = modules.filter((module) => module !== zeroAddress)
  const uniqueModules = Array.from(new Set(onlyModules))
  return uniqueModules
}

const getModulesPaginated = async ({
  client,
  functionName,
  accountAddress,
}: {
  client: PublicClient
  functionName: string
  accountAddress: Address
}) => {
  const data = (await client.readContract({
    address: accountAddress,
    abi: parseAbi(accountAbi),
    functionName: functionName,
    args: [SENTINEL_ADDRESS, 100],
  })) as [Address[], Address]
  return data[0]
}
