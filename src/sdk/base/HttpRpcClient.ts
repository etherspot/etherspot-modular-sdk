import { UserOperationStruct } from '../contracts/account-abstraction/contracts/core/BaseAccount';
import Debug from 'debug';
import { UserOperation, deepHexlify } from '../common/ERC4337Utils';
import { Gas } from '../common';
import { ErrorHandler } from '../errorHandler/errorHandler.service';
import { resolveProperties } from '../common/utils/userop-utils';
import {
  Hex,
  WalletClient,
  type PublicClient,
} from "viem"
const debug = Debug('aa.rpc');

export class HttpRpcClient {
  private readonly publicClient: PublicClient;
  private readonly walletClient: WalletClient;
  initializing: Promise<void>;

  constructor(readonly bundlerUrl: string, readonly entryPointAddress: string, readonly chainId: number, walletClient: WalletClient, publicClient: PublicClient) {
    try {
      console.log('bundlerUrl: ', bundlerUrl);
      this.publicClient = publicClient;
      this.walletClient = walletClient;

      this.initializing = this.validateChainId();
    } catch (err) {
      if (err.message.includes('failed response'))
        throw new ErrorHandler(err.message, 2);
      if (err.message.includes('timeout'))
        throw new ErrorHandler(err.message, 3);
      throw new Error(err.message);
    }
  }

  async validateChainId(): Promise<void> {
    try {
      // validate chainId is in sync with expected chainid
      const chain = await this.publicClient.request({
        method: 'eth_chainId',
        params: []
      });
      console.log('chain: ', chain);
      const bundlerChain = parseInt(chain as Hex, 16);
      console.log('bundlerChain: ', bundlerChain);
      if (bundlerChain !== this.chainId) {
        throw new Error(
          `bundler ${this.bundlerUrl} is on chainId ${bundlerChain}, but provider is on chainId ${this.chainId}`,
        );
      }
    } catch (err) {
      if (err.message.includes('failed response'))
        throw new ErrorHandler(err.message, 400);
      if (err.message.includes('timeout'))
        throw new ErrorHandler(err.message, 404);
      throw new Error(err.message);
    }
  }

  async getVerificationGasInfo(tx: UserOperationStruct): Promise<any> {
    const hexifiedUserOp = deepHexlify(await resolveProperties(tx));
    try {
      const response = await this.publicClient.request({
        method: 'eth_estimateUserOperationGas',
        params: [hexifiedUserOp, this.entryPointAddress]
      });
      return response;
    } catch (err) {
      const body = JSON.parse(err.body);
      if (body?.error?.code) {
        throw new ErrorHandler(body.error.message, body.error.code)
      }
      throw new Error(err.message);
    }
  }

  /**
   * send a UserOperation to the bundler
   * @param userOp1
   * @return userOpHash the id of this operation, for getUserOperationTransaction
   */
  async sendUserOpToBundler(userOp1: UserOperation): Promise<string> {
    try {
      await this.initializing;
      const hexifiedUserOp = deepHexlify(await resolveProperties(userOp1));
      const jsonRequestData: [UserOperationStruct, string] = [hexifiedUserOp, this.entryPointAddress];
      await this.printUserOperation('eth_sendUserOperation', jsonRequestData);
      //return await this.userOpJsonRpcProvider.send('eth_sendUserOperation', [hexifiedUserOp, this.entryPointAddress]);
      return await this.publicClient.request({
        method: 'eth_sendUserOperation',
        params: [hexifiedUserOp, this.entryPointAddress]
      });
    } catch (err) {
      const body = JSON.parse(err.body);
      if (body?.error?.code) {
        throw new ErrorHandler(body.error.message, body.error.code)
      }
      throw new Error(err);
    }
  }

  async sendAggregatedOpsToBundler(userOps1: UserOperationStruct[]): Promise<string> {
    try {
      const hexifiedUserOps = await Promise.all(userOps1.map(async (userOp1) => await resolveProperties(userOp1)));
      // return await this.userOpJsonRpcProvider.send('eth_sendAggregatedUserOperation', [
      //   hexifiedUserOps,
      //   this.entryPointAddress,
      // ]);
      return await this.publicClient.request({
        method: 'eth_sendAggregatedUserOperation',
        params: [hexifiedUserOps, this.entryPointAddress]
      });
    } catch (err) {
      const body = JSON.parse(err.body);
      if (body?.error?.code) {
        throw new ErrorHandler(body.error.message, body.error.code)
      }
      throw new Error(err);
    }
  }

  async getSkandhaGasPrice(): Promise<Gas> {
    try {
      const skandhaGasPriceResponse: any = await this.publicClient.request({
        method: 'skandha_getGasPrice',
        params: []
      });
      const { maxFeePerGas, maxPriorityFeePerGas } = skandhaGasPriceResponse;
      return { maxFeePerGas, maxPriorityFeePerGas };
    } catch (err) {
      console.warn(
        "getGas: skandha_getGasPrice failed, falling back to legacy gas price."
      );
      const gas = await this.publicClient.getGasPrice();
      console.log('gas: ', gas);
      return { maxFeePerGas: gas, maxPriorityFeePerGas: gas };
    }
  }

  async getBundlerVersion(): Promise<string> {
    try {
      const version = await this.publicClient.request({
        method: 'web3_clientVersion',
        params: []
      });
      return version as string;
    } catch (err) {
      return null;
    }
  }

  async getUserOpsReceipt(uoHash: string): Promise<any> {
    try {
      const userOpsReceipt = await this.publicClient.request({
        method: 'eth_getUserOperationReceipt',
        params: [uoHash]
      });
      return userOpsReceipt;
    } catch (err) {
      return null;
    }
  }

  private async printUserOperation(
    method: string,
    [userOp1, entryPointAddress]: [UserOperationStruct, string],
  ): Promise<void> {
    const userOp = await resolveProperties(userOp1);
    debug(
      'sending',
      method,
      {
        ...userOp,
        // initCode: (userOp.initCode ?? '').length,
        // callData: (userOp.callData ?? '').length
      },
      entryPointAddress,
    );
  }
}
