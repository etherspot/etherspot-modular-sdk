import { ModularSdk } from "../sdk";
import { KeyStore, PERMISSIONS_URL } from "./constants";
import { SessionKeyResponse, GenerateSessionKeyResponse, GetNonceResponse, GetSessionKeyResponse, DeleteSessionKeyResponse } from "./interfaces";
import { DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS, Networks } from "../network/constants";
import { encodeFunctionData, Hex, parseAbi, PublicClient, SimulateContractReturnType, WalletClient } from "viem";
import { sessionKeyValidatorAbi } from "../common/abis";
import { BigNumber } from "../types/bignumber";

export class SessionKeyValidator {
    private modularSdk: ModularSdk;
    private providerURL: string;
    private erc20SessionKeyValidator?: string;
    private chainId?: number;
    private walletClient: WalletClient;
    private publicClient: PublicClient;

    constructor(modularSdk: ModularSdk) {
        this.modularSdk = modularSdk;
        this.walletClient = modularSdk.getWalletClient();
        this.publicClient = modularSdk.getPublicClient();
        this.providerURL = modularSdk.getProviderUrl();
    }

    async enableSessionKey(
        token: string,
        functionSelector: string,
        spendingLimit: string,
        validAfter: number,
        validUntil: number,
        keyStore?: KeyStore,
    ): Promise<SessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data = await this.generateSessionKeyData(
                account,
                chainId,
                token,
                functionSelector,
                spendingLimit,
                validAfter,
                validUntil,
                apiKey,
                false,
                keyStore ? keyStore : null,
            )

            // const erc20SessionKeyValidatorContract = ERC20SessionKeyValidator__factory.connect(
            //     erc20SessionKeyValidator,
            //     this.provider
            // );

            const enableSessionKeyData = encodeFunctionData({
                functionName: 'enableSessionKey',
                abi: parseAbi(sessionKeyValidatorAbi),
                args: [data.enableSessionKeyData],
            });

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidator, data: enableSessionKeyData });

            const op = await this.modularSdk.estimate({
                key: BigNumber.from(erc20SessionKeyValidator)
            });

            const uoHash = await this.modularSdk.send(op)

            return {
                userOpHash: uoHash,
                sessionKey: data.sessionKey,
            }
        } catch (error) {
            throw error;
        }
    }

    async rotateSessionKey(
        token: string,
        functionSelector: string,
        spendingLimit: string,
        validAfter: number,
        validUntil: number,
        keyStore?: KeyStore,
    ): Promise<SessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data = await this.generateSessionKeyData(
                account,
                chainId,
                token,
                functionSelector,
                spendingLimit,
                validAfter,
                validUntil,
                apiKey,
                true,
                keyStore ? keyStore : null,
            )

            // const rotateSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('rotateSessionKey',
            //     [data.oldSessionKey, data.enableSessionKeyData]
            // );

            const rotateSessionKeyData = encodeFunctionData({
                functionName: 'rotateSessionKey',
                abi: parseAbi(sessionKeyValidatorAbi),
                args: [data.oldSessionKey, data.enableSessionKeyData],
            });

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidator, data: rotateSessionKeyData });

            const op = await this.modularSdk.estimate({
                key: BigNumber.from(erc20SessionKeyValidator)
            });

            const uoHash = await this.modularSdk.send(op);

            return {
                userOpHash: uoHash,
                sessionKey: data.sessionKey,
            }
        } catch (error) {
            throw error;
        }
    }

    async disableSessionKey(): Promise<SessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const getSessionKeyData = await this.getSessionKey(
                account,
                chainId,
                apiKey,
            )

            // const disableSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('disableSessionKey',
            //     [getSessionKeyData.sessionKey]
            // );

            const disableSessionKeyData = encodeFunctionData({
                functionName: 'disableSessionKey',
                abi: parseAbi(sessionKeyValidatorAbi),
                args: [getSessionKeyData.sessionKey],
            });

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidator, data: disableSessionKeyData });

            const op = await this.modularSdk.estimate({
                key: BigNumber.from(erc20SessionKeyValidator)
            });

            const uoHash = await this.modularSdk.send(op);

            if (uoHash) {
                await this.deleteSessionKey(account, chainId, apiKey);
            }

            return {
                userOpHash: uoHash,
                sessionKey: getSessionKeyData.sessionKey,
            }
        } catch (error) {
            throw error;
        }
    }

    async getNonce(): Promise<GetNonceResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data = await this.getNonceData(
                account,
                chainId,
                apiKey,
            )

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getAssociatedSessionKeys(): Promise<string[]> {
        const account = await this.modularSdk.getCounterFactualAddress();

        const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();

        //return await erc20SessionKeyValidatorContract.callStatic.getAssociatedSessionKeys({ from: account });

        const response : SimulateContractReturnType = await this.publicClient.simulateContract({
            account: account as Hex,
            address: erc20SessionKeyValidator as Hex,
            abi: parseAbi(sessionKeyValidatorAbi),
            functionName: 'getAssociatedSessionKeys',
            args: []
        });

        return response.result as string[];
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
                validAfter,
                validUntil,
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
    ): Promise<GetSessionKeyResponse> {
        let response = null;

        try {
            let url = `${PERMISSIONS_URL}/account/getSessionKey?account=${account}&chainId=${chainId}`;
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
    ): Promise<DeleteSessionKeyResponse> {
        let response = null;
        try {
            let url = `${PERMISSIONS_URL}/account/deleteSessionKey?account=${account}&chainId=${chainId}`;
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

    private async getNonceData(
        account: string,
        chainId: number,
        apiKey: string,
    ): Promise<GetNonceResponse> {
        let response = null;

        try {
            let url = `${PERMISSIONS_URL}/account/getNonce?account=${account}&chainId=${chainId}`;
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
