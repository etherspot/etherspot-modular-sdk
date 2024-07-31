import { ERC20SessionKeyValidator__factory } from "../contracts/factories/src/ERC7579/modules/validator";
import { providers } from "ethers";
import { ModularSdk } from "../sdk";
import { KeyStore, PERMISSIONS_URL } from "./constants";
import { SessionKeyResponse, GenerateSessionKeyResponse, GetNonceResponse, GetSessionKeyResponse, DeleteSessionKeyResponse, SessionData } from "./interfaces";
import { BundlerProvider } from "../bundler";
import { DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS, Networks } from "../network/constants";
import { UserOperation, deepHexlify } from "../common";
import { resolveProperties } from "ethers/lib/utils";

export class SessionKeyValidator {
    private modularSdk: ModularSdk;
    private provider: providers.JsonRpcProvider;
    private erc20SessionKeyValidator?: string;
    private chainId?: number;

    constructor(modularSdk: ModularSdk, provider: BundlerProvider) {
        this.modularSdk = modularSdk;
        this.provider = new providers.JsonRpcProvider(provider.url);
    }

    async enableSessionKey(
        token: string,
        functionSelector: string,
        spendingLimit: string,
        validUntil: number,
        keyStore?: KeyStore,
    ): Promise<SessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data = await this.generateSessionKeyData(
                account,
                chainId,
                token,
                functionSelector,
                spendingLimit,
                validUntil,
                apiKey,
                false,
                keyStore ? keyStore : null,
            )

            const erc20SessionKeyValidatorContract = ERC20SessionKeyValidator__factory.connect(
                erc20SessionKeyValidator,
                this.provider
            );

            const enableSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('enableSessionKey', [data.enableSessionKeyData]);

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidator, data: enableSessionKeyData });

            try {
                const op = await this.modularSdk.estimate();

                const uoHash = await this.modularSdk.send(op);

                if (!uoHash) await this.deleteSessionKey(account, chainId, apiKey, data.sessionKey);

                return {
                    userOpHash: uoHash,
                    sessionKey: data.sessionKey,
                }
            } catch (error) {
                await this.deleteSessionKey(account, chainId, apiKey, data.sessionKey);
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async rotateSessionKey(
        token: string,
        functionSelector: string,
        spendingLimit: string,
        validUntil: number,
        oldSessionKey: string,
        keyStore?: KeyStore,
    ): Promise<SessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data = await this.generateSessionKeyData(
                account,
                chainId,
                token,
                functionSelector,
                spendingLimit,
                validUntil,
                apiKey,
                true,
                keyStore ? keyStore : null,
                oldSessionKey,
            )

            const erc20SessionKeyValidatorContract = ERC20SessionKeyValidator__factory.connect(
                erc20SessionKeyValidator,
                this.provider
            );

            const rotateSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('rotateSessionKey',
                [data.oldSessionKey, data.enableSessionKeyData]
            );

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidator, data: rotateSessionKeyData });

            try {
                const op = await this.modularSdk.estimate();

                const uoHash = await this.modularSdk.send(op);

                if (uoHash) {
                    await this.deleteSessionKey(account, chainId, apiKey, data.oldSessionKey);
                }
                else {
                    await this.deleteSessionKey(account, chainId, apiKey, data.sessionKey);
                }

                return {
                    userOpHash: uoHash,
                    sessionKey: data.sessionKey,
                }
            } catch (error) {
                await this.deleteSessionKey(account, chainId, apiKey, data.sessionKey);
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async disableSessionKey(sessionKey: string): Promise<SessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const getSessionKeyData = await this.getSessionKey(
                account,
                chainId,
                apiKey,
                sessionKey,
            )

            const erc20SessionKeyValidatorContract = ERC20SessionKeyValidator__factory.connect(
                erc20SessionKeyValidator,
                this.provider
            );

            const disableSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('disableSessionKey',
                [getSessionKeyData.sessionKey]
            );

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidator, data: disableSessionKeyData });

            const op = await this.modularSdk.estimate();

            const uoHash = await this.modularSdk.send(op);

            if (uoHash) {
                await this.deleteSessionKey(account, chainId, apiKey, sessionKey);
            }

            return {
                userOpHash: uoHash,
                sessionKey: getSessionKeyData.sessionKey,
            }
        } catch (error) {
            throw error;
        }
    }

    async signUserOpWithSessionKey(sessionKey: string, userOp: UserOperation): Promise<UserOperation> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
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

    async getNonce(sessionKey: string): Promise<GetNonceResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data = await this.getNonceData(
                account,
                chainId,
                apiKey,
                sessionKey,
            )

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getAssociatedSessionKeys(): Promise<string[]> {
        const account = await this.modularSdk.getCounterFactualAddress();

        const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();

        const erc20SessionKeyValidatorContract = ERC20SessionKeyValidator__factory.connect(
            erc20SessionKeyValidator,
            this.provider
        );

        return await erc20SessionKeyValidatorContract.callStatic.getAssociatedSessionKeys({ from: account });
    }

    async sessionData(sessionKey: string): Promise<SessionData> {
        const account = await this.modularSdk.getCounterFactualAddress();

        const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();

        const erc20SessionKeyValidatorContract = ERC20SessionKeyValidator__factory.connect(
            erc20SessionKeyValidator,
            this.provider
        );

        const data = await erc20SessionKeyValidatorContract.callStatic.sessionData(sessionKey, account);

        const { token, funcSelector, spendingLimit, validAfter, validUntil, live } = data;

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
            this.chainId = (await this.provider.getNetwork()).chainId;
        }
        return this.chainId;
    }

    private async generateSessionKeyData(
        account: string,
        chainId: number,
        token: string,
        functionSelector: string,
        spendingLimit: string,
        validUntil: number,
        apiKey: string,
        rotateKey: boolean,
        keyStore: KeyStore,
        oldSessionKey?: string,
    ): Promise<GenerateSessionKeyResponse> {
        let response = null;
        try {
            let url = `${PERMISSIONS_URL}/account/generateSessionKeyData`;
            if (apiKey) url += `?apiKey=${apiKey}`;

            const requestBody = {
                account,
                chainId,
                rotateKey,
                keyStore,
                token,
                functionSelector,
                spendingLimit,
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
                throw new Error(responseJson.message)
            }
        } catch (err) {
            throw new Error(err.message)
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
                throw new Error(responseJson.message)
            }
        } catch (err) {
            throw new Error(err.message)
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
                throw new Error(responseJson.message)
            }
        } catch (err) {
            throw new Error(err.message)
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
                throw new Error(responseJson.message)
            }
        } catch (err) {
            throw new Error(err.message)
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
                throw new Error(responseJson.message)
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }
}
