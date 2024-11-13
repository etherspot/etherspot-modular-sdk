import { encodeFunctionData, parseAbi } from 'viem';

export class EtherspotWalletFactoryAPI {
  static createAccount(
    factoryAddress: string,
    registry: string,
    owner: string,
    salt: number,
  ): string {
    const abi = ['function createAccount(address, _registry, address owner, uint256 salt) returns(address)'];
    const encodedData = encodeFunctionData({
      functionName: 'createAccount',
      abi: parseAbi(abi),
      args: [registry,
        owner,
        salt,],
    });
    return encodedData;
  }
}
