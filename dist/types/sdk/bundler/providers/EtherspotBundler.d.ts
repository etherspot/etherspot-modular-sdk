import { BundlerProvider } from "../interface.js";
export declare class EtherspotBundler implements BundlerProvider {
    readonly url: string;
    readonly apiKey: string | undefined;
    readonly chainId: string;
    constructor(chainId: number, apiKey?: string, bundlerUrl?: string);
}
//# sourceMappingURL=EtherspotBundler.d.ts.map