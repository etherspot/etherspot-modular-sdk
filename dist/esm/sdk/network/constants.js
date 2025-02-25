import { bsc, gnosis } from "viem/chains";
import * as Chain from "viem/chains";
import { defineChain } from "viem";
export var NetworkNames;
(function (NetworkNames) {
    NetworkNames["BaseSepolia"] = "baseSepolia";
    NetworkNames["Sepolia"] = "sepolia";
    NetworkNames["Optimism"] = "optimism";
    NetworkNames["Polygon"] = "polygon";
    NetworkNames["Arbitrum"] = "arbitrum";
    NetworkNames["ArbitrumSepolia"] = "arbitrumSepolia";
    NetworkNames["Chiado"] = "chiado";
    NetworkNames["Fuse"] = "fuse";
    NetworkNames["FuseSparknet"] = "fuseSparknet";
    NetworkNames["Gnosis"] = "gnosis";
    NetworkNames["KromaTestnet"] = "kromaTestnet";
    NetworkNames["Mainnet"] = "mainnet";
    NetworkNames["OptimismSepolia"] = "optimismSepolia";
    NetworkNames["Rootstock"] = "rootstock";
    NetworkNames["RootstockTestnet"] = "rootstockTestnet";
    NetworkNames["Mantle"] = "Mantle";
    NetworkNames["MantleSepolia"] = "MantleSepolia";
    NetworkNames["Avalanche"] = "avalanche";
    NetworkNames["Base"] = "base";
    NetworkNames["Bsc"] = "bsc";
    NetworkNames["BscTestnet"] = "bscTestnet";
    NetworkNames["Fuji"] = "fuji";
    NetworkNames["Linea"] = "linea";
    NetworkNames["LineaTestnet"] = "lineaTestnet";
    NetworkNames["FlareTestnet"] = "flareTestnet";
    NetworkNames["Flare"] = "flare";
    NetworkNames["ScrollSepolia"] = "scrollSepolia";
    NetworkNames["Scroll"] = "scroll";
    NetworkNames["Ancient8Testnet"] = "ancient8Testnet";
    NetworkNames["Ancient8"] = "ancient8";
    NetworkNames["Amoy"] = "amoy";
    NetworkNames["XDCTestnet"] = "xdcTestnet";
    NetworkNames["XDCMainnet"] = "xdcMainnet";
    NetworkNames["CeloTestnet"] = "celoTestnet";
    NetworkNames["Celo"] = "celo";
    NetworkNames["SxNetworkTestnet"] = "sxNetworkTestnet";
})(NetworkNames || (NetworkNames = {}));
export const SupportedNetworks = [1, 10, 14, 30, 31, 50, 51, 56, 97, 100, 114, 122, 123, 137, 2357, 5000, 5003, 8453, 10200, 42161, 42220, 43113, 43114, 44787, 59140, 59144, 80002, 84532, 421614, 534351, 534352, 11155111, 11155420, 28122024, 79479957, 888888888];
export const NETWORK_NAME_TO_CHAIN_ID = {
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
    [NetworkNames.CeloTestnet]: 44787,
    [NetworkNames.Celo]: 42220,
    [NetworkNames.SxNetworkTestnet]: 79479957
};
export const Networks = {
    [84532]: {
        chainId: 84532,
        chain: Chain.baseSepolia,
        bundler: 'https://testnet-rpc.etherspot.io/v2/84532',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [11155111]: {
        chainId: 11155111,
        chain: Chain.sepolia,
        bundler: 'https://testnet-rpc.etherspot.io/v2/11155111',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '0x22A55192a663591586241D42E603221eac49ed09',
        },
    },
    [10]: {
        chainId: 10,
        // compilation issue for optimism mainnet, using custom config
        chain: Chain.optimism,
        bundler: 'https://rpc.etherspot.io/v2/10',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [137]: {
        chainId: 137,
        chain: Chain.polygon,
        bundler: 'https://rpc.etherspot.io/v2/137',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [42161]: {
        chainId: 42161,
        chain: Chain.arbitrum,
        bundler: 'https://rpc.etherspot.io/v2/42161',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [1]: {
        chainId: 1,
        chain: Chain.mainnet,
        bundler: 'https://rpc.etherspot.io/v2/1',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [10200]: {
        chainId: 10200,
        chain: null,
        bundler: '',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [122]: {
        chainId: 122,
        chain: Chain.fuse,
        bundler: 'https://rpc.etherspot.io/v2/122',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [123]: {
        chainId: 123,
        // TODO no-support for ultron mainnet
        chain: null,
        bundler: 'https://testnet-rpc.etherspot.io/v2/123',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [100]: {
        chainId: 100,
        chain: gnosis,
        bundler: 'https://rpc.etherspot.io/v2/100',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [2357]: {
        chainId: 2357,
        chain: null,
        bundler: '',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [30]: {
        chainId: 30,
        chain: Chain.rootstock,
        bundler: 'https://rpc.etherspot.io/v2/30',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [31]: {
        chainId: 31,
        chain: Chain.rootstockTestnet,
        bundler: 'https://testnet-rpc.etherspot.io/v2/31',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [5000]: {
        chainId: 5000,
        chain: Chain.mantle,
        bundler: 'https://rpc.etherspot.io/v2/5000',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [5003]: {
        chainId: 5003,
        chain: Chain.mantleSepoliaTestnet,
        bundler: 'https://testnet-rpc.etherspot.io/v2/5003',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [43114]: {
        chainId: 43114,
        chain: Chain.avalanche,
        bundler: 'https://rpc.etherspot.io/v2/43114',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [8453]: {
        chainId: 8453,
        chain: Chain.base,
        bundler: 'https://rpc.etherspot.io/v2/8453',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [56]: {
        chainId: 56,
        chain: bsc,
        bundler: 'https://rpc.etherspot.io/v2/56',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [97]: {
        chainId: 97,
        chain: Chain.bscTestnet,
        bundler: 'https://testnet-rpc.etherspot.io/v2/97',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [43113]: {
        chainId: 43113,
        chain: Chain.avalancheFuji,
        bundler: '',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [59144]: {
        chainId: 59144,
        chain: Chain.linea,
        bundler: 'https://rpc.etherspot.io/v2/59144',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [59140]: {
        chainId: 59140,
        chain: Chain.lineaGoerli,
        bundler: '',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [114]: {
        chainId: 114,
        chain: Chain.flareTestnet,
        bundler: 'https://testnet-rpc.etherspot.io/v2/114',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [14]: {
        chainId: 14,
        chain: Chain.flare,
        bundler: 'https://rpc.etherspot.io/v2/14',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [534351]: {
        chainId: 534351,
        chain: Chain.scrollSepolia,
        bundler: 'https://testnet-rpc.etherspot.io/v2/534351',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [534352]: {
        chainId: 534352,
        chain: Chain.scroll,
        bundler: 'https://rpc.etherspot.io/v2/534352',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [11155420]: {
        chainId: 11155420,
        chain: Chain.optimismSepolia,
        bundler: 'https://testnet-rpc.etherspot.io/v2/11155420',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [28122024]: {
        chainId: 28122024,
        chain: Chain.ancient8Sepolia,
        bundler: 'https://testnet-rpc.etherspot.io/v2/28122024',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [888888888]: {
        chainId: 888888888,
        chain: Chain.ancient8,
        bundler: 'https://rpc.etherspot.io/v2/888888888',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [80002]: {
        chainId: 80002,
        chain: Chain.polygonAmoy,
        bundler: 'https://testnet-rpc.etherspot.io/v2/80002',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '0x22A55192a663591586241D42E603221eac49ed09',
        },
    },
    [421614]: {
        chainId: 421614,
        chain: Chain.arbitrumSepolia,
        bundler: 'https://testnet-rpc.etherspot.io/v2/421614',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [51]: {
        chainId: 51,
        chain: Chain.xdcTestnet,
        bundler: 'https://testnet-rpc.etherspot.io/v2/51',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [50]: {
        chainId: 50,
        chain: Chain.xdc,
        bundler: 'https://rpc.etherspot.io/v2/50',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: '',
        },
    },
    [44787]: {
        chainId: 44787,
        chain: Chain.celoAlfajores,
        bundler: 'https://testnet-rpc.etherspot.io/v2/44787',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: ''
        }
    },
    [42220]: {
        chainId: 42220,
        chain: Chain.celo,
        bundler: 'https://rpc.etherspot.io/v2/42220',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: ''
        }
    },
    [79479957]: {
        chainId: 79479957,
        chain: defineChain({
            id: 79479957,
            name: "SX Rollup Testnet",
            nativeCurrency: {
                decimals: 18,
                name: 'SX',
                symbol: 'SX'
            },
            rpcUrls: {
                default: {
                    http: ['https://rpc.sx-rollup-testnet.t.raas.gelato.cloud/']
                }
            }
        }),
        bundler: 'https://testnet-rpc.etherspot.io/v2/79479957',
        contracts: {
            entryPoint: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
            walletFactory: '0x2A40091f044e48DEB5C0FCbc442E443F3341B451',
            bootstrap: '0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA',
            multipleOwnerECDSAValidator: '0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906',
            erc20SessionKeyValidator: ''
        }
    }
};
export const DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS = "0x22A55192a663591586241D42E603221eac49ed09";
export const DEFAULT_BOOTSTRAP_ADDRESS = "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA";
export const DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS = "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906";
export const DEFAULT_QUERY_PAGE_SIZE = 50;
export const CHAIN_ID_TO_NETWORK_NAME = Object.entries(NETWORK_NAME_TO_CHAIN_ID).reduce((result, [networkName, chainId]) => ({
    ...result,
    [chainId]: networkName,
}), {});
export function getNetworkConfig(key) {
    return Networks[key];
}
//# sourceMappingURL=constants.js.map