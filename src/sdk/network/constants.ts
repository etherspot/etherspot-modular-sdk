import { NetworkConfig } from ".";

export enum NetworkNames {
  BaseSepolia = 'baseSepolia',
  Sepolia = 'sepolia',
  Optimism = 'optimism',
  Polygon = 'polygon',
  Arbitrum = 'arbitrum',
  ArbitrumSepolia = 'arbitrumSepolia',
  Chiado = 'chiado',
  Fuse = 'fuse',
  FuseSparknet = 'fuseSparknet',
  Gnosis = 'gnosis',
  KromaTestnet = 'kromaTestnet',
  Mainnet = 'mainnet',
  OptimismSepolia = 'optimismSepolia',
  Rootstock = 'rootstock',
  RootstockTestnet = 'rootstockTestnet',
  Mantle = 'Mantle',
  MantleSepolia = 'MantleSepolia',
  Avalanche = 'avalanche',
  Base = 'base',
  Bsc = 'bsc',
  BscTestnet = 'bscTestnet',
  Fuji = 'fuji',
  Linea = 'linea',
  LineaTestnet = 'lineaTestnet',
  FlareTestnet = 'flareTestnet',
  Flare = 'flare',
  ScrollSepolia = 'scrollSepolia',
  Scroll = 'scroll',
  Ancient8Testnet = 'ancient8Testnet',
  Ancient8 = 'ancient8',
  Amoy = 'amoy',
  XDCTestnet = 'xdcTestnet',
  XDCMainnet = 'xdcMainnet'
}

export const SupportedNetworks =
  [1, 10, 14, 30, 31, 50, 51, 56, 97, 100, 114, 122, 123, 137, 2357, 5000, 5003, 8453, 10200, 42161, 43113, 43114, 59140, 59144, 80002, 84532, 421614, 534351, 534352, 11155111, 11155420, 28122024, 888888888]

export const NETWORK_NAME_TO_CHAIN_ID: {
  [key: string]: number;
} = {
  [NetworkNames.BaseSepolia]: 84532,
  [NetworkNames.Sepolia]: 11155111,
  [NetworkNames.Optimism]: 10,
  [NetworkNames.Polygon]: 137,
  [NetworkNames.Arbitrum]: 42161,
  [NetworkNames.ArbitrumSepolia]: 421614,
  [NetworkNames.Chiado]: 10200,
  [NetworkNames.Fuse]: 122,
  [NetworkNames.FuseSparknet]: 123,
  [NetworkNames.Gnosis]: 100,
  [NetworkNames.KromaTestnet]: 2357,
  [NetworkNames.Mainnet]: 1,
  [NetworkNames.OptimismSepolia]: 11155420,
  [NetworkNames.Rootstock]: 30,
  [NetworkNames.RootstockTestnet]: 31,
  [NetworkNames.Mantle]: 5000,
  [NetworkNames.MantleSepolia]: 5003,
  [NetworkNames.Avalanche]: 43114,
  [NetworkNames.Base]: 8453,
  [NetworkNames.Bsc]: 56,
  [NetworkNames.BscTestnet]: 97,
  [NetworkNames.Fuji]: 43113,
  [NetworkNames.Linea]: 59144,
  [NetworkNames.LineaTestnet]: 59140,
  [NetworkNames.FlareTestnet]: 114,
  [NetworkNames.Flare]: 14,
  [NetworkNames.ScrollSepolia]: 534351,
  [NetworkNames.Scroll]: 534352,
  [NetworkNames.Ancient8Testnet]: 28122024,
  [NetworkNames.Ancient8]: 888888888,
  [NetworkNames.Amoy]: 80002,
  [NetworkNames.XDCTestnet]: 51,
  [NetworkNames.XDCMainnet]: 50,
};

export const onRamperAllNetworks = ['OPTIMISM', 'POLYGON', 'ARBITRUM', 'FUSE', 'GNOSIS', 'ETHEREUM']

export const Networks: {
  [key: string]: NetworkConfig
} = {
  [84532]: {
    chainId: 84532,
    bundler: 'https://testnet-rpc.etherspot.io/v2/84532',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0x94A29462652764B49fC26761Be541789ff34D787',
      bootstrap: '0x6613b79B733C80aDc70ec4d3C20EFf91d6405118',
      multipleOwnerECDSAValidator: '0xC0ae5a9D3F518cd2e4B4B6a0EE1537f167f993f3',
      erc20SessionKeyValidator: '',
    },
  },
  [11155111]: {
    chainId: 11155111,
    bundler: 'https://testnet-rpc.etherspot.io/v2/11155111',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0x94A29462652764B49fC26761Be541789ff34D787',
      bootstrap: '0x6613b79B733C80aDc70ec4d3C20EFf91d6405118',
      multipleOwnerECDSAValidator: '0xC0ae5a9D3F518cd2e4B4B6a0EE1537f167f993f3',
      erc20SessionKeyValidator: '0x22A55192a663591586241D42E603221eac49ed09',
    },
  },
  [80002]: {
    chainId: 80002,
    bundler: 'https://testnet-rpc.etherspot.io/v2/80002',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0x94A29462652764B49fC26761Be541789ff34D787',
      bootstrap: '0x6613b79B733C80aDc70ec4d3C20EFf91d6405118',
      multipleOwnerECDSAValidator: '0xC0ae5a9D3F518cd2e4B4B6a0EE1537f167f993f3',
      erc20SessionKeyValidator: '0x22A55192a663591586241D42E603221eac49ed09',
    },
  },
  [421614]: {
    chainId: 421614,
    bundler: 'https://testnet-rpc.etherspot.io/v2/421614',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0x94A29462652764B49fC26761Be541789ff34D787',
      bootstrap: '0x6613b79B733C80aDc70ec4d3C20EFf91d6405118',
      multipleOwnerECDSAValidator: '0xC0ae5a9D3F518cd2e4B4B6a0EE1537f167f993f3',
      erc20SessionKeyValidator: '',
    },
  },
  [11155420]: {
    chainId: 11155420,
    bundler: 'https://testnet-rpc.etherspot.io/v2/11155420',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0x94A29462652764B49fC26761Be541789ff34D787',
      bootstrap: '0x6613b79B733C80aDc70ec4d3C20EFf91d6405118',
      multipleOwnerECDSAValidator: '0xC0ae5a9D3F518cd2e4B4B6a0EE1537f167f993f3',
      erc20SessionKeyValidator: '',
    },
  }
};

export const DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS = "0xF4CDE8B11500ca9Ea108c5838DD26Ff1a4257a0c";
export const DEFAULT_BOOTSTRAP_ADDRESS = "0x6613b79B733C80aDc70ec4d3C20EFf91d6405118";
export const DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS = "0xC0ae5a9D3F518cd2e4B4B6a0EE1537f167f993f3";
export const DEFAULT_QUERY_PAGE_SIZE = 50;

export const CHAIN_ID_TO_NETWORK_NAME: { [key: number]: NetworkNames } = Object.entries(
  NETWORK_NAME_TO_CHAIN_ID,
).reduce(
  (result, [networkName, chainId]) => ({
    ...result,
    [chainId]: networkName,
  }),
  {},
);

export function getNetworkConfig(key: number) {
  return Networks[key];
}