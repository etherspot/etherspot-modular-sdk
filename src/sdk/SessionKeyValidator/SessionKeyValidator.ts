import { Contract, ethers, providers } from "ethers";
import { ModularSdk } from "../sdk";
import { KeyStore, PERMISSIONS_URL } from "./constants";
import { SessionKeyResponse, GenerateSessionKeyResponse, GetSessionKeyResponse, DeleteSessionKeyResponse, SessionData } from "./interfaces";
import { BundlerProvider } from "../bundler";
import { DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS, Networks } from "../network/constants";
import { MODULE_TYPE, UserOperation, deepHexlify } from "../common";
import { resolveProperties } from "ethers/lib/utils";
import * as ERC20SessionKeyValidatorABI from "../abi/ERC20SessionKeyValidator.json";
import { ERC20_ABI } from "../helpers/abi/ERC20_ABI";

export class SessionKeyValidator {
    private modularSdk: ModularSdk;
    private provider: providers.JsonRpcProvider;
    private erc20SessionKeyValidator?: string;
    private chainId?: number;

    private constructor(modularSdk: ModularSdk, provider: BundlerProvider) {
        this.modularSdk = modularSdk;
        this.provider = new providers.JsonRpcProvider(provider.url);
    }

    static async create(modularSdk: ModularSdk, provider: BundlerProvider) {
        const sessionKeyValidator = new SessionKeyValidator(modularSdk, provider);
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
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            if(this.erc20SessionKeyValidator == null) {
                throw new Error('ERC20SessionKeyValidator contract address is required');
            }

            if(account == null) {
                throw new Error('Account is required');
            }

            if(apiKey == null) {
                throw new Error('API Key is required');
            }

            if(!token || token == null || token == '') {
                throw new Error('Token is required');
            } 

            if(!functionSelector || functionSelector == null || functionSelector == '') {
                throw new Error('Function Selector is required');
            }

            const isValidTokenIndicator = await this.isValidToken(token);

            if (!isValidTokenIndicator) {
                throw new Error(`Token: ${token} is does not exist or is invalid`);
            }

            const data = await this.generateSessionKeyData(
                account,
                this.chainId,
                token,
                functionSelector,
                spendingLimit,
                validAfter,
                validUntil,
                apiKey,
                false,
                keyStore ? keyStore : null,
            )

            // Convert the imported ABI object to an array if necessary
            //const parsedABI = Array.isArray(ERC20SessionKeyValidatorABI) ? ERC20SessionKeyValidatorABI : Object.values(ERC20SessionKeyValidatorABI);

            //console.log(`abis is: ${JSON.stringify(parsedABI)}`);

            if (!Array.isArray(ERC20SessionKeyValidatorABI.abi)) {
                throw new Error("ABI should be an array of JSON objects");
            }

            const erc20SessionKeyValidatorContract = new Contract(this.erc20SessionKeyValidator, ERC20SessionKeyValidatorABI.abi, this.provider);
            const enableSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('enableSessionKey', [data.enableSessionKeyData]);

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: this.erc20SessionKeyValidator, data: enableSessionKeyData });

            try {
                const op = await this.modularSdk.estimate();

                const uoHash = await this.modularSdk.send(op);

                if (!uoHash) await this.deleteSessionKey(account, this.chainId, apiKey, data.sessionKey);

                return {
                    userOpHash: uoHash,
                    sessionKey: data.sessionKey,
                }
            } catch (error) {
                await this.deleteSessionKey(account, this.chainId, apiKey, data.sessionKey);
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
        validAfter: number,
        validUntil: number,
        oldSessionKey: string,
        keyStore?: KeyStore,
    ): Promise<SessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const isValidTokenIndicator = await this.isValidToken(token);

            if (!isValidTokenIndicator) {
                throw new Error(`Token: ${token} is does not exist or is invalid`);
            }

            const data = await this.generateSessionKeyData(
                account,
                this.chainId,
                token,
                functionSelector,
                spendingLimit,
                validAfter,
                validUntil,
                apiKey,
                true,
                keyStore ? keyStore : null,
                oldSessionKey,
            )

            const erc20SessionKeyValidatorContract = new Contract(this.erc20SessionKeyValidator, ERC20SessionKeyValidatorABI.abi, this.provider);

            const rotateSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('rotateSessionKey',
                [data.oldSessionKey, data.enableSessionKeyData]
            );

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: this.erc20SessionKeyValidator, data: rotateSessionKeyData });

            try {
                const op = await this.modularSdk.estimate();

                const uoHash = await this.modularSdk.send(op);

                if (uoHash) {
                    await this.deleteSessionKey(account, this.chainId, apiKey, data.oldSessionKey);
                }
                else {
                    await this.deleteSessionKey(account, this.chainId, apiKey, data.sessionKey);
                }

                return {
                    userOpHash: uoHash,
                    sessionKey: data.sessionKey,
                }
            } catch (error) {
                await this.deleteSessionKey(account, this.chainId, apiKey, data.sessionKey);
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async disableSessionKey(sessionKey: string): Promise<SessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const getSessionKeyData = await this.getSessionKey(
                account,
                this.chainId,
                apiKey,
                sessionKey,
            )

            const erc20SessionKeyValidatorContract = new Contract(this.erc20SessionKeyValidator, ERC20SessionKeyValidatorABI.abi, this.provider);

            const disableSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('disableSessionKey',
                [getSessionKeyData.sessionKey]
            );

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: this.erc20SessionKeyValidator, data: disableSessionKeyData });

            const op = await this.modularSdk.estimate();

            const uoHash = await this.modularSdk.send(op);

            if (uoHash) {
                await this.deleteSessionKey(account, this.chainId, apiKey, sessionKey);
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
            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            const data: UserOperation = await this.getSignUserOp(
                account,
                this.chainId,
                apiKey,
                sessionKey,
                userOp,
            )

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getAssociatedSessionKeys(): Promise<string[]> {
        const account = await this.modularSdk.getCounterFactualAddress();

        const erc20SessionKeyValidatorContract = new Contract(this.erc20SessionKeyValidator, ERC20SessionKeyValidatorABI.abi, this.provider);

        return await erc20SessionKeyValidatorContract.callStatic.getAssociatedSessionKeys({ from: account });
    }

    async sessionData(sessionKey: string): Promise<SessionData> {
        const account = await this.modularSdk.getCounterFactualAddress();

        const erc20SessionKeyValidatorContract = new Contract(this.erc20SessionKeyValidator, ERC20SessionKeyValidatorABI.abi, this.provider);

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

        await this.getChainId();
        this.erc20SessionKeyValidator = Networks[this.chainId]?.contracts?.erc20SessionKeyValidator || DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS;

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
        validAfter: number,
        validUntil: number,
        apiKey: string,
        rotateKey: boolean,
        keyStore: KeyStore,
        oldSessionKey?: string,
    ): Promise<GenerateSessionKeyResponse> {
        let response = null;
        try {
            if(!apiKey || apiKey == null) {
                throw new Error('API Key is required');
            }

            const url = `${PERMISSIONS_URL}/account/generateSessionKeyData?apiKey=${apiKey}`;

            if(account == null) {
                throw new Error('Account is required');
            }

            
            const now = Math.floor(Date.now() / 1000);

            if(validAfter < now + 29) {
                throw new Error('validAfter must be greater than current time by at least 30 seconds');
            }

            if(validUntil == 0 || validUntil < validAfter || validUntil < now) {
                throw new Error('validUntil must be greater than validAfter and current time');
            }

            if(!token || token == null || token == '') {
                throw new Error('Token is required');
            } 

            if(!functionSelector || functionSelector == null || functionSelector == '') {
                throw new Error('Function Selector is required');
            }

            if(!spendingLimit || spendingLimit == null || spendingLimit == '') {
                throw new Error('Spending Limit is required');
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

    async isValidToken(token: string): Promise<boolean> {

        const erc20 = new Contract(token, ERC20_ABI, this.provider);
        const decimals = await erc20.decimals();
        if (!decimals || decimals == null || decimals as number == 0) {
            return false;
        }
        return true;
    }
}
