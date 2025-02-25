import { TransactionDetailsForUserOp } from './TransactionDetailsForUserOp.cjs';
import { P as PaymasterAPI } from '../../PaymasterAPI-CbUneXjr.cjs';
import { NotPromise, UserOperation } from '../common/ERC4337Utils.cjs';
import { BigNumber, BigNumberish } from '../types/bignumber.cjs';
import { PublicClient } from 'viem';
import { C as Context } from '../../network.service-BJk94rpB.cjs';
import { ErrorSubject } from '../common/rxjs/error.subject.cjs';
import { GasOverheads } from './calcPreVerificationGas.cjs';
import { SdkOptions, Factory } from '../interfaces.cjs';
import { N as Network, c as NetworkNames } from '../../interfaces-q-ZvJZS9.cjs';
import { WalletProviderLike, MessagePayload } from '../wallet/providers/interfaces.cjs';
import { SignMessageDto } from '../dto/sign-message.dto.cjs';
import { BaseAccountUserOperationStruct, FeeData } from '../types/user-operation-types.cjs';
import '../common/types.cjs';
import 'rxjs';
import '../common/rxjs/object.subject.cjs';
import '../wallet/interfaces.cjs';
import '../bundler/interface.cjs';
import 'viem/chains';
import '@walletconnect/universal-provider';
import '../common/rxjs/unique.subject.cjs';

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
