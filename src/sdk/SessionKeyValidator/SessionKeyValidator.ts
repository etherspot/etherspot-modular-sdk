import { ERC20SessionKeyValidator__factory } from "../contracts/factories/src/ERC7579/modules/validator";
import { BigNumber, ethers, providers } from "ethers";
import { ModularSdk } from "../sdk";
import { KeyStore, PERMISSIONS_URL } from "./constants";
import { EnableSessionKeyResponse, GenerateSessionKeyResponse } from "./interfaces";
import { BundlerProvider } from "../bundler";
import { DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS, Networks } from "../network/constants";

export class SessionKeyValidator {
    private modularSdk: ModularSdk;
    private provider: providers.JsonRpcProvider;
    private erc20SessionKeyValidator?: string;

    constructor(modularSdk: ModularSdk, provider: BundlerProvider) {
        this.modularSdk = modularSdk;
        this.provider = new providers.JsonRpcProvider(provider.url);
    }

    async enableSessionKey(
        token: string,
        interfaceId: string,
        functionSelector: string,
        spendingLimit: string,
        validAfter: number,
        validUntil: number,
        keyStore?: KeyStore,
    ): Promise<EnableSessionKeyResponse> {
        try {
            const account = await this.modularSdk.getCounterFactualAddress();
            const erc20SessionKeyValidator = await this.getERC20SessionKeyValidator();

            const apiKeyMatch = this.provider.connection.url.match(/api-key=([^&]+)/);
            const apiKey = apiKeyMatch ? apiKeyMatch[1] : null;

            // const data = await this.generateSessionKeyData(
            //     account,
            //     token,
            //     interfaceId,
            //     functionSelector,
            //     spendingLimit,
            //     validAfter,
            //     validUntil,
            //     apiKey,
            //     false,
            //     keyStore ? keyStore : null,
            // )

            const encodedData = ethers.utils.defaultAbiCoder.encode(
                ['address', 'address', 'bytes4', 'uint256', 'uint48', 'uint48'],
                ['0x92DefED646EABe835159B5Eec525D10A9a3C6C7D', token, functionSelector, BigNumber.from(spendingLimit), validAfter, validUntil]
            );
            
            const erc20SessionKeyValidatorContract = ERC20SessionKeyValidator__factory.connect(
                erc20SessionKeyValidator,
                this.provider
            );

            const enableSessionKeyData = erc20SessionKeyValidatorContract.interface.encodeFunctionData('enableSessionKey', [encodedData]);

            this.modularSdk.clearUserOpsFromBatch();

            await this.modularSdk.addUserOpsToBatch({ to: account, data: enableSessionKeyData });

            const op = await this.modularSdk.estimate({
                key: BigNumber.from(erc20SessionKeyValidator)
            });

            const uoHash = await this.modularSdk.send(op)

            return {
                userOpHash: uoHash,
                sessionKey: '0x92DefED646EABe835159B5Eec525D10A9a3C6C7D',
            }
        } catch (error) {
            throw error;
        }
    }

    private async getERC20SessionKeyValidator(): Promise<string> {
        if (this.erc20SessionKeyValidator) {
            return this.erc20SessionKeyValidator;
        }

        const chainId = (await this.provider.getNetwork()).chainId;
        this.erc20SessionKeyValidator = Networks[chainId]?.contracts?.erc20SessionKeyValidator ?? DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS;

        return this.erc20SessionKeyValidator;
    }

    private async generateSessionKeyData(
        account: string,
        token: string,
        interfaceId: string,
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
            let url = `${PERMISSIONS_URL}/account/generateSessionKeyData?account=${account}&rotateKey=${rotateKey}&keyStore=${keyStore}&token=${token}&interfaceId=${interfaceId}&functionSelector=${functionSelector}&spendingLimit=${spendingLimit}&validAfter=${validAfter}&validUntil=${validUntil}`
            if (apiKey) url += `&apiKey=${apiKey}`;

            console.log("url=>", url)
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

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
}
