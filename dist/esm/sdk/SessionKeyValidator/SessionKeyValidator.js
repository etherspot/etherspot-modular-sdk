import { PERMISSIONS_URL } from "./constants.js";
import { DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS, Networks } from "../network/constants.js";
import { encodeFunctionData, parseAbi } from "viem";
import { erc20Abi, sessionKeyValidatorAbi } from "../common/abis.js";
import { MODULE_TYPE, deepHexlify, resolveProperties } from "../common/index.js";
export class SessionKeyValidator {
    constructor(modularSdk) {
        this.modularSdk = modularSdk;
        this.publicClient = modularSdk.getPublicClient();
        this.providerURL = modularSdk.getProviderUrl();
    }
    static async create(modularSdk) {
        const sessionKeyValidator = new SessionKeyValidator(modularSdk);
        await sessionKeyValidator.initialize(modularSdk);
        return sessionKeyValidator;
    }
    async initialize(modularSdk) {
        const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
        const installed = await modularSdk.isModuleInstalled(MODULE_TYPE.VALIDATOR, erc20SessionKeyValidator);
        if (!installed) {
            throw new Error(`Module: ${erc20SessionKeyValidator} not installed, cannot initialize session key validator`);
        }
    }
    async enableSessionKey(token, functionSelector, spendingLimit, validAfter, validUntil, keyStore) {
        try {
            const etherspotWalletAddress = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidatorAddress = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;
            if (erc20SessionKeyValidatorAddress == null) {
                throw new Error('ERC20SessionKeyValidator contract address is required');
            }
            if (etherspotWalletAddress == null) {
                throw new Error('etherspotWalletAddress is required');
            }
            if (apiKey == null) {
                throw new Error('API Key is required');
            }
            if (!token || token == null || token == '') {
                throw new Error('Token is required');
            }
            if (!functionSelector || functionSelector == null || functionSelector == '') {
                throw new Error('Function Selector is required');
            }
            const isAValidTokenIndicator = await this.isAValidToken(token);
            if (!isAValidTokenIndicator) {
                throw new Error(`Token: ${token} does not exist or is invalid`);
            }
            const data = await this.generateSessionKeyData(etherspotWalletAddress, chainId, token, functionSelector, spendingLimit, validAfter, validUntil, apiKey, false, keyStore ? keyStore : null);
            const enableSessionKeyData = encodeFunctionData({
                functionName: 'enableSessionKey',
                abi: parseAbi(sessionKeyValidatorAbi),
                args: [data.enableSessionKeyData],
            });
            this.modularSdk.clearUserOpsFromBatch();
            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidatorAddress, data: enableSessionKeyData });
            try {
                const op = await this.modularSdk.estimate();
                const uoHash = await this.modularSdk.send(op);
                if (!uoHash)
                    await this.deleteSessionKey(etherspotWalletAddress, chainId, apiKey, data.sessionKey);
                return {
                    userOpHash: uoHash,
                    sessionKey: data.sessionKey,
                };
            }
            catch (error) {
                await this.deleteSessionKey(etherspotWalletAddress, chainId, apiKey, data.sessionKey);
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async rotateSessionKey(token, functionSelector, spendingLimit, validAfter, validUntil, oldSessionKey, keyStore) {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const erc20SessionKeyValidatorAddress = await this.getERC20SessionKeyValidator();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;
            const isAValidTokenIndicator = await this.isAValidToken(token);
            if (!isAValidTokenIndicator) {
                throw new Error(`Token: ${token} is does not exist or is invalid`);
            }
            const data = await this.generateSessionKeyData(account, chainId, token, functionSelector, spendingLimit, validAfter, validUntil, apiKey, true, keyStore ? keyStore : null, oldSessionKey);
            const rotateSessionKeyData = encodeFunctionData({
                functionName: 'rotateSessionKey',
                abi: parseAbi(sessionKeyValidatorAbi),
                args: [data.oldSessionKey, data.enableSessionKeyData],
            });
            this.modularSdk.clearUserOpsFromBatch();
            await this.modularSdk.addUserOpsToBatch({ to: erc20SessionKeyValidatorAddress, data: rotateSessionKeyData });
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
                };
            }
            catch (error) {
                await this.deleteSessionKey(account, chainId, apiKey, data.sessionKey);
                throw error;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async disableSessionKey(sessionKey) {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;
            const getSessionKeyData = await this.getSessionKey(account, chainId, apiKey, sessionKey);
            const disableSessionKeyData = encodeFunctionData({
                functionName: 'disableSessionKey',
                abi: parseAbi(sessionKeyValidatorAbi),
                args: [getSessionKeyData.sessionKey],
            });
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
            };
        }
        catch (error) {
            throw error;
        }
    }
    async getNonce(sessionKey) {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;
            const data = await this.getNonceData(account, chainId, apiKey, sessionKey);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async getAssociatedSessionKeys() {
        const account = await this.modularSdk.getCounterFactualAddress();
        const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();
        const response = await this.publicClient.simulateContract({
            account: account,
            address: erc20SessionKeyValidator,
            abi: parseAbi(sessionKeyValidatorAbi),
            functionName: 'getAssociatedSessionKeys',
            args: []
        });
        return response.result;
    }
    async sessionData(sessionKey) {
        const account = await this.modularSdk.getCounterFactualAddress();
        const erc20SessionKeyValidatorAddress = await this.getERC20SessionKeyValidator();
        const data = await this.publicClient.simulateContract({
            account: account,
            address: erc20SessionKeyValidatorAddress,
            abi: parseAbi(sessionKeyValidatorAbi),
            functionName: 'sessionData',
            args: [sessionKey, account]
        });
        if (!data.result || data.result == null) {
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
        };
    }
    async getERC20SessionKeyValidator() {
        if (this.erc20SessionKeyValidator) {
            return this.erc20SessionKeyValidator;
        }
        const chainId = await this.getChainId();
        this.erc20SessionKeyValidator = Networks[chainId]?.contracts?.erc20SessionKeyValidator || DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS;
        return this.erc20SessionKeyValidator;
    }
    async getChainId() {
        if (!this.chainId) {
            this.chainId = this.publicClient.chain.id;
        }
        return this.chainId;
    }
    async generateSessionKeyData(account, chainId, token, functionSelector, spendingLimit, validAfter, validUntil, apiKey, rotateKey, keyStore, oldSessionKey) {
        let response = null;
        try {
            if (!apiKey || apiKey == null) {
                throw new Error('API Key is required');
            }
            const url = `${PERMISSIONS_URL}/account/generateSessionKeyData?apiKey=${apiKey}`;
            if (account == null) {
                throw new Error('Account is required');
            }
            const now = Math.floor(Date.now() / 1000);
            if (validAfter < now + 29) {
                throw new Error('validAfter must be greater than current time by at least 30 seconds');
            }
            if (validUntil == 0 || validUntil < validAfter || validUntil < now) {
                throw new Error('validUntil must be greater than validAfter and current time');
            }
            if (!token || token == null || token == '') {
                throw new Error('Token is required');
            }
            if (!functionSelector || functionSelector == null || functionSelector == '') {
                throw new Error('Function Selector is required');
            }
            if (!spendingLimit || spendingLimit == null || spendingLimit == '') {
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
                const responseJson = await response.json();
                return responseJson;
            }
            else {
                const responseJson = await response.json();
                throw new Error(responseJson.message);
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async getSessionKey(account, chainId, apiKey, sessionKey) {
        let response = null;
        try {
            let url = `${PERMISSIONS_URL}/account/getSessionKey?account=${account}&chainId=${chainId}&sessionKey=${sessionKey}`;
            if (apiKey)
                url += `&apiKey=${apiKey}`;
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const responseJson = await response.json();
                return responseJson;
            }
            else {
                const responseJson = await response.json();
                throw new Error(responseJson.message);
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async deleteSessionKey(account, chainId, apiKey, sessionKey) {
        let response = null;
        try {
            let url = `${PERMISSIONS_URL}/account/deleteSessionKey?account=${account}&chainId=${chainId}&sessionKey=${sessionKey}`;
            if (apiKey)
                url += `&apiKey=${apiKey}`;
            response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const responseJson = await response.json();
                return responseJson;
            }
            else {
                const responseJson = await response.json();
                throw new Error(responseJson.message);
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async getSignUserOp(account, chainId, apiKey, sessionKey, userOp) {
        let response = null;
        try {
            let url = `${PERMISSIONS_URL}/account/signUserOp?account=${account}&chainId=${chainId}&sessionKey=${sessionKey}`;
            if (apiKey)
                url += `&apiKey=${apiKey}`;
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
                return responseJson;
            }
            else {
                const responseJson = await response.json();
                throw new Error(responseJson.message);
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async getNonceData(account, chainId, apiKey, sessionKey) {
        let response = null;
        try {
            let url = `${PERMISSIONS_URL}/account/getNonce?account=${account}&chainId=${chainId}&sessionKey=${sessionKey}`;
            if (apiKey)
                url += `&apiKey=${apiKey}`;
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const responseJson = await response.json();
                return responseJson;
            }
            else {
                const responseJson = await response.json();
                throw new Error(responseJson.message);
            }
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async signUserOpWithSessionKey(sessionKey, userOp) {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const chainId = await this.getChainId();
            const apiKeyMatch = this.providerURL.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;
            const data = await this.getSignUserOp(account, chainId, apiKey, sessionKey, userOp);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async isAValidToken(token) {
        let decimals = null;
        try {
            decimals = await this.publicClient.readContract({
                address: token,
                abi: parseAbi(erc20Abi),
                functionName: 'decimals',
                args: []
            });
        }
        catch (error) {
            console.error(`Token: ${token} is does not exist or is invalid`);
            return false;
        }
        if (!decimals || decimals == null || decimals == 0) {
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=SessionKeyValidator.js.map