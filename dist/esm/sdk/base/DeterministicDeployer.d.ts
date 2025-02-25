import { Hex, WalletClient, Account, PublicClient } from 'viem';
import { BigNumberish } from '../types/bignumber.js';

type TransactionRequest = {
    to: Hex;
    data: Hex;
    gasLimit?: number;
};
declare class DeterministicDeployer {
    readonly walletClient: WalletClient;
    readonly account: Account;
    readonly publicClient: PublicClient;
    static getAddress(ctrCode: string, salt?: BigNumberish): Promise<string>;
    static deploy(ctrCode: string, salt?: BigNumberish): Promise<string>;
    proxyAddress: string;
    deploymentTransaction: string;
    deploymentSignerAddress: string;
    deploymentGasPrice: number;
    deploymentGasLimit: number;
    constructor(walletClient: WalletClient, account: Account, publicClient: PublicClient);
    isContractDeployed(address: Hex): Promise<boolean>;
    isDeployerDeployed(): Promise<boolean>;
    deployDeployer(): Promise<void>;
    getDeployTransaction(ctrCode: string, salt?: BigNumberish): Promise<TransactionRequest>;
    getDeterministicDeployAddress(ctrCode: string, salt?: BigNumberish): Promise<string>;
    deterministicDeploy(ctrCode: string, salt?: BigNumberish): Promise<string>;
    private static _instance?;
    static init(walletClient: WalletClient, account: Account, publicClient: PublicClient): void;
    static get instance(): DeterministicDeployer;
}

export { DeterministicDeployer, type TransactionRequest };
