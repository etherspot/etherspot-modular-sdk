import { ModularSdk } from "../sdk.js";
import { KeyStore } from "./constants.js";
import { SessionKeyResponse, GetNonceResponse, SessionData } from "./interfaces.js";
import { UserOperation } from "../common/index.js";
export declare class SessionKeyValidator {
    private modularSdk;
    private providerURL;
    private erc20SessionKeyValidator?;
    private chainId?;
    private publicClient;
    private constructor();
    static create(modularSdk: ModularSdk): Promise<SessionKeyValidator>;
    private initialize;
    enableSessionKey(token: string, functionSelector: string, spendingLimit: string, validAfter: number, validUntil: number, keyStore?: KeyStore): Promise<SessionKeyResponse>;
    rotateSessionKey(token: string, functionSelector: string, spendingLimit: string, validAfter: number, validUntil: number, oldSessionKey: string, keyStore?: KeyStore): Promise<SessionKeyResponse>;
    disableSessionKey(sessionKey: string): Promise<SessionKeyResponse>;
    getNonce(sessionKey: string): Promise<GetNonceResponse>;
    getAssociatedSessionKeys(): Promise<string[]>;
    sessionData(sessionKey: string): Promise<SessionData>;
    private getERC20SessionKeyValidator;
    private getChainId;
    private generateSessionKeyData;
    private getSessionKey;
    private deleteSessionKey;
    private getSignUserOp;
    private getNonceData;
    signUserOpWithSessionKey(sessionKey: string, userOp: UserOperation): Promise<UserOperation>;
    isAValidToken(token: string): Promise<boolean>;
}
//# sourceMappingURL=SessionKeyValidator.d.ts.map