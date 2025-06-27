import axios from 'axios';

export interface TokenData {
  token: string;
  amount: number;
}

export interface ResourceLock {
  chainId: number;
  tokenData: TokenData[];
  proof: string[];
  userOpHash: string;
  transactionHash: string;
}

export interface ResourceLockInfo {
  intentHash: string;
  bidHash: string;
  rootHash: string;
  smartWallet: string;
  sessionKey: string;
  validAfter: number;
  validUntil: number;
  resourceLocks: ResourceLock[];
  signature: string;
  account: string;
}

export interface ResourceLockInfoResponse {
  intentHash: string;
  bidHash: string;
  resourceLockInfo: ResourceLockInfo;
  resourceLockStatus: string;
  createdAt: string;
  createdAtEpoch: number;
  updatedAt: string;
  updatedAtEpoch: number;
}

export async function getResourceLockInfo(bidHash: string): Promise<ResourceLockInfoResponse> {
  const url = `https://pulse-dss-qa.etherspot.io/pulse/resource-lock-info/${bidHash}`;
  const res = await axios.get<ResourceLockInfoResponse>(url);
  return res.data;
}

// tsx examples/resource-lock/get-resourcelock-info.ts
// (async () => {
//   const info = await getResourceLockInfo('0xf9385007459e20a6f37805309a73a1eaae824e06ec136ae3b95452229a1ce27f');
//   console.log(JSON.stringify(info, null, 2));
// })();