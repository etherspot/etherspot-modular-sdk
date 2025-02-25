import { Exception, getUserOpHash, packUserOp } from '../common/index.js';
import { calcPreVerificationGas } from './calcPreVerificationGas.js';
import { NetworkService, SignMessageDto, validateDto } from '../index.js';
import { Context } from '../context.js';
import { parseAbi } from 'viem';
import { entryPointAbi } from '../common/abis.js';
import { resolveProperties } from '../common/utils/index.js';
import { BigNumber } from '../types/bignumber.js';
import { WalletService } from '../wallet/index.js';
import { DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS, Networks } from '../network/index.js';
/**
 * Base class for all Smart Wallet ERC-4337 Clients to implement.
 * Subclass should inherit 5 methods to support a specific wallet contract:
 *
 * - getAccountInitCode - return the value to put into the "initCode" field, if the account is not yet deployed. should create the account instance using a factory contract.
 * - getNonce - return current account's nonce value
 * - encodeExecute - encode the call from entryPoint through our account to the target contract.
 * - signUserOpHash - sign the hash of a UserOp.
 *
 * The user can use the following APIs:
 * - createUnsignedUserOp - given "target" and "calldata", fill userOp to perform that operation from the account.
 * - createSignedUserOp - helper to call the above createUnsignedUserOp, and then extract the userOpHash and sign it
 */
export class BaseAccountAPI {
    /**
     * base constructor.
     * subclass SHOULD add parameters that define the owner (signer) of this wallet
     */
    constructor(params) {
        this.isPhantom = true;
        const optionsLike = params.optionsLike;
        const { chainId, //
        rpcProviderUrl, factoryWallet, bundlerProvider, } = optionsLike;
        this.services = {
            networkService: new NetworkService(chainId),
            walletService: new WalletService(params.wallet, { provider: rpcProviderUrl }, bundlerProvider.url, chainId),
        };
        this.context = new Context(this.services);
        this.factoryUsed = factoryWallet;
        // super();
        this.overheads = params.overheads;
        this.entryPointAddress = params.entryPointAddress;
        this.accountAddress = params.accountAddress;
        this.factoryAddress = params.factoryAddress;
        this.publicClient = params.publicClient;
        this.validatorAddress = Networks[params.optionsLike.chainId]?.contracts?.multipleOwnerECDSAValidator ?? DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS;
    }
    get error$() {
        return this.context.error$;
    }
    get supportedNetworks() {
        return this.services.networkService.supportedNetworks;
    }
    // sdk
    /**
     * destroys
     */
    destroy() {
        this.context.destroy();
    }
    // wallet
    /**
     * signs message
     * @param dto
     * @return Promise<string>
     */
    async signMessage(dto) {
        const { message } = await validateDto(dto, SignMessageDto);
        await this.require({
            network: false,
        });
        const initCode = await this.getInitCode();
        return this.services.walletService.signMessage(message, `0x${this.validatorAddress.slice(2)}`, `0x${this.factoryAddress.slice(2)}`, `0x${initCode.substring(42)}`);
    }
    async setPaymasterApi(paymaster) {
        this.paymasterAPI = paymaster;
    }
    // private
    async require(options = {}) {
        options = {
            network: true,
            wallet: true,
            ...options,
        };
    }
    getNetworkChainId(networkName = null) {
        let result;
        if (!networkName) {
            ({ chainId: result } = this.services.networkService);
        }
        else {
            const network = this.supportedNetworks.find(({ name }) => name === networkName);
            if (!network) {
                throw new Exception('Unsupported network');
            }
            ({ chainId: result } = network);
        }
        return result;
    }
    async validateResolveName(options = {}) {
        options = {
            ...options,
        };
        const { networkService } = this.services;
        if (options.network && !networkService.chainId) {
            throw new Exception('Unknown network');
        }
        if (!options.name) {
            throw new Exception('Require name');
        }
    }
    async init() {
        // check EntryPoint is deployed at given address
        if ((await this.publicClient.getCode({ address: this.entryPointAddress })) === '0x') {
            throw new Error(`entryPoint not deployed at ${this.entryPointAddress}`);
        }
        await this.getAccountAddress();
        return this;
    }
    /**
     * check if the contract is already deployed.
     */
    async checkAccountPhantom() {
        if (!this.isPhantom) {
            // already deployed. no need to check anymore.
            return this.isPhantom;
        }
        const accountAddress = await this.getAccountAddress();
        const senderAddressCode = await this.publicClient.getCode({ address: accountAddress });
        if (senderAddressCode && senderAddressCode.length > 2) {
            this.isPhantom = false;
        }
        return this.isPhantom;
    }
    /**
     * calculate the account address even before it is deployed
     */
    async getCounterFactualAddress() {
        const initCode = await this.getAccountInitCode();
        // use entryPoint to query account address (factory can provide a helper method to do the same, but
        // this method attempts to be generic
        try {
            //await this.entryPointView.callStatic.getSenderAddress(initCode);
            await this.publicClient.simulateContract({
                address: this.entryPointAddress,
                abi: parseAbi(entryPointAbi),
                functionName: 'getSenderAddress',
                args: [initCode]
            });
        }
        catch (e) {
            return e.errorArgs.sender;
        }
        throw new Error('must handle revert');
    }
    /**
     * return initCode value to into the UserOp.
     * (either deployment code, or empty hex if contract already deployed)
     */
    async getInitCode() {
        if (await this.checkAccountPhantom()) {
            return await this.getAccountInitCode();
        }
        return '0x';
    }
    /**
     * return maximum gas used for verification.
     * NOTE: createUnsignedUserOp will add to this value the cost of creation, if the contract is not yet created.
     */
    async getVerificationGasLimit() {
        return 100000;
    }
    /**
     * should cover cost of putting calldata on-chain, and some overhead.
     * actual overhead depends on the expected bundle size
     */
    async getPreVerificationGas(userOp) {
        const p = await resolveProperties(userOp);
        return calcPreVerificationGas(p, this.overheads);
    }
    /**
     * ABI-encode a user operation. used for calldata cost estimation
     */
    packUserOp(userOp) {
        return packUserOp(userOp, false);
    }
    async encodeUserOpCallDataAndGasLimit(detailsForUserOp) {
        function parseNumber(a) {
            if (a == null || a === '')
                return null;
            return BigNumber.from(a.toString());
        }
        const value = parseNumber(detailsForUserOp.value) ?? BigNumber.from(0);
        let callData;
        const data = detailsForUserOp.data;
        let target = detailsForUserOp.target;
        if (typeof data === 'string') {
            if (typeof target !== 'string') {
                throw new Error('must have target address if data is single value');
            }
            callData = await this.encodeExecute(target, value, data);
        }
        else {
            if (typeof target === 'string') {
                target = Array(data.length).fill(target);
            }
            callData = await this.encodeBatch(target, detailsForUserOp.values, data);
        }
        const callGasLimit = parseNumber(detailsForUserOp.gasLimit) ?? BigNumber.from(35000);
        return {
            callData,
            callGasLimit,
        };
    }
    /**
     * return userOpHash for signing.
     * This value matches entryPoint.getUserOpHash (calculated off-chain, to avoid a view call)
     * @param userOp userOperation, (signature field ignored)
     */
    async getUserOpHash(userOp) {
        const op = await resolveProperties(userOp);
        const chainId = await this.publicClient.getChainId();
        return getUserOpHash(op, this.entryPointAddress, chainId);
    }
    /**
     * return the account's address.
     * this value is valid even before deploying the contract.
     */
    async getAccountAddress() {
        if (this.senderAddress == null) {
            if (this.accountAddress != null) {
                this.senderAddress = this.accountAddress;
            }
            else {
                this.senderAddress = await this.getCounterFactualAddress();
            }
        }
        return this.senderAddress;
    }
    async estimateCreationGas(initCode) {
        if (initCode == null || initCode === '0x')
            return 0;
        const deployerAddress = initCode.substring(0, 42);
        const deployerCallData = '0x' + initCode.substring(42);
        const estimatedGas = await this.publicClient.estimateGas({
            to: deployerAddress,
            data: deployerCallData,
        });
        return estimatedGas ? estimatedGas : 0;
    }
    async getFeeData() {
        const maxFeePerGasResponse = await this.publicClient.estimateFeesPerGas();
        const maxPriorityFeePerGasResponse = await this.publicClient.estimateMaxPriorityFeePerGas();
        const maxFeePerGas = maxFeePerGasResponse ? BigNumber.from(maxFeePerGasResponse.maxFeePerGas) : null;
        const maxPriorityFeePerGas = maxPriorityFeePerGasResponse ? BigNumber.from(maxPriorityFeePerGasResponse.toString()) : null;
        return { maxFeePerGas, maxPriorityFeePerGas };
    }
    /**
     * create a UserOperation, filling all details (except signature)
     * - if account is not yet created, add initCode to deploy it.
     * - if gas or nonce are missing, read them from the chain (note that we can't fill gaslimit before the account is created)
     * @param info
     */
    async createUnsignedUserOp(info, key = BigNumber.from(0)) {
        const { callData, callGasLimit } = await this.encodeUserOpCallDataAndGasLimit(info);
        const factoryData = await this.getInitCode();
        const initGas = await this.estimateCreationGas(factoryData);
        const verificationGasLimit = BigNumber.from(await this.getVerificationGasLimit()).add(initGas);
        let { maxFeePerGas, maxPriorityFeePerGas } = info;
        if (maxFeePerGas == null || maxPriorityFeePerGas == null) {
            let feeData = {};
            try {
                feeData = await this.getFeeData();
            }
            catch (err) {
                console.warn("getGas: eth_maxPriorityFeePerGas failed, falling back to legacy gas price.");
                const gas = await this.publicClient.getGasPrice();
                feeData = { maxFeePerGas: gas, maxPriorityFeePerGas: gas };
            }
            if (maxFeePerGas == null) {
                maxFeePerGas = feeData.maxFeePerGas ?? undefined;
            }
            if (maxPriorityFeePerGas == null) {
                maxPriorityFeePerGas = feeData.maxPriorityFeePerGas ?? undefined;
            }
        }
        let partialUserOp;
        if (factoryData !== '0x') {
            partialUserOp = {
                sender: await this.getAccountAddress(),
                nonce: await this.getNonce(key),
                factory: this.factoryAddress,
                factoryData: '0x' + factoryData.substring(42),
                callData,
                callGasLimit,
                verificationGasLimit,
                maxFeePerGas,
                maxPriorityFeePerGas,
            };
        }
        else {
            partialUserOp = {
                sender: await this.getAccountAddress(),
                nonce: await this.getNonce(key),
                factoryData: '0x' + factoryData.substring(42),
                callData,
                callGasLimit,
                verificationGasLimit,
                maxFeePerGas,
                maxPriorityFeePerGas,
            };
        }
        let paymasterData = null;
        if (this.paymasterAPI != null) {
            // fill (partial) preVerificationGas (all except the cost of the generated paymasterData)
            const userOpForPm = {
                ...partialUserOp,
                preVerificationGas: this.getPreVerificationGas(partialUserOp),
            };
            paymasterData = (await this.paymasterAPI.getPaymasterData(userOpForPm));
            partialUserOp.verificationGasLimit = paymasterData.result.verificationGasLimit;
            partialUserOp.preVerificationGas = paymasterData.result.preVerificationGas;
            partialUserOp.callGasLimit = paymasterData.result.callGasLimit;
            partialUserOp.paymaster = paymasterData.result.paymaster;
            partialUserOp.paymasterVerificationGasLimit = paymasterData.result.paymasterVerificationGasLimit;
            partialUserOp.paymasterPostOpGasLimit = paymasterData.result.paymasterPostOpGasLimit;
        }
        partialUserOp.paymasterData = paymasterData ? paymasterData.result.paymasterData : '0x';
        return {
            ...partialUserOp,
            preVerificationGas: this.getPreVerificationGas(partialUserOp),
            signature: info.dummySignature ?? '0x',
        };
    }
    /**
     * Sign the filled userOp.
     * @param userOp the UserOperation to sign (with signature field ignored)
     */
    async signUserOp(userOp) {
        if (this.paymasterAPI != null) {
            const paymasterData = await this.paymasterAPI.getPaymasterData(userOp);
            userOp.verificationGasLimit = paymasterData.result.verificationGasLimit;
            userOp.preVerificationGas = paymasterData.result.preVerificationGas;
            userOp.callGasLimit = paymasterData.result.callGasLimit;
            userOp.paymaster = paymasterData.result.paymaster;
            userOp.paymasterVerificationGasLimit = paymasterData.result.paymasterVerificationGasLimit;
            userOp.paymasterPostOpGasLimit = paymasterData.result.paymasterPostOpGasLimit;
        }
        const userOpHash = await this.getUserOpHash(userOp);
        const signature = await this.signUserOpHash(userOpHash);
        return {
            ...userOp,
            signature,
        };
    }
    /**
     * helper method: create and sign a user operation.
     * @param info transaction details for the userOp
     */
    async createSignedUserOp(info, key = BigNumber.from(0)) {
        return await this.signUserOp(await this.createUnsignedUserOp(info, key));
    }
    /**
     * get the transaction that has this userOpHash mined, or null if not found
     * @param userOpHash returned by sendUserOpToBundler (or by getUserOpHash..)
     * @param timeout stop waiting after this timeout
     * @param interval time to wait between polls.
     * @return the transactionHash this userOp was mined, or null if not found.
     */
    async getUserOpReceipt(userOpHash, timeout = 30000, interval = 5000) {
        const endtime = Date.now() + timeout;
        while (Date.now() < endtime) {
            const response = await this.publicClient.request({
                method: 'eth_getUserOperationReceipt',
                params: [
                    userOpHash
                ]
            });
            if (response && response.receipt !== undefined) {
                return response.receipt.transactionHash;
            }
            await new Promise((resolve) => setTimeout(resolve, interval));
        }
        return null;
    }
    async signTypedData(msg) {
        const initCode = await this.getInitCode();
        return await this.services.walletService.signTypedData(msg, `0x${this.validatorAddress.slice(2)}`, `0x${this.factoryAddress.slice(2)}`, `0x${initCode.substring(42)}`);
    }
}
//# sourceMappingURL=BaseAccountAPI.js.map