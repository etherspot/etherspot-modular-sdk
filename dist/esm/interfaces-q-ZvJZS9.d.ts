import { Chain } from 'viem/chains';

declare enum NetworkNames {
    BaseSepolia = "baseSepolia",
    Sepolia = "sepolia",
    Optimism = "optimism",
    Polygon = "polygon",
    Arbitrum = "arbitrum",
    ArbitrumSepolia = "arbitrumSepolia",
    Chiado = "chiado",
    Fuse = "fuse",
    FuseSparknet = "fuseSparknet",
    Gnosis = "gnosis",
    KromaTestnet = "kromaTestnet",
    Mainnet = "mainnet",
    OptimismSepolia = "optimismSepolia",
    Rootstock = "rootstock",
    RootstockTestnet = "rootstockTestnet",
    Mantle = "Mantle",
    MantleSepolia = "MantleSepolia",
    Avalanche = "avalanche",
    Base = "base",
    Bsc = "bsc",
    BscTestnet = "bscTestnet",
    Fuji = "fuji",
    Linea = "linea",
    LineaTestnet = "lineaTestnet",
    FlareTestnet = "flareTestnet",
    Flare = "flare",
    ScrollSepolia = "scrollSepolia",
    Scroll = "scroll",
    Ancient8Testnet = "ancient8Testnet",
    Ancient8 = "ancient8",
    Amoy = "amoy",
    XDCTestnet = "xdcTestnet",
    XDCMainnet = "xdcMainnet",
    CeloTestnet = "celoTestnet",
    Celo = "celo",
    SxNetworkTestnet = "sxNetworkTestnet"
}
declare const SupportedNetworks: number[];
declare const NETWORK_NAME_TO_CHAIN_ID: {
    [key: string]: number;
};
declare const Networks: {
    [key: string]: NetworkConfig;
};
declare const DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS = "0x22A55192a663591586241D42E603221eac49ed09";
declare const DEFAULT_BOOTSTRAP_ADDRESS = "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA";
declare const DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS = "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906";
declare const DEFAULT_QUERY_PAGE_SIZE = 50;
declare const CHAIN_ID_TO_NETWORK_NAME: {
    [key: number]: NetworkNames;
};
declare function getNetworkConfig(key: number): NetworkConfig;

interface Network {
    name: NetworkNames;
    chainId: number;
}
interface NetworkConfig {
    chainId: number;
    chain: Chain;
    bundler: string;
    contracts: {
        entryPoint: string;
        walletFactory: string;
        bootstrap: string;
        multipleOwnerECDSAValidator: string;
        erc20SessionKeyValidator: string;
    };
}

export { CHAIN_ID_TO_NETWORK_NAME as C, DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS as D, type Network as N, SupportedNetworks as S, type NetworkConfig as a, NETWORK_NAME_TO_CHAIN_ID as b, NetworkNames as c, Networks as d, DEFAULT_BOOTSTRAP_ADDRESS as e, DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS as f, DEFAULT_QUERY_PAGE_SIZE as g, getNetworkConfig as h };
