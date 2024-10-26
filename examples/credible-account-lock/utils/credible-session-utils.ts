import { TokenData, SessionData } from "./credible-session-types";
import { ethers } from "ethers";
import * as CredibleAccountModuleABI from '../../../src/sdk/abi/CredibleAccountModule.json';

const abi = [
    "function sessionData(address, address) view returns (tuple(address sessionKey, uint48 validAfter, uint48 validUntil))"
];

export function validateTokenData(tokenData: TokenData[]): void {
    const tokenSet = new Set<string>();
    for (const token of tokenData) {
        if (tokenSet.has(token.token)) {
            throw new Error(`Duplicate token address found: ${token.token}`);
        }
        if (token.amount <= BigInt(0)) {
            throw new Error(`Token amount must be greater than zero for token: ${token.token}`);
        }
        tokenSet.add(token.token);
    }
}

export function validateSessionData(sessionData: SessionData): void {
    const currentTime = Math.floor(Date.now() / 1000); // Get the current time in epoch seconds

    if (!sessionData.sessionKey) {
        throw new Error("Session key is required");
    }
    if (sessionData.validAfter < currentTime) {
        throw new Error("ValidAfter timestamp must be greater than or equal to the current time");
    }
    if (sessionData.validUntil <= currentTime) {
        throw new Error("ValidUntil timestamp must be greater than the current time");
    }
    if (sessionData.validUntil <= sessionData.validAfter) {
        throw new Error("ValidUntil timestamp must be greater than ValidAfter");
    }
    validateTokenData(sessionData.tokenData);
}


export function generateEnableSessionKeyCalldata(sessionData: SessionData): string {
    // Validate the session data
    validateSessionData(sessionData);

    // Encode the session data
    const encodedSessionData = ethers.utils.defaultAbiCoder.encode(
        ["address", "uint48", "uint48", "tuple(address,uint256)[]"],
        [
            sessionData.sessionKey,
            sessionData.validAfter,
            sessionData.validUntil,
            sessionData.tokenData.map(token => [token.token, token.amount])
        ]
    );

    // Create an Interface instance
    const credibleAccountModuleInterface = new ethers.utils.Interface(CredibleAccountModuleABI.abi);

    // Encode the function call data with the function selector and the encoded session data
    const enableSessionKeyCallData = credibleAccountModuleInterface.encodeFunctionData("enableSessionKey", [encodedSessionData]);

    return enableSessionKeyCallData;
}

export async function sessionKeyExists(credibleAccountModuleAddress: string, sessionKey: string, walletAddress: string, provider: ethers.providers.Provider): Promise<boolean> {
    // const sessionData = await getSessionData(sessionKey, walletAddress, provider);
    // return sessionData.sessionKey === sessionKey;

    const sessionKeys = await getSessionKeysByWalletAddress(credibleAccountModuleAddress, walletAddress, provider);
    console.log("sessionKeys:", sessionKeys);
    return sessionKeys.includes(sessionKey);
}

export async function getSessionKeysByWalletAddress(credibleAccountModuleAddress: string, walletAddress: string, provider: ethers.providers.Provider): Promise<string[]> {
    const credibleAccountModuleInstance = new ethers.Contract(credibleAccountModuleAddress, CredibleAccountModuleABI.abi, provider);
    const sessionKeys = await credibleAccountModuleInstance.getSessionKeysByWallet(walletAddress);
    return sessionKeys;
}

export async function getSessionData(credibleAccountModuleAddress: string, sessionKey: string, walletAddress: string, provider: ethers.providers.Provider): Promise<SessionData> {
    const credibleAccountModuleInstance = new ethers.Contract(credibleAccountModuleAddress, CredibleAccountModuleABI.abi, provider);
    console.log("getSessionData -> Session Key:", sessionKey);
    console.log("getSessionData -> Wallet Address:", walletAddress);
    const sessionData = await credibleAccountModuleInstance.sessionData(sessionKey, walletAddress);
    return sessionData;
}