import { TransactionDetailsForUserOp } from './TransactionDetailsForUserOp.js';
import { P as PaymasterAPI } from '../../PaymasterAPI-Dj36ihyu.js';
import { NotPromise, UserOperation } from '../common/ERC4337Utils.js';
import { BigNumber, BigNumberish } from '../types/bignumber.js';
import { PublicClient } from 'viem';
import { C as Context } from '../../network.service-B7y3JNe3.js';
import { ErrorSubject } from '../common/rxjs/error.subject.js';
import { GasOverheads } from './calcPreVerificationGas.js';
import { SdkOptions, Factory } from '../interfaces.js';
import { N as Network, c as NetworkNames } from '../../interfaces-q-ZvJZS9.js';
import { WalletProviderLike, MessagePayload } from '../wallet/providers/interfaces.js';
import { SignMessageDto } from '../dto/sign-message.dto.js';
import { BaseAccountUserOperationStruct, FeeData } from '../types/user-operation-types.js';
import '../common/types.js';
import 'rxjs';
import '../common/rxjs/object.subject.js';
import '../wallet/interfaces.js';
import '../bundler/interface.js';
import 'viem/chains';
import '@walletconnect/universal-provider';
import '../common/rxjs/unique.subject.js';

interface BaseApiParams {
    entryPointAddress: string;
    accountAddress?: string;
    overheads?: Partial<GasOverheads>;
    factoryAddress?: string;
    optionsLike?: SdkOptions;
    publicClient?: PublicClient;
    wallet: WalletProviderLike;
}
interface UserOpResult {
    transactionHash: string;
    success: boolean;
}
declare abstract class BaseAccountAPI {
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
    constructor(params: BaseApiParams);
    get error$(): ErrorSubject;
    get supportedNetworks(): Network[];
    destroy(): void;
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
    protected abstract getAccountInitCode(): Promise<string>;
    protected abstract getNonce(key?: BigNumber): Promise<BigNumber>;
    protected abstract encodeExecute(target: string, value: BigNumberish, data: string): Promise<string>;
    protected abstract encodeBatch(targets: string[], values: BigNumberish[], datas: string[]): Promise<string>;
    protected abstract signUserOpHash(userOpHash: string): Promise<string>;
    checkAccountPhantom(): Promise<boolean>;
    getCounterFactualAddress(): Promise<string>;
    getInitCode(): Promise<string>;
    getVerificationGasLimit(): Promise<BigNumberish>;
    getPreVerificationGas(userOp: Partial<BaseAccountUserOperationStruct>): Promise<number>;
    packUserOp(userOp: NotPromise<BaseAccountUserOperationStruct>): string;
    encodeUserOpCallDataAndGasLimit(detailsForUserOp: TransactionDetailsForUserOp): Promise<{
        callData: string;
        callGasLimit: BigNumber;
    }>;
    getUserOpHash(userOp: UserOperation): Promise<string>;
    getAccountAddress(): Promise<string>;
    estimateCreationGas(initCode?: string): Promise<BigNumberish>;
    getFeeData(): Promise<FeeData>;
    createUnsignedUserOp(info: TransactionDetailsForUserOp, key?: BigNumber): Promise<any>;
    signUserOp(userOp: UserOperation): Promise<UserOperation>;
    createSignedUserOp(info: TransactionDetailsForUserOp, key?: BigNumber): Promise<UserOperation>;
    getUserOpReceipt(userOpHash: string, timeout?: number, interval?: number): Promise<string | null>;
    signTypedData(msg: MessagePayload): Promise<string>;
}

export { BaseAccountAPI, type BaseApiParams, type UserOpResult };
