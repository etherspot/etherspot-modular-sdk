import { getPublicClient, getViemAccount } from "../../src/sdk/common";
import { EtherspotBundler, ModularSdk } from "../../src";
import { Hex, http, parseAbi } from "viem";
import { erc20Abi } from "../../src/sdk/common/abis";

export const generateModularSDKInstance = (privateKey: string, chainId: number, bundlerApiKey: string, index: number = 0) => {
    const modularSdk = new ModularSdk(
        { privateKey: privateKey },
        {
            chainId: chainId,
            bundlerProvider: new EtherspotBundler(chainId, bundlerApiKey),
            index: index
        })

    return modularSdk;
}

export const getTokenMetaData = async (rpcProviderUrl: string, tokenAddress: string) => {
    const publicClient = getPublicClient({
        chainId: Number(process.env.CHAIN_ID),
        transport: http(rpcProviderUrl)
    });

    const symbol : string = await publicClient.readContract({
        address: tokenAddress as Hex,
        abi: parseAbi(erc20Abi),
        functionName: 'symbol',
        args: []
    }) as string;

    const decimal : number = await publicClient.readContract({
        address: tokenAddress as Hex,
        abi: parseAbi(erc20Abi),
        functionName: 'decimals',
        args: []
    }) as number;

    return { symbol , decimal };
}