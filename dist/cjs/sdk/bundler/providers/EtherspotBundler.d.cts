import { BundlerProvider } from '../interface.cjs';

declare class EtherspotBundler implements BundlerProvider {
    readonly url: string;
    readonly apiKey: string;
    readonly chainId: string;
    constructor(chainId: number, apiKey?: string, bundlerUrl?: string);
}

export { EtherspotBundler };
