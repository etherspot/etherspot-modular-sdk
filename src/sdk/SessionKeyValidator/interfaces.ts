export interface GenerateSessionKeyResponse {
    sessionKey: string;
    enableSessionKeyData: string;
    oldSessionKey?: string;
}

export interface GetSessionKeyResponse {
    sessionKey: string;
}

export interface DeleteSessionKeyResponse {
    account: string;
    chainId: number;
    message: string;
}

export interface SessionKeyResponse {
    userOpHash: string;
    sessionKey: string;
}

export interface GetNonceResponse {
    nonce: number;
}

export interface SignUserOpHashResponse {
    signature: string;
    sessionKey: string;
}