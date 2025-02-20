import { encodeAbiParameters, encodeFunctionData, Hex } from "viem";

const HookMultiplexer = [{
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
}] as const;

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

  console.log('Encoded Data:', encodedData);

  const hookMultiplexerInitData = encodeFunctionData({
    abi: HookMultiplexer,
    args: [encodedData],
    functionName: 'onInstall',
  });

  console.log('Hook Multiplexer Init Data:', hookMultiplexerInitData);

  return hookMultiplexerInitData;
}