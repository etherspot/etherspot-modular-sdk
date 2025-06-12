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
  ]);

  console.log('\x1b[33m%s\x1b[0m', `HookMultiPlexer Init Data: ${encodedData}`);
  return encodedData;
}