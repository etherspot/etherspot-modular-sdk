import { Account, concat, Hex, keccak256, pad, PublicClient, toHex, WalletClient } from 'viem'
import { BigNumber, BigNumberish } from '../types/bignumber.js'

export type TransactionRequest = {
  to: Hex,
  data: Hex,
  gasLimit?: number
}

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
  static async getAddress(ctrCode: string, salt: BigNumberish = 0): Promise<string> {
    return await DeterministicDeployer.instance.getDeterministicDeployAddress(ctrCode, salt)
  }

  /**
   * deploy the contract, unless already deployed
   * @param ctrCode constructor code to pass to CREATE2
   * @param salt optional salt. defaults to zero
   * @return the deployed address
   */
  static async deploy(ctrCode: string, salt: BigNumberish = 0): Promise<string> {
    return await DeterministicDeployer.instance.deterministicDeploy(ctrCode, salt)
  }

  // from: https://github.com/Arachnid/deterministic-deployment-proxy
  proxyAddress = '0x4e59b44847b379578588920ca78fbf26c0b4956c'
  deploymentTransaction = '0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222'
  deploymentSignerAddress = '0x3fab184622dc19b6109349b94811493bf2a45362'
  deploymentGasPrice = 100e9
  deploymentGasLimit = 100000

  constructor(readonly walletClient: WalletClient, readonly account: Account, readonly publicClient: PublicClient) {
  }

  async isContractDeployed(address: Hex): Promise<boolean> {
    return await this.publicClient.getCode({ address: address }).then(code => code.length > 2);
  }

  async isDeployerDeployed(): Promise<boolean> {
    return await this.isContractDeployed(this.proxyAddress as Hex)
  }

  async deployDeployer(): Promise<void> {
    if (await this.isContractDeployed(this.proxyAddress as Hex)) {
      return
    }
    const bal: bigint = await this.publicClient.getBalance({ address: this.deploymentSignerAddress as Hex });
    const balBig = BigNumber.from(bal);
    const neededBalance = BigNumber.from(this.deploymentGasLimit).mul(this.deploymentGasPrice)

    if (balBig.lt(neededBalance)) {

      if (!this.account) {
        throw new Error('no account to send from');
      }

      const tx = await this.walletClient.sendTransaction({
        account: this.account,
        chain: this.publicClient.chain,
        to: this.deploymentSignerAddress as Hex,
        value: neededBalance,
        gasLimit: this.deploymentGasLimit,
        kzg: undefined
      });
    }

    await this.walletClient.sendRawTransaction(
      { serializedTransaction: this.deploymentTransaction as Hex }
    );

    if (!await this.isContractDeployed(this.proxyAddress as Hex)) {
      throw new Error('raw TX didn\'t deploy deployer!')
    }
  }

  async getDeployTransaction(ctrCode: string, salt: BigNumberish = 0): Promise<TransactionRequest> {
    await this.deployDeployer()
    const saltEncoded = pad(toHex(salt as Hex), { size: 32 })
    return {
      to: this.proxyAddress as Hex,
      data: concat([
        saltEncoded as Hex,
        ctrCode as Hex])
    }
  }

  async getDeterministicDeployAddress(ctrCode: string, salt: BigNumberish = 0): Promise<string> {
    // this method works only before the contract is already deployed:
    // return await this.provider.call(await this.getDeployTransaction(ctrCode, salt))
    const saltEncoded = pad(toHex(salt as Hex), { size: 32 })

    return '0x' + keccak256(concat([
      '0xff',
      this.proxyAddress as Hex,
      saltEncoded as Hex,
      keccak256(ctrCode as Hex) as Hex
    ])).slice(-40)
  }

  async deterministicDeploy(ctrCode: string, salt: BigNumberish = 0): Promise<string> {
    const addr = await this.getDeterministicDeployAddress(ctrCode, salt)
    if (!await this.isContractDeployed(addr as Hex)) {

      const transactionRequest = await this.getDeployTransaction(ctrCode, salt);

      //await this.provider.getSigner().sendTransaction(transactionRequest)

      await this.walletClient.sendTransaction({
        account: this.account,
        chain: this.publicClient.chain,
        to: transactionRequest.to as Hex,
        data: transactionRequest.data as Hex,
        kzg: undefined
      });

    }
    return addr
  }

  private static _instance?: DeterministicDeployer

  static init(walletClient: WalletClient, account: Account, publicClient: PublicClient): void {
    this._instance = new DeterministicDeployer(walletClient, account, publicClient)
  }

  static get instance(): DeterministicDeployer {
    if (this._instance == null) {
      throw new Error('must call "DeterministicDeployer.init(walletClient, account, publicClient)"')
    }
    return this._instance
  }
}
