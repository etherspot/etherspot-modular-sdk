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
}

export const SupportedNetworks =
  [1, 10, 14, 30, 31, 56, 97, 100, 114, 122, 123, 137, 2357, 5000, 5003, 8453, 10200, 42161, 43113, 43114, 59140, 59144, 80002, 84532, 421614, 534351, 534352, 11155111, 11155420, 28122024, 888888888]

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
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [11155111]: {
    chainId: 11155111,
    bundler: 'https://testnet-rpc.etherspot.io/v2/11155111',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [10]: {
    chainId: 10,
    bundler: 'https://rpc.etherspot.io/v2/10',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [137]: {
    chainId: 137,
    bundler: 'https://rpc.etherspot.io/v2/137',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [42161]: {
    chainId: 42161,
    bundler: 'https://rpc.etherspot.io/v2/42161',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [1]: {
    chainId: 1,
    bundler: 'https://rpc.etherspot.io/v2/1',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [10200]: {
    chainId: 10200,
    bundler: '',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [122]: {
    chainId: 122,
    bundler: 'https://rpc.etherspot.io/v2/122',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [123]: {
    chainId: 123,
    bundler: 'https://testnet-rpc.etherspot.io/v2/123',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [100]: {
    chainId: 100,
    bundler: 'https://rpc.etherspot.io/v2/100',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [2357]: {
    chainId: 2357,
    bundler: '',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [30]: {
    chainId: 30,
    bundler: 'https://rpc.etherspot.io/v2/30',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [31]: {
    chainId: 31,
    bundler: 'https://testnet-rpc.etherspot.io/v2/31',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [5000]: {
    chainId: 5000,
    bundler: 'https://rpc.etherspot.io/v2/5000',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [5003]: {
    chainId: 5003,
    bundler: 'https://testnet-rpc.etherspot.io/v2/5003',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [43114]: {
    chainId: 43114,
    bundler: 'https://rpc.etherspot.io/v2/43114',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [8453]: {
    chainId: 8453,
    bundler: 'https://rpc.etherspot.io/v2/8453',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [56]: {
    chainId: 56,
    bundler: 'https://rpc.etherspot.io/v2/56',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [97]: {
    chainId: 97,
    bundler: 'https://testnet-rpc.etherspot.io/v2/97',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [43113]: {
    chainId: 43113,
    bundler: '',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [59144]: {
    chainId: 59144,
    bundler: 'https://rpc.etherspot.io/v2/59144',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [59140]: {
    chainId: 59140,
    bundler: '',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [114]: {
    chainId: 114,
    bundler: 'https://testnet-rpc.etherspot.io/v2/114',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [14]: {
    chainId: 14,
    bundler: 'https://rpc.etherspot.io/v2/14',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [534351]: {
    chainId: 534351,
    bundler: 'https://testnet-rpc.etherspot.io/v2/534351',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [534352]: {
    chainId: 534352,
    bundler: 'https://rpc.etherspot.io/v2/534352',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [11155420]: {
    chainId: 11155420,
    bundler: 'https://testnet-rpc.etherspot.io/v2/11155420',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [28122024]: {
    chainId: 28122024,
    bundler: 'https://testnet-rpc.etherspot.io/v2/28122024',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [888888888]: {
    chainId: 888888888,
    bundler: '',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [80002]: {
    chainId: 80002,
    bundler: 'https://testnet-rpc.etherspot.io/v2/80002',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  },
  [421614]: {
    chainId: 421614,
    bundler: 'https://testnet-rpc.etherspot.io/v2/421614',
    contracts: {
      entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
      walletFactory: '0xf80D543Ca10B48AF07c65Ff508605c1737EFAF3F',
      bootstrap: '0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066',
      multipleOwnerECDSAValidator: '0x8c4496Ba340aFe5ac4148cfEA9ccbBCD54093143',
    },
  }
};

export const DEFAULT_BOOTSTRAP_ADDRESS = "0x1baCB2F1ef4fD02f02e32cCF70888D9Caeb5f066";
export const DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS = "0x609d3ED5F7D1707806327D198Cb480B93dD6E6b9";

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