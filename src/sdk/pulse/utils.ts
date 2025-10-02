import { encodeAbiParameters, encodeFunctionData, Hex } from 'viem';
import { SigHookInit } from './interfaces.js';

export const HookMultiplexer = [
  {
    type: 'function',
    name: 'onInstall',
    inputs: [
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addHook',
    inputs: [
      {
        name: 'hook',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'hookType',
        type: 'uint8',
        internalType: 'enum HookType',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeHook',
    inputs: [
      {
        name: 'hook',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'hookType',
        type: 'uint8',
        internalType: 'enum HookType',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

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
    targetSigHooks,
  ] as any);

  const hookMultiplexerInitData = encodeFunctionData({
    abi: HookMultiplexer,
    args: [encodedData],
    functionName: 'onInstall',
  });

  return hookMultiplexerInitData;
}
