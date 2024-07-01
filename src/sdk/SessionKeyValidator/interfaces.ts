export interface GenerateSessionKeyResponse {
    sessionKey: string;
    enableSessionKeyData: string;
    oldSessionKey?: string;
}

export interface EnableSessionKeyResponse {
    userOpHash: string;
    sessionKey: string;
}