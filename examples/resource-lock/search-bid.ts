import axios from 'axios';
import { bigintReplacer } from './get-session-key-details';

// Types for the bid search API response

export interface BidPath {
  tokenConsumed: string;
  amountConsumed: string | number;
  tokenReceived: string;
  amountReceived: string | number;
  action: string;
}

export interface BidSolution {
  to: string;
  callData: string;
  value: string | number;
  path: BidPath;
}

export interface BidStep {
  sequenceNumber: number;
  chainId: number;
  validUntil: number;
  solution: BidSolution;
}

export interface BidDetails {
  bidHash: string;
  solverAddress: string;
  intentHash: string;
  steps: BidStep[];
}

export interface ExecutedTransaction {
  chainId: number;
  transactionHash: string;
}

export interface BidSearchResult {
  bidHash: string;
  solverAddress: string;
  intentHash: string;
  bid: BidDetails;
  bidStatus: string;
  createdAt: string;
  createdAtEpoch: number;
  updatedAt: string;
  updatedAtEpoch: number;
  executedAtEpoch: number;
  message: string;
  executedTransactions: ExecutedTransaction[];
}

export async function searchBid(bidHash: string): Promise<BidSearchResult[]> {
  const url = `https://pulse-dss-qa.etherspot.io/pulse/bids/search?bidHash=${bidHash}`;
  const res = await axios.get<BidSearchResult[]>(url);
  return res.data;
}

// tsx examples/resource-lock/search-bid.ts
(async () => {
  const results = await searchBid('0xf9385007459e20a6f37805309a73a1eaae824e06ec136ae3b95452229a1ce27f');
  console.log(JSON.stringify(results, bigintReplacer, 2));
})();