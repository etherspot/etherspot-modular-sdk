export interface TokenData {
    token: string; // The address of the token
    amount: bigint; // The amount of the token
}

export interface SessionData {
    sessionKey: string; // The address of the session key
    validAfter: number; // The timestamp after which the session key is valid
    validUntil: number; // The timestamp until which the session key is valid
    live: boolean; // Flag indicating whether the session key is active or paused
    tokenData: TokenData[]; // Array of TokenData items
}