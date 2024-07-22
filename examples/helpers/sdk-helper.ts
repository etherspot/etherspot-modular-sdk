import { getViemAccount } from "../../src/sdk/common";
import { EtherspotBundler, ModularSdk } from "../../src";

export const generateModularSDKInstance = (privateKey: string, chainId: number, bundlerApiKey: string, index: number = 0) => {
    const modularSdk = new ModularSdk(
        getViemAccount(privateKey),
        {
            chainId: chainId,
            bundlerProvider: new EtherspotBundler(chainId, bundlerApiKey),
            index: index
        })

    console.log('address: ', modularSdk.getEOAAddress());

    return modularSdk;
}