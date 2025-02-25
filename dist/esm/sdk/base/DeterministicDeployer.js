import { concat, keccak256, pad, toHex } from 'viem';
import { BigNumber } from '../types/bignumber.js';
/**x
 * wrapper class for Arachnid's deterministic deployer
 * (deterministic deployer used by 'hardhat-deployer'. generates the same addresses as "hardhat-deploy")
 */
export class DeterministicDeployer {
    /**
     * return the address this code will get deployed to.
     * @param ctrCode constructor code to pass to CREATE2
     * @param salt optional salt. defaults to zero
     */
    static async getAddress(ctrCode, salt = 0) {
        return await DeterministicDeployer.instance.getDeterministicDeployAddress(ctrCode, salt);
    }
    /**
     * deploy the contract, unless already deployed
     * @param ctrCode constructor code to pass to CREATE2
     * @param salt optional salt. defaults to zero
     * @return the deployed address
     */
    static async deploy(ctrCode, salt = 0) {
        return await DeterministicDeployer.instance.deterministicDeploy(ctrCode, salt);
    }
    constructor(walletClient, account, publicClient) {
        this.walletClient = walletClient;
        this.account = account;
        this.publicClient = publicClient;
        // from: https://github.com/Arachnid/deterministic-deployment-proxy
        this.proxyAddress = '0x4e59b44847b379578588920ca78fbf26c0b4956c';
        this.deploymentTransaction = '0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222';
        this.deploymentSignerAddress = '0x3fab184622dc19b6109349b94811493bf2a45362';
        this.deploymentGasPrice = 100e9;
        this.deploymentGasLimit = 100000;
    }
    async isContractDeployed(address) {
        return await this.publicClient.getCode({ address: address }).then(code => code.length > 2);
    }
    async isDeployerDeployed() {
        return await this.isContractDeployed(this.proxyAddress);
    }
    async deployDeployer() {
        if (await this.isContractDeployed(this.proxyAddress)) {
            return;
        }
        const bal = await this.publicClient.getBalance({ address: this.deploymentSignerAddress });
        const balBig = BigNumber.from(bal);
        const neededBalance = BigNumber.from(this.deploymentGasLimit).mul(this.deploymentGasPrice);
        if (balBig.lt(neededBalance)) {
            if (!this.account) {
                throw new Error('no account to send from');
            }
            const tx = await this.walletClient.sendTransaction({
                account: this.account,
                chain: this.publicClient.chain,
                to: this.deploymentSignerAddress,
                value: neededBalance,
                gasLimit: this.deploymentGasLimit,
                kzg: undefined
            });
        }
        await this.walletClient.sendRawTransaction({ serializedTransaction: this.deploymentTransaction });
        if (!await this.isContractDeployed(this.proxyAddress)) {
            throw new Error('raw TX didn\'t deploy deployer!');
        }
    }
    async getDeployTransaction(ctrCode, salt = 0) {
        await this.deployDeployer();
        const saltEncoded = pad(toHex(salt), { size: 32 });
        return {
            to: this.proxyAddress,
            data: concat([
                saltEncoded,
                ctrCode
            ])
        };
    }
    async getDeterministicDeployAddress(ctrCode, salt = 0) {
        // this method works only before the contract is already deployed:
        // return await this.provider.call(await this.getDeployTransaction(ctrCode, salt))
        const saltEncoded = pad(toHex(salt), { size: 32 });
        return '0x' + keccak256(concat([
            '0xff',
            this.proxyAddress,
            saltEncoded,
            keccak256(ctrCode)
        ])).slice(-40);
    }
    async deterministicDeploy(ctrCode, salt = 0) {
        const addr = await this.getDeterministicDeployAddress(ctrCode, salt);
        if (!await this.isContractDeployed(addr)) {
            const transactionRequest = await this.getDeployTransaction(ctrCode, salt);
            //await this.provider.getSigner().sendTransaction(transactionRequest)
            await this.walletClient.sendTransaction({
                account: this.account,
                chain: this.publicClient.chain,
                to: transactionRequest.to,
                data: transactionRequest.data,
                kzg: undefined
            });
        }
        return addr;
    }
    static init(walletClient, account, publicClient) {
        this._instance = new DeterministicDeployer(walletClient, account, publicClient);
    }
    static get instance() {
        if (this._instance == null) {
            throw new Error('must call "DeterministicDeployer.init(walletClient, account, publicClient)"');
        }
        return this._instance;
    }
}
//# sourceMappingURL=DeterministicDeployer.js.map