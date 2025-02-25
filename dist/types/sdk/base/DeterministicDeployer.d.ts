import { Account, Hex, PublicClient, WalletClient } from 'viem';
import { BigNumberish } from '../types/bignumber.js';
export type TransactionRequest = {
    to: Hex;
    data: Hex;
    gasLimit?: number;
};
/**x
 * wrapper class for Arachnid's deterministic deployer
 * (deterministic deployer used by 'hardhat-deployer'. generates the same addresses as "hardhat-deploy")
 */
export declare class DeterministicDeployer {
    readonly walletClient: WalletClient;
    readonly account: Account;
    readonly publicClient: PublicClient;
    /**
     * return the address this code will get deployed to.
     * @param ctrCode constructor code to pass to CREATE2
     * @param salt optional salt. defaults to zero
     */
    static getAddress(ctrCode: string, salt?: BigNumberish): Promise<string>;
    /**
     * deploy the contract, unless already deployed
     * @param ctrCode constructor code to pass to CREATE2
     * @param salt optional salt. defaults to zero
     * @return the deployed address
     */
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
//# sourceMappingURL=DeterministicDeployer.d.ts.map