import axios from 'axios';

export type SessionData = {
    sessionKey: string;
    validAfter: number;
    validUntil: number;
    live: boolean;
};

export type LockedToken = {
    token: string;
    locked_amount: string;
    claimed_amount: string;
};

export type SessionDetails = {
    sessionData: SessionData;
    lockedTokens: LockedToken[];
};

export async function getAllSessionKeysOfWallet(
    chainId: number | string,
    walletAddress: string
): Promise<SessionDetails[]> {
    const url = `https://pulse-dss-qa.etherspot.io/pulse/credible-account/session-details-wallet/chainId/${chainId}/walletAddress/${walletAddress}`;
    const res = await axios.get<SessionDetails[]>(url);
    return res.data;
}

export async function getSessionDetailsByWalletAddressAndSessionKey(
    chainId: number | string,
    walletAddress: string,
    sessionKey: string
): Promise<SessionDetails> {
    const allSessionKeyDetails = await getAllSessionKeysOfWallet(chainId, walletAddress);

    const sessionDetails = allSessionKeyDetails.find(
        (details) => details.sessionData.sessionKey === sessionKey
    );

    return sessionDetails as SessionDetails;
}

export const bigintReplacer = (key: string, value: any) => {
    return typeof value === 'bigint' ? value.toString() : value;
}

// tsx examples/resource-lock/get-session-key-details.ts
(async () => {
    const chainId = 10;
    const walletAddress = '0x23F04522a2ec5a8b188C48c18edAE54005b537a3';
    const details = await getAllSessionKeysOfWallet(chainId, walletAddress);
    console.log(`details for wallet ${walletAddress} on chain ${chainId} are: ${JSON.stringify(details, bigintReplacer, 2)}`);
})();