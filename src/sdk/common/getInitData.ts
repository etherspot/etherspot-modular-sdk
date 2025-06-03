import {
  Hex,
  decodeAbiParameters,
  decodeFunctionData,
  parseAbi,
  slice,
  encodeAbiParameters
} from 'viem';
import { InitialModules, Module } from './types.js'
import { bootstrapAbi, factoryAbi } from './abis.js'

export const getInitData = ({
  initCode,
}: {
  initCode: Hex
}): InitialModules => {
  const { args: initCodeArgs } = decodeFunctionData({
    abi: parseAbi(factoryAbi),
    data: slice(initCode, 20),
  })

  if (initCodeArgs?.length !== 2) {
    throw new Error('Invalid init code')
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
    throw new Error('Invalid init code')
  }

  return {
    validators: initCallDataArgs[0] as Module[],
    executors: initCallDataArgs[1] as Module[],
    hooks: [initCallDataArgs[2]] as Module[],
    fallbacks: initCallDataArgs[3] as Module[],
  }
}

export interface SigHookInit {
  sig: string;
  subHooks: Hex[];
}

export function getHookMultiPlexerInitData(
  globalHooks: Hex[] = [],
  valueHooks: Hex[] = [],
  delegatecallHooks: Hex[] = [],
  sigHooks: SigHookInit[] = [],
  targetSigHooks: SigHookInit[] = [],
): Hex {
  const abiType = [
    { type: 'address[]' },
    { type: 'address[]' },
    { type: 'address[]' },
    {
      type: 'tuple[]',
      components: [{ type: 'bytes4' }, { type: 'address[]' }],
    },
    {
      type: 'tuple[]',
      components: [{ type: 'bytes4' }, { type: 'address[]' }],
    },
  ];
  const encodedData = encodeAbiParameters(abiType, [
    globalHooks,
    valueHooks,
    delegatecallHooks,
    sigHooks,
    targetSigHooks
  ] as any);
  return encodedData;
}
