interface Wallet {
    address: string;
    providerType: string;
}
interface WalletOptions {
    provider?: string;
}

export type { Wallet, WalletOptions };
