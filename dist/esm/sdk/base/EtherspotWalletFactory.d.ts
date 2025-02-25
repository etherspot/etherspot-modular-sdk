declare class EtherspotWalletFactoryAPI {
    static createAccount(factoryAddress: string, registry: string, owner: string, salt: number): string;
}

export { EtherspotWalletFactoryAPI };
