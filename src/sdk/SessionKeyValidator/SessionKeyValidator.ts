import { ModularSdk } from "../sdk.js";
import { KeyStore, PERMISSIONS_URL } from "./constants.js";
import { SessionKeyResponse, GenerateSessionKeyResponse, GetNonceResponse, GetSessionKeyResponse, DeleteSessionKeyResponse, SessionData } from "./interfaces.js";
import { DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS, Networks } from "../network/constants.js";
import { encodeFunctionData, Hex, parseAbi, PublicClient } from "viem";
import { erc20Abi, sessionKeyValidatorAbi } from "../common/abis.js";
import { MODULE_TYPE, deepHexlify, resolveProperties, UserOperation } from "../common/index.js";
import { ErrorHandler } from '../errorHandler/errorHandler.service.js';


export class SessionKeyValidator {
    private modularSdk: ModularSdk;
    private providerURL: string;
    private erc20SessionKeyValidator?: string;
    private chainId?: number;
    private publicClient: PublicClient;

    private constructor(modularSdk: ModularSdk) {
        this.modularSdk = modularSdk;
        this.publicClient = modularSdk.getPublicClient();
        this.providerURL = modularSdk.getProviderUrl();
    }

    static async create(modularSdk: ModularSdk) {
        const sessionKeyValidator = new SessionKeyValidator(modularSdk);
        await sessionKeyValidator.initialize(modularSdk);
        return sessionKeyValidator;
    }

    private async initialize(modularSdk: ModularSdk): Promise<void> {
        const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
        const installed = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, erc20SessionKeyValidator);
        if(!installed) {
            throw new Error(`Module: ${erc20SessionKeyValidator} not installed, cannot initialize session key validator`);
        }
    }

    /**
     * Enable a session key for the specified token and function.
     * @param token Token address
     * @param functionSelector Function selector
     * @param spendingLimit Spending limit
     * @param validAfter Valid after timestamp
     * @param validUntil Valid until timestamp
     * @param keyStore Optional key store
     * @returns Session key response
     */
    async enableSessionKey(
        token: string,
        functionSelector: string,
        spendingLimit: string,
        validAfter: number,
        validUntil: number,
        keyStore?: KeyStore,
    ): Promise<SessionKeyResponse> {
        try {
            const etherspotWalletAddress = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidatorAddress = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            if (erc20SessionKeyValidatorAddress == null) {
                throw new ErrorHandler('ERC20SessionKeyValidator contract address is required', 1);
            }

            if (etherspotWalletAddress == null) {
                throw new ErrorHandler('Etherspot wallet address is required', 1);
            }

            if (apiKey == null) {
                throw new ErrorHandler('API Key is required', 1);
            }

            if (!token || token == null || token == '') {
                throw new ErrorHandler('Token is required', 1);
            }

            if (!functionSelector || functionSelector == null || functionSelector == '') {
                throw new ErrorHandler('Function Selector is required', 1);
            }

            const isAValidTokenIndicator = await this.isAValidToken(token);

            if (!isAValidTokenIndicator) {
                throw new ErrorHandler(`Token: ${token} does not exist or is invalid`, 1);
            }

            const data = await this.generateSessionKeyData(
                etherspotWalletAddress,
                chainId,
                token,
                functionSelector,
                spendingLimit,
                validAfter,
                validUntil,
                apiKey,
                false,
                keyStore || null,
            );

            const enableSessionKeyData = encodeFunctionData({
                functionName: 'enableSessionKey',
                abi: parseAbi(sessionKeyValidatorAbi),
                args: [data.enableSessionKeyData],
            });

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidatorAddress, data: enableSessionKeyData });

            try {
                const op = await this.modularSdk.estimate();
                const uoHash = await this.modularSdk.send(op)
                if (!uoHash) await this.deleteSessionKey(etherspotWalletAddress, chainId, apiKey, data.sessionKey);

                return {
                    userOpHash: uoHash,
                    sessionKey: data.sessionKey,
                }
            } catch (error) {
                await this.deleteSessionKey(etherspotWalletAddress, chainId, apiKey, data.sessionKey);
                throw error;
            }
        } catch (err) {
            if (err instanceof ErrorHandler) {
                throw err;
            }
            throw new ErrorHandler(`Failed to enable session key: ${err instanceof Error ? err.message : String(err)}`, 1);
        }
    }

    /**
     * Disable a session key.
     * @param sessionKey Session key to disable
     * @returns Session key response
     */
    async disableSessionKey(sessionKey: string): Promise<SessionKeyResponse> {
        try {
            const etherspotWalletAddress = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidatorAddress = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            if (erc20SessionKeyValidatorAddress == null) {
                throw new ErrorHandler('ERC20SessionKeyValidator contract address is required', 1);
            }

            if (etherspotWalletAddress == null) {
                throw new ErrorHandler('Etherspot wallet address is required', 1);
            }

            if (apiKey == null) {
                throw new ErrorHandler('API Key is required', 1);
            }

            if (!sessionKey || sessionKey == null || sessionKey == '') {
                throw new ErrorHandler('Session Key is required', 1);
            }

            const data = await this.generateSessionKeyData(
                etherspotWalletAddress,
                chainId,
                '', // token
                '', // functionSelector
                '', // spendingLimit
                0, // validAfter
                0, // validUntil
                apiKey,
                false,
                null, // keyStore
                sessionKey,
            );

            return data;
        } catch (err) {
            if (err instanceof ErrorHandler) {
                throw err;
            }
            throw new ErrorHandler(`Failed to disable session key: ${err instanceof Error ? err.message : String(err)}`, 1);
        }
    }

    /**
     * Rotate a session key.
     * @param oldSessionKey Old session key
     * @param token Token address
     * @param functionSelector Function selector
     * @param spendingLimit Spending limit
     * @param validAfter Valid after timestamp
     * @param validUntil Valid until timestamp
     * @param keyStore Optional key store
     * @returns Session key response
     */
    async rotateSessionKey(
        oldSessionKey: string,
        token: string,
        functionSelector: string,
        spendingLimit: string,
        validAfter: number,
        validUntil: number,
        keyStore?: KeyStore,
    ): Promise<SessionKeyResponse> {
        try {
            const etherspotWalletAddress = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidatorAddress = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            if (erc20SessionKeyValidatorAddress == null) {
                throw new ErrorHandler('ERC20SessionKeyValidator contract address is required', 1);
            }

            if (etherspotWalletAddress == null) {
                throw new ErrorHandler('Etherspot wallet address is required', 1);
            }

            if (apiKey == null) {
                throw new ErrorHandler('API Key is required', 1);
            }

            if (!oldSessionKey || oldSessionKey == null || oldSessionKey == '') {
                throw new ErrorHandler('Old Session Key is required', 1);
            }

            if (!token || token == null || token == '') {
                throw new ErrorHandler('Token is required', 1);
            }

            if (!functionSelector || functionSelector == null || functionSelector == '') {
                throw new ErrorHandler('Function Selector is required', 1);
            }

            const isAValidTokenIndicator = await this.isAValidToken(token);

            if (!isAValidTokenIndicator) {
                throw new ErrorHandler(`Token: ${token} does not exist or is invalid`, 1);
            }

            const data = await this.generateSessionKeyData(
                etherspotWalletAddress,
                chainId,
                token,
                functionSelector,
                spendingLimit,
                validAfter,
                validUntil,
                apiKey,
                true,
                keyStore || null,
                oldSessionKey,
            );

            return data;
        } catch (err) {
            if (err instanceof ErrorHandler) {
                throw err;
            }
            throw new ErrorHandler(`Failed to rotate session key: ${err instanceof Error ? err.message : String(err)}`, 1);
        }
    }

    async getNonce(sessionKey: string): Promise<GetNonceResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data = await this.getNonceData(
                account,
                chainId,
                apiKey,
                sessionKey
            )

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getAssociatedSessionKeys(): Promise<string[]> {
        const account = await this.modularSdk.getCounterFactualAddress();

        const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();

        const response = await this.publicClient.simulateContract({
            account: account as Hex,
            address: erc20SessionKeyValidator as Hex,
            abi: parseAbi(sessionKeyValidatorAbi),
            functionName: 'getAssociatedSessionKeys',
            args: []
        });

        return response.result as string[];
    }

    async sessionData(sessionKey: string): Promise<SessionData> {
        const account = await this.modularSdk.getCounterFactualAddress();

        const erc20SessionKeyValidatorAddress = await this.getERC20SessionKeyValidator();

        const data = await this.publicClient.simulateContract({
            account: account as Hex,
            address: erc20SessionKeyValidatorAddress as Hex,
            abi: parseAbi(sessionKeyValidatorAbi),
            functionName: 'sessionData',
            args: [sessionKey, account]
        });

        if(!data.result  || data.result == null) {
            throw new Error('Session data not found');
        }

        const { token, funcSelector, spendingLimit, validAfter, validUntil, live } = data.result;

        return {
            token,
            funcSelector,
            spendingLimit,
            validAfter,
            validUntil,
            live
        }
    }

    private async getERC20SessionKeyValidator(): Promise<string> {
        if (this.erc20SessionKeyValidator) {
            return this.erc20SessionKeyValidator;
        }

        const chainId = await this.getChainId();
        this.erc20SessionKeyValidator = Networks[chainId]?.contracts?.erc20SessionKeyValidator || DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS;

        return this.erc20SessionKeyValidator;
    }

    private async getChainId(): Promise<number> {
        if (!this.chainId) {
            this.chainId = this.publicClient.chain.id;
        }
        return this.chainId;
    }

    private async generateSessionKeyData(
        account: string,
        chainId: number,
        token: string,
        functionSelector: string,
        spendingLimit: string,
        validAfter: number,
        validUntil: number,
        apiKey: string,
        rotateKey: boolean,
        keyStore: KeyStore,
        oldSessionKey?: string,
    ): Promise<GenerateSessionKeyResponse> {
        let response = null;
        try {
            if (!apiKey || apiKey == null) {
                throw new ErrorHandler('API Key is required', 1);
            }

            const url = `${PERMISSIONS_URL}/account/generateSessionKeyData?apiKey=${apiKey}`;

            if (account == null) {
                throw new ErrorHandler('Account is required', 1);
            }


            const now = Math.floor(Date.now() / 1000);

            if (validAfter < now + 29) {
                throw new ErrorHandler('validAfter must be greater than current time by at least 30 seconds', 1);
            }

            if (validUntil == 0 || validUntil < validAfter || validUntil < now) {
                throw new ErrorHandler('validUntil must be greater than validAfter and current time', 1);
            }

            if (!token || token == null || token == '') {
                throw new ErrorHandler('Token is required', 1);
            }

            if (!functionSelector || functionSelector == null || functionSelector == '') {
                throw new ErrorHandler('Function Selector is required', 1);
            }

            if (!spendingLimit || spendingLimit == null || spendingLimit == '') {
                throw new ErrorHandler('Spending Limit is required', 1);
            }

            const requestBody = {
                account,
                chainId,
                rotateKey,
                keyStore,
                token,
                functionSelector,
                spendingLimit,
                validAfter,
                validUntil,
                oldSessionKey,
            };

            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.status === 200) {
                const responseJson: GenerateSessionKeyResponse = await response.json();
                return responseJson
            } else {
                const responseJson = await response.json();
                throw new ErrorHandler(responseJson.message, 1);
            }
        } catch (err) {
            throw new ErrorHandler(err.message, 1);
        }
    }

    private async getSessionKey(
        account: string,
        chainId: number,
        apiKey: string,
        sessionKey: string,
    ): Promise<GetSessionKeyResponse> {
        let response = null;

        try {
            let url = `${PERMISSIONS_URL}/account/getSessionKey?account=${account}&chainId=${chainId}&sessionKey=${sessionKey}`;
            if (apiKey) url += `&apiKey=${apiKey}`;

            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const responseJson: GetSessionKeyResponse = await response.json();
                return responseJson
            } else {
                const responseJson = await response.json();
                throw new ErrorHandler(responseJson.message, 1);
            }
        } catch (err) {
            throw new ErrorHandler(err.message, 1);
        }
    }

    private async deleteSessionKey(
        account: string,
        chainId: number,
        apiKey: string,
        sessionKey: string,
    ): Promise<DeleteSessionKeyResponse> {
        let response = null;
        try {
            let url = `${PERMISSIONS_URL}/account/deleteSessionKey?account=${account}&chainId=${chainId}&sessionKey=${sessionKey}`;
            if (apiKey) url += `&apiKey=${apiKey}`;

            response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const responseJson: DeleteSessionKeyResponse = await response.json();
                return responseJson
            } else {
                const responseJson = await response.json();
                throw new ErrorHandler(responseJson.message, 1);
            }
        } catch (err) {
            throw new ErrorHandler(err.message, 1);
        }
    }

    private async getSignUserOp(
        account: string,
        chainId: number,
        apiKey: string,
        sessionKey: string,
        userOp: UserOperation,
    ): Promise<UserOperation> {
        let response = null;

        try {
            let url = `${PERMISSIONS_URL}/account/signUserOp?account=${account}&chainId=${chainId}&sessionKey=${sessionKey}`;
            if (apiKey) url += `&apiKey=${apiKey}`;

            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deepHexlify(await resolveProperties(userOp))),
            });

            if (response.status === 200) {
                const responseJson = await response.json();
                return responseJson
            } else {
                const responseJson = await response.json();
                throw new ErrorHandler(responseJson.message, 1);
            }
        } catch (err) {
            throw new ErrorHandler(err.message, 1);
        }
    }

    private async getNonceData(
        account: string,
        chainId: number,
        apiKey: string,
        sessionKey: string,
    ): Promise<GetNonceResponse> {
        let response = null;

        try {
            let url = `${PERMISSIONS_URL}/account/getNonce?account=${account}&chainId=${chainId}&sessionKey=${sessionKey}`;
            if (apiKey) url += `&apiKey=${apiKey}`;

            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const responseJson: GetNonceResponse = await response.json();
                return responseJson
            } else {
                const responseJson = await response.json();
                throw new ErrorHandler(responseJson.message, 1);
            }
        } catch (err) {
            throw new ErrorHandler(err.message, 1);
        }
    }

    async signUserOpWithSessionKey(sessionKey: string, userOp: UserOperation): Promise<UserOperation> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data: UserOperation = await this.getSignUserOp(
                account,
                chainId,
                apiKey,
                sessionKey,
                userOp,
            )

            return data;
        } catch (error) {
            throw error;
        }
    }

    async isAValidToken(token: string): Promise<boolean> {

        let decimals = null;

        try {
            decimals = await this.publicClient.readContract({
                address: token as Hex,
                abi: parseAbi(erc20Abi),
                functionName: 'decimals',
                args: []
            });
        } catch (error) {
            console.error(`Token: ${token} is does not exist or is invalid`);
            return false;
        }

        if (!decimals || decimals == null || decimals as number == 0) {
            return false;
        }

        return true;
    }
}
