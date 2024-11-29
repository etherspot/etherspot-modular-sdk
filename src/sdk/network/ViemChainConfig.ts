import { defineChain } from "viem"

let sourceId = 1 // mainnet

export const optimism = /*#__PURE__*/ defineChain({
  id: 10,
  name: 'OP Mainnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.optimism.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Optimism Explorer',
      url: 'https://optimistic.etherscan.io',
      apiUrl: 'https://api-optimistic.etherscan.io/api',
    },
  },
  contracts: {
    disputeGameFactory: {
      [sourceId]: {
        address: '0xe5965Ab5962eDc7477C8520243A95517CD252fA9',
      },
    },
    l2OutputOracle: {
      [sourceId]: {
        address: '0xdfe97868233d1aa22e815a266982f2cf17685a27',
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 4286263,
    },
    portal: {
      [sourceId]: {
        address: '0xbEb5Fc579115071764c7423A4f12eDde41f106Ed',
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1',
      },
    },
  },
  sourceId,
})

export const base = /*#__PURE__*/ defineChain({
  id: 8453,
  name: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://basescan.org',
      apiUrl: 'https://api.basescan.org/api',
    },
  },
  contracts: {
    l2OutputOracle: {
      [sourceId]: {
        address: '0x56315b90c40730925ec5485cf004d835058518A0',
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
    portal: {
      [sourceId]: {
        address: '0x49048044D57e1C92A77f79988d21Fa8fAF74E97e',
        blockCreated: 17482143,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0x3154Cf16ccdb4C6d922629664174b904d80F2C35',
        blockCreated: 17482143,
      },
    },
  },
  sourceId,
})

export const ancient8 = /*#__PURE__*/ defineChain({
  id: 888888888,
  name: 'Ancient8',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.ancient8.gg'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ancient8 explorer',
      url: 'https://scan.ancient8.gg',
      apiUrl: 'https://scan.ancient8.gg/api',
    },
  },
  contracts: {
    l2OutputOracle: {
      [sourceId]: {
        address: '0xB09DC08428C8b4EFB4ff9C0827386CDF34277996',
      },
    },
    portal: {
      [sourceId]: {
        address: '0x639F2AECE398Aa76b07e59eF6abe2cFe32bacb68',
        blockCreated: 19070571,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0xd5e3eDf5b68135D559D572E26bF863FBC1950033',
        blockCreated: 19070571,
      },
    },
  },
  sourceId,
})

sourceId = 11_155_111 // sepolia

export const optimismSepolia = /*#__PURE__*/ defineChain({
  id: 11155420,
  name: 'OP Sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://sepolia.optimism.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://optimism-sepolia.blockscout.com',
      apiUrl: 'https://optimism-sepolia.blockscout.com/api',
    },
  },
  contracts: {
    disputeGameFactory: {
      [sourceId]: {
        address: '0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1',
      },
    },
    l2OutputOracle: {
      [sourceId]: {
        address: '0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F',
      },
    },
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1620204,
    },
    portal: {
      [sourceId]: {
        address: '0x16Fc5058F25648194471939df75CF27A2fdC48BC',
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1',
      },
    },
  },
  testnet: true,
  sourceId,
})

export const ancient8Sepolia = /*#__PURE__*/ defineChain({
  id: 28122024,
  name: 'Ancient8 Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpcv2-testnet.ancient8.gg'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ancient8 Celestia Testnet explorer',
      url: 'https://scanv2-testnet.ancient8.gg',
      apiUrl: 'https://scanv2-testnet.ancient8.gg/api',
    },
  },
  contracts: {
    l2OutputOracle: {
      [sourceId]: {
        address: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
      },
    },
    portal: {
      [sourceId]: {
        address: '0xfa1d9E26A6aCD7b22115D27572c1221B9803c960',
        blockCreated: 4972908,
      },
    },
    l1StandardBridge: {
      [sourceId]: {
        address: '0xF6Bc0146d3c74D48306e79Ae134A260E418C9335',
        blockCreated: 4972908,
      },
    },
  },
  sourceId,
})

// export const baseSepolia = /*#__PURE__*/ defineChain({
//   id: 84532,
//   network: 'base-sepolia',
//   name: 'Base Sepolia',
//   nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
//   rpcUrls: {
//     default: {
//       http: ['https://sepolia.base.org'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Basescan',
//       url: 'https://sepolia.basescan.org',
//       apiUrl: 'https://api-sepolia.basescan.org/api',
//     },
//   },
//   contracts: {
//     chainConfig: chainConfig,
//     l2OutputOracle: {
//       [sourceId]: {
//         address: '0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254',
//       },
//     },
//     portal: {
//       [sourceId]: {
//         address: '0x49f53e41452c74589e85ca1677426ba426459e85',
//         blockCreated: 4446677,
//       },
//     },
//     l1StandardBridge: {
//       [sourceId]: {
//         address: '0xfd0Bf71F60660E2f608ed56e1659C450eB113120',
//         blockCreated: 4446677,
//       },
//     },
//     multicall3: {
//       address: '0xca11bde05977b3631167028862be2a173976ca11',
//       blockCreated: 1059647,
//     },
//   },
//   testnet: true,
//   sourceId,
// })