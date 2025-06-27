import axios from 'axios';

// Types for the intent search API response

export interface PermittedAccount {
  account: string;
  chainId: number;
}

export interface DesiredAsset {
  asset: string;
  value: number | string;
  chainId: number;
}

export interface DispensableAsset {
  asset: string;
  maxValue: number | string;
  chainId: number;
}

export interface IntentCore {
  permittedAccounts: PermittedAccount[];
}

export interface IntentConstraints {
  permittedChains: number[];
  deadline: number;
  maxGas: number;
  slippagePercentage: number;
  desiredAssets: DesiredAsset[];
  dispensableAssets: DispensableAsset[];
}

export interface UserIntent {
  intentHash: string;
  core: IntentCore;
  constraints: IntentConstraints;
}

export interface IntentSearchResult {
  intentHash: string;
  intentStatus: string;
  userIntent: UserIntent;
  account: string;
  createdAt: string;
  createdAtEpoch: number;
  updatedAt: string;
  updatedAtEpoch: number;
}

export async function searchIntent(intentHash: string): Promise<IntentSearchResult[]> {
  const url = `https://pulse-dss-qa.etherspot.io/pulse/intents/search?intent_hash=${intentHash}`;
  const res = await axios.get<IntentSearchResult[]>(url);
  return res.data;
}

// Example usage:
// (async () => {
//   const results = await searchIntent('0xddaea938a9293e91b2556ac656cf30b5cb5cf980748d783db24bf019a1ab4668');
//   console.log(JSON.stringify(results, null, 2));
// })();