import {
  Hex,
  decodeAbiParameters,
  decodeFunctionData,
  parseAbi,
  slice,
} from 'viem'
import { InitialModules, Module } from './types.js'
import { bootstrapAbi, factoryAbi } from './abis.js'
import { ErrorHandler } from '../errorHandler/errorHandler.service.js'

/**
 * Extract initial modules from init code.
 * @param initCode Hex encoded init code
 * @returns Initial modules configuration
 */
export const getInitData = ({
  initCode,
}: {
  initCode: Hex
}): InitialModules => {
  try {
    const { args: initCodeArgs } = decodeFunctionData({
      abi: parseAbi(factoryAbi),
      data: slice(initCode, 20),
    })

    if (initCodeArgs?.length !== 2) {
      throw new ErrorHandler('Invalid init code: expected 2 arguments', 1);
    }

    const initCallData = decodeAbiParameters(
      [
        { name: 'bootstrap', type: 'address' },
        { name: 'initCallData', type: 'bytes' },
      ],
      initCodeArgs[1] as Hex,
    )

    const { args: initCallDataArgs } = decodeFunctionData({
      abi: parseAbi(bootstrapAbi),
      data: initCallData[1],
    })

    if (initCallDataArgs?.length !== 4) {
      throw new ErrorHandler('Invalid init code: expected 4 bootstrap arguments', 1);
    }

    return {
      validators: initCallDataArgs[0] as Module[],
      executors: initCallDataArgs[1] as Module[],
      hooks: [initCallDataArgs[2]] as Module[],
      fallbacks: initCallDataArgs[3] as Module[],
    }
  } catch (error) {
    if (error instanceof ErrorHandler) {
      throw error;
    }
    throw new ErrorHandler(`Failed to decode init data: ${error instanceof Error ? error.message : String(error)}`, 1);
  }
}
