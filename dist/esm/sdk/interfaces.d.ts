import { BundlerProviderLike } from './bundler/interface.js';

interface PaymasterApi {
    url: string;
    context?: any;
}
declare enum Factory {
    ETHERSPOT = "etherspot"
}
interface SdkOptions {
    chainId: number;
    bundlerProvider?: BundlerProviderLike;
    rpcProviderUrl?: string;
    factoryWallet?: Factory;
    walletFactoryAddress?: string;
    entryPointAddress?: string;
    accountAddress?: string;
    index?: number;
}

export { Factory, type PaymasterApi, type SdkOptions };
