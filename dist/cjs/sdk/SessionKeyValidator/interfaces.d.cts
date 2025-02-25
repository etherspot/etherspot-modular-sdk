import { BigNumber } from '../types/bignumber.cjs';

interface GenerateSessionKeyResponse {
    sessionKey: string;
    enableSessionKeyData: string;
    oldSessionKey?: string;
}
interface GetSessionKeyResponse {
    sessionKey: string;
}
interface DeleteSessionKeyResponse {
    account: string;
    chainId: number;
    message: string;
}
interface SessionKeyResponse {
    userOpHash: string;
    sessionKey: string;
}
interface GetNonceResponse {
    nonce: number;
}
interface SessionData {
    token: string;
    funcSelector: string;
    spendingLimit: BigNumber;
    validAfter: number;
    validUntil: number;
    live: boolean;
}

export type { DeleteSessionKeyResponse, GenerateSessionKeyResponse, GetNonceResponse, GetSessionKeyResponse, SessionData, SessionKeyResponse };
