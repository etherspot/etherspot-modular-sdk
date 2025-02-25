import { TransactionDetailsForUserOp } from './TransactionDetailsForUserOp.js';
import { PaymasterAPI } from './PaymasterAPI.js';
import { ErrorSubject, NotPromise, UserOperation } from '../common/index.js';
import { GasOverheads } from './calcPreVerificationGas.js';
import { Factory, Network, NetworkNames, SdkOptions, SignMessageDto } from '../index.js';
import { Context } from '../context.js';
import { PublicClient } from 'viem';
import { BaseAccountUserOperationStruct, FeeData } from '../types/user-operation-types.js';
import { BigNumber, BigNumberish } from '../types/bignumber.js';
import { MessagePayload, WalletProviderLike } from '../wallet/index.js';
export interface BaseApiParams {
    entryPointAddress: string;
    accountAddress?: string;
    overheads?: Partial<GasOverheads>;
    factoryAddress?: string;
    optionsLike?: SdkOptions;
    publicClient?: PublicClient;
    wallet: WalletProviderLike;
}
export interface UserOpResult {
    transactionHash: string;
    success: boolean;
}
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
export declare abstract class BaseAccountAPI {
    private senderAddress;
    private isPhantom;
    readonly services: Context['services'];
    context: Context;
    overheads?: Partial<GasOverheads>;
    entryPointAddress: string;
    accountAddress?: string;
    paymasterAPI?: PaymasterAPI;
    factoryUsed: Factory;
    factoryAddress?: string;
    validatorAddress?: string;
    wallet: WalletProviderLike;
    publicClient: PublicClient;
    /**
     * base constructor.
     * subclass SHOULD add parameters that define the owner (signer) of this wallet
     */
    constructor(params: BaseApiParams);
    get error$(): ErrorSubject;
    get supportedNetworks(): Network[];
    /**
     * destroys
     */
    destroy(): void;
    /**
     * signs message
     * @param dto
     * @return Promise<string>
     */
    signMessage(dto: SignMessageDto): Promise<string>;
    setPaymasterApi(paymaster: PaymasterAPI | null): Promise<void>;
    require(options?: {
        network?: boolean;
        wallet?: boolean;
    }): Promise<void>;
    getNetworkChainId(networkName?: NetworkNames): number;
    validateResolveName(options?: {
        network?: number;
        name?: string;
    }): Promise<void>;
    init(): Promise<this>;
    /**
     * return the value to put into the "initCode" field, if the contract is not yet deployed.
     * this value holds the "factory" address, followed by this account's information
     */
    protected abstract getAccountInitCode(): Promise<string>;
    /**
     * return current account's nonce.
     */
    protected abstract getNonce(key?: BigNumber): Promise<BigNumber>;
    /**
     * encode the call from entryPoint through our account to the target contract.
     * @param target
     * @param value
     * @param data
     */
    protected abstract encodeExecute(target: string, value: BigNumberish, data: string): Promise<string>;
    protected abstract encodeBatch(targets: string[], values: BigNumberish[], datas: string[]): Promise<string>;
    /**
     * sign a userOp's hash (userOpHash).
     * @param userOpHash
     */
    protected abstract signUserOpHash(userOpHash: string): Promise<string>;
    /**
     * check if the contract is already deployed.
     */
    checkAccountPhantom(): Promise<boolean>;
    /**
     * calculate the account address even before it is deployed
     */
    getCounterFactualAddress(): Promise<string>;
    /**
     * return initCode value to into the UserOp.
     * (either deployment code, or empty hex if contract already deployed)
     */
    getInitCode(): Promise<string>;
    /**
     * return maximum gas used for verification.
     * NOTE: createUnsignedUserOp will add to this value the cost of creation, if the contract is not yet created.
     */
    getVerificationGasLimit(): Promise<BigNumberish>;
    /**
     * should cover cost of putting calldata on-chain, and some overhead.
     * actual overhead depends on the expected bundle size
     */
    getPreVerificationGas(userOp: Partial<BaseAccountUserOperationStruct>): Promise<number>;
    /**
     * ABI-encode a user operation. used for calldata cost estimation
     */
    packUserOp(userOp: NotPromise<BaseAccountUserOperationStruct>): string;
    encodeUserOpCallDataAndGasLimit(detailsForUserOp: TransactionDetailsForUserOp): Promise<{
        callData: string;
        callGasLimit: BigNumber;
    }>;
    /**
     * return userOpHash for signing.
     * This value matches entryPoint.getUserOpHash (calculated off-chain, to avoid a view call)
     * @param userOp userOperation, (signature field ignored)
     */
    getUserOpHash(userOp: UserOperation): Promise<string>;
    /**
     * return the account's address.
     * this value is valid even before deploying the contract.
     */
    getAccountAddress(): Promise<string>;
    estimateCreationGas(initCode?: string): Promise<BigNumberish>;
    getFeeData(): Promise<FeeData>;
    /**
     * create a UserOperation, filling all details (except signature)
     * - if account is not yet created, add initCode to deploy it.
     * - if gas or nonce are missing, read them from the chain (note that we can't fill gaslimit before the account is created)
     * @param info
     */
    createUnsignedUserOp(info: TransactionDetailsForUserOp, key?: BigNumber): Promise<any>;
    /**
     * Sign the filled userOp.
     * @param userOp the UserOperation to sign (with signature field ignored)
     */
    signUserOp(userOp: UserOperation): Promise<UserOperation>;
    /**
     * helper method: create and sign a user operation.
     * @param info transaction details for the userOp
     */
    createSignedUserOp(info: TransactionDetailsForUserOp, key?: BigNumber): Promise<UserOperation>;
    /**
     * get the transaction that has this userOpHash mined, or null if not found
     * @param userOpHash returned by sendUserOpToBundler (or by getUserOpHash..)
     * @param timeout stop waiting after this timeout
     * @param interval time to wait between polls.
     * @return the transactionHash this userOp was mined, or null if not found.
     */
    getUserOpReceipt(userOpHash: string, timeout?: number, interval?: number): Promise<string | null>;
    signTypedData(msg: MessagePayload): Promise<string>;
}
//# sourceMappingURL=BaseAccountAPI.d.ts.map