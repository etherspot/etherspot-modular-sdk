import {
  AccountNotFoundError,
  defineBlock,
  defineChain,
  defineTransaction,
  defineTransactionReceipt,
  formatLog,
  formatTransaction,
  serializeAccessList,
  serializeTransaction,
  sha256,
  toRlp,
  toYParitySignatureArray
} from "./chunk-VOPA75Q5.js";
import {
  BaseError,
  FeeCapTooHighError,
  InvalidAddressError,
  InvalidChainIdError,
  TipAboveFeeCapError,
  assertRequest,
  concatHex,
  defineTransactionRequest,
  extract,
  formatTransactionRequest,
  getCallError,
  hexToBigInt,
  hexToBytes,
  hexToNumber,
  isAddress,
  maxUint16,
  maxUint256,
  numberToHex,
  pad,
  parseAccount,
  toBytes,
  toHex,
  trim
} from "./chunk-5ZBZ6BDF.js";
import {
  __export
} from "./chunk-LQXP7TCC.js";

// node_modules/viem/_esm/chains/index.js
var chains_exports = {};
__export(chains_exports, {
  abey: () => abey,
  abstractTestnet: () => abstractTestnet,
  acala: () => acala,
  acria: () => acria,
  adf: () => adf,
  aioz: () => aioz,
  alienx: () => alienx,
  alienxHalTestnet: () => alienxHalTestnet,
  ancient8: () => ancient8,
  ancient8Sepolia: () => ancient8Sepolia,
  anvil: () => anvil,
  apeChain: () => apeChain,
  apexTestnet: () => apexTestnet,
  arbitrum: () => arbitrum,
  arbitrumGoerli: () => arbitrumGoerli,
  arbitrumNova: () => arbitrumNova,
  arbitrumSepolia: () => arbitrumSepolia,
  areonNetwork: () => areonNetwork,
  areonNetworkTestnet: () => areonNetworkTestnet,
  artelaTestnet: () => artelaTestnet,
  assetChain: () => assetChain,
  assetChainTestnet: () => assetChainTestnet,
  astar: () => astar,
  astarZkEVM: () => astarZkEVM,
  astarZkyoto: () => astarZkyoto,
  atletaOlympia: () => atletaOlympia,
  aurora: () => aurora,
  auroraTestnet: () => auroraTestnet,
  auroria: () => auroria,
  avalanche: () => avalanche,
  avalancheFuji: () => avalancheFuji,
  b3: () => b3,
  b3Sepolia: () => b3Sepolia,
  bahamut: () => bahamut,
  base: () => base,
  baseGoerli: () => baseGoerli,
  baseSepolia: () => baseSepolia,
  beam: () => beam,
  beamTestnet: () => beamTestnet,
  bearNetworkChainMainnet: () => bearNetworkChainMainnet,
  bearNetworkChainTestnet: () => bearNetworkChainTestnet,
  berachainTestnet: () => berachainTestnet,
  berachainTestnetbArtio: () => berachainTestnetbArtio,
  bevmMainnet: () => bevmMainnet,
  bifrost: () => bifrost,
  bitTorrent: () => bitTorrent,
  bitTorrentTestnet: () => bitTorrentTestnet,
  bitgert: () => bitgert,
  bitkub: () => bitkub,
  bitkubTestnet: () => bitkubTestnet,
  bitlayer: () => bitlayer,
  bitlayerTestnet: () => bitlayerTestnet,
  bitrock: () => bitrock,
  blast: () => blast,
  blastSepolia: () => blastSepolia,
  bob: () => bob,
  bobSepolia: () => bobSepolia,
  boba: () => boba,
  bobaSepolia: () => bobaSepolia,
  boolBetaMainnet: () => boolBetaMainnet,
  botanixTestnet: () => botanixTestnet,
  bounceBit: () => bounceBit,
  bounceBitTestnet: () => bounceBitTestnet,
  bronos: () => bronos,
  bronosTestnet: () => bronosTestnet,
  bsc: () => bsc,
  bscGreenfield: () => bscGreenfield,
  bscTestnet: () => bscTestnet,
  bsquared: () => bsquared,
  bsquaredTestnet: () => bsquaredTestnet,
  btr: () => btr,
  btrTestnet: () => btrTestnet,
  bxn: () => bxn,
  bxnTestnet: () => bxnTestnet,
  cannon: () => cannon,
  canto: () => canto,
  celo: () => celo,
  celoAlfajores: () => celoAlfajores,
  chang: () => chang,
  chiliz: () => chiliz,
  chips: () => chips,
  classic: () => classic,
  coinbit: () => coinbit,
  coinex: () => coinex,
  confluxESpace: () => confluxESpace,
  confluxESpaceTestnet: () => confluxESpaceTestnet,
  coreDao: () => coreDao,
  corn: () => corn,
  cornTestnet: () => cornTestnet,
  crab: () => crab,
  cronos: () => cronos,
  cronosTestnet: () => cronosTestnet,
  cronoszkEVM: () => cronoszkEVM,
  cronoszkEVMTestnet: () => cronoszkEVMTestnet,
  crossbell: () => crossbell,
  curtis: () => curtis,
  cyber: () => cyber,
  cyberTestnet: () => cyberTestnet,
  darwinia: () => darwinia,
  dchain: () => dchain,
  dchainTestnet: () => dchainTestnet,
  defichainEvm: () => defichainEvm,
  defichainEvmTestnet: () => defichainEvmTestnet,
  degen: () => degen,
  dfk: () => dfk,
  diode: () => diode,
  disChain: () => disChain,
  dodochainTestnet: () => dodochainTestnet,
  dogechain: () => dogechain,
  dosChain: () => dosChain,
  dosChainTestnet: () => dosChainTestnet,
  dreyerxMainnet: () => dreyerxMainnet,
  dreyerxTestnet: () => dreyerxTestnet,
  dustboyIoT: () => dustboyIoT,
  dymension: () => dymension,
  edgeless: () => edgeless,
  edgelessTestnet: () => edgelessTestnet,
  edgeware: () => edgeware,
  edgewareTestnet: () => edgewareTestnet,
  ekta: () => ekta,
  ektaTestnet: () => ektaTestnet,
  elastos: () => elastos,
  elastosTestnet: () => elastosTestnet,
  electroneum: () => electroneum,
  electroneumTestnet: () => electroneumTestnet,
  elysiumTestnet: () => elysiumTestnet,
  energy: () => energy,
  enuls: () => enuls,
  eon: () => eon,
  eos: () => eos,
  eosTestnet: () => eosTestnet,
  etherlink: () => etherlink,
  etherlinkTestnet: () => etherlinkTestnet,
  evmos: () => evmos,
  evmosTestnet: () => evmosTestnet,
  excelonMainnet: () => excelonMainnet,
  expanse: () => expanse,
  fantom: () => fantom,
  fantomSonicTestnet: () => fantomSonicTestnet,
  fantomTestnet: () => fantomTestnet,
  fibo: () => fibo,
  filecoin: () => filecoin,
  filecoinCalibration: () => filecoinCalibration,
  filecoinHyperspace: () => filecoinHyperspace,
  fireChain: () => fireChain,
  flare: () => flare,
  flareTestnet: () => flareTestnet,
  flowMainnet: () => flowMainnet,
  flowPreviewnet: () => flowPreviewnet,
  flowTestnet: () => flowTestnet,
  fluence: () => fluence,
  fluenceStage: () => fluenceStage,
  fluenceTestnet: () => fluenceTestnet,
  forma: () => forma,
  foundry: () => foundry,
  fraxtal: () => fraxtal,
  fraxtalTestnet: () => fraxtalTestnet,
  funkiMainnet: () => funkiMainnet,
  funkiSepolia: () => funkiSepolia,
  fuse: () => fuse,
  fuseSparknet: () => fuseSparknet,
  fusion: () => fusion,
  fusionTestnet: () => fusionTestnet,
  garnet: () => garnet,
  geist: () => geist,
  genesys: () => genesys,
  glideL1Protocol: () => glideL1Protocol,
  glideL2Protocol: () => glideL2Protocol,
  gnosis: () => gnosis,
  gnosisChiado: () => gnosisChiado,
  goChain: () => goChain,
  gobi: () => gobi,
  godwoken: () => godwoken,
  goerli: () => goerli,
  gravity: () => gravity,
  guruNetwork: () => guruNetwork,
  guruTestnet: () => guruTestnet,
  ham: () => ham,
  haqqMainnet: () => haqqMainnet,
  haqqTestedge2: () => haqqTestedge2,
  hardhat: () => hardhat,
  harmonyOne: () => harmonyOne,
  hashkeyTestnet: () => hashkeyTestnet,
  hedera: () => hedera,
  hederaPreviewnet: () => hederaPreviewnet,
  hederaTestnet: () => hederaTestnet,
  hela: () => hela,
  hemiSepolia: () => hemiSepolia,
  holesky: () => holesky,
  hpb: () => hpb,
  hychain: () => hychain,
  hychainTestnet: () => hychainTestnet,
  iSunCoin: () => iSunCoin,
  idchain: () => idchain,
  immutableZkEvm: () => immutableZkEvm,
  immutableZkEvmTestnet: () => immutableZkEvmTestnet,
  inEVM: () => inEVM,
  inkSepolia: () => inkSepolia,
  iota: () => iota,
  iotaTestnet: () => iotaTestnet,
  iotex: () => iotex,
  iotexTestnet: () => iotexTestnet,
  jbc: () => jbc,
  jbcTestnet: () => jbcTestnet,
  kaia: () => kaia,
  kairos: () => kairos,
  kakarotSepolia: () => kakarotSepolia,
  kakarotStarknetSepolia: () => kakarotStarknetSepolia,
  kardiaChain: () => kardiaChain,
  karura: () => karura,
  kava: () => kava,
  kavaTestnet: () => kavaTestnet,
  kcc: () => kcc,
  kinto: () => kinto,
  klaytn: () => klaytn,
  klaytnBaobab: () => klaytnBaobab,
  koi: () => koi,
  kroma: () => kroma,
  kromaSepolia: () => kromaSepolia,
  l3x: () => l3x,
  l3xTestnet: () => l3xTestnet,
  lavita: () => lavita,
  lightlinkPegasus: () => lightlinkPegasus,
  lightlinkPhoenix: () => lightlinkPhoenix,
  linea: () => linea,
  lineaGoerli: () => lineaGoerli,
  lineaSepolia: () => lineaSepolia,
  lineaTestnet: () => lineaTestnet,
  lisk: () => lisk,
  liskSepolia: () => liskSepolia,
  localhost: () => localhost,
  loop: () => loop,
  lukso: () => lukso,
  luksoTestnet: () => luksoTestnet,
  lycan: () => lycan,
  lyra: () => lyra,
  mainnet: () => mainnet,
  mandala: () => mandala,
  manta: () => manta,
  mantaSepoliaTestnet: () => mantaSepoliaTestnet,
  mantaTestnet: () => mantaTestnet,
  mantle: () => mantle,
  mantleSepoliaTestnet: () => mantleSepoliaTestnet,
  mantleTestnet: () => mantleTestnet,
  mapProtocol: () => mapProtocol,
  matchain: () => matchain,
  matchainTestnet: () => matchainTestnet,
  mchVerse: () => mchVerse,
  mekong: () => mekong,
  meld: () => meld,
  merlin: () => merlin,
  metachain: () => metachain,
  metachainIstanbul: () => metachainIstanbul,
  metadium: () => metadium,
  metalL2: () => metalL2,
  meter: () => meter,
  meterTestnet: () => meterTestnet,
  metis: () => metis,
  metisGoerli: () => metisGoerli,
  mev: () => mev,
  mevTestnet: () => mevTestnet,
  mint: () => mint,
  mintSepoliaTestnet: () => mintSepoliaTestnet,
  mode: () => mode,
  modeTestnet: () => modeTestnet,
  moonbaseAlpha: () => moonbaseAlpha,
  moonbeam: () => moonbeam,
  moonbeamDev: () => moonbeamDev,
  moonriver: () => moonriver,
  morph: () => morph,
  morphHolesky: () => morphHolesky,
  morphSepolia: () => morphSepolia,
  nahmii: () => nahmii,
  nautilus: () => nautilus,
  neonDevnet: () => neonDevnet,
  neonMainnet: () => neonMainnet,
  nexi: () => nexi,
  nexilix: () => nexilix,
  oasisTestnet: () => oasisTestnet,
  oasys: () => oasys,
  odysseyTestnet: () => odysseyTestnet,
  okc: () => okc,
  omax: () => omax,
  oneWorld: () => oneWorld,
  oortMainnetDev: () => oortMainnetDev,
  opBNB: () => opBNB,
  opBNBTestnet: () => opBNBTestnet,
  optimism: () => optimism,
  optimismGoerli: () => optimismGoerli,
  optimismSepolia: () => optimismSepolia,
  optopia: () => optopia,
  optopiaTestnet: () => optopiaTestnet,
  orderly: () => orderly,
  orderlySepolia: () => orderlySepolia,
  otimDevnet: () => otimDevnet,
  palm: () => palm,
  palmTestnet: () => palmTestnet,
  pgn: () => pgn,
  pgnTestnet: () => pgnTestnet,
  phoenix: () => phoenix,
  planq: () => planq,
  playfiAlbireo: () => playfiAlbireo,
  plinga: () => plinga,
  plumeTestnet: () => plumeTestnet,
  polterTestnet: () => polterTestnet,
  polygon: () => polygon,
  polygonAmoy: () => polygonAmoy,
  polygonMumbai: () => polygonMumbai,
  polygonZkEvm: () => polygonZkEvm,
  polygonZkEvmCardona: () => polygonZkEvmCardona,
  polygonZkEvmTestnet: () => polygonZkEvmTestnet,
  pulsechain: () => pulsechain,
  pulsechainV4: () => pulsechainV4,
  qMainnet: () => qMainnet,
  qTestnet: () => qTestnet,
  ql1: () => ql1,
  real: () => real,
  redbellyMainnet: () => redbellyMainnet,
  redbellyTestnet: () => redbellyTestnet,
  redstone: () => redstone,
  rei: () => rei,
  reyaNetwork: () => reyaNetwork,
  rollux: () => rollux,
  rolluxTestnet: () => rolluxTestnet,
  ronin: () => ronin,
  root: () => root,
  rootPorcini: () => rootPorcini,
  rootstock: () => rootstock,
  rootstockTestnet: () => rootstockTestnet,
  rss3: () => rss3,
  rss3Sepolia: () => rss3Sepolia,
  saakuru: () => saakuru,
  saigon: () => saigon,
  sanko: () => sanko,
  sapphire: () => sapphire,
  sapphireTestnet: () => sapphireTestnet,
  satoshiVM: () => satoshiVM,
  satoshiVMTestnet: () => satoshiVMTestnet,
  scroll: () => scroll,
  scrollSepolia: () => scrollSepolia,
  sei: () => sei,
  seiDevnet: () => seiDevnet,
  seiTestnet: () => seiTestnet,
  sepolia: () => sepolia,
  shape: () => shape,
  shapeSepolia: () => shapeSepolia,
  shardeumSphinx: () => shardeumSphinx,
  shibarium: () => shibarium,
  shibariumTestnet: () => shibariumTestnet,
  shiden: () => shiden,
  shimmer: () => shimmer,
  shimmerTestnet: () => shimmerTestnet,
  silicon: () => silicon,
  siliconSepolia: () => siliconSepolia,
  sixProtocol: () => sixProtocol,
  skaleBlockBrawlers: () => skaleBlockBrawlers,
  skaleCalypso: () => skaleCalypso,
  skaleCalypsoTestnet: () => skaleCalypsoTestnet,
  skaleCryptoBlades: () => skaleCryptoBlades,
  skaleCryptoColosseum: () => skaleCryptoColosseum,
  skaleEuropa: () => skaleEuropa,
  skaleEuropaTestnet: () => skaleEuropaTestnet,
  skaleExorde: () => skaleExorde,
  skaleHumanProtocol: () => skaleHumanProtocol,
  skaleNebula: () => skaleNebula,
  skaleNebulaTestnet: () => skaleNebulaTestnet,
  skaleRazor: () => skaleRazor,
  skaleTitan: () => skaleTitan,
  skaleTitanTestnet: () => skaleTitanTestnet,
  sketchpad: () => sketchpad,
  snax: () => snax,
  snaxTestnet: () => snaxTestnet,
  soneiumMinato: () => soneiumMinato,
  songbird: () => songbird,
  songbirdTestnet: () => songbirdTestnet,
  sonicTestnet: () => sonicTestnet,
  sophon: () => sophon,
  sophonTestnet: () => sophonTestnet,
  spicy: () => spicy,
  step: () => step,
  storyOdyssey: () => storyOdyssey,
  storyTestnet: () => storyTestnet,
  stratis: () => stratis,
  superlumio: () => superlumio,
  superposition: () => superposition,
  swan: () => swan,
  swanProximaTestnet: () => swanProximaTestnet,
  swanSaturnTestnet: () => swanSaturnTestnet,
  swissdlt: () => swissdlt,
  syscoin: () => syscoin,
  syscoinTestnet: () => syscoinTestnet,
  taiko: () => taiko,
  taikoHekla: () => taikoHekla,
  taikoJolnir: () => taikoJolnir,
  taikoKatla: () => taikoKatla,
  taikoTestnetSepolia: () => taikoTestnetSepolia,
  taraxa: () => taraxa,
  taraxaTestnet: () => taraxaTestnet,
  telcoinTestnet: () => telcoinTestnet,
  telos: () => telos,
  telosTestnet: () => telosTestnet,
  tenet: () => tenet,
  thaiChain: () => thaiChain,
  that: () => that,
  theta: () => theta,
  thetaTestnet: () => thetaTestnet,
  thunderCore: () => thunderCore,
  thunderTestnet: () => thunderTestnet,
  tiktrixTestnet: () => tiktrixTestnet,
  tomb: () => tomb,
  tron: () => tron,
  ubiq: () => ubiq,
  ultron: () => ultron,
  ultronTestnet: () => ultronTestnet,
  unichainSepolia: () => unichainSepolia,
  unique: () => unique,
  uniqueOpal: () => uniqueOpal,
  uniqueQuartz: () => uniqueQuartz,
  unreal: () => unreal,
  vanar: () => vanar,
  vechain: () => vechain,
  velas: () => velas,
  viction: () => viction,
  victionTestnet: () => victionTestnet,
  vision: () => vision,
  visionTestnet: () => visionTestnet,
  wanchain: () => wanchain,
  wanchainTestnet: () => wanchainTestnet,
  weaveVMAlphanet: () => weaveVMAlphanet,
  wemix: () => wemix,
  wemixTestnet: () => wemixTestnet,
  worldLand: () => worldLand,
  worldchain: () => worldchain,
  worldchainSepolia: () => worldchainSepolia,
  x1Testnet: () => xLayerTestnet,
  xLayer: () => xLayer,
  xLayerTestnet: () => xLayerTestnet,
  xai: () => xai,
  xaiTestnet: () => xaiTestnet,
  xdc: () => xdc,
  xdcTestnet: () => xdcTestnet,
  xrSepolia: () => xrSepolia,
  yooldoVerse: () => yooldoVerse,
  yooldoVerseTestnet: () => yooldoVerseTestnet,
  zenchainTestnet: () => zenchainTestnet,
  zeniq: () => zeniq,
  zetachain: () => zetachain,
  zetachainAthensTestnet: () => zetachainAthensTestnet,
  zhejiang: () => zhejiang,
  zilliqa: () => zilliqa,
  zilliqaTestnet: () => zilliqaTestnet,
  zircuit: () => zircuit,
  zircuitTestnet: () => zircuitTestnet,
  zkFair: () => zkFair,
  zkFairTestnet: () => zkFairTestnet,
  zkLinkNova: () => zkLinkNova,
  zkLinkNovaSepoliaTestnet: () => zkLinkNovaSepoliaTestnet,
  zkSync: () => zksync,
  zkSyncInMemoryNode: () => zksyncInMemoryNode,
  zkSyncLocalNode: () => zksyncLocalNode,
  zkSyncSepoliaTestnet: () => zksyncSepoliaTestnet,
  zksync: () => zksync,
  zksyncInMemoryNode: () => zksyncInMemoryNode,
  zksyncLocalCustomHyperchain: () => zksyncLocalCustomHyperchain,
  zksyncLocalHyperchain: () => zksyncLocalHyperchain,
  zksyncLocalHyperchainL1: () => zksyncLocalHyperchainL1,
  zksyncLocalNode: () => zksyncLocalNode,
  zksyncSepoliaTestnet: () => zksyncSepoliaTestnet,
  zora: () => zora,
  zoraSepolia: () => zoraSepolia,
  zoraTestnet: () => zoraTestnet
});

// node_modules/viem/_esm/chains/definitions/abey.js
var abey = /* @__PURE__ */ defineChain({
  id: 179,
  name: "ABEY Mainnet",
  nativeCurrency: { name: "ABEY", symbol: "ABEY", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.abeychain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Abey Scan",
      url: "https://abeyscan.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/zksync/constants/number.js
var gasPerPubdataDefault = 50000n;
var maxBytecodeSize = maxUint16 * 32n;

// node_modules/viem/_esm/zksync/formatters.js
var formatters = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatters.transaction?.format(transaction);
        if (formatted.typeHex === "0x71")
          formatted.type = "eip712";
        else if (formatted.typeHex === "0xff")
          formatted.type = "priority";
        return formatted;
      });
      return {
        l1BatchNumber: args.l1BatchNumber ? hexToBigInt(args.l1BatchNumber) : null,
        l1BatchTimestamp: args.l1BatchTimestamp ? hexToBigInt(args.l1BatchTimestamp) : null,
        transactions
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      const transaction = {};
      if (args.type === "0x71")
        transaction.type = "eip712";
      else if (args.type === "0xff")
        transaction.type = "priority";
      return {
        ...transaction,
        l1BatchNumber: args.l1BatchNumber ? hexToBigInt(args.l1BatchNumber) : null,
        l1BatchTxIndex: args.l1BatchTxIndex ? hexToBigInt(args.l1BatchTxIndex) : null
      };
    }
  }),
  transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
    format(args) {
      return {
        l1BatchNumber: args.l1BatchNumber ? hexToBigInt(args.l1BatchNumber) : null,
        l1BatchTxIndex: args.l1BatchTxIndex ? hexToBigInt(args.l1BatchTxIndex) : null,
        logs: args.logs.map((log) => {
          return {
            ...formatLog(log),
            l1BatchNumber: log.l1BatchNumber ? hexToBigInt(log.l1BatchNumber) : null,
            transactionLogIndex: hexToNumber(log.transactionLogIndex),
            logType: log.logType
          };
        }),
        l2ToL1Logs: args.l2ToL1Logs.map((l2ToL1Log) => {
          return {
            blockNumber: hexToBigInt(l2ToL1Log.blockHash),
            blockHash: l2ToL1Log.blockHash,
            l1BatchNumber: l2ToL1Log.l1BatchNumber ? hexToBigInt(l2ToL1Log.l1BatchNumber) : null,
            transactionIndex: hexToBigInt(l2ToL1Log.transactionIndex),
            shardId: hexToBigInt(l2ToL1Log.shardId),
            isService: l2ToL1Log.isService,
            sender: l2ToL1Log.sender,
            key: l2ToL1Log.key,
            value: l2ToL1Log.value,
            transactionHash: l2ToL1Log.transactionHash,
            logIndex: hexToBigInt(l2ToL1Log.logIndex)
          };
        })
      };
    }
  }),
  transactionRequest: /* @__PURE__ */ defineTransactionRequest({
    exclude: [
      "customSignature",
      "factoryDeps",
      "gasPerPubdata",
      "paymaster",
      "paymasterInput"
    ],
    format(args) {
      if (args.gasPerPubdata || args.paymaster && args.paymasterInput || args.factoryDeps || args.customSignature)
        return {
          eip712Meta: {
            ...args.gasPerPubdata ? { gasPerPubdata: toHex(args.gasPerPubdata) } : { gasPerPubdata: toHex(gasPerPubdataDefault) },
            ...args.paymaster && args.paymasterInput ? {
              paymasterParams: {
                paymaster: args.paymaster,
                paymasterInput: Array.from(hexToBytes(args.paymasterInput))
              }
            } : {},
            ...args.factoryDeps ? {
              factoryDeps: args.factoryDeps.map((dep) => Array.from(hexToBytes(dep)))
            } : {},
            ...args.customSignature ? {
              customSignature: Array.from(hexToBytes(args.customSignature))
            } : {}
          },
          type: "0x71"
        };
      return {};
    }
  })
};

// node_modules/viem/_esm/zksync/errors/transaction.js
var InvalidEip712TransactionError = class extends BaseError {
  constructor() {
    super([
      "Transaction is not an EIP712 transaction.",
      "",
      "Transaction must:",
      '  - include `type: "eip712"`',
      "  - include one of the following: `customSignature`, `paymaster`, `paymasterInput`, `gasPerPubdata`, `factoryDeps`"
    ].join("\n"), { name: "InvalidEip712TransactionError" });
  }
};

// node_modules/viem/_esm/zksync/utils/isEip712Transaction.js
function isEIP712Transaction(transaction) {
  if (transaction.type === "eip712")
    return true;
  if ("customSignature" in transaction && transaction.customSignature || "paymaster" in transaction && transaction.paymaster || "paymasterInput" in transaction && transaction.paymasterInput || "gasPerPubdata" in transaction && typeof transaction.gasPerPubdata === "bigint" || "factoryDeps" in transaction && transaction.factoryDeps)
    return true;
  return false;
}

// node_modules/viem/_esm/zksync/utils/assertEip712Transaction.js
function assertEip712Transaction(transaction) {
  const { chainId, to, from, paymaster, paymasterInput } = transaction;
  if (!isEIP712Transaction(transaction))
    throw new InvalidEip712TransactionError();
  if (!chainId || chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (from && !isAddress(from))
    throw new InvalidAddressError({ address: from });
  if (paymaster && !isAddress(paymaster))
    throw new InvalidAddressError({ address: paymaster });
  if (paymaster && !paymasterInput) {
    throw new BaseError("`paymasterInput` must be provided when `paymaster` is defined");
  }
  if (!paymaster && paymasterInput) {
    throw new BaseError("`paymaster` must be provided when `paymasterInput` is defined");
  }
}

// node_modules/viem/_esm/zksync/serializers.js
function serializeTransaction2(transaction, signature) {
  if (isEIP712Transaction(transaction))
    return serializeTransactionEIP712(transaction);
  return serializeTransaction(transaction, signature);
}
var serializers = {
  transaction: serializeTransaction2
};
function serializeTransactionEIP712(transaction) {
  const { chainId, gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, customSignature, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data } = transaction;
  assertEip712Transaction(transaction);
  const serializedTransaction = [
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x0",
    toHex(chainId),
    toHex(""),
    toHex(""),
    toHex(chainId),
    from ?? "0x",
    gasPerPubdata ? toHex(gasPerPubdata) : toHex(gasPerPubdataDefault),
    factoryDeps ?? [],
    customSignature ?? "0x",
    // EIP712 signature
    paymaster && paymasterInput ? [paymaster, paymasterInput] : []
  ];
  return concatHex([
    "0x71",
    toRlp(serializedTransaction)
  ]);
}

// node_modules/viem/_esm/zksync/errors/bytecode.js
var BytecodeLengthExceedsMaxSizeError = class extends BaseError {
  constructor({ givenLength, maxBytecodeSize: maxBytecodeSize2 }) {
    super(`Bytecode cannot be longer than ${maxBytecodeSize2} bytes. Given length: ${givenLength}`, { name: "BytecodeLengthExceedsMaxSizeError" });
  }
};
var BytecodeLengthInWordsMustBeOddError = class extends BaseError {
  constructor({ givenLengthInWords }) {
    super(`Bytecode length in 32-byte words must be odd. Given length in words: ${givenLengthInWords}`, { name: "BytecodeLengthInWordsMustBeOddError" });
  }
};
var BytecodeLengthMustBeDivisibleBy32Error = class extends BaseError {
  constructor({ givenLength }) {
    super(`The bytecode length in bytes must be divisible by 32. Given length: ${givenLength}`, { name: "BytecodeLengthMustBeDivisibleBy32Error" });
  }
};

// node_modules/viem/_esm/zksync/utils/hashBytecode.js
function hashBytecode(bytecode) {
  const bytecodeBytes = toBytes(bytecode);
  if (bytecodeBytes.length % 32 !== 0)
    throw new BytecodeLengthMustBeDivisibleBy32Error({
      givenLength: bytecodeBytes.length
    });
  if (bytecodeBytes.length > maxBytecodeSize)
    throw new BytecodeLengthExceedsMaxSizeError({
      givenLength: bytecodeBytes.length,
      maxBytecodeSize
    });
  const hashStr = sha256(bytecodeBytes);
  const hash = toBytes(hashStr);
  const bytecodeLengthInWords = bytecodeBytes.length / 32;
  if (bytecodeLengthInWords % 2 === 0) {
    throw new BytecodeLengthInWordsMustBeOddError({
      givenLengthInWords: bytecodeLengthInWords
    });
  }
  const bytecodeLength = toBytes(bytecodeLengthInWords);
  const bytecodeLengthPadded = pad(bytecodeLength, { size: 2 });
  const codeHashVersion = new Uint8Array([1, 0]);
  hash.set(codeHashVersion, 0);
  hash.set(bytecodeLengthPadded, 2);
  return hash;
}

// node_modules/viem/_esm/zksync/utils/getEip712Domain.js
var getEip712Domain = (transaction) => {
  assertEip712Transaction(transaction);
  const message = transactionToMessage(transaction);
  return {
    domain: {
      name: "zkSync",
      version: "2",
      chainId: transaction.chainId
    },
    types: {
      Transaction: [
        { name: "txType", type: "uint256" },
        { name: "from", type: "uint256" },
        { name: "to", type: "uint256" },
        { name: "gasLimit", type: "uint256" },
        { name: "gasPerPubdataByteLimit", type: "uint256" },
        { name: "maxFeePerGas", type: "uint256" },
        { name: "maxPriorityFeePerGas", type: "uint256" },
        { name: "paymaster", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
        { name: "factoryDeps", type: "bytes32[]" },
        { name: "paymasterInput", type: "bytes" }
      ]
    },
    primaryType: "Transaction",
    message
  };
};
function transactionToMessage(transaction) {
  const { gas, nonce, to, from, value, maxFeePerGas, maxPriorityFeePerGas, factoryDeps, paymaster, paymasterInput, gasPerPubdata, data } = transaction;
  return {
    txType: 113n,
    from: BigInt(from),
    to: to ? BigInt(to) : 0n,
    gasLimit: gas ?? 0n,
    gasPerPubdataByteLimit: gasPerPubdata ?? gasPerPubdataDefault,
    maxFeePerGas: maxFeePerGas ?? 0n,
    maxPriorityFeePerGas: maxPriorityFeePerGas ?? 0n,
    paymaster: paymaster ? BigInt(paymaster) : 0n,
    nonce: nonce ? BigInt(nonce) : 0n,
    value: value ?? 0n,
    data: data ? data : "0x0",
    factoryDeps: factoryDeps?.map((dep) => toHex(hashBytecode(dep))) ?? [],
    paymasterInput: paymasterInput ? paymasterInput : "0x"
  };
}

// node_modules/viem/_esm/zksync/chainConfig.js
var chainConfig = {
  formatters,
  serializers,
  custom: {
    getEip712Domain
  }
};

// node_modules/viem/_esm/chains/definitions/abstractTestnet.js
var abstractTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 11124,
  name: "Abstract Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://api.testnet.abs.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Abstract Block Explorer",
      url: "https://explorer.testnet.abs.xyz"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963",
      blockCreated: 358349
    },
    universalSignatureVerifier: {
      address: "0xfB688330379976DA81eB64Fe4BF50d7401763B9C",
      blockCreated: 431682
    }
  }
});

// node_modules/viem/_esm/chains/definitions/acala.js
var acala = /* @__PURE__ */ defineChain({
  id: 787,
  name: "Acala",
  network: "acala",
  nativeCurrency: {
    name: "Acala",
    symbol: "ACA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-acala.aca-api.network"],
      webSocket: ["wss://eth-rpc-acala.aca-api.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Acala Blockscout",
      url: "https://blockscout.acala.network",
      apiUrl: "https://blockscout.acala.network/api"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/acria.js
var acria = /* @__PURE__ */ defineChain({
  id: 47,
  name: "Acria IntelliChain",
  nativeCurrency: {
    decimals: 18,
    name: "ACRIA",
    symbol: "ACRIA"
  },
  rpcUrls: {
    default: {
      http: ["https://aic.acria.ai"]
    }
  },
  blockExplorers: {
    default: {
      name: "Acria Explorer",
      url: "https://explorer.acria.ai"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/adf.js
var adf = /* @__PURE__ */ defineChain({
  id: 1215,
  name: "ADF Chain",
  nativeCurrency: { name: "ADDFILL", symbol: "ADF", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.adftechnology.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "ADF Mainnet Explorer",
      url: "https://explorer.adftechnology.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/aioz.js
var aioz = /* @__PURE__ */ defineChain({
  id: 168,
  name: "AIOZ Network",
  nativeCurrency: {
    decimals: 18,
    name: "AIOZ",
    symbol: "AIOZ"
  },
  rpcUrls: {
    default: {
      http: ["https://eth-dataseed.aioz.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "AIOZ Explorer",
      url: "https://explorer.aioz.network"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/alienX.js
var alienx = /* @__PURE__ */ defineChain({
  id: 10241024,
  name: "AlienX Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.alienxchain.io/http"] }
  },
  blockExplorers: {
    default: {
      name: "AlienX Explorer",
      url: "https://explorer.alienxchain.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/alienXHalTestnet.js
var alienxHalTestnet = /* @__PURE__ */ defineChain({
  id: 10241025,
  name: "ALIENX Hal Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://hal-rpc.alienxchain.io/http"] }
  },
  blockExplorers: {
    default: {
      name: "AlienX Explorer",
      url: "https://hal-explorer.alienxchain.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/op-stack/contracts.js
var contracts = {
  gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
  l1Block: { address: "0x4200000000000000000000000000000000000015" },
  l2CrossDomainMessenger: {
    address: "0x4200000000000000000000000000000000000007"
  },
  l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
  l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
  l2ToL1MessagePasser: {
    address: "0x4200000000000000000000000000000000000016"
  }
};

// node_modules/viem/_esm/op-stack/formatters.js
var formatters2 = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        if (formatted.typeHex === "0x7e") {
          formatted.isSystemTx = transaction.isSystemTx;
          formatted.mint = transaction.mint ? hexToBigInt(transaction.mint) : void 0;
          formatted.sourceHash = transaction.sourceHash;
          formatted.type = "deposit";
        }
        return formatted;
      });
      return {
        transactions,
        stateRoot: args.stateRoot
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      const transaction = {};
      if (args.type === "0x7e") {
        transaction.isSystemTx = args.isSystemTx;
        transaction.mint = args.mint ? hexToBigInt(args.mint) : void 0;
        transaction.sourceHash = args.sourceHash;
        transaction.type = "deposit";
      }
      return transaction;
    }
  }),
  transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
    format(args) {
      return {
        l1GasPrice: args.l1GasPrice ? hexToBigInt(args.l1GasPrice) : null,
        l1GasUsed: args.l1GasUsed ? hexToBigInt(args.l1GasUsed) : null,
        l1Fee: args.l1Fee ? hexToBigInt(args.l1Fee) : null,
        l1FeeScalar: args.l1FeeScalar ? Number(args.l1FeeScalar) : null
      };
    }
  })
};

// node_modules/viem/_esm/op-stack/serializers.js
function serializeTransaction3(transaction, signature) {
  if (isDeposit(transaction))
    return serializeTransactionDeposit(transaction);
  return serializeTransaction(transaction, signature);
}
var serializers2 = {
  transaction: serializeTransaction3
};
function serializeTransactionDeposit(transaction) {
  assertTransactionDeposit(transaction);
  const { sourceHash, data, from, gas, isSystemTx, mint: mint2, to, value } = transaction;
  const serializedTransaction = [
    sourceHash,
    from,
    to ?? "0x",
    mint2 ? toHex(mint2) : "0x",
    value ? toHex(value) : "0x",
    gas ? toHex(gas) : "0x",
    isSystemTx ? "0x1" : "0x",
    data ?? "0x"
  ];
  return concatHex([
    "0x7e",
    toRlp(serializedTransaction)
  ]);
}
function isDeposit(transaction) {
  if (transaction.type === "deposit")
    return true;
  if (typeof transaction.sourceHash !== "undefined")
    return true;
  return false;
}
function assertTransactionDeposit(transaction) {
  const { from, to } = transaction;
  if (from && !isAddress(from))
    throw new InvalidAddressError({ address: from });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
}

// node_modules/viem/_esm/op-stack/chainConfig.js
var chainConfig2 = {
  contracts,
  formatters: formatters2,
  serializers: serializers2
};

// node_modules/viem/_esm/chains/definitions/ancient8.js
var sourceId = 1;
var ancient8 = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 888888888,
  name: "Ancient8",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ancient8.gg"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ancient8 explorer",
      url: "https://scan.ancient8.gg",
      apiUrl: "https://scan.ancient8.gg/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId]: {
        address: "0xB09DC08428C8b4EFB4ff9C0827386CDF34277996"
      }
    },
    portal: {
      [sourceId]: {
        address: "0x639F2AECE398Aa76b07e59eF6abe2cFe32bacb68",
        blockCreated: 19070571
      }
    },
    l1StandardBridge: {
      [sourceId]: {
        address: "0xd5e3eDf5b68135D559D572E26bF863FBC1950033",
        blockCreated: 19070571
      }
    }
  },
  sourceId
});

// node_modules/viem/_esm/chains/definitions/ancient8Sepolia.js
var sourceId2 = 11155111;
var ancient8Sepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 28122024,
  name: "Ancient8 Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpcv2-testnet.ancient8.gg"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ancient8 Celestia Testnet explorer",
      url: "https://scanv2-testnet.ancient8.gg",
      apiUrl: "https://scanv2-testnet.ancient8.gg/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId2]: {
        address: "0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB"
      }
    },
    portal: {
      [sourceId2]: {
        address: "0xfa1d9E26A6aCD7b22115D27572c1221B9803c960",
        blockCreated: 4972908
      }
    },
    l1StandardBridge: {
      [sourceId2]: {
        address: "0xF6Bc0146d3c74D48306e79Ae134A260E418C9335",
        blockCreated: 4972908
      }
    }
  },
  sourceId: sourceId2
});

// node_modules/viem/_esm/chains/definitions/anvil.js
var anvil = /* @__PURE__ */ defineChain({
  id: 31337,
  name: "Anvil",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545"]
    }
  }
});

// node_modules/viem/_esm/chains/definitions/apeChain.js
var sourceId3 = 42161;
var apeChain = /* @__PURE__ */ defineChain({
  id: 33139,
  name: "Ape Chain",
  nativeCurrency: {
    name: "ApeCoin",
    symbol: "APE",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.apechain.com/http"],
      webSocket: ["wss://rpc.apechain.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Apescan",
      url: "https://apescan.io",
      apiUrl: "https://api.apescan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 20889
    }
  },
  sourceId: sourceId3
});

// node_modules/viem/_esm/chains/definitions/apexTestnet.js
var apexTestnet = /* @__PURE__ */ defineChain({
  id: 3993,
  name: "APEX Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.apexlayer.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp-testnet.apexlayer.xyz",
      apiUrl: "https://exp-testnet.apexlayer.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xf7642be33a6b18D16a995657adb5a68CD0438aE2",
      blockCreated: 283775
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/arbitrum.js
var arbitrum = /* @__PURE__ */ defineChain({
  id: 42161,
  name: "Arbitrum One",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://arbiscan.io",
      apiUrl: "https://api.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7654707
    }
  }
});

// node_modules/viem/_esm/chains/definitions/arbitrumGoerli.js
var arbitrumGoerli = /* @__PURE__ */ defineChain({
  id: 421613,
  name: "Arbitrum Goerli",
  nativeCurrency: {
    name: "Arbitrum Goerli Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://goerli-rollup.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://goerli.arbiscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 88114
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/arbitrumNova.js
var arbitrumNova = /* @__PURE__ */ defineChain({
  id: 42170,
  name: "Arbitrum Nova",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://nova.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://nova.arbiscan.io",
      apiUrl: "https://api-nova.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1746963
    }
  }
});

// node_modules/viem/_esm/chains/definitions/arbitrumSepolia.js
var arbitrumSepolia = /* @__PURE__ */ defineChain({
  id: 421614,
  name: "Arbitrum Sepolia",
  nativeCurrency: {
    name: "Arbitrum Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rollup.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Arbiscan",
      url: "https://sepolia.arbiscan.io",
      apiUrl: "https://api-sepolia.arbiscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 81930
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/areonNetwork.js
var areonNetwork = /* @__PURE__ */ defineChain({
  id: 463,
  name: "Areon Network",
  nativeCurrency: { decimals: 18, name: "AREA", symbol: "AREA" },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.areon.network"],
      webSocket: ["wss://mainnet-ws.areon.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Areonscan",
      url: "https://areonscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 353286
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/areonNetworkTestnet.js
var areonNetworkTestnet = /* @__PURE__ */ defineChain({
  id: 462,
  name: "Areon Network Testnet",
  nativeCurrency: { decimals: 18, name: "TAREA", symbol: "TAREA" },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.areon.network"],
      webSocket: ["wss://testnet-ws.areon.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Areonscan",
      url: "https://areonscan.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/artelaTestnet.js
var artelaTestnet = /* @__PURE__ */ defineChain({
  id: 11822,
  name: "Artela Testnet",
  nativeCurrency: { name: "ART", symbol: "ART", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://betanet-rpc1.artela.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Artela",
      url: "https://betanet-scan.artela.network",
      apiUrl: "https://betanet-scan.artela.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xd07c8635f76e8745Ee7092fbb6e8fbc5FeF09DD7",
      blockCreated: 7001871
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/assetChain.js
var assetChain = /* @__PURE__ */ defineChain({
  id: 42420,
  name: "AssetChain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Real World Asset",
    symbol: "RWA"
  },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.assetchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "Asset Chain Explorer",
      url: "https://scan.assetchain.org",
      apiUrl: "https://scan.assetchain.org/api"
    }
  },
  testnet: false,
  contracts: {}
});

// node_modules/viem/_esm/chains/definitions/assetChainTestnet.js
var assetChainTestnet = /* @__PURE__ */ defineChain({
  id: 42421,
  name: "AssetChain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Real World Asset",
    symbol: "RWA"
  },
  rpcUrls: {
    default: { http: ["https://enugu-rpc.assetchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "Asset Chain Testnet Explorer",
      url: "https://scan-testnet.assetchain.org",
      apiUrl: "https://scan-testnet.assetchain.org/api"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x989F832D35988cb5e3eB001Fa2Fe789469EC31Ea",
      blockCreated: 17177
    }
  }
});

// node_modules/viem/_esm/chains/definitions/astar.js
var astar = /* @__PURE__ */ defineChain({
  id: 592,
  name: "Astar",
  network: "astar-mainnet",
  nativeCurrency: {
    name: "Astar",
    symbol: "ASTR",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://astar.api.onfinality.io/public"] }
  },
  blockExplorers: {
    default: {
      name: "Astar Subscan",
      url: "https://astar.subscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 761794
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/astarZkEVM.js
var astarZkEVM = /* @__PURE__ */ defineChain({
  id: 3776,
  name: "Astar zkEVM",
  network: "AstarZkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-zkevm.astar.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Astar zkEVM Explorer",
      url: "https://astar-zkevm.explorer.startale.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 93528
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/astarZkyoto.js
var astarZkyoto = /* @__PURE__ */ defineChain({
  id: 6038361,
  name: "Astar zkEVM Testnet zKyoto",
  network: "zKyoto",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.startale.com/zkyoto"]
    }
  },
  blockExplorers: {
    default: {
      name: "zKyoto Explorer",
      url: "https://zkyoto.explorer.startale.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 196153
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/atletaOlympia.js
var atletaOlympia = /* @__PURE__ */ defineChain({
  id: 2340,
  name: "Atleta Olympia",
  nativeCurrency: { decimals: 18, name: "Atla", symbol: "ATLA" },
  rpcUrls: {
    default: {
      http: [
        "https://testnet-rpc.atleta.network:9944",
        "https://testnet-rpc.atleta.network"
      ],
      ws: ["wss://testnet-rpc.atleta.network:9944"]
    }
  },
  blockExplorers: {
    default: {
      name: "Atleta Olympia Explorer",
      url: "https://blockscout.atleta.network",
      apiUrl: "https://blockscout.atleta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x1472ec6392180fb84F345d2455bCC75B26577115",
      blockCreated: 1076473
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/aurora.js
var aurora = /* @__PURE__ */ defineChain({
  id: 1313161554,
  name: "Aurora",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.aurora.dev"] }
  },
  blockExplorers: {
    default: {
      name: "Aurorascan",
      url: "https://aurorascan.dev",
      apiUrl: "https://aurorascan.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 62907816
    }
  }
});

// node_modules/viem/_esm/chains/definitions/auroraTestnet.js
var auroraTestnet = /* @__PURE__ */ defineChain({
  id: 1313161555,
  name: "Aurora Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://testnet.aurora.dev"] }
  },
  blockExplorers: {
    default: {
      name: "Aurorascan",
      url: "https://testnet.aurorascan.dev",
      apiUrl: "https://testnet.aurorascan.dev/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/auroria.js
var auroria = /* @__PURE__ */ defineChain({
  id: 205205,
  name: "Auroria Testnet",
  network: "auroria",
  nativeCurrency: {
    name: "Auroria Stratis",
    symbol: "tSTRAX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://auroria.rpc.stratisevm.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Auroria Testnet Explorer",
      url: "https://auroria.explorer.stratisevm.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/avalanche.js
var avalanche = /* @__PURE__ */ defineChain({
  id: 43114,
  name: "Avalanche",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX"
  },
  rpcUrls: {
    default: { http: ["https://api.avax.network/ext/bc/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://snowtrace.io",
      apiUrl: "https://api.snowtrace.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11907934
    }
  }
});

// node_modules/viem/_esm/chains/definitions/avalancheFuji.js
var avalancheFuji = /* @__PURE__ */ defineChain({
  id: 43113,
  name: "Avalanche Fuji",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche Fuji",
    symbol: "AVAX"
  },
  rpcUrls: {
    default: { http: ["https://api.avax-test.network/ext/bc/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "SnowTrace",
      url: "https://testnet.snowtrace.io",
      apiUrl: "https://api-testnet.snowtrace.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7096959
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/b3.js
var sourceId4 = 8453;
var b3 = /* @__PURE__ */ defineChain({
  id: 8333,
  name: "B3",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.b3.fun/http"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.b3.fun"
    }
  },
  sourceId: sourceId4
});

// node_modules/viem/_esm/chains/definitions/b3Sepolia.js
var sourceId5 = 168587773;
var b3Sepolia = /* @__PURE__ */ defineChain({
  id: 1993,
  name: "B3 Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.b3.fun/http"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia.explorer.b3.fun"
    }
  },
  testnet: true,
  sourceId: sourceId5
});

// node_modules/viem/_esm/chains/definitions/bahamut.js
var bahamut = /* @__PURE__ */ defineChain({
  id: 5165,
  network: "bahamut",
  name: "Bahamut",
  nativeCurrency: { name: "Fasttoken", symbol: "FTN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc1.bahamut.io",
        "https://bahamut-rpc.publicnode.com",
        "https://rpc2.bahamut.io"
      ],
      webSocket: [
        "wss://ws1.sahara.bahamutchain.com",
        "wss://bahamut-rpc.publicnode.com",
        "wss://ws2.sahara.bahamutchain.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Ftnscan",
      url: "https://www.ftnscan.com",
      apiUrl: "https://www.ftnscan.com/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/base.js
var sourceId6 = 1;
var base = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId6]: {
        address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e"
      }
    },
    l2OutputOracle: {
      [sourceId6]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022
    },
    portal: {
      [sourceId6]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143
      }
    },
    l1StandardBridge: {
      [sourceId6]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143
      }
    }
  },
  sourceId: sourceId6
});

// node_modules/viem/_esm/chains/definitions/baseGoerli.js
var sourceId7 = 5;
var baseGoerli = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 84531,
  name: "Base Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://goerli.base.org"] }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://goerli.basescan.org",
      apiUrl: "https://goerli.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId7]: {
        address: "0x2A35891ff30313CcFa6CE88dcf3858bb075A2298"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1376988
    },
    portal: {
      [sourceId7]: {
        address: "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA"
      }
    },
    l1StandardBridge: {
      [sourceId7]: {
        address: "0xfA6D8Ee5BE770F84FC001D098C4bD604Fe01284a"
      }
    }
  },
  testnet: true,
  sourceId: sourceId7
});

// node_modules/viem/_esm/chains/definitions/baseSepolia.js
var sourceId8 = 11155111;
var baseSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 84532,
  network: "base-sepolia",
  name: "Base Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://sepolia.basescan.org",
      apiUrl: "https://api-sepolia.basescan.org/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId8]: {
        address: "0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1"
      }
    },
    l2OutputOracle: {
      [sourceId8]: {
        address: "0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254"
      }
    },
    portal: {
      [sourceId8]: {
        address: "0x49f53e41452c74589e85ca1677426ba426459e85",
        blockCreated: 4446677
      }
    },
    l1StandardBridge: {
      [sourceId8]: {
        address: "0xfd0Bf71F60660E2f608ed56e1659C450eB113120",
        blockCreated: 4446677
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1059647
    }
  },
  testnet: true,
  sourceId: sourceId8
});

// node_modules/viem/_esm/chains/definitions/beam.js
var beam = /* @__PURE__ */ defineChain({
  id: 4337,
  name: "Beam",
  network: "beam",
  nativeCurrency: {
    decimals: 18,
    name: "Beam",
    symbol: "BEAM"
  },
  rpcUrls: {
    default: {
      http: ["https://build.onbeam.com/rpc"],
      webSocket: ["wss://build.onbeam.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beam Explorer",
      url: "https://subnets.avax.network/beam"
    }
  },
  contracts: {
    multicall3: {
      address: "0x4956f15efdc3dc16645e90cc356eafa65ffc65ec",
      blockCreated: 1
    }
  }
});

// node_modules/viem/_esm/chains/definitions/beamTestnet.js
var beamTestnet = /* @__PURE__ */ defineChain({
  id: 13337,
  name: "Beam Testnet",
  network: "beam",
  nativeCurrency: {
    decimals: 18,
    name: "Beam",
    symbol: "BEAM"
  },
  rpcUrls: {
    default: {
      http: ["https://build.onbeam.com/rpc/testnet"],
      webSocket: ["wss://build.onbeam.com/ws/testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beam Explorer",
      url: "https://subnets-test.avax.network/beam"
    }
  },
  contracts: {
    multicall3: {
      address: "0x9bf49b704ee2a095b95c1f2d4eb9010510c41c9e",
      blockCreated: 3
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bearNetworkChainMainnet.js
var bearNetworkChainMainnet = /* @__PURE__ */ defineChain({
  id: 641230,
  name: "Bear Network Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "BearNetworkChain",
    symbol: "BRNKC"
  },
  rpcUrls: {
    default: { http: ["https://brnkc-mainnet.bearnetwork.net"] }
  },
  blockExplorers: {
    default: {
      name: "BrnkScan",
      url: "https://brnkscan.bearnetwork.net",
      apiUrl: "https://brnkscan.bearnetwork.net/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bearNetworkChainTestnet.js
var bearNetworkChainTestnet = /* @__PURE__ */ defineChain({
  id: 751230,
  name: "Bear Network Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBRNKC",
    symbol: "tBRNKC"
  },
  rpcUrls: {
    default: { http: ["https://brnkc-test.bearnetwork.net"] }
  },
  blockExplorers: {
    default: {
      name: "BrnkTestScan",
      url: "https://brnktest-scan.bearnetwork.net",
      apiUrl: "https://brnktest-scan.bearnetwork.net/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/berachainTestnet.js
var berachainTestnet = /* @__PURE__ */ defineChain({
  id: 80085,
  name: "Berachain Artio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA"
  },
  rpcUrls: {
    default: { http: ["https://artio.rpc.berachain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Berachain",
      url: "https://artio.beratrail.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/berachainTestnetbArtio.js
var berachainTestnetbArtio = /* @__PURE__ */ defineChain({
  id: 80084,
  name: "Berachain bArtio",
  nativeCurrency: {
    decimals: 18,
    name: "BERA Token",
    symbol: "BERA"
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 109269
    }
  },
  rpcUrls: {
    default: { http: ["https://bartio.rpc.berachain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Berachain bArtio Beratrail",
      url: "https://bartio.beratrail.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bevmMainnet.js
var bevmMainnet = /* @__PURE__ */ defineChain({
  id: 11501,
  name: "BEVM Mainnet",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-mainnet-1.bevm.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bevmscan",
      url: "https://scan-mainnet.bevm.io",
      apiUrl: "https://scan-mainnet-api.bevm.io/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bifrost.js
var bifrost = /* @__PURE__ */ defineChain({
  id: 3068,
  name: "Bifrost Mainnet",
  nativeCurrency: { name: "BFC", symbol: "BFC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://public-01.mainnet.bifrostnetwork.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bifrost Blockscout",
      url: "https://explorer.mainnet.bifrostnetwork.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/bitgert.js
var bitgert = /* @__PURE__ */ defineChain({
  id: 32520,
  name: "Bitgert Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Brise",
    symbol: "Brise"
  },
  rpcUrls: {
    default: { http: ["https://rpc-bitgert.icecreamswap.com"] }
  },
  blockExplorers: {
    default: {
      name: "Bitgert Scan",
      url: "https://brisescan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2118034
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/bitkub.js
var bitkub = /* @__PURE__ */ defineChain({
  id: 96,
  name: "Bitkub",
  nativeCurrency: { name: "Bitkub", symbol: "KUB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.bitkubchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitkub Chain Mainnet Explorer",
      url: "https://www.bkcscan.com",
      apiUrl: "https://www.bkcscan.com/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bitkubTestnet.js
var bitkubTestnet = /* @__PURE__ */ defineChain({
  id: 25925,
  name: "Bitkub Testnet",
  network: "Bitkub Testnet",
  nativeCurrency: { name: "Bitkub Test", symbol: "tKUB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.bitkubchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitkub Chain Testnet Explorer",
      url: "https://testnet.bkcscan.com",
      apiUrl: "https://testnet.bkcscan.com/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bitlayer.js
var bitlayer = /* @__PURE__ */ defineChain({
  id: 200901,
  name: "Bitlayer Mainnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.bitlayer.org"],
      webSocket: ["wss://ws.bitlayer.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "bitlayer mainnet scan",
      url: "https://www.btrscan.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bitlayerTestnet.js
var bitlayerTestnet = /* @__PURE__ */ defineChain({
  id: 200810,
  name: "Bitlayer Testnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bitlayer.org"],
      webSocket: ["wss://testnet-ws.bitlayer.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "bitlayer testnet scan",
      url: "https://testnet.btrscan.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bitrock.js
var bitrock = /* @__PURE__ */ defineChain({
  id: 7171,
  name: "Bitrock Mainnet",
  nativeCurrency: { name: "BROCK", symbol: "BROCK", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://brockrpc.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitrock Explorer",
      url: "https://explorer.bit-rock.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/bitTorrent.js
var bitTorrent = /* @__PURE__ */ defineChain({
  id: 199,
  name: "BitTorrent",
  network: "bittorrent-chain-mainnet",
  nativeCurrency: { name: "BitTorrent", symbol: "BTT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.bittorrentchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bttcscan",
      url: "https://bttcscan.com",
      apiUrl: "https://api.bttcscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 31078552
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bitTorrentTestnet.js
var bitTorrentTestnet = /* @__PURE__ */ defineChain({
  id: 1028,
  name: "BitTorrent Chain Testnet",
  network: "bittorrent-chain-testnet",
  nativeCurrency: { name: "BitTorrent", symbol: "BTT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testrpc.bittorrentchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Bttcscan",
      url: "https://testnet.bttcscan.com",
      apiUrl: "https://testnet.bttcscan.com/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/blast.js
var sourceId9 = 1;
var blast = /* @__PURE__ */ defineChain({
  id: 81457,
  name: "Blast",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://rpc.blast.io"] }
  },
  blockExplorers: {
    default: {
      name: "Blastscan",
      url: "https://blastscan.io",
      apiUrl: "https://api.blastscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 212929
    }
  },
  sourceId: sourceId9
});

// node_modules/viem/_esm/chains/definitions/blastSepolia.js
var sourceId10 = 11155111;
var blastSepolia = /* @__PURE__ */ defineChain({
  id: 168587773,
  name: "Blast Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.blast.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blastscan",
      url: "https://sepolia.blastscan.io",
      apiUrl: "https://api-sepolia.blastscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 756690
    }
  },
  testnet: true,
  sourceId: sourceId10
});

// node_modules/viem/_esm/chains/definitions/bob.js
var sourceId11 = 1;
var bob = defineChain({
  ...chainConfig2,
  id: 60808,
  name: "BOB",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gobob.xyz"],
      webSocket: ["wss://rpc.gobob.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "BOB Explorer",
      url: "https://explorer.gobob.xyz"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 23131
    },
    l2OutputOracle: {
      [sourceId11]: {
        address: "0xdDa53E23f8a32640b04D7256e651C1db98dB11C1",
        blockCreated: 4462615
      }
    },
    portal: {
      [sourceId11]: {
        address: "0x8AdeE124447435fE03e3CD24dF3f4cAE32E65a3E",
        blockCreated: 4462615
      }
    }
  },
  sourceId: sourceId11
});

// node_modules/viem/_esm/chains/definitions/boba.js
var boba = /* @__PURE__ */ defineChain({
  id: 288,
  name: "Boba Network",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.boba.network"] }
  },
  blockExplorers: {
    default: {
      name: "BOBAScan",
      url: "https://bobascan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 446859
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bobaSepolia.js
var bobaSepolia = /* @__PURE__ */ defineChain({
  id: 28882,
  name: "Boba Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://sepolia.boba.network"] }
  },
  blockExplorers: {
    default: {
      name: "BOBAScan",
      url: "https://testnet.bobascan.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bobSepolia.js
var sourceId12 = 11155111;
var bobSepolia = defineChain({
  ...chainConfig2,
  id: 808813,
  name: "BOB Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://bob-sepolia.rpc.gobob.xyz"],
      webSocket: ["wss://bob-sepolia.rpc.gobob.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "BOB Sepolia Explorer",
      url: "https://bob-sepolia.explorer.gobob.xyz"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 35677
    },
    l2OutputOracle: {
      [sourceId12]: {
        address: "0x14D0069452b4AE2b250B395b8adAb771E4267d2f",
        blockCreated: 4462615
      }
    },
    portal: {
      [sourceId12]: {
        address: "0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4",
        blockCreated: 4462615
      }
    }
  },
  testnet: true,
  sourceId: sourceId12
});

// node_modules/viem/_esm/chains/definitions/boolBetaMainnet.js
var boolBetaMainnet = /* @__PURE__ */ defineChain({
  id: 11100,
  name: "Bool Beta Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "BOL",
    symbol: "BOL"
  },
  rpcUrls: {
    default: { http: ["https://beta-rpc-node-http.bool.network"] }
  },
  blockExplorers: {
    default: {
      name: "BoolScan",
      url: "https://beta-mainnet.boolscan.com/"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/botanixTestnet.js
var botanixTestnet = /* @__PURE__ */ defineChain({
  id: 3636,
  name: "Botanix Testnet",
  nativeCurrency: { name: "Botanix", symbol: "BTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://poa-node.botanixlabs.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://blockscout.botanixlabs.dev",
      apiUrl: "https://blockscout.botanixlabs.dev"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bounceBit.js
var bounceBit = /* @__PURE__ */ defineChain({
  id: 6001,
  name: "BounceBit Mainnet",
  nativeCurrency: { name: "BounceBit", symbol: "BB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://fullnode-mainnet.bouncebitapi.com"] }
  },
  blockExplorers: {
    default: {
      name: "BB Scan",
      url: "https://bbscan.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/bounceBitTestnet.js
var bounceBitTestnet = /* @__PURE__ */ defineChain({
  id: 6e3,
  name: "BounceBit Testnet",
  nativeCurrency: { name: "BounceBit", symbol: "BB", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://fullnode-testnet.bouncebitapi.com"] }
  },
  blockExplorers: {
    default: {
      name: "BB Scan",
      url: "https://testnet.bbscan.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bronos.js
var bronos = /* @__PURE__ */ defineChain({
  id: 1039,
  name: "Bronos",
  nativeCurrency: {
    decimals: 18,
    name: "BRO",
    symbol: "BRO"
  },
  rpcUrls: {
    default: { http: ["https://evm.bronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "BronoScan",
      url: "https://broscan.bronos.org"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bronosTestnet.js
var bronosTestnet = /* @__PURE__ */ defineChain({
  id: 1038,
  name: "Bronos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Bronos Coin",
    symbol: "tBRO"
  },
  rpcUrls: {
    default: { http: ["https://evm-testnet.bronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "BronoScan",
      url: "https://tbroscan.bronos.org"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bsc.js
var bsc = /* @__PURE__ */ defineChain({
  id: 56,
  name: "BNB Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/bsc"] }
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
      apiUrl: "https://api.bscscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15921452
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bscGreenfield.js
var bscGreenfield = /* @__PURE__ */ defineChain({
  id: 1017,
  name: "BNB Greenfield Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: { http: ["https://greenfield-chain.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "BNB Greenfield Mainnet Scan",
      url: "https://greenfieldscan.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/bscTestnet.js
var bscTestnet = /* @__PURE__ */ defineChain({
  id: 97,
  name: "Binance Smart Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "tBNB"
  },
  rpcUrls: {
    default: { http: ["https://data-seed-prebsc-1-s1.bnbchain.org:8545"] }
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
      apiUrl: "https://api-testnet.bscscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 17422483
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bsquared.js
var bsquared = /* @__PURE__ */ defineChain({
  id: 223,
  name: "B2",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.bsquared.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.bsquared.network"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bsquaredTestnet.js
var bsquaredTestnet = /* @__PURE__ */ defineChain({
  id: 1123,
  name: "B2 Testnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bsquared.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://testnet-explorer.bsquared.network"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/btr.js
var btr = /* @__PURE__ */ defineChain({
  id: 200901,
  name: "Bitlayer",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.bitlayer.org",
        "https://rpc.bitlayer-rpc.com",
        "https://rpc.ankr.com/bitlayer"
      ],
      webSocket: ["wss://ws.bitlayer.org", "wss://ws.bitlayer-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitlayer(BTR) Scan",
      url: "https://www.btrscan.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/btrTestnet.js
var btrTestnet = /* @__PURE__ */ defineChain({
  id: 200810,
  name: "Bitlayer Testnet",
  nativeCurrency: {
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.bitlayer.org"],
      webSocket: [
        "wss://testnet-ws.bitlayer.org",
        "wss://testnet-ws.bitlayer-rpc.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Bitlayer(BTR) Scan",
      url: "https://testnet.btrscan.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/bxn.js
var bxn = /* @__PURE__ */ defineChain({
  id: 4999,
  name: "BlackFort Exchange Network",
  nativeCurrency: { name: "BlackFort Token", symbol: "BXN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.blackfort.network/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.blackfort.network",
      apiUrl: "https://explorer.blackfort.network/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/bxnTestnet.js
var bxnTestnet = /* @__PURE__ */ defineChain({
  id: 4777,
  name: "BlackFort Exchange Network Testnet",
  nativeCurrency: {
    name: "BlackFort Testnet Token",
    symbol: "TBXN",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.blackfort.network/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer.blackfort.network",
      apiUrl: "https://testnet-explorer.blackfort.network/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/cannon.js
var cannon = /* @__PURE__ */ defineChain({
  id: 13370,
  name: "Cannon",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] }
  }
});

// node_modules/viem/_esm/chains/definitions/canto.js
var canto = /* @__PURE__ */ defineChain({
  id: 7700,
  name: "Canto",
  nativeCurrency: {
    decimals: 18,
    name: "Canto",
    symbol: "CANTO"
  },
  rpcUrls: {
    default: { http: ["https://canto.gravitychain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Tuber.Build (Blockscout)",
      url: "https://tuber.build"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2905789
    }
  }
});

// node_modules/viem/_esm/celo/fees.js
var fees = {
  /*
     * Estimates the fees per gas for a transaction.
  
     * If the transaction is to be paid in a token (feeCurrency is present) then the fees
     * are estimated in the value of the token. Otherwise falls back to the default
     * estimation by returning null.
     *
     * @param params fee estimation function parameters
     */
  estimateFeesPerGas: async (params) => {
    if (!params.request?.feeCurrency)
      return null;
    const [maxFeePerGas, maxPriorityFeePerGas] = await Promise.all([
      estimateFeePerGasInFeeCurrency(params.client, params.request.feeCurrency),
      estimateMaxPriorityFeePerGasInFeeCurrency(params.client, params.request.feeCurrency)
    ]);
    const suggestedMaxFeePerGas = params.multiply(maxFeePerGas) + maxPriorityFeePerGas;
    return {
      maxFeePerGas: suggestedMaxFeePerGas,
      maxPriorityFeePerGas
    };
  }
};
async function estimateFeePerGasInFeeCurrency(client, feeCurrency) {
  const fee = await client.request({
    method: "eth_gasPrice",
    params: [feeCurrency]
  });
  return BigInt(fee);
}
async function estimateMaxPriorityFeePerGasInFeeCurrency(client, feeCurrency) {
  const feesPerGas = await client.request({
    method: "eth_maxPriorityFeePerGas",
    params: [feeCurrency]
  });
  return BigInt(feesPerGas);
}

// node_modules/viem/_esm/celo/utils.js
function isEmpty(value) {
  return value === 0 || value === 0n || value === void 0 || value === null || value === "0" || value === "" || typeof value === "string" && (trim(value).toLowerCase() === "0x" || trim(value).toLowerCase() === "0x00");
}
function isPresent(value) {
  return !isEmpty(value);
}
function isEIP1559(transaction) {
  return typeof transaction.maxFeePerGas !== "undefined" && typeof transaction.maxPriorityFeePerGas !== "undefined";
}
function isCIP64(transaction) {
  if (transaction.type === "cip64") {
    return true;
  }
  return isEIP1559(transaction) && isPresent(transaction.feeCurrency);
}

// node_modules/viem/_esm/celo/formatters.js
var formatters3 = {
  block: /* @__PURE__ */ defineBlock({
    format(args) {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === "string")
          return transaction;
        const formatted = formatTransaction(transaction);
        return {
          ...formatted,
          ...transaction.gatewayFee ? {
            gatewayFee: hexToBigInt(transaction.gatewayFee),
            gatewayFeeRecipient: transaction.gatewayFeeRecipient
          } : {},
          feeCurrency: transaction.feeCurrency
        };
      });
      return {
        transactions,
        ...args.randomness ? { randomness: args.randomness } : {}
      };
    }
  }),
  transaction: /* @__PURE__ */ defineTransaction({
    format(args) {
      if (args.type === "0x7e")
        return {
          isSystemTx: args.isSystemTx,
          mint: args.mint ? hexToBigInt(args.mint) : void 0,
          sourceHash: args.sourceHash,
          type: "deposit"
        };
      const transaction = { feeCurrency: args.feeCurrency };
      if (args.type === "0x7b")
        transaction.type = "cip64";
      else {
        if (args.type === "0x7c")
          transaction.type = "cip42";
        transaction.gatewayFee = args.gatewayFee ? hexToBigInt(args.gatewayFee) : null;
        transaction.gatewayFeeRecipient = args.gatewayFeeRecipient;
      }
      return transaction;
    }
  }),
  transactionRequest: /* @__PURE__ */ defineTransactionRequest({
    format(args) {
      const request = {};
      if (args.feeCurrency)
        request.feeCurrency = args.feeCurrency;
      if (isCIP64(args))
        request.type = "0x7b";
      return request;
    }
  })
};

// node_modules/viem/_esm/celo/serializers.js
function serializeTransaction4(transaction, signature) {
  if (isCIP64(transaction))
    return serializeTransactionCIP64(transaction, signature);
  return serializeTransaction3(transaction, signature);
}
var serializers3 = {
  transaction: serializeTransaction4
};
function serializeTransactionCIP64(transaction, signature) {
  assertTransactionCIP64(transaction);
  const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, feeCurrency, data } = transaction;
  const serializedTransaction = [
    toHex(chainId),
    nonce ? toHex(nonce) : "0x",
    maxPriorityFeePerGas ? toHex(maxPriorityFeePerGas) : "0x",
    maxFeePerGas ? toHex(maxFeePerGas) : "0x",
    gas ? toHex(gas) : "0x",
    to ?? "0x",
    value ? toHex(value) : "0x",
    data ?? "0x",
    serializeAccessList(accessList),
    feeCurrency,
    ...toYParitySignatureArray(transaction, signature)
  ];
  return concatHex([
    "0x7b",
    toRlp(serializedTransaction)
  ]);
}
var MAX_MAX_FEE_PER_GAS = maxUint256;
function assertTransactionCIP64(transaction) {
  const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to, feeCurrency } = transaction;
  if (chainId <= 0)
    throw new InvalidChainIdError({ chainId });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (gasPrice)
    throw new BaseError("`gasPrice` is not a valid CIP-64 Transaction attribute.");
  if (isPresent(maxFeePerGas) && maxFeePerGas > MAX_MAX_FEE_PER_GAS)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (isPresent(maxPriorityFeePerGas) && isPresent(maxFeePerGas) && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
  if (isPresent(feeCurrency) && !isAddress(feeCurrency)) {
    throw new BaseError("`feeCurrency` MUST be a token address for CIP-64 transactions.");
  }
  if (isEmpty(feeCurrency)) {
    throw new BaseError("`feeCurrency` must be provided for CIP-64 transactions.");
  }
}

// node_modules/viem/_esm/celo/chainConfig.js
var chainConfig3 = {
  contracts,
  formatters: formatters3,
  serializers: serializers3,
  fees
};

// node_modules/viem/_esm/chains/definitions/celo.js
var celo = /* @__PURE__ */ defineChain({
  ...chainConfig3,
  id: 42220,
  name: "Celo",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "CELO"
  },
  rpcUrls: {
    default: { http: ["https://forno.celo.org"] }
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://celoscan.io",
      apiUrl: "https://api.celoscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 13112599
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/celoAlfajores.js
var sourceId13 = 17e3;
var celoAlfajores = /* @__PURE__ */ defineChain({
  ...chainConfig3,
  id: 44787,
  name: "Alfajores",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "A-CELO"
  },
  rpcUrls: {
    default: {
      http: ["https://alfajores-forno.celo-testnet.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Celo Alfajores Explorer",
      url: "https://celo-alfajores.blockscout.com",
      apiUrl: "https://celo-alfajores.blockscout.com/api"
    }
  },
  contracts: {
    ...chainConfig3.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 14569001
    },
    portal: {
      [sourceId13]: {
        address: "0x82527353927d8D069b3B452904c942dA149BA381",
        blockCreated: 2411324
      }
    },
    disputeGameFactory: {
      [sourceId13]: {
        address: "0xE28AAdcd9883746c0e5068F58f9ea06027b214cb",
        blockCreated: 2411324
      }
    },
    l2OutputOracle: {
      [sourceId13]: {
        address: "0x4a2635e9e4f6e45817b1D402ac4904c1d1752438",
        blockCreated: 2411324
      }
    },
    l1StandardBridge: {
      [sourceId13]: {
        address: "0xD1B0E0581973c9eB7f886967A606b9441A897037",
        blockCreated: 2411324
      }
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/chang.js
var chang = /* @__PURE__ */ defineChain({
  id: 5858,
  name: "Chang Chain Foundation Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "CTH",
    symbol: "CTH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.cthscan.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Chang Chain explorer",
      url: "https://cthscan.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/chiliz.js
var chiliz = /* @__PURE__ */ defineChain({
  id: 88888,
  name: "Chiliz Chain",
  network: "chiliz-chain",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ"
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.ankr.com/chiliz",
        "https://chiliz-rpc.publicnode.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Chiliz Explorer",
      url: "https://scan.chiliz.com",
      apiUrl: "https://scan.chiliz.com/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/chips.js
var chips = /* @__PURE__ */ defineChain({
  id: 2882,
  name: "Chips Network",
  network: "CHIPS",
  nativeCurrency: {
    decimals: 18,
    name: "IOTA",
    symbol: "IOTA"
  },
  rpcUrls: {
    default: {
      http: [
        "https://node.chips.ooo/wasp/api/v1/chains/iota1pp3d3mnap3ufmgqnjsnw344sqmf5svjh26y2khnmc89sv6788y3r207a8fn/evm"
      ]
    }
  }
});

// node_modules/viem/_esm/chains/definitions/classic.js
var classic = /* @__PURE__ */ defineChain({
  id: 61,
  name: "Ethereum Classic",
  nativeCurrency: {
    decimals: 18,
    name: "ETC",
    symbol: "ETC"
  },
  rpcUrls: {
    default: { http: ["https://etc.rivet.link"] }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.com/etc/mainnet"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/coinbit.js
var coinbit = /* @__PURE__ */ defineChain({
  id: 112,
  name: "Coinbit Mainnet",
  nativeCurrency: { name: "GIDR", symbol: "GIDR", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://coinbit-rpc-mainnet.chain.sbcrypto.app"]
    }
  },
  blockExplorers: {
    default: {
      name: "Coinbit Explorer",
      url: "https://coinbit-explorer.chain.sbcrypto.app"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/coinex.js
var coinex = /* @__PURE__ */ defineChain({
  id: 52,
  name: "CoinEx Mainnet",
  nativeCurrency: { name: "cet", symbol: "cet", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.coinex.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "CoinEx Explorer",
      url: "https://www.coinex.net"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/confluxESpace.js
var confluxESpace = /* @__PURE__ */ defineChain({
  id: 1030,
  name: "Conflux eSpace",
  nativeCurrency: { name: "Conflux", symbol: "CFX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm.confluxrpc.com"],
      webSocket: ["wss://evm.confluxrpc.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "ConfluxScan",
      url: "https://evm.confluxscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xEFf0078910f638cd81996cc117bccD3eDf2B072F",
      blockCreated: 68602935
    }
  }
});

// node_modules/viem/_esm/chains/definitions/confluxESpaceTestnet.js
var confluxESpaceTestnet = /* @__PURE__ */ defineChain({
  id: 71,
  name: "Conflux eSpace Testnet",
  network: "cfx-espace-testnet",
  testnet: true,
  nativeCurrency: { name: "Conflux", symbol: "CFX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evmtestnet.confluxrpc.com"],
      webSocket: ["wss://evmtestnet.confluxrpc.com/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "ConfluxScan",
      url: "https://evmtestnet.confluxscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xEFf0078910f638cd81996cc117bccD3eDf2B072F",
      blockCreated: 117499050
    }
  }
});

// node_modules/viem/_esm/chains/definitions/coreDao.js
var coreDao = /* @__PURE__ */ defineChain({
  id: 1116,
  name: "Core Dao",
  nativeCurrency: {
    decimals: 18,
    name: "Core",
    symbol: "CORE"
  },
  rpcUrls: {
    default: { http: ["https://rpc.coredao.org"] }
  },
  blockExplorers: {
    default: {
      name: "CoreDao",
      url: "https://scan.coredao.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 11907934
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/corn.js
var sourceId14 = 1;
var corn = /* @__PURE__ */ defineChain({
  id: 21e6,
  name: "Corn Maizenet",
  nativeCurrency: {
    decimals: 18,
    name: "Bitcorn",
    symbol: "BTCN"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/corn_maizenet"] }
  },
  blockExplorers: {
    default: {
      name: "Corn Explorer",
      url: "https://cornscan.io",
      apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/21000000/etherscan/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3228
    }
  },
  sourceId: sourceId14
});

// node_modules/viem/_esm/chains/definitions/cornTestnet.js
var sourceId15 = 11155111;
var cornTestnet = /* @__PURE__ */ defineChain({
  id: 21000001,
  name: "Corn Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Bitcorn",
    symbol: "BTCN"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/corn_testnet"] }
  },
  blockExplorers: {
    default: {
      name: "Corn Testnet Explorer",
      url: "https://testnet.cornscan.io",
      apiUrl: "https://api.routescan.io/v2/network/testnet/evm/21000001/etherscan/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4886
    }
  },
  testnet: true,
  sourceId: sourceId15
});

// node_modules/viem/_esm/chains/definitions/crab.js
var crab = defineChain({
  id: 44,
  name: "Crab Network",
  nativeCurrency: {
    decimals: 18,
    name: "Crab Network Native Token",
    symbol: "CRAB"
  },
  rpcUrls: {
    default: {
      http: ["https://crab-rpc.darwinia.network"],
      webSocket: ["wss://crab-rpc.darwinia.network"]
    }
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://crab-scan.darwinia.network" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3032593
    }
  }
});

// node_modules/viem/_esm/chains/definitions/cronos.js
var cronos = /* @__PURE__ */ defineChain({
  id: 25,
  name: "Cronos Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos",
    symbol: "CRO"
  },
  rpcUrls: {
    default: { http: ["https://evm.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos Explorer",
      url: "https://explorer.cronos.org",
      apiUrl: "https://explorer-api.cronos.org/mainnet/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1963112
    }
  }
});

// node_modules/viem/_esm/chains/definitions/cronosTestnet.js
var cronosTestnet = /* @__PURE__ */ defineChain({
  id: 338,
  name: "Cronos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "CRO",
    symbol: "tCRO"
  },
  rpcUrls: {
    default: { http: ["https://evm-t3.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos Explorer",
      url: "https://cronos.org/explorer/testnet3"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 10191251
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/cronoszkEVM.js
var cronoszkEVM = /* @__PURE__ */ defineChain({
  id: 388,
  name: "Cronos zkEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos zkEVM CRO",
    symbol: "zkCRO"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.zkevm.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos zkEVM (Mainnet) Chain Explorer",
      url: "https://explorer.zkevm.cronos.org"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/cronoszkEVMTestnet.js
var cronoszkEVMTestnet = /* @__PURE__ */ defineChain({
  id: 282,
  name: "Cronos zkEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Cronos zkEVM Test Coin",
    symbol: "zkTCRO"
  },
  rpcUrls: {
    default: { http: ["https://testnet.zkevm.cronos.org"] }
  },
  blockExplorers: {
    default: {
      name: "Cronos zkEVM Testnet Explorer",
      url: "https://explorer.zkevm.cronos.org/testnet"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/crossbell.js
var crossbell = /* @__PURE__ */ defineChain({
  id: 3737,
  name: "Crossbell",
  nativeCurrency: {
    decimals: 18,
    name: "CSB",
    symbol: "CSB"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.crossbell.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "CrossScan",
      url: "https://scan.crossbell.io",
      apiUrl: "https://scan.crossbell.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 38246031
    }
  }
});

// node_modules/viem/_esm/chains/definitions/curtis.js
var curtis = /* @__PURE__ */ defineChain({
  id: 33111,
  name: "Curtis",
  nativeCurrency: { name: "ApeCoin", symbol: "APE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.curtis.apechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Curtis Explorer",
      url: "https://explorer.curtis.apechain.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/cyber.js
var cyber = /* @__PURE__ */ defineChain({
  id: 7560,
  name: "Cyber",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cyber.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://cyberscan.co",
      apiUrl: "https://cyberscan.co/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 0
    }
  }
});

// node_modules/viem/_esm/chains/definitions/cyberTestnet.js
var cyberTestnet = /* @__PURE__ */ defineChain({
  id: 111557560,
  name: "Cyber Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cyber-testnet.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet.cyberscan.co",
      apiUrl: "https://testnet.cyberscan.co/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xffc391F0018269d4758AEA1a144772E8FB99545E",
      blockCreated: 304545
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/darwinia.js
var darwinia = /* @__PURE__ */ defineChain({
  id: 46,
  name: "Darwinia Network",
  nativeCurrency: {
    decimals: 18,
    name: "RING",
    symbol: "RING"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.darwinia.network"],
      webSocket: ["wss://rpc.darwinia.network"]
    }
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.darwinia.network" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 69420
    }
  }
});

// node_modules/viem/_esm/chains/definitions/dchain.js
var dchain = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2716446429837e3,
  name: "Dchain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://dchain-2716446429837000-1.jsonrpc.sagarpc.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Dchain Explorer",
      url: "https://dchain-2716446429837000-1.sagaexplorer.io",
      apiUrl: "https://api-dchain-2716446429837000-1.sagaexplorer.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts
  }
});

// node_modules/viem/_esm/chains/definitions/dchainTestnet.js
var dchainTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2713017997578e3,
  name: "Dchain Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://dchaintestnet-2713017997578000-1.jsonrpc.testnet.sagarpc.io"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Dchain Explorer",
      url: "https://dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io",
      apiUrl: "https://api-dchaintestnet-2713017997578000-1.testnet.sagaexplorer.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts
  }
});

// node_modules/viem/_esm/chains/definitions/defichainEvm.js
var defichainEvm = /* @__PURE__ */ defineChain({
  id: 1130,
  network: "defichain-evm",
  name: "DeFiChain EVM Mainnet",
  nativeCurrency: {
    name: "DeFiChain",
    symbol: "DFI",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth.mainnet.ocean.jellyfishsdk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DeFiScan",
      url: "https://meta.defiscan.live"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 137852
    }
  }
});

// node_modules/viem/_esm/chains/definitions/defichainEvmTestnet.js
var defichainEvmTestnet = /* @__PURE__ */ defineChain({
  id: 1131,
  network: "defichain-evm-testnet",
  name: "DeFiChain EVM Testnet",
  nativeCurrency: {
    name: "DeFiChain",
    symbol: "DFI",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth.testnet.ocean.jellyfishsdk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DeFiScan",
      url: "https://meta.defiscan.live/?network=TestNet"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 156462
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/degen.js
var degen = /* @__PURE__ */ defineChain({
  id: 666666666,
  name: "Degen",
  nativeCurrency: {
    decimals: 18,
    name: "Degen",
    symbol: "DEGEN"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.degen.tips"],
      webSocket: ["wss://rpc.degen.tips"]
    }
  },
  blockExplorers: {
    default: {
      name: "Degen Chain Explorer",
      url: "https://explorer.degen.tips",
      apiUrl: "https://explorer.degen.tips/api/v2"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/dfk.js
var dfk = /* @__PURE__ */ defineChain({
  id: 53935,
  name: "DFK Chain",
  nativeCurrency: {
    decimals: 18,
    name: "Jewel",
    symbol: "JEWEL"
  },
  rpcUrls: {
    default: {
      http: ["https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "DFKSubnetScan",
      url: "https://subnets.avax.network/defi-kingdoms"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14790551
    }
  }
});

// node_modules/viem/_esm/chains/definitions/diode.js
var diode = /* @__PURE__ */ defineChain({
  id: 15,
  name: "Diode Prenet",
  nativeCurrency: {
    decimals: 18,
    name: "DIODE",
    symbol: "DIODE"
  },
  rpcUrls: {
    default: {
      http: ["https://prenet.diode.io:8443"],
      webSocket: ["wss://prenet.diode.io:8443/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Diode Explorer",
      url: "https://diode.io/prenet"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/disChain.js
var disChain = /* @__PURE__ */ defineChain({
  id: 513100,
  name: "DisChain",
  nativeCurrency: {
    decimals: 18,
    name: "DIS",
    symbol: "DIS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.dischain.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "DisChain Explorer",
      url: "https://www.oklink.com/dis"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/dodochainTestnet.js
var dodochainTestnet = defineChain({
  id: 53457,
  name: "DODOchain Testnet",
  nativeCurrency: { decimals: 18, name: "DODO", symbol: "DODO" },
  rpcUrls: {
    default: {
      http: ["https://dodochain-testnet.alt.technology"],
      webSocket: ["wss://dodochain-testnet.alt.technology/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "DODOchain Testnet (Sepolia) Explorer",
      url: "https://testnet-scan.dodochain.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/dogechain.js
var dogechain = /* @__PURE__ */ defineChain({
  id: 2e3,
  name: "Dogechain",
  nativeCurrency: {
    decimals: 18,
    name: "Wrapped Dogecoin",
    symbol: "WDOGE"
  },
  rpcUrls: {
    default: { http: ["https://rpc.dogechain.dog"] }
  },
  blockExplorers: {
    default: {
      name: "DogeChainExplorer",
      url: "https://explorer.dogechain.dog",
      apiUrl: "https://explorer.dogechain.dog/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x68a8609a60a008EFA633dfdec592c03B030cC508",
      blockCreated: 25384031
    }
  }
});

// node_modules/viem/_esm/chains/definitions/dosChain.js
var dosChain = /* @__PURE__ */ defineChain({
  id: 7979,
  name: "DOS Chain",
  nativeCurrency: {
    decimals: 18,
    name: "DOS Chain",
    symbol: "DOS"
  },
  rpcUrls: {
    default: { http: ["https://main.doschain.com"] }
  },
  blockExplorers: {
    default: {
      name: "DOS Chain Explorer",
      url: "https://doscan.io",
      apiUrl: "https://api.doscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 161908
    }
  }
});

// node_modules/viem/_esm/chains/definitions/dosChainTestnet.js
var dosChainTestnet = /* @__PURE__ */ defineChain({
  id: 3939,
  name: "DOS Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "DOS Chain Testnet",
    symbol: "DOS"
  },
  rpcUrls: {
    default: { http: ["https://test.doschain.com"] }
  },
  blockExplorers: {
    default: {
      name: "DOS Chain Testnet Explorer",
      url: "https://test.doscan.io",
      apiUrl: "https://api-test.doscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 69623
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/dreyerxMainnet.js
var dreyerxMainnet = /* @__PURE__ */ defineChain({
  id: 23451,
  name: "DreyerX Mainnet",
  nativeCurrency: {
    name: "DreyerX",
    symbol: "DRX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.dreyerx.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DreyerX Scan",
      url: "https://scan.dreyerx.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/dreyerxTestnet.js
var dreyerxTestnet = /* @__PURE__ */ defineChain({
  id: 23452,
  name: "DreyerX Testnet",
  nativeCurrency: {
    name: "DreyerX",
    symbol: "DRX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["http://testnet-rpc.dreyerx.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "DreyerX Testnet Scan",
      url: "https://testnet-scan.dreyerx.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/dustboyIoT.js
var dustboyIoT = /* @__PURE__ */ defineChain({
  id: 555888,
  name: "DustBoy IoT",
  nativeCurrency: { name: "Ether", symbol: "DST", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://dustboy-rpc.jibl2.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://dustboy.jibl2.com",
      apiUrl: "https://dustboy.jibl2.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xFFD34aa2C62B2D52E00A361e466C229788f4eD6a",
      blockCreated: 526569
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/dymension.js
var dymension = /* @__PURE__ */ defineChain({
  id: 1100,
  name: "Dymension",
  nativeCurrency: {
    name: "DYM",
    symbol: "DYM",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://dymension-evm-rpc.publicnode.com"],
      webSocket: ["wss://dymension-evm-rpc.publicnode.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Dym FYI",
      url: "https://dym.fyi"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/edgeless.js
var edgeless = /* @__PURE__ */ defineChain({
  id: 2026,
  name: "Edgeless Network",
  nativeCurrency: {
    name: "Edgeless Wrapped ETH",
    symbol: "EwETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.edgeless.network/http"],
      webSocket: ["wss://rpc.edgeless.network/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Edgeless Explorer",
      url: "https://explorer.edgeless.network"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/edgelessTestnet.js
var edgelessTestnet = /* @__PURE__ */ defineChain({
  id: 202,
  name: "Edgeless Testnet",
  nativeCurrency: {
    name: "Edgeless Wrapped ETH",
    symbol: "EwETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://edgeless-testnet.rpc.caldera.xyz/http"],
      webSocket: ["wss://edgeless-testnet.rpc.caldera.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Edgeless Testnet Explorer",
      url: "https://testnet.explorer.edgeless.network"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/edgeware.js
var edgeware = /* @__PURE__ */ defineChain({
  id: 2021,
  name: "Edgeware EdgeEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Edgeware",
    symbol: "EDG"
  },
  rpcUrls: {
    default: { http: ["https://edgeware-evm.jelliedowl.net"] }
  },
  blockExplorers: {
    default: {
      name: "Edgscan by Bharathcoorg",
      url: "https://edgscan.live",
      apiUrl: "https://edgscan.live/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 18117872
    }
  }
});

// node_modules/viem/_esm/chains/definitions/edgewareTestnet.js
var edgewareTestnet = /* @__PURE__ */ defineChain({
  id: 2022,
  name: "Beresheet BereEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Testnet EDG",
    symbol: "tEDG"
  },
  rpcUrls: {
    default: { http: ["https://beresheet-evm.jelliedowl.net"] }
  },
  blockExplorers: {
    default: {
      name: "Edgscan by Bharathcoorg",
      url: "https://testnet.edgscan.live",
      apiUrl: "https://testnet.edgscan.live/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/ekta.js
var ekta = /* @__PURE__ */ defineChain({
  id: 1994,
  name: "Ekta",
  nativeCurrency: {
    decimals: 18,
    name: "EKTA",
    symbol: "EKTA"
  },
  rpcUrls: {
    default: { http: ["https://main.ekta.io"] }
  },
  blockExplorers: {
    default: {
      name: "Ektascan",
      url: "https://ektascan.io",
      apiUrl: "https://ektascan.io/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/ektaTestnet.js
var ektaTestnet = /* @__PURE__ */ defineChain({
  id: 1004,
  name: "Ekta Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EKTA",
    symbol: "EKTA"
  },
  rpcUrls: {
    default: { http: ["https://test.ekta.io:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Test Ektascan",
      url: "https://test.ektascan.io",
      apiUrl: "https://test.ektascan.io/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/elastos.js
var elastos = /* @__PURE__ */ defineChain({
  id: 20,
  name: "Elastos Smart Chain",
  nativeCurrency: { name: "ELA", symbol: "ELA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api2.elastos.io/eth"]
    }
  },
  blockExplorers: {
    default: {
      name: "Elastos Explorer",
      url: "https://esc.elastos.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/elastosTestnet.js
var elastosTestnet = /* @__PURE__ */ defineChain({
  id: 21,
  name: "Elastos Smart Chain Testnet",
  nativeCurrency: { name: "tELA", symbol: "tELA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api-testnet.elastos.io/eth"]
    }
  },
  blockExplorers: {
    default: {
      name: "Elastos Explorer",
      url: "https://esc-testnet.elastos.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/electroneum.js
var electroneum = /* @__PURE__ */ defineChain({
  id: 52014,
  name: "Electroneum Mainnet",
  nativeCurrency: {
    name: "ETN",
    symbol: "ETN",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.electroneum.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Electroneum Block Explorer",
      url: "https://blockexplorer.electroneum.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/electroneumTestnet.js
var electroneumTestnet = /* @__PURE__ */ defineChain({
  id: 5201420,
  name: "Electroneum Testnet",
  nativeCurrency: {
    name: "ETN",
    symbol: "ETN",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.electroneum.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Electroneum Block Explorer",
      url: "https://blockexplorer.thesecurityteam.rocks"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/elysiumTestnet.js
var elysiumTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1338,
  name: "Elysium Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "LAVA",
    symbol: "LAVA"
  },
  rpcUrls: {
    default: {
      http: ["https://elysium-test-rpc.vulcanforged.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Elysium testnet explorer",
      url: "https://elysium-explorer.vulcanforged.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/energy.js
var energy = /* @__PURE__ */ defineChain({
  id: 246,
  name: "Energy Mainnet",
  nativeCurrency: { name: "EWT", symbol: "EWT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.energyweb.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "EnergyWeb Explorer",
      url: "https://explorer.energyweb.org"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/enuls.js
var enuls = /* @__PURE__ */ defineChain({
  id: 119,
  name: "ENULS Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "NULS",
    symbol: "NULS"
  },
  rpcUrls: {
    default: { http: ["https://evmapi2.nuls.io"] }
  },
  blockExplorers: {
    default: {
      name: "ENULS Explorer",
      url: "https://evmscan.nuls.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/eon.js
var eon = /* @__PURE__ */ defineChain({
  id: 7332,
  name: "Horizen EON",
  nativeCurrency: {
    decimals: 18,
    name: "ZEN",
    symbol: "ZEN"
  },
  rpcUrls: {
    default: { http: ["https://eon-rpc.horizenlabs.io/ethv1"] }
  },
  blockExplorers: {
    default: {
      name: "EON Explorer",
      url: "https://eon-explorer.horizenlabs.io"
    }
  },
  contracts: {}
});

// node_modules/viem/_esm/chains/definitions/eos.js
var eos = /* @__PURE__ */ defineChain({
  id: 17777,
  name: "EOS EVM",
  nativeCurrency: {
    decimals: 18,
    name: "EOS",
    symbol: "EOS"
  },
  rpcUrls: {
    default: { http: ["https://api.evm.eosnetwork.com"] }
  },
  blockExplorers: {
    default: {
      name: "EOS EVM Explorer",
      url: "https://explorer.evm.eosnetwork.com",
      apiUrl: "https://explorer.evm.eosnetwork.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7943933
    }
  }
});

// node_modules/viem/_esm/chains/definitions/eosTestnet.js
var eosTestnet = /* @__PURE__ */ defineChain({
  id: 15557,
  name: "EOS EVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "EOS",
    symbol: "EOS"
  },
  rpcUrls: {
    default: { http: ["https://api.testnet.evm.eosnetwork.com"] }
  },
  blockExplorers: {
    default: {
      name: "EOS EVM Testnet Explorer",
      url: "https://explorer.testnet.evm.eosnetwork.com",
      apiUrl: "https://explorer.testnet.evm.eosnetwork.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 9067940
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/etherlink.js
var etherlink = /* @__PURE__ */ defineChain({
  id: 42793,
  name: "Etherlink",
  nativeCurrency: {
    decimals: 18,
    name: "Tez",
    symbol: "XTZ"
  },
  rpcUrls: {
    default: { http: ["https://node.mainnet.etherlink.com"] }
  },
  blockExplorers: {
    default: {
      name: "Etherlink",
      url: "https://explorer.etherlink.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 33899
    }
  }
});

// node_modules/viem/_esm/chains/definitions/etherlinkTestnet.js
var etherlinkTestnet = /* @__PURE__ */ defineChain({
  id: 128123,
  name: "Etherlink Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Tez",
    symbol: "XTZ"
  },
  rpcUrls: {
    default: { http: ["https://node.ghostnet.etherlink.com"] }
  },
  blockExplorers: {
    default: {
      name: "Etherlink Testnet",
      url: "https://testnet-explorer.etherlink.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/evmos.js
var evmos = /* @__PURE__ */ defineChain({
  id: 9001,
  name: "Evmos",
  nativeCurrency: {
    decimals: 18,
    name: "Evmos",
    symbol: "EVMOS"
  },
  rpcUrls: {
    default: { http: ["https://eth.bd.evmos.org:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Evmos Block Explorer",
      url: "https://escan.live"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/evmosTestnet.js
var evmosTestnet = /* @__PURE__ */ defineChain({
  id: 9e3,
  name: "Evmos Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Evmos",
    symbol: "EVMOS"
  },
  rpcUrls: {
    default: { http: ["https://eth.bd.evmos.dev:8545"] }
  },
  blockExplorers: {
    default: {
      name: "Evmos Testnet Block Explorer",
      url: "https://evm.evmos.dev/"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/excelonMainnet.js
var excelonMainnet = /* @__PURE__ */ defineChain({
  id: 22052002,
  name: "Excelon Mainnet",
  network: "XLON",
  nativeCurrency: {
    decimals: 18,
    name: "Excelon",
    symbol: "xlon"
  },
  rpcUrls: {
    default: {
      http: ["https://edgewallet1.xlon.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Excelon explorer",
      url: "https://explorer.excelon.io"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/expanse.js
var expanse = /* @__PURE__ */ defineChain({
  id: 2,
  name: "Expanse Network",
  nativeCurrency: {
    decimals: 18,
    name: "EXP",
    symbol: "EXP"
  },
  rpcUrls: {
    default: { http: ["https://node.expanse.tech"] }
  },
  blockExplorers: {
    default: {
      name: "Expanse Explorer",
      url: "https://explorer.expanse.tech"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/fantom.js
var fantom = /* @__PURE__ */ defineChain({
  id: 250,
  name: "Fantom",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/fantom"] }
  },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://ftmscan.com",
      apiUrl: "https://api.ftmscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 33001987
    }
  }
});

// node_modules/viem/_esm/chains/definitions/fantomSonicTestnet.js
var fantomSonicTestnet = /* @__PURE__ */ defineChain({
  id: 64240,
  name: "Fantom Sonic Open Testnet",
  network: "fantom-sonic-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpcapi.sonic.fantom.network"] }
  },
  blockExplorers: {
    default: {
      name: "Fantom Sonic Open Testnet Explorer",
      url: "https://public-sonic.fantom.network"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/fantomTestnet.js
var fantomTestnet = /* @__PURE__ */ defineChain({
  id: 4002,
  name: "Fantom Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Fantom",
    symbol: "FTM"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.fantom.network"] }
  },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://testnet.ftmscan.com",
      apiUrl: "https://testnet.ftmscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 8328688
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/fibo.js
var fibo = /* @__PURE__ */ defineChain({
  id: 12306,
  name: "Fibo Chain",
  nativeCurrency: {
    decimals: 18,
    name: "fibo",
    symbol: "FIBO"
  },
  rpcUrls: {
    default: { http: ["https://network.hzroc.art"] }
  },
  blockExplorers: {
    default: {
      name: "FiboScan",
      url: "https://scan.fibochain.org"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/filecoin.js
var filecoin = /* @__PURE__ */ defineChain({
  id: 314,
  name: "Filecoin Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "filecoin",
    symbol: "FIL"
  },
  rpcUrls: {
    default: { http: ["https://api.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filfox",
      url: "https://filfox.info/en"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3328594
    }
  }
});

// node_modules/viem/_esm/chains/definitions/filecoinCalibration.js
var filecoinCalibration = /* @__PURE__ */ defineChain({
  id: 314159,
  name: "Filecoin Calibration",
  nativeCurrency: {
    decimals: 18,
    name: "testnet filecoin",
    symbol: "tFIL"
  },
  rpcUrls: {
    default: { http: ["https://api.calibration.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filscan",
      url: "https://calibration.filscan.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/filecoinHyperspace.js
var filecoinHyperspace = /* @__PURE__ */ defineChain({
  id: 3141,
  name: "Filecoin Hyperspace",
  nativeCurrency: {
    decimals: 18,
    name: "testnet filecoin",
    symbol: "tFIL"
  },
  rpcUrls: {
    default: { http: ["https://api.hyperspace.node.glif.io/rpc/v1"] }
  },
  blockExplorers: {
    default: {
      name: "Filfox",
      url: "https://hyperspace.filfox.info/en"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/5ireChain.js
var fireChain = /* @__PURE__ */ defineChain({
  id: 995,
  name: "5ireChain",
  nativeCurrency: { name: "5ire Token", symbol: "5IRE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.5ire.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "5ireChain Mainnet Explorer",
      url: "https://5irescan.io/"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/flare.js
var flare = /* @__PURE__ */ defineChain({
  id: 14,
  name: "Flare Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flare",
    symbol: "FLR"
  },
  rpcUrls: {
    default: { http: ["https://flare-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Flare Explorer",
      url: "https://flare-explorer.flare.network",
      apiUrl: "https://flare-explorer.flare.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3002461
    }
  }
});

// node_modules/viem/_esm/chains/definitions/flareTestnet.js
var flareTestnet = /* @__PURE__ */ defineChain({
  id: 114,
  name: "Flare Testnet Coston2",
  nativeCurrency: {
    decimals: 18,
    name: "Coston2 Flare",
    symbol: "C2FLR"
  },
  rpcUrls: {
    default: { http: ["https://coston2-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Coston2 Explorer",
      url: "https://coston2-explorer.flare.network",
      apiUrl: "https://coston2-explorer.flare.network/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/flowMainnet.js
var flowMainnet = /* @__PURE__ */ defineChain({
  id: 747,
  name: "FlowEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mainnet Explorer",
      url: "https://flowdiver.io"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/flowPreviewnet.js
var flowPreviewnet = /* @__PURE__ */ defineChain({
  id: 646,
  name: "FlowEVM Previewnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://previewnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Previewnet Explorer",
      url: "https://previewnet.flowdiver.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6205
    }
  }
});

// node_modules/viem/_esm/chains/definitions/flowTestnet.js
var flowTestnet = /* @__PURE__ */ defineChain({
  id: 545,
  name: "FlowEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Flow",
    symbol: "FLOW"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.evm.nodes.onflow.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Flow Diver",
      url: "https://testnet.flowdiver.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 137518
    }
  }
});

// node_modules/viem/_esm/chains/definitions/fluence.js
var fluence = /* @__PURE__ */ defineChain({
  id: 9999999,
  name: "Fluence",
  nativeCurrency: { name: "FLT", symbol: "FLT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.fluence.dev"],
      webSocket: ["wss://ws.mainnet.fluence.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.mainnet.fluence.dev",
      apiUrl: "https://blockscout.mainnet.fluence.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 207583
    }
  }
});

// node_modules/viem/_esm/chains/definitions/fluenceStage.js
var fluenceStage = /* @__PURE__ */ defineChain({
  id: 123420000220,
  name: "Fluence Stage",
  nativeCurrency: { name: "tFLT", symbol: "tFLT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.stage.fluence.dev"],
      webSocket: ["wss://ws.stage.fluence.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.stage.fluence.dev",
      apiUrl: "https://blockscout.stage.fluence.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 83227
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/fluenceTestnet.js
var fluenceTestnet = /* @__PURE__ */ defineChain({
  id: 52164803,
  name: "Fluence Testnet",
  nativeCurrency: { name: "tFLT", symbol: "tFLT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.fluence.dev"],
      webSocket: ["wss://ws.testnet.fluence.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.testnet.fluence.dev",
      apiUrl: "https://blockscout.testnet.fluence.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 96424
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/forma.js
var forma = /* @__PURE__ */ defineChain({
  id: 984122,
  name: "Forma",
  network: "forma",
  nativeCurrency: {
    symbol: "TIA",
    name: "TIA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.forma.art"],
      webSocket: ["wss://ws.forma.art"]
    }
  },
  blockExplorers: {
    default: {
      name: "Forma Explorer",
      url: "https://explorer.forma.art"
    }
  },
  contracts: {
    multicall3: {
      address: "0xd53C6FFB123F7349A32980F87faeD8FfDc9ef079",
      blockCreated: 252705
    }
  }
});

// node_modules/viem/_esm/chains/definitions/foundry.js
var foundry = /* @__PURE__ */ defineChain({
  id: 31337,
  name: "Foundry",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
      webSocket: ["ws://127.0.0.1:8545"]
    }
  }
});

// node_modules/viem/_esm/chains/definitions/fraxtal.js
var sourceId16 = 1;
var fraxtal = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 252,
  name: "Fraxtal",
  nativeCurrency: { name: "Frax Ether", symbol: "frxETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.frax.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "fraxscan",
      url: "https://fraxscan.com",
      apiUrl: "https://api.fraxscan.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId16]: {
        address: "0x66CC916Ed5C6C2FA97014f7D1cD141528Ae171e4"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId16]: {
        address: "0x36cb65c1967A0Fb0EEE11569C51C2f2aA1Ca6f6D",
        blockCreated: 19135323
      }
    },
    l1StandardBridge: {
      [sourceId16]: {
        address: "0x34C0bD5877A5Ee7099D0f5688D65F4bB9158BDE2",
        blockCreated: 19135323
      }
    }
  },
  sourceId: sourceId16
});

// node_modules/viem/_esm/chains/definitions/fraxtalTestnet.js
var sourceId17 = 17e3;
var fraxtalTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2522,
  name: "Fraxtal Testnet",
  nativeCurrency: { name: "Frax Ether", symbol: "frxETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.frax.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "fraxscan testnet",
      url: "https://holesky.fraxscan.com",
      apiUrl: "https://api-holesky.fraxscan.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId17]: {
        address: "0x715EA64DA13F4d0831ece4Ad3E8c1aa013167F32"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId17]: {
        address: "0xB9c64BfA498d5b9a8398Ed6f46eb76d90dE5505d",
        blockCreated: 318416
      }
    },
    l1StandardBridge: {
      [sourceId17]: {
        address: "0x0BaafC217162f64930909aD9f2B27125121d6332",
        blockCreated: 318416
      }
    }
  },
  sourceId: sourceId17
});

// node_modules/viem/_esm/chains/definitions/funkiMainnet.js
var sourceId18 = 1;
var funkiMainnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 33979,
  name: "Funki",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-mainnet.funkichain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Funki Mainnet Explorer",
      url: "https://funkiscan.io"
    }
  },
  contracts: {
    ...chainConfig2.contracts
  },
  sourceId: sourceId18
});

// node_modules/viem/_esm/chains/definitions/funkiSepolia.js
var sourceId19 = 11155111;
var funkiSepolia = defineChain({
  ...chainConfig2,
  id: 3397901,
  network: "funkiSepolia",
  name: "Funki Sepolia Sandbox",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://funki-testnet.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "Funki Sepolia Sandbox Explorer",
      url: "https://sepolia-sandbox.funkichain.com/"
    }
  },
  testnet: true,
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1620204
    }
  },
  sourceId: sourceId19
});

// node_modules/viem/_esm/chains/definitions/fuse.js
var fuse = /* @__PURE__ */ defineChain({
  id: 122,
  name: "Fuse",
  nativeCurrency: { name: "Fuse", symbol: "FUSE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.fuse.io"] }
  },
  blockExplorers: {
    default: {
      name: "Fuse Explorer",
      url: "https://explorer.fuse.io",
      apiUrl: "https://explorer.fuse.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 16146628
    }
  }
});

// node_modules/viem/_esm/chains/definitions/fuseSparknet.js
var fuseSparknet = /* @__PURE__ */ defineChain({
  id: 123,
  name: "Fuse Sparknet",
  nativeCurrency: { name: "Spark", symbol: "SPARK", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.fusespark.io"] }
  },
  blockExplorers: {
    default: {
      name: "Sparkent Explorer",
      url: "https://explorer.fusespark.io",
      apiUrl: "https://explorer.fusespark.io/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/fusion.js
var fusion = /* @__PURE__ */ defineChain({
  id: 32659,
  name: "Fusion Mainnet",
  nativeCurrency: { name: "Fusion", symbol: "FSN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.fusionnetwork.io"],
      webSocket: ["wss://mainnet.fusionnetwork.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "FSNscan",
      url: "https://fsnscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 10441605
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/fusionTestnet.js
var fusionTestnet = /* @__PURE__ */ defineChain({
  id: 46688,
  name: "Fusion Testnet",
  nativeCurrency: { name: "Fusion", symbol: "FSN", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.fusionnetwork.io"],
      webSocket: ["wss://testnet.fusionnetwork.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "FSNscan",
      url: "https://testnet.fsnscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 10428309
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/garnet.js
var sourceId20 = 17e3;
var garnet = defineChain({
  ...chainConfig2,
  name: "Garnet Testnet",
  testnet: true,
  id: 17069,
  sourceId: sourceId20,
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.garnetchain.com"],
      webSocket: ["wss://rpc.garnetchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.garnetchain.com"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId20]: {
        address: "0x57ee40586fbE286AfC75E67cb69511A6D9aF5909",
        blockCreated: 1274684
      }
    },
    l2OutputOracle: {
      [sourceId20]: {
        address: "0xCb8E7AC561b8EF04F2a15865e9fbc0766FEF569B",
        blockCreated: 1274684
      }
    },
    l1StandardBridge: {
      [sourceId20]: {
        address: "0x09bcDd311FE398F80a78BE37E489f5D440DB95DE",
        blockCreated: 1274684
      }
    }
  }
});

// node_modules/viem/_esm/chains/definitions/geist.js
var geist = /* @__PURE__ */ defineChain({
  id: 63157,
  name: "Geist Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Aavegotchi GHST Token",
    symbol: "GHST"
  },
  rpcUrls: {
    default: {
      http: ["https://geist-mainnet.g.alchemy.com/public"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://geist-mainnet.explorer.alchemy.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 660735
    }
  }
});

// node_modules/viem/_esm/chains/definitions/genesys.js
var genesys = /* @__PURE__ */ defineChain({
  id: 16507,
  name: "Genesys Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "GSYS",
    symbol: "GSYS"
  },
  rpcUrls: {
    default: { http: ["https://rpc.genesys.network"] }
  },
  blockExplorers: {
    default: {
      name: "Genesys Explorer",
      url: "https://gchainexplorer.genesys.network"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/glideL1Protocol.js
var glideL1Protocol = /* @__PURE__ */ defineChain({
  id: 251,
  name: "Glide L1 Protocol XP",
  nativeCurrency: { name: "GLXP", symbol: "GLXP", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-api.glideprotocol.xyz/l1-rpc"],
      webSocket: ["wss://rpc-api.glideprotocol.xyz/l1-rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Glide Protocol Explore",
      url: "https://blockchain-explorer.glideprotocol.xyz"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/glideL2Protocol.js
var glideL2Protocol = /* @__PURE__ */ defineChain({
  id: 253,
  name: "Glide L2 Protocol XP",
  nativeCurrency: { name: "GLXP", symbol: "GLXP", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-api.glideprotocol.xyz/l2-rpc"],
      webSocket: ["wss://rpc-api.glideprotocol.xyz/l2-rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Glide Protocol Explore",
      url: "https://blockchain-explorer.glideprotocol.xyz"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/gnosis.js
var gnosis = /* @__PURE__ */ defineChain({
  id: 100,
  name: "Gnosis",
  nativeCurrency: {
    decimals: 18,
    name: "xDAI",
    symbol: "XDAI"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gnosischain.com"],
      webSocket: ["wss://rpc.gnosischain.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "Gnosisscan",
      url: "https://gnosisscan.io",
      apiUrl: "https://api.gnosisscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 21022491
    }
  }
});

// node_modules/viem/_esm/chains/definitions/gnosisChiado.js
var gnosisChiado = /* @__PURE__ */ defineChain({
  id: 10200,
  name: "Gnosis Chiado",
  nativeCurrency: {
    decimals: 18,
    name: "Gnosis",
    symbol: "xDAI"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.chiadochain.net"],
      webSocket: ["wss://rpc.chiadochain.net/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.chiadochain.net",
      apiUrl: "https://blockscout.chiadochain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4967313
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/gobi.js
var gobi = /* @__PURE__ */ defineChain({
  id: 1663,
  name: "Horizen Gobi Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Test ZEN",
    symbol: "tZEN"
  },
  rpcUrls: {
    default: { http: ["https://gobi-testnet.horizenlabs.io/ethv1"] }
  },
  blockExplorers: {
    default: {
      name: "Gobi Explorer",
      url: "https://gobi-explorer.horizen.io"
    }
  },
  contracts: {},
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/goChain.js
var goChain = /* @__PURE__ */ defineChain({
  id: 60,
  name: "GoChain",
  nativeCurrency: {
    decimals: 18,
    name: "GO",
    symbol: "GO"
  },
  rpcUrls: {
    default: { http: ["https://rpc.gochain.io"] }
  },
  blockExplorers: {
    default: {
      name: "GoChain Explorer",
      url: "https://explorer.gochain.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/godwoken.js
var godwoken = /* @__PURE__ */ defineChain({
  id: 71402,
  name: "Godwoken Mainnet",
  nativeCurrency: { decimals: 18, name: "pCKB", symbol: "pCKB" },
  rpcUrls: {
    default: {
      http: ["https://v1.mainnet.godwoken.io/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "GW Scan",
      url: "https://v1.gwscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 15034
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/goerli.js
var goerli = /* @__PURE__ */ defineChain({
  id: 5,
  name: "Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/eth_goerli"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.etherscan.io",
      apiUrl: "https://api-goerli.etherscan.io/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0xfc4AC75C46C914aF5892d6d3eFFcebD7917293F1",
      blockCreated: 10339206
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6507670
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/gravity.js
var gravity = /* @__PURE__ */ defineChain({
  id: 1625,
  name: "Gravity Alpha Mainnet",
  nativeCurrency: { name: "G", symbol: "G", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.gravity.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Gravity Explorer",
      url: "https://explorer.gravity.xyz",
      apiUrl: "https://explorer.gravity.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xf8ac4BEB2F75d2cFFb588c63251347fdD629B92c",
      blockCreated: 16851
    }
  }
});

// node_modules/viem/_esm/chains/definitions/guruNetwork.js
var guruNetwork = /* @__PURE__ */ defineChain({
  id: 260,
  name: "Guru Network Mainnet",
  nativeCurrency: {
    name: "GURU Token",
    symbol: "GURU",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gurunetwork.ai/archive/260"]
    }
  },
  blockExplorers: {
    default: {
      name: "Guruscan",
      url: "https://scan.gurunetwork.ai"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 271691
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/guruTestnet.js
var guruTestnet = /* @__PURE__ */ defineChain({
  id: 261,
  name: "Guru Network Testnet",
  nativeCurrency: {
    name: "tGURU Token",
    symbol: "tGURU",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.gurunetwork.ai/archive/261"]
    }
  },
  blockExplorers: {
    default: {
      name: "Guruscan",
      url: "https://sepolia.gurunetwork.ai"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/ham.js
var ham = /* @__PURE__ */ defineChain({
  id: 5112,
  name: "Ham",
  nativeCurrency: {
    decimals: 18,
    name: "Ham",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.ham.fun"],
      webSocket: ["wss://rpc.ham.fun"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ham Chain Explorer",
      url: "https://explorer.ham.fun",
      apiUrl: "https://explorer.ham.fun/api/v2"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/haqqMainnet.js
var haqqMainnet = /* @__PURE__ */ defineChain({
  id: 11235,
  name: "HAQQ Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Islamic Coin",
    symbol: "ISLM"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.eth.haqq.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "HAQQ Explorer",
      url: "https://explorer.haqq.network",
      apiUrl: "https://explorer.haqq.network/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/haqqTestedge2.js
var haqqTestedge2 = /* @__PURE__ */ defineChain({
  id: 54211,
  name: "HAQQ Testedge 2",
  nativeCurrency: {
    decimals: 18,
    name: "Islamic Coin",
    symbol: "ISLMT"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.eth.testedge2.haqq.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "HAQQ Explorer",
      url: "https://explorer.testedge2.haqq.network",
      apiUrl: "https://explorer.testedge2.haqq.network/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/hardhat.js
var hardhat = /* @__PURE__ */ defineChain({
  id: 31337,
  name: "Hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] }
  }
});

// node_modules/viem/_esm/chains/definitions/harmonyOne.js
var harmonyOne = /* @__PURE__ */ defineChain({
  id: 16666e5,
  name: "Harmony One",
  nativeCurrency: {
    name: "Harmony",
    symbol: "ONE",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.ankr.com/harmony"] }
  },
  blockExplorers: {
    default: {
      name: "Harmony Explorer",
      url: "https://explorer.harmony.one"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 24185753
    }
  }
});

// node_modules/viem/_esm/chains/definitions/hashkeyChainTestnet.js
var hashkeyTestnet = /* @__PURE__ */ defineChain({
  id: 133,
  name: "HashKey Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "HashKey EcoPoints",
    symbol: "HSK"
  },
  rpcUrls: {
    default: {
      http: ["https://hashkeychain-testnet.alt.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "HashKey Chain Explorer",
      url: "https://hashkeychain-testnet-explorer.alt.technology"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/hedera.js
var hedera = /* @__PURE__ */ defineChain({
  id: 295,
  name: "Hedera Mainnet",
  network: "hedera-mainnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/mainnet"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/hederaPreviewnet.js
var hederaPreviewnet = /* @__PURE__ */ defineChain({
  id: 297,
  name: "Hedera Previewnet",
  network: "hedera-previewnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://previewnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/previewnet"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/hederaTestnet.js
var hederaTestnet = /* @__PURE__ */ defineChain({
  id: 296,
  name: "Hedera Testnet",
  network: "hedera-testnet",
  nativeCurrency: {
    symbol: "HBAR",
    name: "HBAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.hashio.io/api"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hashscan",
      url: "https://hashscan.io/testnet"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/hela.js
var hela = /* @__PURE__ */ defineChain({
  id: 8668,
  name: "Hela Mainnet",
  nativeCurrency: {
    name: "HLUSD",
    symbol: "HLUSD",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.helachain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hela explorer",
      url: "https://mainnet-blockexplorer.helachain.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/hemiSepolia.js
var hemiSepolia = /* @__PURE__ */ defineChain({
  id: 743111,
  name: "Hemi Sepolia",
  network: "Hemi Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.hemi.network/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Hemi Sepolia explorer",
      url: "https://testnet.explorer.hemi.xyz"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/holesky.js
var holesky = /* @__PURE__ */ defineChain({
  id: 17e3,
  name: "Holesky",
  nativeCurrency: { name: "Holesky Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ethereum-holesky-rpc.publicnode.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://holesky.etherscan.io",
      apiUrl: "https://api-holesky.etherscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 77
    },
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      blockCreated: 801613
    },
    ensUniversalResolver: {
      address: "0xa6AC935D4971E3CD133b950aE053bECD16fE7f3b",
      blockCreated: 973484
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/hpb.js
var hpb = /* @__PURE__ */ defineChain({
  id: 269,
  name: "High Performance Blockchain",
  nativeCurrency: { name: "HPB", symbol: "HPB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://hpbnode.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "hpbScan",
      url: "https://hscan.org"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/hychain.js
var hychain = /* @__PURE__ */ defineChain({
  id: 2911,
  name: "HYCHAIN",
  nativeCurrency: { name: "HYTOPIA", symbol: "TOPIA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hychain.com/http"] }
  },
  blockExplorers: {
    default: {
      name: "HYCHAIN Explorer",
      url: "https://explorer.hychain.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/hychainTestnet.js
var hychainTestnet = /* @__PURE__ */ defineChain({
  id: 29112,
  name: "HYCHAIN Testnet",
  nativeCurrency: { name: "HYTOPIA", symbol: "TOPIA", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.hychain.com/http"] }
  },
  blockExplorers: {
    default: {
      name: "HYCHAIN Explorer",
      url: "https://testnet-rpc.hychain.com/http"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/idchain.js
var idchain = /* @__PURE__ */ defineChain({
  id: 74,
  name: "IDChain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "EIDI",
    symbol: "EIDI"
  },
  rpcUrls: {
    default: {
      http: ["https://idchain.one/rpc"],
      webSocket: ["wss://idchain.one/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "IDChain Explorer",
      url: "https://explorer.idchain.one"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/immutableZkEvm.js
var immutableZkEvm = /* @__PURE__ */ defineChain({
  id: 13371,
  name: "Immutable zkEVM",
  nativeCurrency: {
    decimals: 18,
    name: "Immutable Coin",
    symbol: "IMX"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.immutable.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Immutable Explorer",
      url: "https://explorer.immutable.com",
      apiUrl: "https://explorer.immutable.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x236bdA4589e44e6850f5aC6a74BfCa398a86c6c0",
      blockCreated: 4335972
    }
  }
});

// node_modules/viem/_esm/chains/definitions/immutableZkEvmTestnet.js
var immutableZkEvmTestnet = /* @__PURE__ */ defineChain({
  id: 13473,
  name: "Immutable zkEVM Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Immutable Coin",
    symbol: "IMX"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.immutable.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Immutable Testnet Explorer",
      url: "https://explorer.testnet.immutable.com/"
    }
  },
  contracts: {
    multicall3: {
      address: "0x2CC787Ed364600B0222361C4188308Fa8E68bA60",
      blockCreated: 5977391
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/inEVM.js
var inEVM = /* @__PURE__ */ defineChain({
  id: 2525,
  name: "inEVM Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Injective",
    symbol: "INJ"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.rpc.inevm.com/http"] }
  },
  blockExplorers: {
    default: {
      name: "inEVM Explorer",
      url: "https://inevm.calderaexplorer.xyz",
      apiUrl: "https://inevm.calderaexplorer.xyz/api/v2"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 118606
    }
  }
});

// node_modules/viem/_esm/chains/definitions/inkSepolia.js
var sourceId21 = 11155111;
var inkSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 763373,
  name: "Ink Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-gel-sepolia.inkonchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer-sepolia.inkonchain.com/",
      apiUrl: "https://explorer-sepolia.inkonchain.com/api/v2"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId21]: {
        address: "0x860e626c700af381133d9f4af31412a2d1db3d5d"
      }
    },
    portal: {
      [sourceId21]: {
        address: "0x5c1d29c6c9c8b0800692acc95d700bcb4966a1d7"
      }
    },
    l1StandardBridge: {
      [sourceId21]: {
        address: "0x33f60714bbd74d62b66d79213c348614de51901c"
      }
    }
  },
  testnet: true,
  sourceId: sourceId21
});

// node_modules/viem/_esm/chains/definitions/iota.js
var iota = /* @__PURE__ */ defineChain({
  id: 8822,
  name: "IOTA EVM",
  network: "iotaevm",
  nativeCurrency: {
    decimals: 18,
    name: "IOTA",
    symbol: "IOTA"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.iotaledger.net"],
      webSocket: ["wss://ws.json-rpc.evm.iotaledger.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.evm.iota.org",
      apiUrl: "https://explorer.evm.iota.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 25022
    }
  }
});

// node_modules/viem/_esm/chains/definitions/iotaTestnet.js
var iotaTestnet = /* @__PURE__ */ defineChain({
  id: 1075,
  name: "IOTA EVM Testnet",
  network: "iotaevm-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IOTA",
    symbol: "IOTA"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.testnet.iotaledger.net"],
      webSocket: ["wss://ws.json-rpc.evm.testnet.iotaledger.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.evm.testnet.iotaledger.net",
      apiUrl: "https://explorer.evm.testnet.iotaledger.net/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/iotex.js
var iotex = /* @__PURE__ */ defineChain({
  id: 4689,
  name: "IoTeX",
  nativeCurrency: {
    decimals: 18,
    name: "IoTeX",
    symbol: "IOTX"
  },
  rpcUrls: {
    default: {
      http: ["https://babel-api.mainnet.iotex.io"],
      webSocket: ["wss://babel-api.mainnet.iotex.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "IoTeXScan",
      url: "https://iotexscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 22163670
    }
  }
});

// node_modules/viem/_esm/chains/definitions/iotexTestnet.js
var iotexTestnet = /* @__PURE__ */ defineChain({
  id: 4690,
  name: "IoTeX Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IoTeX",
    symbol: "IOTX"
  },
  rpcUrls: {
    default: {
      http: ["https://babel-api.testnet.iotex.io"],
      webSocket: ["wss://babel-api.testnet.iotex.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "IoTeXScan",
      url: "https://testnet.iotexscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xb5cecD6894c6f473Ec726A176f1512399A2e355d",
      blockCreated: 24347592
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/iSunCoin.js
var iSunCoin = /* @__PURE__ */ defineChain({
  id: 8017,
  name: "iSunCoin Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "ISC",
    symbol: "ISC"
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.isuncoin.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "iSunCoin Explorer",
      url: "https://baifa.io/app/chains/8017"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/jbc.js
var jbc = /* @__PURE__ */ defineChain({
  id: 8899,
  name: "JIBCHAIN L1",
  network: "jbc",
  nativeCurrency: { name: "JBC", symbol: "JBC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-l1.jibchain.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp-l1.jibchain.net",
      apiUrl: "https://exp-l1.jibchain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xc0C8C486D1466C57Efe13C2bf000d4c56F47CBdC",
      blockCreated: 2299048
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/jbcTestnet.js
var jbcTestnet = /* @__PURE__ */ defineChain({
  id: 88991,
  name: "Jibchain Testnet",
  nativeCurrency: { name: "tJBC", symbol: "tJBC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.jibchain.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp.testnet.jibchain.net",
      apiUrl: "https://exp.testnet.jibchain.net/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xa1a858ad9041B4741e620355a3F96B3c78e70ecE",
      blockCreated: 32848
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/karura.js
var karura = /* @__PURE__ */ defineChain({
  id: 686,
  name: "Karura",
  network: "karura",
  nativeCurrency: {
    name: "Karura",
    symbol: "KAR",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-karura.aca-api.network"],
      webSocket: ["wss://eth-rpc-karura.aca-api.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Karura Blockscout",
      url: "https://blockscout.karura.network",
      apiUrl: "https://blockscout.karura.network/api"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/kakarotSepolia.js
var kakarotSepolia = /* @__PURE__ */ defineChain({
  id: 1802203764,
  name: "Kakarot Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.kakarot.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kakarot Scan",
      url: "https://sepolia.kakarotscan.org"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/kakarotStarknetSepolia.js
var kakarotStarknetSepolia = /* @__PURE__ */ defineChain({
  id: 920637907288165,
  name: "Kakarot Starknet Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.kakarot.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kakarot Scan",
      url: "https://sepolia.kakarotscan.org"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/kardiaChain.js
var kardiaChain = /* @__PURE__ */ defineChain({
  id: 24,
  name: "KardiaChain Mainnet",
  nativeCurrency: { name: "KAI", symbol: "KAI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.kardiachain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "KardiaChain Explorer",
      url: "https://explorer.kardiachain.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/kava.js
var kava = /* @__PURE__ */ defineChain({
  id: 2222,
  name: "Kava EVM",
  network: "kava-mainnet",
  nativeCurrency: {
    name: "Kava",
    symbol: "KAVA",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://evm.kava.io"] }
  },
  blockExplorers: {
    default: {
      name: "Kava EVM Explorer",
      url: "https://kavascan.com",
      apiUrl: "https://kavascan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3661165
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/kavaTestnet.js
var kavaTestnet = /* @__PURE__ */ defineChain({
  id: 2221,
  name: "Kava EVM Testnet",
  network: "kava-testnet",
  nativeCurrency: {
    name: "Kava",
    symbol: "KAVA",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://evm.testnet.kava.io"] }
  },
  blockExplorers: {
    default: {
      name: "Kava EVM Testnet Explorer",
      url: "https://testnet.kavascan.com/",
      apiUrl: "https://testnet.kavascan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xDf1D724A7166261eEB015418fe8c7679BBEa7fd6",
      blockCreated: 7242179
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/kcc.js
var kcc = /* @__PURE__ */ defineChain({
  id: 321,
  name: "KCC Mainnet",
  network: "KCC Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "KCS",
    symbol: "KCS"
  },
  rpcUrls: {
    default: {
      http: ["https://kcc-rpc.com"]
    }
  },
  blockExplorers: {
    default: { name: "KCC Explorer", url: "https://explorer.kcc.io" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11760430
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/kinto.js
var kinto = /* @__PURE__ */ defineChain({
  id: 7887,
  name: "Kinto Mainnet",
  network: "Kinto Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.kinto.xyz/http"] }
  },
  blockExplorers: {
    default: {
      name: "Kinto Explorer",
      url: "https://explorer.kinto.xyz"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/klaytn.js
var klaytn = /* @__PURE__ */ defineChain({
  id: 8217,
  name: "Klaytn",
  nativeCurrency: {
    decimals: 18,
    name: "Klaytn",
    symbol: "KLAY"
  },
  rpcUrls: {
    default: { http: ["https://public-en-cypress.klaytn.net"] }
  },
  blockExplorers: {
    default: {
      name: "KlaytnScope",
      url: "https://scope.klaytn.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 96002415
    }
  }
});

// node_modules/viem/_esm/chains/definitions/kaia.js
var kaia = /* @__PURE__ */ defineChain({
  id: 8217,
  name: "Kaia",
  nativeCurrency: {
    decimals: 18,
    name: "Kaia",
    symbol: "KAIA"
  },
  rpcUrls: {
    default: { http: ["https://public-en.node.kaia.io"] }
  },
  blockExplorers: {
    default: {
      name: "KaiaScan",
      url: "https://kaiascan.io",
      apiUrl: "https://api-cypress.klaytnscope.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 96002415
    }
  }
});

// node_modules/viem/_esm/chains/definitions/kairos.js
var kairos = /* @__PURE__ */ defineChain({
  id: 1001,
  name: "Kairos Testnet",
  network: "kairos",
  nativeCurrency: {
    decimals: 18,
    name: "Kairos KAIA",
    symbol: "KAIA"
  },
  rpcUrls: {
    default: { http: ["https://public-en-kairos.node.kaia.io"] }
  },
  blockExplorers: {
    default: {
      name: "KaiaScan",
      url: "https://kairos.kaiascan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 123390593
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/klaytnBaobab.js
var klaytnBaobab = /* @__PURE__ */ defineChain({
  id: 1001,
  name: "Klaytn Baobab Testnet",
  network: "klaytn-baobab",
  nativeCurrency: {
    decimals: 18,
    name: "Baobab Klaytn",
    symbol: "KLAY"
  },
  rpcUrls: {
    default: { http: ["https://public-en-baobab.klaytn.net"] }
  },
  blockExplorers: {
    default: {
      name: "KlaytnScope",
      url: "https://baobab.klaytnscope.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 123390593
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/koi.js
var koi = defineChain({
  id: 701,
  name: "Koi Network",
  nativeCurrency: {
    decimals: 18,
    name: "Koi Network Native Token",
    symbol: "KRING"
  },
  rpcUrls: {
    default: {
      http: ["https://koi-rpc.darwinia.network"],
      webSocket: ["wss://koi-rpc.darwinia.network"]
    }
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://koi-scan.darwinia.network" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 180001
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/kroma.js
var kroma = /* @__PURE__ */ defineChain({
  id: 255,
  name: "Kroma",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.kroma.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kroma Explorer",
      url: "https://blockscout.kroma.network",
      apiUrl: "https://blockscout.kroma.network/api"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/kromaSepolia.js
var kromaSepolia = /* @__PURE__ */ defineChain({
  id: 2358,
  name: "Kroma Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.sepolia.kroma.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Kroma Sepolia Explorer",
      url: "https://blockscout.sepolia.kroma.network",
      apiUrl: "https://blockscout.sepolia.kroma.network/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/l3x.js
var l3x = /* @__PURE__ */ defineChain({
  id: 12324,
  name: "L3X Protocol",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-mainnet.l3x.com"],
      webSocket: ["wss://rpc-mainnet.l3x.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "L3X Mainnet Explorer",
      url: "https://explorer.l3x.com",
      apiUrl: "https://explorer.l3x.com/api/v2"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/l3xTestnet.js
var l3xTestnet = /* @__PURE__ */ defineChain({
  id: 12325,
  name: "L3X Protocol Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.l3x.com"],
      webSocket: ["wss://rpc-testnet.l3x.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "L3X Testnet Explorer",
      url: "https://explorer-testnet.l3x.com",
      apiUrl: "https://explorer-testnet.l3x.com/api/v2"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/lavita.js
var lavita = /* @__PURE__ */ defineChain({
  id: 360890,
  name: "LAVITA Mainnet",
  nativeCurrency: { name: "vTFUEL", symbol: "vTFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://tsub360890-eth-rpc.thetatoken.org/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "LAVITA Explorer",
      url: "https://tsub360890-explorer.thetatoken.org"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/lightlinkPegasus.js
var lightlinkPegasus = /* @__PURE__ */ defineChain({
  id: 1891,
  name: "LightLink Pegasus Testnet",
  network: "lightlink-pegasus",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://replicator.pegasus.lightlink.io/rpc/v1"]
    }
  },
  blockExplorers: {
    default: {
      name: "LightLink Pegasus Explorer",
      url: "https://pegasus.lightlink.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/lightlinkPhoenix.js
var lightlinkPhoenix = /* @__PURE__ */ defineChain({
  id: 1890,
  name: "LightLink Phoenix Mainnet",
  network: "lightlink-phoenix",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://replicator.phoenix.lightlink.io/rpc/v1"]
    }
  },
  blockExplorers: {
    default: {
      name: "LightLink Phoenix Explorer",
      url: "https://phoenix.lightlink.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/linea/actions/estimateGas.js
async function estimateGas(client, args) {
  const { account: account_ = client.account } = args;
  if (!account_)
    throw new AccountNotFoundError();
  const account = parseAccount(account_);
  try {
    const { accessList, blockNumber, blockTag, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    assertRequest(args);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request = format({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      from: account?.address,
      accessList,
      data,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    });
    const { baseFeePerGas, gasLimit, priorityFeePerGas } = await client.request({
      method: "linea_estimateGas",
      params: block ? [request, block] : [request]
    });
    return {
      baseFeePerGas: BigInt(baseFeePerGas),
      gasLimit: BigInt(gasLimit),
      priorityFeePerGas: BigInt(priorityFeePerGas)
    };
  } catch (err) {
    throw getCallError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}

// node_modules/viem/_esm/linea/chainConfig.js
var chainConfig4 = {
  fees: {
    estimateFeesPerGas,
    async maxPriorityFeePerGas({ block, client, request }) {
      const response = await estimateFeesPerGas({
        block,
        client,
        multiply: (x) => x,
        request,
        type: "eip1559"
      });
      if (!response?.maxPriorityFeePerGas)
        return null;
      return response.maxPriorityFeePerGas;
    }
  }
};
async function estimateFeesPerGas({ client, multiply, request, type }) {
  try {
    const response = await estimateGas(client, {
      ...request,
      account: request?.account
    });
    const { priorityFeePerGas: maxPriorityFeePerGas } = response;
    const baseFeePerGas = multiply(BigInt(response.baseFeePerGas));
    const maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas;
    if (type === "legacy")
      return { gasPrice: maxFeePerGas };
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  } catch {
    return null;
  }
}

// node_modules/viem/_esm/chains/definitions/linea.js
var linea = /* @__PURE__ */ defineChain({
  ...chainConfig4,
  id: 59144,
  name: "Linea Mainnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.linea.build"],
      webSocket: ["wss://rpc.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://lineascan.build",
      apiUrl: "https://api.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 42
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/lineaGoerli.js
var lineaGoerli = /* @__PURE__ */ defineChain({
  id: 59140,
  name: "Linea Goerli Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.goerli.linea.build"],
      webSocket: ["wss://rpc.goerli.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.lineascan.build",
      apiUrl: "https://api-goerli.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 498623
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/lineaSepolia.js
var lineaSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig4,
  id: 59141,
  name: "Linea Sepolia Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia.linea.build"],
      webSocket: ["wss://rpc.sepolia.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.lineascan.build",
      apiUrl: "https://api-sepolia.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 227427
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/lineaTestnet.js
var lineaTestnet = /* @__PURE__ */ defineChain({
  id: 59140,
  name: "Linea Goerli Testnet",
  nativeCurrency: { name: "Linea Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.goerli.linea.build"],
      webSocket: ["wss://rpc.goerli.linea.build"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli.lineascan.build",
      apiUrl: "https://goerli.lineascan.build/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 498623
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/lisk.js
var sourceId22 = 1;
var lisk = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1135,
  name: "Lisk",
  network: "lisk",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.lisk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.lisk.com",
      apiUrl: "https://blockscout.lisk.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xA9d71E1dd7ca26F26e656E66d6AA81ed7f745bf0"
    },
    l2OutputOracle: {
      [sourceId22]: {
        address: "0x113cB99283AF242Da0A0C54347667edF531Aa7d6"
      }
    },
    portal: {
      [sourceId22]: {
        address: "0x26dB93F8b8b4f7016240af62F7730979d353f9A7"
      }
    },
    l1StandardBridge: {
      [sourceId22]: {
        address: "0x2658723Bf70c7667De6B25F99fcce13A16D25d08"
      }
    }
  },
  sourceId: sourceId22
});

// node_modules/viem/_esm/chains/definitions/liskSepolia.js
var sourceId23 = 11155111;
var liskSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 4202,
  network: "lisk-sepolia",
  name: "Lisk Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia-blockscout.lisk.com",
      apiUrl: "https://sepolia-blockscout.lisk.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId23]: {
        address: "0xA0E35F56C318DE1bD5D9ca6A94Fe7e37C5663348"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId23]: {
        address: "0xe3d90F21490686Ec7eF37BE788E02dfC12787264"
      }
    },
    l1StandardBridge: {
      [sourceId23]: {
        address: "0x1Fb30e446eA791cd1f011675E5F3f5311b70faF5"
      }
    }
  },
  testnet: true,
  sourceId: sourceId23
});

// node_modules/viem/_esm/chains/definitions/localhost.js
var localhost = /* @__PURE__ */ defineChain({
  id: 1337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] }
  }
});

// node_modules/viem/_esm/chains/definitions/loop.js
var loop = /* @__PURE__ */ defineChain({
  id: 15551,
  name: "LoopNetwork Mainnet",
  nativeCurrency: {
    name: "LOOP",
    symbol: "LOOP",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://api.mainnetloop.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "LoopNetwork Blockchain Explorer",
      url: "https://explorer.mainnetloop.com/"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/lukso.js
var lukso = /* @__PURE__ */ defineChain({
  id: 42,
  network: "lukso",
  name: "LUKSO",
  nativeCurrency: {
    name: "LUKSO",
    symbol: "LYX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.lukso.network"],
      webSocket: ["wss://ws-rpc.mainnet.lukso.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "LUKSO Mainnet Explorer",
      url: "https://explorer.execution.mainnet.lukso.network",
      apiUrl: "https://api.explorer.execution.mainnet.lukso.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 468183
    }
  }
});

// node_modules/viem/_esm/chains/definitions/luksoTestnet.js
var luksoTestnet = /* @__PURE__ */ defineChain({
  id: 4201,
  name: "LUKSO Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "LUKSO Testnet",
    symbol: "LYXt"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.lukso.network"],
      webSocket: ["wss://ws-rpc.testnet.lukso.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "LUKSO Testnet Explorer",
      url: "https://explorer.execution.testnet.lukso.network",
      apiUrl: "https://api.explorer.execution.testnet.lukso.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 605348
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/lycan.js
var lycan = /* @__PURE__ */ defineChain({
  id: 721,
  name: "Lycan",
  nativeCurrency: {
    decimals: 18,
    name: "Lycan",
    symbol: "LYC"
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.lycanchain.com",
        "https://us-east.lycanchain.com",
        "https://us-west.lycanchain.com",
        "https://eu-north.lycanchain.com",
        "https://eu-west.lycanchain.com",
        "https://asia-southeast.lycanchain.com"
      ],
      webSocket: [
        "wss://rpc.lycanchain.com",
        "wss://us-east.lycanchain.com",
        "wss://us-west.lycanchain.com",
        "wss://eu-north.lycanchain.com",
        "wss://eu-west.lycanchain.com",
        "wss://asia-southeast.lycanchain.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Lycan Explorer",
      url: "https://explorer.lycanchain.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/lyra.js
var lyra = /* @__PURE__ */ defineChain({
  id: 957,
  name: "Lyra Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.lyra.finance"]
    }
  },
  blockExplorers: {
    default: {
      name: "Lyra Explorer",
      url: "https://explorer.lyra.finance",
      apiUrl: "https://explorer.lyra.finance/api/v2"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1935198
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mainnet.js
var mainnet = /* @__PURE__ */ defineChain({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://cloudflare-eth.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
      blockCreated: 19258213
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mandala.js
var mandala = /* @__PURE__ */ defineChain({
  id: 595,
  name: "Mandala TC9",
  network: "mandala",
  nativeCurrency: {
    name: "Mandala",
    symbol: "mACA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-tc9.aca-staging.network"],
      webSocket: ["wss://eth-rpc-tc9.aca-staging.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mandala Blockscout",
      url: "https://blockscout.mandala.aca-staging.network",
      apiUrl: "https://blockscout.mandala.aca-staging.network/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/manta.js
var manta = /* @__PURE__ */ defineChain({
  id: 169,
  name: "Manta Pacific Mainnet",
  network: "manta",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://pacific-rpc.manta.network/http"] }
  },
  blockExplorers: {
    default: {
      name: "Manta Explorer",
      url: "https://pacific-explorer.manta.network",
      apiUrl: "https://pacific-explorer.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 332890
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mantaSepoliaTestnet.js
var mantaSepoliaTestnet = /* @__PURE__ */ defineChain({
  id: 3441006,
  name: "Manta Pacific Sepolia Testnet",
  network: "manta-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://pacific-rpc.sepolia-testnet.manta.network/http"]
    }
  },
  blockExplorers: {
    default: {
      name: "Manta Sepolia Testnet Explorer",
      url: "https://pacific-explorer.sepolia-testnet.manta.network",
      apiUrl: "https://pacific-explorer.sepolia-testnet.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca54918f7B525C8df894668846506767412b53E3",
      blockCreated: 479584
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/mantaTestnet.js
var mantaTestnet = /* @__PURE__ */ defineChain({
  id: 3441005,
  name: "Manta Pacific Testnet",
  network: "manta-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://manta-testnet.calderachain.xyz/http"] }
  },
  blockExplorers: {
    default: {
      name: "Manta Testnet Explorer",
      url: "https://pacific-explorer.testnet.manta.network",
      apiUrl: "https://pacific-explorer.testnet.manta.network/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x211B1643b95Fe76f11eD8880EE810ABD9A4cf56C",
      blockCreated: 419915
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/mantle.js
var mantle = /* @__PURE__ */ defineChain({
  id: 5e3,
  name: "Mantle",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Explorer",
      url: "https://mantlescan.xyz/",
      apiUrl: "https://api.mantlescan.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 304717
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mantleSepoliaTestnet.js
var mantleSepoliaTestnet = /* @__PURE__ */ defineChain({
  id: 5003,
  name: "Mantle Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.sepolia.mantle.xyz/",
      apiUrl: "https://explorer.sepolia.mantle.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4584012
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/mantleTestnet.js
var mantleTestnet = /* @__PURE__ */ defineChain({
  id: 5001,
  name: "Mantle Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.mantle.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Mantle Testnet Explorer",
      url: "https://explorer.testnet.mantle.xyz",
      apiUrl: "https://explorer.testnet.mantle.xyz/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 561333
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/mapProtocol.js
var mapProtocol = /* @__PURE__ */ defineChain({
  id: 22776,
  name: "MAP Protocol",
  nativeCurrency: {
    decimals: 18,
    name: "MAPO",
    symbol: "MAPO"
  },
  rpcUrls: {
    default: { http: ["https://rpc.maplabs.io"] }
  },
  blockExplorers: {
    default: {
      name: "MAPO Scan",
      url: "https://maposcan.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/matchain.js
var matchain = /* @__PURE__ */ defineChain({
  id: 698,
  name: "Matchain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.matchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Matchain Scan",
      url: "https://matchscan.io"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/matchainTestnet.js
var matchainTestnet = /* @__PURE__ */ defineChain({
  id: 699,
  name: "Matchain Testnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.matchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Matchain Scan",
      url: "https://testnet.matchscan.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/mchVerse.js
var mchVerse = /* @__PURE__ */ defineChain({
  id: 29548,
  name: "MCH Verse",
  nativeCurrency: { name: "Oasys", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.oasys.mycryptoheroes.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "MCH Verse Explorer",
      url: "https://explorer.oasys.mycryptoheroes.net",
      apiUrl: "https://explorer.oasys.mycryptoheroes.net/api"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/mekong.js
var mekong = /* @__PURE__ */ defineChain({
  id: 7078815900,
  name: "Mekong Pectra Devnet",
  nativeCurrency: { name: "eth", symbol: "eth", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mekong.ethpandaops.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Block Explorer",
      url: "https://explorer.mekong.ethpandaops.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/meld.js
var meld = /* @__PURE__ */ defineChain({
  id: 333000333,
  name: "Meld",
  nativeCurrency: {
    decimals: 18,
    name: "Meld",
    symbol: "MELD"
  },
  rpcUrls: {
    default: { http: ["https://rpc-1.meld.com"] }
  },
  blockExplorers: {
    default: { name: "MELDscan", url: "https://meldscan.io" }
  },
  contracts: {
    multicall3: {
      address: "0x769ee5a8e82c15c1b6e358f62ac8eb6e3abe8dc5",
      blockCreated: 360069
    }
  }
});

// node_modules/viem/_esm/chains/definitions/merlin.js
var merlin = /* @__PURE__ */ defineChain({
  id: 4200,
  name: "Merlin",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.merlinchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://scan.merlinchain.io",
      apiUrl: "https://scan.merlinchain.io/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/metachain.js
var metachain = /* @__PURE__ */ defineChain({
  id: 571,
  name: "MetaChain Mainnet",
  nativeCurrency: { name: "Metatime Coin", symbol: "MTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.metatime.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "MetaExplorer",
      url: "https://explorer.metatime.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0000000000000000000000000000000000003001",
      blockCreated: 0
    }
  }
});

// node_modules/viem/_esm/chains/definitions/metachainIstanbul.js
var metachainIstanbul = /* @__PURE__ */ defineChain({
  id: 1453,
  name: "MetaChain Istanbul",
  nativeCurrency: { name: "Metatime Coin", symbol: "MTC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://istanbul-rpc.metachain.dev"]
    }
  },
  blockExplorers: {
    default: {
      name: "MetaExplorer",
      url: "https://istanbul-explorer.metachain.dev"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0000000000000000000000000000000000003001",
      blockCreated: 0
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/metadium.js
var metadium = /* @__PURE__ */ defineChain({
  id: 11,
  name: "Metadium Network",
  nativeCurrency: {
    decimals: 18,
    name: "META",
    symbol: "META"
  },
  rpcUrls: {
    default: { http: ["https://api.metadium.com/prod"] }
  },
  blockExplorers: {
    default: {
      name: "Metadium Explorer",
      url: "https://explorer.metadium.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/metalL2.js
var sourceId24 = 1;
var metalL2 = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1750,
  name: "Metal L2",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.metall2.com"],
      webSocket: ["wss://rpc.metall2.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.metall2.com",
      apiUrl: "https://explorer.metall2.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId24]: {
        address: "0x3B1F7aDa0Fcc26B13515af752Dd07fB1CAc11426"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 0
    },
    portal: {
      [sourceId24]: {
        address: "0x3F37aBdE2C6b5B2ed6F8045787Df1ED1E3753956"
      }
    },
    l1StandardBridge: {
      [sourceId24]: {
        address: "0x6d0f65D59b55B0FEC5d2d15365154DcADC140BF3"
      }
    }
  },
  sourceId: sourceId24
});

// node_modules/viem/_esm/chains/definitions/meter.js
var meter = /* @__PURE__ */ defineChain({
  id: 82,
  name: "Meter",
  nativeCurrency: {
    decimals: 18,
    name: "MTR",
    symbol: "MTR"
  },
  rpcUrls: {
    default: { http: ["https://rpc.meter.io"] }
  },
  blockExplorers: {
    default: {
      name: "MeterScan",
      url: "https://scan.meter.io"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/meterTestnet.js
var meterTestnet = /* @__PURE__ */ defineChain({
  id: 83,
  name: "Meter Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MTR",
    symbol: "MTR"
  },
  rpcUrls: {
    default: { http: ["https://rpctest.meter.io"] }
  },
  blockExplorers: {
    default: {
      name: "MeterTestnetScan",
      url: "https://scan-warringstakes.meter.io"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/metis.js
var metis = /* @__PURE__ */ defineChain({
  id: 1088,
  name: "Metis",
  nativeCurrency: {
    decimals: 18,
    name: "Metis",
    symbol: "METIS"
  },
  rpcUrls: {
    default: { http: ["https://andromeda.metis.io/?owner=1088"] }
  },
  blockExplorers: {
    default: {
      name: "Metis Explorer",
      url: "https://explorer.metis.io",
      apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/1088/etherscan/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2338552
    }
  }
});

// node_modules/viem/_esm/chains/definitions/metisGoerli.js
var metisGoerli = /* @__PURE__ */ defineChain({
  id: 599,
  name: "Metis Goerli",
  nativeCurrency: {
    decimals: 18,
    name: "Metis Goerli",
    symbol: "METIS"
  },
  rpcUrls: {
    default: { http: ["https://goerli.gateway.metisdevops.link"] }
  },
  blockExplorers: {
    default: {
      name: "Metis Goerli Explorer",
      url: "https://goerli.explorer.metisdevops.link",
      apiUrl: "https://goerli.explorer.metisdevops.link/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1006207
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mev.js
var mev = /* @__PURE__ */ defineChain({
  id: 7518,
  name: "MEVerse Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "MEVerse",
    symbol: "MEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.meversemainnet.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://www.meversescan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 86881340
    }
  }
});

// node_modules/viem/_esm/chains/definitions/mevTestnet.js
var mevTestnet = /* @__PURE__ */ defineChain({
  id: 4759,
  name: "MEVerse Chain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MEVerse",
    symbol: "MEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.meversetestnet.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet.meversescan.io/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 64371115
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/mint.js
var mint = /* @__PURE__ */ defineChain({
  id: 185,
  name: "Mint Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mintchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mintchain explorer",
      url: "https://explorer.mintchain.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/mintSepoliaTestnet.js
var mintSepoliaTestnet = /* @__PURE__ */ defineChain({
  id: 1686,
  name: "Mint Sepolia Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.mintchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Mintchain Testnet explorer",
      url: "https://testnet-explorer.mintchain.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/mode.js
var sourceId25 = 1;
var mode = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 34443,
  name: "Mode Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.mode.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Modescan",
      url: "https://modescan.io"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 2465882
    },
    l2OutputOracle: {
      [sourceId25]: {
        address: "0x4317ba146D4933D889518a3e5E11Fe7a53199b04"
      }
    },
    portal: {
      [sourceId25]: {
        address: "0x8B34b14c7c7123459Cf3076b8Cb929BE097d0C07"
      }
    },
    l1StandardBridge: {
      [sourceId25]: {
        address: "0x735aDBbE72226BD52e818E7181953f42E3b0FF21"
      }
    }
  },
  sourceId: sourceId25
});

// node_modules/viem/_esm/chains/definitions/modeTestnet.js
var sourceId26 = 11155111;
var modeTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 919,
  name: "Mode Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.mode.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://sepolia.explorer.mode.network",
      apiUrl: "https://sepolia.explorer.mode.network/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId26]: {
        address: "0x2634BD65ba27AB63811c74A63118ACb312701Bfa",
        blockCreated: 3778393
      }
    },
    portal: {
      [sourceId26]: {
        address: "0x320e1580effF37E008F1C92700d1eBa47c1B23fD",
        blockCreated: 3778395
      }
    },
    l1StandardBridge: {
      [sourceId26]: {
        address: "0xbC5C679879B2965296756CD959C3C739769995E2",
        blockCreated: 3778392
      }
    },
    multicall3: {
      address: "0xBAba8373113Fb7a68f195deF18732e01aF8eDfCF",
      blockCreated: 3019007
    }
  },
  testnet: true,
  sourceId: sourceId26
});

// node_modules/viem/_esm/chains/definitions/moonbaseAlpha.js
var moonbaseAlpha = /* @__PURE__ */ defineChain({
  id: 1287,
  name: "Moonbase Alpha",
  nativeCurrency: {
    decimals: 18,
    name: "DEV",
    symbol: "DEV"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.api.moonbase.moonbeam.network"],
      webSocket: ["wss://wss.api.moonbase.moonbeam.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonbase.moonscan.io",
      apiUrl: "https://moonbase.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1850686
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/moonbeam.js
var moonbeam = /* @__PURE__ */ defineChain({
  id: 1284,
  name: "Moonbeam",
  nativeCurrency: {
    decimals: 18,
    name: "GLMR",
    symbol: "GLMR"
  },
  rpcUrls: {
    default: {
      http: ["https://moonbeam.public.blastapi.io"],
      webSocket: ["wss://moonbeam.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonscan.io",
      apiUrl: "https://api-moonbeam.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 609002
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/moonbeamDev.js
var moonbeamDev = /* @__PURE__ */ defineChain({
  id: 1281,
  name: "Moonbeam Development Node",
  nativeCurrency: {
    decimals: 18,
    name: "DEV",
    symbol: "DEV"
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:9944"],
      webSocket: ["wss://127.0.0.1:9944"]
    }
  }
});

// node_modules/viem/_esm/chains/definitions/moonriver.js
var moonriver = /* @__PURE__ */ defineChain({
  id: 1285,
  name: "Moonriver",
  nativeCurrency: {
    decimals: 18,
    name: "MOVR",
    symbol: "MOVR"
  },
  rpcUrls: {
    default: {
      http: ["https://moonriver.public.blastapi.io"],
      webSocket: ["wss://moonriver.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Moonscan",
      url: "https://moonriver.moonscan.io",
      apiUrl: "https://api-moonriver.moonscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1597904
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/morph.js
var morph = /* @__PURE__ */ defineChain({
  id: 2818,
  name: "Morph",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.morphl2.io"],
      webSocket: ["wss://rpc.morphl2.io:8443"]
    }
  },
  blockExplorers: {
    default: {
      name: "Morph Explorer",
      url: "https://explorer.morphl2.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/morphHolesky.js
var morphHolesky = /* @__PURE__ */ defineChain({
  id: 2810,
  name: "Morph Holesky",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-quicknode-holesky.morphl2.io"],
      webSocket: ["wss://rpc-quicknode-holesky.morphl2.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Morph Holesky Explorer",
      url: "https://explorer-holesky.morphl2.io",
      apiUrl: "https://explorer-api-holesky.morphl2.io/api?"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/morphSepolia.js
var morphSepolia = /* @__PURE__ */ defineChain({
  id: 2710,
  name: "Morph Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.morphl2.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Morph Testnet Explorer",
      url: "https://explorer-testnet.morphl2.io",
      apiUrl: "https://explorer-api-testnet.morphl2.io/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/nahmii.js
var nahmii = /* @__PURE__ */ defineChain({
  id: 5551,
  name: "Nahmii 2 Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://l2.nahmii.io"] }
  },
  blockExplorers: {
    default: {
      name: "Nahmii 2 Explorer",
      url: "https://explorer.n2.nahmii.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/nautilus.js
var nautilus = /* @__PURE__ */ defineChain({
  id: 22222,
  name: "Nautilus Mainnet",
  nativeCurrency: { name: "ZBC", symbol: "ZBC", decimals: 9 },
  rpcUrls: {
    default: {
      http: ["https://api.nautilus.nautchain.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "NautScan",
      url: "https://nautscan.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/neonDevnet.js
var neonDevnet = /* @__PURE__ */ defineChain({
  id: 245022926,
  name: "Neon EVM DevNet",
  nativeCurrency: { name: "NEON", symbol: "NEON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://devnet.neonevm.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Neonscan",
      url: "https://devnet.neonscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 205206112
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/neonMainnet.js
var neonMainnet = /* @__PURE__ */ defineChain({
  id: 245022934,
  network: "neonMainnet",
  name: "Neon EVM MainNet",
  nativeCurrency: { name: "NEON", symbol: "NEON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://neon-proxy-mainnet.solana.p2p.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Neonscan",
      url: "https://neonscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 206545524
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/nexi.js
var nexi = /* @__PURE__ */ defineChain({
  id: 4242,
  name: "Nexi",
  nativeCurrency: { name: "Nexi", symbol: "NEXI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.chain.nexi.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "NexiScan",
      url: "https://www.nexiscan.com",
      apiUrl: "https://www.nexiscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0277A46Cc69A57eE3A6C8c158bA874832F718B8E",
      blockCreated: 25770160
    }
  }
});

// node_modules/viem/_esm/chains/definitions/nexilix.js
var nexilix = /* @__PURE__ */ defineChain({
  id: 240,
  name: "Nexilix Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "Nexilix",
    symbol: "NEXILIX"
  },
  rpcUrls: {
    default: { http: ["https://rpcurl.pos.nexilix.com"] }
  },
  blockExplorers: {
    default: {
      name: "NexilixScan",
      url: "https://scan.nexilix.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x58381c8e2BF9d0C2C4259cA14BdA9Afe02831244",
      blockCreated: 74448
    }
  }
});

// node_modules/viem/_esm/chains/definitions/oasisTestnet.js
var oasisTestnet = /* @__PURE__ */ defineChain({
  id: 4090,
  network: "oasis-testnet",
  name: "Oasis Testnet",
  nativeCurrency: { name: "Fasttoken", symbol: "FTN", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc1.oasis.bahamutchain.com"] }
  },
  blockExplorers: {
    default: {
      name: "Ftnscan",
      url: "https://oasis.ftnscan.com",
      apiUrl: "https://oasis.ftnscan.com/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/oasys.js
var oasys = /* @__PURE__ */ defineChain({
  id: 248,
  name: "Oasys",
  nativeCurrency: { name: "Oasys", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.oasys.games"]
    }
  },
  blockExplorers: {
    default: {
      name: "OasysScan",
      url: "https://scan.oasys.games",
      apiUrl: "https://scan.oasys.games/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/odysseyTestnet.js
var odysseyTestnet = /* @__PURE__ */ defineChain({
  id: 911867,
  name: "Odyssey Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://odyssey.ithaca.xyz"] }
  },
  blockExplorers: {
    default: {
      name: "Odyssey Explorer",
      url: "https://odyssey-explorer.ithaca.xyz",
      apiUrl: "https://odyssey-explorer.ithaca.xyz/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/okc.js
var okc = /* @__PURE__ */ defineChain({
  id: 66,
  name: "OKC",
  nativeCurrency: {
    decimals: 18,
    name: "OKT",
    symbol: "OKT"
  },
  rpcUrls: {
    default: { http: ["https://exchainrpc.okex.org"] }
  },
  blockExplorers: {
    default: {
      name: "oklink",
      url: "https://www.oklink.com/okc"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 10364792
    }
  }
});

// node_modules/viem/_esm/chains/definitions/omax.js
var omax = /* @__PURE__ */ defineChain({
  id: 311,
  name: "Omax Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "OMAX",
    symbol: "OMAX"
  },
  rpcUrls: {
    default: { http: ["https://mainapi.omaxray.com"] }
  },
  blockExplorers: {
    default: {
      name: "Omax Explorer",
      url: "https://omaxscan.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/oneWorld.js
var oneWorld = /* @__PURE__ */ defineChain({
  id: 309075,
  name: "One World Chain Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "OWCT",
    symbol: "OWCT"
  },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.oneworldchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "One World Explorer",
      url: "https://mainnet.oneworldchain.org"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/oortmainnetDev.js
var oortMainnetDev = /* @__PURE__ */ defineChain({
  id: 9700,
  name: "OORT MainnetDev",
  nativeCurrency: {
    decimals: 18,
    name: "OORT",
    symbol: "OORT"
  },
  rpcUrls: {
    default: { http: ["https://dev-rpc.oortech.com"] }
  },
  blockExplorers: {
    default: {
      name: "OORT MainnetDev Explorer",
      url: "https://dev-scan.oortech.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/opBNB.js
var sourceId27 = 56;
var opBNB = /* @__PURE__ */ defineChain({
  id: 204,
  name: "opBNB",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://opbnb-mainnet-rpc.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "opBNB (BSCScan)",
      url: "https://opbnb.bscscan.com",
      apiUrl: "https://api-opbnb.bscscan.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 512881
    },
    l2OutputOracle: {
      [sourceId27]: {
        address: "0x153CAB79f4767E2ff862C94aa49573294B13D169"
      }
    },
    portal: {
      [sourceId27]: {
        address: "0x1876EA7702C0ad0C6A2ae6036DE7733edfBca519"
      }
    },
    l1StandardBridge: {
      [sourceId27]: {
        address: "0xF05F0e4362859c3331Cb9395CBC201E3Fa6757Ea"
      }
    }
  },
  sourceId: sourceId27
});

// node_modules/viem/_esm/chains/definitions/opBNBTestnet.js
var sourceId28 = 97;
var opBNBTestnet = /* @__PURE__ */ defineChain({
  id: 5611,
  name: "opBNB Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBNB",
    symbol: "tBNB"
  },
  rpcUrls: {
    default: { http: ["https://opbnb-testnet-rpc.bnbchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "opbnbscan",
      url: "https://testnet.opbnbscan.com"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3705108
    },
    l2OutputOracle: {
      [sourceId28]: {
        address: "0xFf2394Bb843012562f4349C6632a0EcB92fC8810"
      }
    },
    portal: {
      [sourceId28]: {
        address: "0x4386C8ABf2009aC0c263462Da568DD9d46e52a31"
      }
    },
    l1StandardBridge: {
      [sourceId28]: {
        address: "0x677311Fd2cCc511Bbc0f581E8d9a07B033D5E840"
      }
    }
  },
  testnet: true,
  sourceId: sourceId28
});

// node_modules/viem/_esm/chains/definitions/optimism.js
var sourceId29 = 1;
var optimism = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 10,
  name: "OP Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Optimism Explorer",
      url: "https://optimistic.etherscan.io",
      apiUrl: "https://api-optimistic.etherscan.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId29]: {
        address: "0xe5965Ab5962eDc7477C8520243A95517CD252fA9"
      }
    },
    l2OutputOracle: {
      [sourceId29]: {
        address: "0xdfe97868233d1aa22e815a266982f2cf17685a27"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 4286263
    },
    portal: {
      [sourceId29]: {
        address: "0xbEb5Fc579115071764c7423A4f12eDde41f106Ed"
      }
    },
    l1StandardBridge: {
      [sourceId29]: {
        address: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1"
      }
    }
  },
  sourceId: sourceId29
});

// node_modules/viem/_esm/chains/definitions/optimismGoerli.js
var sourceId30 = 5;
var optimismGoerli = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 420,
  name: "Optimism Goerli",
  nativeCurrency: { name: "Goerli Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://goerli.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io",
      apiUrl: "https://goerli-optimism.etherscan.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId30]: {
        address: "0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 49461
    },
    portal: {
      [sourceId30]: {
        address: "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383"
      }
    },
    l1StandardBridge: {
      [sourceId30]: {
        address: "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8"
      }
    }
  },
  testnet: true,
  sourceId: sourceId30
});

// node_modules/viem/_esm/chains/definitions/optimismSepolia.js
var sourceId31 = 11155111;
var optimismSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 11155420,
  name: "OP Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.optimism.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://optimism-sepolia.blockscout.com",
      apiUrl: "https://optimism-sepolia.blockscout.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId31]: {
        address: "0x05F9613aDB30026FFd634f38e5C4dFd30a197Fa1"
      }
    },
    l2OutputOracle: {
      [sourceId31]: {
        address: "0x90E9c4f8a994a250F6aEfd61CAFb4F2e895D458F"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1620204
    },
    portal: {
      [sourceId31]: {
        address: "0x16Fc5058F25648194471939df75CF27A2fdC48BC"
      }
    },
    l1StandardBridge: {
      [sourceId31]: {
        address: "0xFBb0621E0B23b5478B630BD55a5f21f67730B0F1"
      }
    }
  },
  testnet: true,
  sourceId: sourceId31
});

// node_modules/viem/_esm/chains/definitions/optopia.js
var optopia = /* @__PURE__ */ defineChain({
  id: 62050,
  name: "Optopia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-mainnet.optopia.ai"] }
  },
  blockExplorers: {
    default: {
      name: "Optopia Explorer",
      url: "https://scan.optopia.ai"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/optopiaTestnet.js
var optopiaTestnet = /* @__PURE__ */ defineChain({
  id: 62049,
  name: "Optopia Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-testnet.optopia.ai"] }
  },
  blockExplorers: {
    default: {
      name: "Optopia Explorer",
      url: "https://scan-testnet.optopia.ai"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/orderly.js
var orderly = /* @__PURE__ */ defineChain({
  id: 291,
  name: "Orderly",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.orderly.network"] }
  },
  blockExplorers: {
    default: {
      name: "Orderly Explorer",
      url: "https://explorer.orderly.network"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/orderlySepolia.js
var orderlySepolia = /* @__PURE__ */ defineChain({
  id: 4460,
  name: "Orderly Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://l2-orderly-l2-4460-sepolia-8tc3sd7dvy.t.conduit.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Orderly Explorer",
      url: "https://explorerl2new-orderly-l2-4460-sepolia-8tc3sd7dvy.t.conduit.xyz"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/otimDevnet.js
var otimDevnet = /* @__PURE__ */ defineChain({
  id: 41144114,
  name: "Otim Devnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["http://devnet.otim.xyz"]
    }
  },
  contracts: {
    batchInvoker: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/palm.js
var palm = /* @__PURE__ */ defineChain({
  id: 11297108109,
  name: "Palm",
  nativeCurrency: {
    decimals: 18,
    name: "PALM",
    symbol: "PALM"
  },
  rpcUrls: {
    default: {
      http: ["https://palm-mainnet.public.blastapi.io"],
      webSocket: ["wss://palm-mainnet.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Chainlens",
      url: "https://palm.chainlens.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15429248
    }
  }
});

// node_modules/viem/_esm/chains/definitions/palmTestnet.js
var palmTestnet = /* @__PURE__ */ defineChain({
  id: 11297108099,
  name: "Palm Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "PALM",
    symbol: "PALM"
  },
  rpcUrls: {
    default: {
      http: ["https://palm-mainnet.public.blastapi.io"],
      webSocket: ["wss://palm-mainnet.public.blastapi.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Chainlens",
      url: "https://palm.chainlens.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15429248
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/pgn.js
var sourceId32 = 1;
var pgn = /* @__PURE__ */ defineChain({
  id: 424,
  network: "pgn",
  name: "PGN",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.publicgoods.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "PGN Explorer",
      url: "https://explorer.publicgoods.network",
      apiUrl: "https://explorer.publicgoods.network/api"
    }
  },
  contracts: {
    l2OutputOracle: {
      [sourceId32]: {
        address: "0x9E6204F750cD866b299594e2aC9eA824E2e5f95c"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3380209
    },
    portal: {
      [sourceId32]: {
        address: "0xb26Fd985c5959bBB382BAFdD0b879E149e48116c"
      }
    },
    l1StandardBridge: {
      [sourceId32]: {
        address: "0xD0204B9527C1bA7bD765Fa5CCD9355d38338272b"
      }
    }
  },
  formatters: formatters2,
  sourceId: sourceId32
});

// node_modules/viem/_esm/chains/definitions/pgnTestnet.js
var sourceId33 = 11155111;
var pgnTestnet = /* @__PURE__ */ defineChain({
  id: 58008,
  network: "pgn-testnet",
  name: "PGN ",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.publicgoods.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "PGN Testnet Explorer",
      url: "https://explorer.sepolia.publicgoods.network",
      apiUrl: "https://explorer.sepolia.publicgoods.network/api"
    }
  },
  contracts: {
    l2OutputOracle: {
      [sourceId33]: {
        address: "0xD5bAc3152ffC25318F848B3DD5dA6C85171BaEEe"
      }
    },
    portal: {
      [sourceId33]: {
        address: "0xF04BdD5353Bb0EFF6CA60CfcC78594278eBfE179"
      }
    },
    l1StandardBridge: {
      [sourceId33]: {
        address: "0xFaE6abCAF30D23e233AC7faF747F2fC3a5a6Bfa3"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3754925
    }
  },
  formatters: formatters2,
  sourceId: sourceId33,
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/phoenix.js
var phoenix = /* @__PURE__ */ defineChain({
  id: 13381,
  name: "Phoenix Blockchain",
  nativeCurrency: { name: "Phoenix", symbol: "PHX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.phoenixplorer.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Phoenixplorer",
      url: "https://phoenixplorer.com",
      apiUrl: "https://phoenixplorer.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x498cF757a575cFF2c2Ed9f532f56Efa797f86442",
      blockCreated: 5620192
    }
  }
});

// node_modules/viem/_esm/chains/definitions/planq.js
var planq = /* @__PURE__ */ defineChain({
  id: 7070,
  name: "Planq Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "PLQ",
    symbol: "PLQ"
  },
  rpcUrls: {
    default: { http: ["https://evm-rpc.planq.network"] }
  },
  blockExplorers: {
    default: {
      name: "Planq Explorer",
      url: "https://evm.planq.network"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/playfiAlbireo.js
var playfiAlbireo = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 1612127,
  name: "PlayFi Albireo Testnet",
  network: "albireo",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://albireo-rpc.playfi.ai"],
      webSocket: ["wss://albireo-rpc-ws.playfi.ai/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "PlayFi Albireo Explorer",
      url: "https://albireo-explorer.playfi.ai"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/plinga.js
var plinga = /* @__PURE__ */ defineChain({
  id: 242,
  name: "Plinga",
  nativeCurrency: { name: "Plinga", symbol: "PLINGA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpcurl.mainnet.plgchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Plgscan",
      url: "https://www.plgscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0989576160f2e7092908BB9479631b901060b6e4",
      blockCreated: 204489
    }
  }
});

// node_modules/viem/_esm/chains/definitions/plumeTestnet.js
var sourceId34 = 11155111;
var plumeTestnet = /* @__PURE__ */ defineChain({
  id: 161221135,
  name: "Plume Testnet",
  nativeCurrency: {
    name: "Plume Sepolia Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.plumenetwork.xyz/http"],
      webSocket: ["wss://testnet-rpc.plumenetwork.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer.plumenetwork.xyz",
      apiUrl: "https://testnet-explorer.plumenetwork.xyz/api"
    }
  },
  testnet: true,
  sourceId: sourceId34
});

// node_modules/viem/_esm/chains/definitions/polterTestnet.js
var polterTestnet = /* @__PURE__ */ defineChain({
  id: 631571,
  name: "Polter Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Polter GHST",
    symbol: "GHST"
  },
  rpcUrls: {
    default: {
      http: ["https://geist-polter.g.alchemy.com/public"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://polter-testnet.explorer.alchemy.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11245
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/polygon.js
var polygon = /* @__PURE__ */ defineChain({
  id: 137,
  name: "Polygon",
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://polygon-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com",
      apiUrl: "https://api.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  }
});

// node_modules/viem/_esm/chains/definitions/polygonAmoy.js
var polygonAmoy = /* @__PURE__ */ defineChain({
  id: 80002,
  name: "Polygon Amoy",
  nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-amoy.polygon.technology"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://amoy.polygonscan.com",
      apiUrl: "https://api-amoy.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 3127388
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/polygonMumbai.js
var polygonMumbai = /* @__PURE__ */ defineChain({
  id: 80001,
  name: "Polygon Mumbai",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.ankr.com/polygon_mumbai"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com",
      apiUrl: "https://api-testnet.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 25770160
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/polygonZkEvm.js
var polygonZkEvm = /* @__PURE__ */ defineChain({
  id: 1101,
  name: "Polygon zkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://zkevm-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://zkevm.polygonscan.com",
      apiUrl: "https://api-zkevm.polygonscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 57746
    }
  }
});

// node_modules/viem/_esm/chains/definitions/polygonZkEvmCardona.js
var polygonZkEvmCardona = /* @__PURE__ */ defineChain({
  id: 2442,
  name: "Polygon zkEVM Cardona",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.cardona.zkevm-rpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://cardona-zkevm.polygonscan.com",
      apiUrl: "https://cardona-zkevm.polygonscan.com/api"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 114091
    }
  }
});

// node_modules/viem/_esm/chains/definitions/polygonZkEvmTestnet.js
var polygonZkEvmTestnet = /* @__PURE__ */ defineChain({
  id: 1442,
  name: "Polygon zkEVM Testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.public.zkevm-test.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://testnet-zkevm.polygonscan.com",
      apiUrl: "https://testnet-zkevm.polygonscan.com/api"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 525686
    }
  }
});

// node_modules/viem/_esm/chains/definitions/pulsechain.js
var pulsechain = /* @__PURE__ */ defineChain({
  id: 369,
  name: "PulseChain",
  nativeCurrency: { name: "Pulse", symbol: "PLS", decimals: 18 },
  testnet: false,
  rpcUrls: {
    default: {
      http: ["https://rpc.pulsechain.com"],
      webSocket: ["wss://ws.pulsechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PulseScan",
      url: "https://scan.pulsechain.com",
      apiUrl: "https://api.scan.pulsechain.com/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});

// node_modules/viem/_esm/chains/definitions/pulsechainV4.js
var pulsechainV4 = /* @__PURE__ */ defineChain({
  id: 943,
  name: "PulseChain V4",
  testnet: true,
  nativeCurrency: { name: "V4 Pulse", symbol: "v4PLS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.v4.testnet.pulsechain.com"],
      webSocket: ["wss://ws.v4.testnet.pulsechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "PulseScan",
      url: "https://scan.v4.testnet.pulsechain.com",
      apiUrl: "https://scan.v4.testnet.pulsechain.com/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
});

// node_modules/viem/_esm/chains/definitions/ql1.js
var ql1 = /* @__PURE__ */ defineChain({
  id: 766,
  name: "QL1",
  nativeCurrency: {
    decimals: 18,
    name: "QOM",
    symbol: "QOM"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.qom.one"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ql1 Explorer",
      url: "https://scan.qom.one"
    }
  },
  contracts: {
    multicall3: {
      address: "0x7A52370716ea730585884F5BDB0f6E60C39b8C64"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/qMainnet.js
var qMainnet = /* @__PURE__ */ defineChain({
  id: 35441,
  name: "Q Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Q",
    symbol: "Q"
  },
  rpcUrls: {
    default: { http: ["https://rpc.q.org"] }
  },
  blockExplorers: {
    default: {
      name: "Q Mainnet Explorer",
      url: "https://explorer.q.org",
      apiUrl: "https://explorer.q.org/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/qTestnet.js
var qTestnet = /* @__PURE__ */ defineChain({
  id: 35443,
  name: "Q Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Q",
    symbol: "Q"
  },
  rpcUrls: {
    default: { http: ["https://rpc.qtestnet.org"] }
  },
  blockExplorers: {
    default: {
      name: "Q Testnet Explorer",
      url: "https://explorer.qtestnet.org",
      apiUrl: "https://explorer.qtestnet.org/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/real.js
var real = /* @__PURE__ */ defineChain({
  id: 111188,
  name: "re.al",
  nativeCurrency: {
    name: "reETH",
    decimals: 18,
    symbol: "reETH"
  },
  rpcUrls: {
    default: { http: ["https://real.drpc.org"] }
  },
  blockExplorers: {
    default: {
      name: "re.al Explorer",
      url: "https://explorer.re.al",
      apiUrl: "https://explorer.re.al/api/v2"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 695
    }
  }
});

// node_modules/viem/_esm/chains/definitions/redbellyMainnet.js
var redbellyMainnet = /* @__PURE__ */ defineChain({
  id: 151,
  name: "Redbelly Network Mainnet",
  nativeCurrency: {
    name: "Redbelly Native Coin",
    symbol: "RBNT",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://governors.mainnet.redbelly.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Routescan",
      url: "https://redbelly.routescan.io",
      apiUrl: "https://api.routescan.io/v2/network/mainnet/evm/151/etherscan/api"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/redbellyTestnet.js
var redbellyTestnet = /* @__PURE__ */ defineChain({
  id: 153,
  name: "Redbelly Network Testnet",
  nativeCurrency: {
    name: "Redbelly Native Coin",
    symbol: "RBNT",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://governors.testnet.redbelly.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Routescan",
      url: "https://redbelly.testnet.routescan.io",
      apiUrl: "https://api.routescan.io/v2/network/testnet/evm/153_2/etherscan/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/redstone.js
var sourceId35 = 1;
var redstone = defineChain({
  ...chainConfig2,
  name: "Redstone",
  id: 690,
  sourceId: sourceId35,
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://rpc.redstonechain.com"],
      webSocket: ["wss://rpc.redstonechain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.redstone.xyz"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId35]: {
        address: "0xC7bCb0e8839a28A1cFadd1CF716de9016CdA51ae",
        blockCreated: 19578329
      }
    },
    l2OutputOracle: {
      [sourceId35]: {
        address: "0xa426A052f657AEEefc298b3B5c35a470e4739d69",
        blockCreated: 19578337
      }
    },
    l1StandardBridge: {
      [sourceId35]: {
        address: "0xc473ca7E02af24c129c2eEf51F2aDf0411c1Df69",
        blockCreated: 19578331
      }
    }
  }
});

// node_modules/viem/_esm/chains/definitions/rei.js
var rei = /* @__PURE__ */ defineChain({
  id: 47805,
  name: "REI Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "REI",
    symbol: "REI"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.rei.network"],
      webSocket: ["wss://rpc.rei.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "REI Scan",
      url: "https://scan.rei.network"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/reyaNetwork.js
var reyaNetwork = /* @__PURE__ */ defineChain({
  id: 1729,
  name: "Reya Network",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  rpcUrls: {
    default: {
      http: ["https://rpc.reya.network"],
      webSocket: ["wss://ws.reya.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Reya Network Explorer",
      url: "https://explorer.reya.network"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/rollux.js
var rollux = /* @__PURE__ */ defineChain({
  id: 570,
  name: "Rollux Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.rollux.com"],
      webSocket: ["wss://rpc.rollux.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "RolluxExplorer",
      url: "https://explorer.rollux.com",
      apiUrl: "https://explorer.rollux.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 119222
    }
  }
});

// node_modules/viem/_esm/chains/definitions/rolluxTestnet.js
var rolluxTestnet = /* @__PURE__ */ defineChain({
  id: 57e3,
  name: "Rollux Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-tanenbaum.rollux.com/"],
      webSocket: ["wss://rpc-tanenbaum.rollux.com/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "RolluxTestnetExplorer",
      url: "https://rollux.tanenbaum.io",
      apiUrl: "https://rollux.tanenbaum.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1813675
    }
  }
});

// node_modules/viem/_esm/chains/definitions/ronin.js
var ronin = /* @__PURE__ */ defineChain({
  id: 2020,
  name: "Ronin",
  nativeCurrency: { name: "RON", symbol: "RON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.roninchain.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ronin Explorer",
      url: "https://app.roninchain.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 26023535
    }
  }
});

// node_modules/viem/_esm/chains/definitions/root.js
var root = /* @__PURE__ */ defineChain({
  id: 7668,
  name: "The Root Network",
  nativeCurrency: {
    decimals: 18,
    name: "XRP",
    symbol: "XRP"
  },
  rpcUrls: {
    default: {
      http: ["https://root.rootnet.live/archive"],
      webSocket: ["wss://root.rootnet.live/archive/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Rootscan",
      url: "https://rootscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xc9C2E2429AeC354916c476B30d729deDdC94988d",
      blockCreated: 9218338
    }
  }
});

// node_modules/viem/_esm/chains/definitions/rootPorcini.js
var rootPorcini = /* @__PURE__ */ defineChain({
  id: 7672,
  name: "The Root Network - Porcini",
  nativeCurrency: {
    decimals: 18,
    name: "XRP",
    symbol: "XRP"
  },
  rpcUrls: {
    default: {
      http: ["https://porcini.rootnet.app/archive"],
      webSocket: ["wss://porcini.rootnet.app/archive/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Rootscan",
      url: "https://porcini.rootscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xc9C2E2429AeC354916c476B30d729deDdC94988d",
      blockCreated: 10555692
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/rootstock.js
var rootstock = /* @__PURE__ */ defineChain({
  id: 30,
  name: "Rootstock Mainnet",
  network: "rootstock",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "RBTC"
  },
  rpcUrls: {
    default: { http: ["https://public-node.rsk.co"] }
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.rsk.co"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 4249540
    }
  }
});

// node_modules/viem/_esm/chains/definitions/rootstockTestnet.js
var rootstockTestnet = /* @__PURE__ */ defineChain({
  id: 31,
  name: "Rootstock Testnet",
  network: "rootstock",
  nativeCurrency: {
    decimals: 18,
    name: "Rootstock Bitcoin",
    symbol: "tRBTC"
  },
  rpcUrls: {
    default: { http: ["https://public-node.testnet.rsk.co"] }
  },
  blockExplorers: {
    default: {
      name: "RSK Explorer",
      url: "https://explorer.testnet.rootstock.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/rss3.js
var sourceId36 = 1;
var rss3 = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 12553,
  name: "RSS3 VSL Mainnet",
  nativeCurrency: { name: "RSS3", symbol: "RSS3", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.rss3.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "RSS3 VSL Mainnet Scan",
      url: "https://scan.rss3.io",
      apiUrl: "https://scan.rss3.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId36]: {
        address: "0xE6f24d2C32B3109B18ed33cF08eFb490b1e09C10"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14193
    },
    portal: {
      [sourceId36]: {
        address: "0x6A12432491bbbE8d3babf75F759766774C778Db4",
        blockCreated: 19387057
      }
    },
    l1StandardBridge: {
      [sourceId36]: {
        address: "0x4cbab69108Aa72151EDa5A3c164eA86845f18438"
      }
    }
  },
  sourceId: sourceId36
});

// node_modules/viem/_esm/chains/definitions/rss3Sepolia.js
var sourceId37 = 11155111;
var rss3Sepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2331,
  name: "RSS3 VSL Sepolia Testnet",
  nativeCurrency: { name: "RSS3", symbol: "RSS3", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.rss3.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "RSS3 VSL Sepolia Testnet Scan",
      url: "https://scan.testnet.rss3.io",
      apiUrl: "https://scan.testnet.rss3.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId37]: {
        address: "0xDb5c46C3Eaa6Ed6aE8b2379785DF7dd029C0dC81"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 55697
    },
    portal: {
      [sourceId37]: {
        address: "0xcBD77E8E1E7F06B25baDe67142cdE82652Da7b57",
        blockCreated: 5345035
      }
    },
    l1StandardBridge: {
      [sourceId37]: {
        address: "0xdDD29bb63B0839FB1cE0eE439Ff027738595D07B"
      }
    }
  },
  testnet: true,
  sourceId: sourceId37
});

// node_modules/viem/_esm/chains/definitions/saakuru.js
var saakuru = /* @__PURE__ */ defineChain({
  id: 7225878,
  name: "Saakuru Mainnet",
  nativeCurrency: { name: "OAS", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.saakuru.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Saakuru Explorer",
      url: "https://explorer.saakuru.network"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/saigon.js
var saigon = /* @__PURE__ */ defineChain({
  id: 2021,
  name: "Saigon Testnet",
  nativeCurrency: { name: "RON", symbol: "RON", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://saigon-testnet.roninchain.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Saigon Explorer",
      url: "https://saigon-app.roninchain.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 18736871
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/sanko.js
var sanko = /* @__PURE__ */ defineChain({
  id: 1996,
  name: "Sanko",
  nativeCurrency: { name: "DMT", symbol: "DMT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.sanko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Sanko Explorer",
      url: "https://explorer.sanko.xyz"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/sapphire.js
var sapphire = /* @__PURE__ */ defineChain({
  id: 23294,
  name: "Oasis Sapphire",
  network: "sapphire",
  nativeCurrency: { name: "Sapphire Rose", symbol: "ROSE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sapphire.oasis.io"],
      webSocket: ["wss://sapphire.oasis.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Oasis Explorer",
      url: "https://explorer.oasis.io/mainnet/sapphire"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 734531
    }
  }
});

// node_modules/viem/_esm/chains/definitions/sapphireTestnet.js
var sapphireTestnet = /* @__PURE__ */ defineChain({
  id: 23295,
  name: "Oasis Sapphire Testnet",
  network: "sapphire-testnet",
  nativeCurrency: { name: "Sapphire Test Rose", symbol: "TEST", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.sapphire.oasis.dev"],
      webSocket: ["wss://testnet.sapphire.oasis.dev/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Oasis Explorer",
      url: "https://explorer.oasis.io/testnet/sapphire"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/satoshivm.js
var satoshiVM = /* @__PURE__ */ defineChain({
  id: 3109,
  name: "SatoshiVM Alpha Mainnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://alpha-rpc-node-http.svmscan.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://svmscan.io",
      apiUrl: "https://svmscan.io/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/satoshivmTestnet.js
var satoshiVMTestnet = /* @__PURE__ */ defineChain({
  id: 3110,
  name: "SatoshiVM Testnet",
  nativeCurrency: {
    name: "BTC",
    symbol: "BTC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://test-rpc-node-http.svmscan.io"] }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://testnet.svmscan.io",
      apiUrl: "https://testnet.svmscan.io/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/scroll.js
var scroll = /* @__PURE__ */ defineChain({
  id: 534352,
  name: "Scroll",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.scroll.io"],
      webSocket: ["wss://wss-rpc.scroll.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Scrollscan",
      url: "https://scrollscan.com",
      apiUrl: "https://api.scrollscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/scrollSepolia.js
var scrollSepolia = /* @__PURE__ */ defineChain({
  id: 534351,
  name: "Scroll Sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia-rpc.scroll.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Scrollscan",
      url: "https://sepolia.scrollscan.com",
      apiUrl: "https://api-sepolia.scrollscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 9473
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/sei.js
var sei = /* @__PURE__ */ defineChain({
  id: 1329,
  name: "Sei Network",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc.sei-apis.com/"],
      webSocket: ["wss://evm-ws.sei-apis.com/"]
    }
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com",
      apiUrl: "https://seitrace.com/pacific-1/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/seiDevnet.js
var seiDevnet = /* @__PURE__ */ defineChain({
  id: 713715,
  name: "Sei Devnet",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-arctic-1.sei-apis.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/seiTestnet.js
var seiTestnet = /* @__PURE__ */ defineChain({
  id: 1328,
  name: "Sei Testnet",
  nativeCurrency: { name: "Sei", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evm-rpc-testnet.sei-apis.com"],
      webSocket: ["wss://evm-ws-testnet.sei-apis.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Seitrace",
      url: "https://seitrace.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/sepolia.js
var sepolia = /* @__PURE__ */ defineChain({
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.drpc.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
      apiUrl: "https://api-sepolia.etherscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 751532
    },
    ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
    ensUniversalResolver: {
      address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
      blockCreated: 5317080
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/shape.js
var sourceId38 = 1;
var shape = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 360,
  name: "Shape",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.shape.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "shapescan",
      url: "https://shapescan.xyz",
      apiUrl: "https://shapescan.xyz/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId38]: {
        address: "0x6Ef8c69CfE4635d866e3E02732068022c06e724D",
        blockCreated: 20369940
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1
    },
    portal: {
      [sourceId38]: {
        address: "0xEB06fFa16011B5628BaB98E29776361c83741dd3",
        blockCreated: 20369933
      }
    },
    l1StandardBridge: {
      [sourceId38]: {
        address: "0x62Edd5f4930Ea92dCa3fB81689bDD9b9d076b57B",
        blockCreated: 20369935
      }
    }
  },
  sourceId: sourceId38
});

// node_modules/viem/_esm/chains/definitions/shapeSepolia.js
var sourceId39 = 11155111;
var shapeSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 11011,
  name: "Shape Sepolia Testnet",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.shape.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer-sepolia.shape.network/",
      apiUrl: "https://explorer-sepolia.shape.network/api/v2"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 1
    }
  },
  testnet: true,
  sourceId: sourceId39
});

// node_modules/viem/_esm/chains/definitions/shardeumSphinx.js
var shardeumSphinx = /* @__PURE__ */ defineChain({
  id: 8082,
  name: "Shardeum Sphinx",
  nativeCurrency: { name: "SHARDEUM", symbol: "SHM", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sphinx.shardeum.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shardeum Explorer",
      url: "https://explorer-sphinx.shardeum.org"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/shibarium.js
var shibarium = /* @__PURE__ */ defineChain({
  id: 109,
  name: "Shibarium",
  network: "shibarium",
  nativeCurrency: { name: "Bone", symbol: "BONE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.shibrpc.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://shibariumscan.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0x864Bf681ADD6052395188A89101A1B37d3B4C961",
      blockCreated: 265900
    }
  }
});

// node_modules/viem/_esm/chains/definitions/shibariumTestnet.js
var shibariumTestnet = /* @__PURE__ */ defineChain({
  id: 157,
  name: "Puppynet Shibarium",
  nativeCurrency: {
    decimals: 18,
    name: "Bone",
    symbol: "BONE"
  },
  rpcUrls: {
    default: { http: ["https://puppynet.shibrpc.com"] }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://puppyscan.shib.io",
      apiUrl: "https://puppyscan.shib.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xA4029b74FBA366c926eDFA7Dd10B21C621170a4c",
      blockCreated: 3035769
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/shiden.js
var shiden = /* @__PURE__ */ defineChain({
  id: 336,
  name: "Shiden",
  nativeCurrency: {
    decimals: 18,
    name: "SDN",
    symbol: "SDN"
  },
  rpcUrls: {
    default: {
      http: ["https://shiden.public.blastapi.io"],
      webSocket: ["wss://shiden-rpc.dwellir.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shiden Scan",
      url: "https://shiden.subscan.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/shimmer.js
var shimmer = /* @__PURE__ */ defineChain({
  id: 148,
  name: "Shimmer",
  network: "shimmer",
  nativeCurrency: {
    decimals: 18,
    name: "Shimmer",
    symbol: "SMR"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.shimmer.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shimmer Network Explorer",
      url: "https://explorer.evm.shimmer.network",
      apiUrl: "https://explorer.evm.shimmer.network/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/shimmerTestnet.js
var shimmerTestnet = /* @__PURE__ */ defineChain({
  id: 1073,
  name: "Shimmer Testnet",
  network: "shimmer-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Shimmer",
    symbol: "SMR"
  },
  rpcUrls: {
    default: {
      http: ["https://json-rpc.evm.testnet.shimmer.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Shimmer Network Explorer",
      url: "https://explorer.evm.testnet.shimmer.network",
      apiUrl: "https://explorer.evm.testnet.shimmer.network/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/silicon.js
var silicon = /* @__PURE__ */ defineChain({
  id: 2355,
  name: "Silicon zkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.silicon.network",
        "https://silicon-mainnet.nodeinfra.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SiliconScope",
      url: "https://scope.silicon.network"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/siliconSepolia.js
var siliconSepolia = /* @__PURE__ */ defineChain({
  id: 1722641160,
  name: "Silicon Sepolia zkEVM",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://rpc-sepolia.silicon.network",
        "https://silicon-testnet.nodeinfra.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SiliconSepoliaScope",
      url: "https://scope-sepolia.silicon.network"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/sixProtocol.js
var sixProtocol = /* @__PURE__ */ defineChain({
  id: 98,
  name: "Six Protocol",
  nativeCurrency: {
    decimals: 18,
    name: "SIX",
    symbol: "SIX"
  },
  rpcUrls: {
    default: {
      http: ["https://sixnet-rpc-evm.sixprotocol.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Six Protocol Scan",
      url: "https://sixscan.io/sixnet"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/skale/brawl.js
var skaleBlockBrawlers = /* @__PURE__ */ defineChain({
  id: 391845894,
  name: "SKALE | Block Brawlers",
  nativeCurrency: { name: "BRAWL", symbol: "BRAWL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/frayed-decent-antares"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/frayed-decent-antares"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://frayed-decent-antares.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// node_modules/viem/_esm/chains/definitions/skale/calypso.js
var skaleCalypso = /* @__PURE__ */ defineChain({
  id: 1564830818,
  name: "SKALE | Calypso NFT Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague"],
      webSocket: [
        "wss://mainnet.skalenodes.com/v1/ws/honorable-steel-rasalhague"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3107626
    }
  }
});

// node_modules/viem/_esm/chains/definitions/skale/calypsoTestnet.js
var skaleCalypsoTestnet = /* @__PURE__ */ defineChain({
  id: 974399131,
  name: "SKALE Calypso Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/giant-half-dual-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/giant-half-dual-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://giant-half-dual-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 103220
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/skale/cryptoBlades.js
var skaleCryptoBlades = /* @__PURE__ */ defineChain({
  id: 1026062157,
  name: "SKALE | CryptoBlades",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/affectionate-immediate-pollux"],
      webSocket: [
        "wss://mainnet.skalenodes.com/v1/ws/affectionate-immediate-pollux"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://affectionate-immediate-pollux.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// node_modules/viem/_esm/chains/definitions/skale/cryptoColosseum.js
var skaleCryptoColosseum = /* @__PURE__ */ defineChain({
  id: 1032942172,
  name: "SKALE | Crypto Colosseum",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/haunting-devoted-deneb"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/haunting-devoted-deneb"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://haunting-devoted-deneb.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// node_modules/viem/_esm/chains/definitions/skale/europa.js
var skaleEuropa = /* @__PURE__ */ defineChain({
  id: 2046399126,
  name: "SKALE | Europa Liquidity Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/elated-tan-skat"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/elated-tan-skat"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://elated-tan-skat.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 3113495
    }
  }
});

// node_modules/viem/_esm/chains/definitions/skale/europaTestnet.js
var skaleEuropaTestnet = /* @__PURE__ */ defineChain({
  id: 1444673419,
  name: "SKALE Europa Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/juicy-low-small-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/juicy-low-small-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://juicy-low-small-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 110858
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/skale/exorde.js
var skaleExorde = /* @__PURE__ */ defineChain({
  id: 2139927552,
  name: "SKALE | Exorde",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/light-vast-diphda"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/light-vast-diphda"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://light-vast-diphda.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// node_modules/viem/_esm/chains/definitions/skale/humanProtocol.js
var skaleHumanProtocol = /* @__PURE__ */ defineChain({
  id: 1273227453,
  name: "SKALE | Human Protocol",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/wan-red-ain"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/wan-red-ain"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://wan-red-ain.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// node_modules/viem/_esm/chains/definitions/skale/nebula.js
var skaleNebula = /* @__PURE__ */ defineChain({
  id: 1482601649,
  name: "SKALE | Nebula Gaming Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/green-giddy-denebola"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/green-giddy-denebola"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://green-giddy-denebola.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2372986
    }
  }
});

// node_modules/viem/_esm/chains/definitions/skale/nebulaTestnet.js
var skaleNebulaTestnet = /* @__PURE__ */ defineChain({
  id: 37084624,
  name: "SKALE Nebula Testnet",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/lanky-ill-funny-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 105141
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/skale/razor.js
var skaleRazor = /* @__PURE__ */ defineChain({
  id: 278611351,
  name: "SKALE | Razor Network",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/turbulent-unique-scheat"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/turbulent-unique-scheat"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://turbulent-unique-scheat.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {}
});

// node_modules/viem/_esm/chains/definitions/skale/titan.js
var skaleTitan = /* @__PURE__ */ defineChain({
  id: 1350216234,
  name: "SKALE | Titan Community Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.skalenodes.com/v1/parallel-stormy-spica"],
      webSocket: ["wss://mainnet.skalenodes.com/v1/ws/parallel-stormy-spica"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://parallel-stormy-spica.explorer.mainnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2076458
    }
  }
});

// node_modules/viem/_esm/chains/definitions/skale/titanTestnet.js
var skaleTitanTestnet = /* @__PURE__ */ defineChain({
  id: 1020352220,
  name: "SKALE Titan Hub",
  nativeCurrency: { name: "sFUEL", symbol: "sFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.skalenodes.com/v1/aware-fake-trim-testnet"],
      webSocket: ["wss://testnet.skalenodes.com/v1/ws/aware-fake-trim-testnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "SKALE Explorer",
      url: "https://aware-fake-trim-testnet.explorer.testnet.skalenodes.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 104072
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/sketchpad.js
var sketchpad = /* @__PURE__ */ defineChain({
  id: 984123,
  name: "Forma Sketchpad",
  network: "sketchpad",
  nativeCurrency: {
    symbol: "TIA",
    name: "TIA",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sketchpad-1.forma.art"],
      webSocket: ["wss://ws.sketchpad-1.forma.art"]
    }
  },
  blockExplorers: {
    default: {
      name: "Sketchpad Explorer",
      url: "https://explorer.sketchpad-1.forma.art"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/snax.js
var sourceId40 = 1;
var snax = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 2192,
  network: "snaxchain-mainnet",
  name: "SnaxChain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.snaxchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Snax Explorer",
      url: "https://explorer.snaxchain.io",
      apiUrl: "https://explorer.snaxchain.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId40]: {
        address: "0x472562Fcf26D6b2793f8E0b0fB660ba0E5e08A46"
      }
    },
    l2OutputOracle: {
      [sourceId40]: {
        address: "0x2172e492Fc807F5d5645D0E3543f139ECF539294"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId40]: {
        address: "0x79f446D024d74D0Bb6E699C131c703463c5D65E9"
      }
    },
    l1StandardBridge: {
      [sourceId40]: {
        address: "0x6534Bdb6b5c060d3e6aa833433333135eFE8E0aA"
      }
    }
  },
  sourceId: sourceId40
});

// node_modules/viem/_esm/chains/definitions/snaxTestnet.js
var sourceId41 = 11155111;
var snaxTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 13001,
  network: "snaxchain-testnet",
  name: "SnaxChain Testnet",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet.snaxchain.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Snax Explorer",
      url: "https://testnet-explorer.snaxchain.io",
      apiUrl: "https://testnet-explorer.snaxchain.io/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId41]: {
        address: "0x206a75d89d45F146C54020F132FF93bEDD09f55E"
      }
    },
    l2OutputOracle: {
      [sourceId41]: {
        address: "0x60e3A368a4cdCEf85ffB964e372726F56A46221e"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11"
    },
    portal: {
      [sourceId41]: {
        address: "0xb5afdd0E8dDF081Ef90e8A3e0c7b5798e66E954E"
      }
    },
    l1StandardBridge: {
      [sourceId41]: {
        address: "0xbd37E1a59D4C00C9A46F75018dffd84061bC5f74"
      }
    }
  },
  testnet: true,
  sourceId: sourceId41
});

// node_modules/viem/_esm/chains/definitions/soneiumMinato.js
var sourceId42 = 11155111;
var soneiumMinato = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1946,
  name: "Soneium Minato Testnet",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.minato.soneium.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://soneium-minato.blockscout.com",
      apiUrl: "https://soneium-minato.blockscout.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    disputeGameFactory: {
      [sourceId42]: {
        address: "0xB3Ad2c38E6e0640d7ce6aA952AB3A60E81bf7a01"
      }
    },
    l2OutputOracle: {
      [sourceId42]: {
        address: "0x710e5286C746eC38beeB7538d0146f60D27be343"
      }
    },
    portal: {
      [sourceId42]: {
        address: "0x65ea1489741A5D72fFdD8e6485B216bBdcC15Af3",
        blockCreated: 6466136
      }
    },
    l1StandardBridge: {
      [sourceId42]: {
        address: "0x5f5a404A5edabcDD80DB05E8e54A78c9EBF000C2",
        blockCreated: 6466136
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1
    }
  },
  testnet: true,
  sourceId: sourceId42
});

// node_modules/viem/_esm/chains/definitions/sonicTestnet.js
var sonicTestnet = /* @__PURE__ */ defineChain({
  id: 64165,
  name: "Sonic Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Sonic",
    symbol: "S"
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.soniclabs.com"] }
  },
  blockExplorers: {
    default: {
      name: "Sonic Testnet Explorer",
      url: "https://testnet.soniclabs.com/"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/songbird.js
var songbird = /* @__PURE__ */ defineChain({
  id: 19,
  name: "Songbird Canary-Network",
  nativeCurrency: {
    decimals: 18,
    name: "Songbird",
    symbol: "SGB"
  },
  rpcUrls: {
    default: { http: ["https://songbird-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Songbird Explorer",
      url: "https://songbird-explorer.flare.network",
      apiUrl: "https://songbird-explorer.flare.network/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/songbirdTestnet.js
var songbirdTestnet = /* @__PURE__ */ defineChain({
  id: 16,
  name: "Songbird Testnet Coston",
  nativeCurrency: {
    decimals: 18,
    name: "Coston Flare",
    symbol: "CFLR"
  },
  rpcUrls: {
    default: { http: ["https://coston-api.flare.network/ext/C/rpc"] }
  },
  blockExplorers: {
    default: {
      name: "Coston Explorer",
      url: "https://coston-explorer.flare.network",
      apiUrl: "https://coston-explorer.flare.network/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/sophon.js
var sophon = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 50104,
  name: "Sophon",
  nativeCurrency: {
    decimals: 18,
    name: "Sophon",
    symbol: "SOPH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sophon.xyz"],
      webSocket: ["wss://rpc.sophon.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Sophon Block Explorer",
      url: "https://explorer.sophon.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0x5f4867441d2416cA88B1b3fd38f21811680CD2C8",
      blockCreated: 116
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/sophonTestnet.js
var sophonTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 531050104,
  name: "Sophon Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Sophon",
    symbol: "SOPH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.sophon.xyz"],
      webSocket: ["wss://rpc.testnet.sophon.xyz/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Sophon Block Explorer",
      url: "https://explorer.testnet.sophon.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0x83c04d112adedA2C6D9037bb6ecb42E7f0b108Af",
      blockCreated: 15642
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/spicy.js
var spicy = /* @__PURE__ */ defineChain({
  id: 88882,
  name: "Chiliz Spicy Testnet",
  network: "chiliz-spicy-Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ"
  },
  rpcUrls: {
    default: {
      http: [
        "https://spicy-rpc.chiliz.com",
        "https://chiliz-spicy-rpc.publicnode.com"
      ],
      webSocket: [
        "wss://spicy-rpc-ws.chiliz.com",
        "wss://chiliz-spicy-rpc.publicnode.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Chiliz Explorer",
      url: "http://spicy-explorer.chiliz.com",
      apiUrl: "http://spicy-explorer.chiliz.com/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/step.js
var step = /* @__PURE__ */ defineChain({
  id: 1234,
  name: "Step Network",
  nativeCurrency: { name: "FITFI", symbol: "FITFI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.step.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Step Scan",
      url: "https://stepscan.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/storyOdyssey.js
var storyOdyssey = /* @__PURE__ */ defineChain({
  id: 1516,
  name: "Story Odyssey",
  nativeCurrency: {
    decimals: 18,
    name: "IP",
    symbol: "IP"
  },
  rpcUrls: {
    default: { http: ["https://rpc.odyssey.storyrpc.io"] }
  },
  blockExplorers: {
    default: {
      name: "Story Odyssey Explorer",
      url: "https://odyssey.storyscan.xyz"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/storyTestnet.js
var storyTestnet = /* @__PURE__ */ defineChain({
  id: 1513,
  name: "Story Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "IP",
    symbol: "IP"
  },
  rpcUrls: {
    default: { http: ["https://testnet.storyrpc.io"] }
  },
  blockExplorers: {
    default: {
      name: "Story Testnet Explorer",
      url: "https://testnet.storyscan.xyz"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/stratis.js
var stratis = /* @__PURE__ */ defineChain({
  id: 105105,
  name: "Stratis Mainnet",
  network: "stratis",
  nativeCurrency: {
    name: "Stratis",
    symbol: "STRAX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.stratisevm.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Stratis Explorer",
      url: "https://explorer.stratisevm.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/superlumio.js
var superlumio = /* @__PURE__ */ defineChain({
  id: 8866,
  name: "SuperLumio",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.lumio.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Lumio explorer",
      url: "https://explorer.lumio.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/superposition.js
var superposition = /* @__PURE__ */ defineChain({
  id: 55244,
  name: "Superposition",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.superposition.so"] }
  },
  blockExplorers: {
    default: {
      name: "Superposition Explorer",
      url: "https://explorer.superposition.so"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 39
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/swan.js
var swan = /* @__PURE__ */ defineChain({
  id: 254,
  name: "Swan Chain Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://mainnet-rpc.swanchain.org"] }
  },
  blockExplorers: {
    default: {
      name: "Swan Explorer",
      url: "https://swanscan.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/swanProximaTestnet.js
var swanProximaTestnet = /* @__PURE__ */ defineChain({
  id: 20241133,
  name: "Swan Proxima Testnet",
  nativeCurrency: { name: "Swan Ether", symbol: "sETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-proxima.swanchain.io	"] }
  },
  blockExplorers: {
    default: {
      name: "Swan Explorer",
      url: "https://proxima-explorer.swanchain.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/swanSaturnTestnet.js
var swanSaturnTestnet = /* @__PURE__ */ defineChain({
  id: 2024,
  name: "Swan Saturn Testnet",
  nativeCurrency: { name: "Swan Ether", symbol: "sETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://saturn-rpc.swanchain.io"] }
  },
  blockExplorers: {
    default: {
      name: "Swan Explorer",
      url: "https://saturn-explorer.swanchain.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/swissdlt.js
var swissdlt = /* @__PURE__ */ defineChain({
  id: 94,
  name: "SwissDLT Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "BCTS",
    symbol: "BCTS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.swissdlt.ch"]
    }
  },
  blockExplorers: {
    default: {
      name: "SwissDLT Explorer",
      url: "https://explorer.swissdlt.ch"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/syscoin.js
var syscoin = /* @__PURE__ */ defineChain({
  id: 57,
  name: "Syscoin Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.syscoin.org"],
      webSocket: ["wss://rpc.syscoin.org/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "SyscoinExplorer",
      url: "https://explorer.syscoin.org",
      apiUrl: "https://explorer.syscoin.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 287139
    }
  }
});

// node_modules/viem/_esm/chains/definitions/syscoinTestnet.js
var syscoinTestnet = /* @__PURE__ */ defineChain({
  id: 5700,
  name: "Syscoin Tanenbaum Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Syscoin",
    symbol: "SYS"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.tanenbaum.io"],
      webSocket: ["wss://rpc.tanenbaum.io/wss"]
    }
  },
  blockExplorers: {
    default: {
      name: "SyscoinTestnetExplorer",
      url: "https://tanenbaum.io"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 271288
    }
  }
});

// node_modules/viem/_esm/chains/definitions/taiko.js
var taiko = /* @__PURE__ */ defineChain({
  id: 167e3,
  name: "Taiko Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.taiko.xyz"],
      webSocket: ["wss://ws.mainnet.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taikoscan",
      url: "https://taikoscan.io",
      apiUrl: "https://api.taikoscan.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcb2436774C3e191c85056d248EF4260ce5f27A9D"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/taikoHekla.js
var taikoHekla = /* @__PURE__ */ defineChain({
  id: 167009,
  name: "Taiko Hekla L2",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.hekla.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taikoscan",
      url: "https://hekla.taikoscan.network"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 59757
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/taikoJolnir.js
var taikoJolnir = /* @__PURE__ */ defineChain({
  id: 167007,
  name: "Taiko Jolnir (Alpha-5 Testnet)",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.jolnir.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.jolnir.taiko.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 732706
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/taikoKatla.js
var taikoKatla = /* @__PURE__ */ defineChain({
  id: 167008,
  name: "Taiko Katla (Alpha-6 Testnet)",
  network: "tko-katla",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.katla.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.katla.taiko.xyz"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/taikoTestnetSepolia.js
var taikoTestnetSepolia = /* @__PURE__ */ defineChain({
  id: 167005,
  name: "Taiko (Alpha-3 Testnet)",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.test.taiko.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "blockscout",
      url: "https://explorer.test.taiko.xyz"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/taraxa.js
var taraxa = /* @__PURE__ */ defineChain({
  id: 841,
  name: "Taraxa Mainnet",
  nativeCurrency: { name: "Tara", symbol: "TARA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.taraxa.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taraxa Explorer",
      url: "https://explorer.mainnet.taraxa.io"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/taraxaTestnet.js
var taraxaTestnet = /* @__PURE__ */ defineChain({
  id: 842,
  name: "Taraxa Testnet",
  nativeCurrency: { name: "Tara", symbol: "TARA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.taraxa.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Taraxa Explorer",
      url: "https://explorer.testnet.taraxa.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/telcoinTestnet.js
var telcoinTestnet = /* @__PURE__ */ defineChain({
  id: 2017,
  name: "Telcoin Adiri Testnet",
  nativeCurrency: { name: "Telcoin", symbol: "TEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.telcoin.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "telscan",
      url: "https://telscan.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/telos.js
var telos = /* @__PURE__ */ defineChain({
  id: 40,
  name: "Telos",
  nativeCurrency: {
    decimals: 18,
    name: "Telos",
    symbol: "TLOS"
  },
  rpcUrls: {
    default: { http: ["https://mainnet.telos.net/evm"] }
  },
  blockExplorers: {
    default: {
      name: "Teloscan",
      url: "https://www.teloscan.io/"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 246530709
    }
  }
});

// node_modules/viem/_esm/chains/definitions/telosTestnet.js
var telosTestnet = /* @__PURE__ */ defineChain({
  id: 41,
  name: "Telos",
  nativeCurrency: {
    decimals: 18,
    name: "Telos",
    symbol: "TLOS"
  },
  rpcUrls: {
    default: { http: ["https://testnet.telos.net/evm"] }
  },
  blockExplorers: {
    default: {
      name: "Teloscan (testnet)",
      url: "https://testnet.teloscan.io/"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/tenet.js
var tenet = /* @__PURE__ */ defineChain({
  id: 1559,
  name: "Tenet",
  network: "tenet-mainnet",
  nativeCurrency: {
    name: "TENET",
    symbol: "TENET",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.tenet.org"] }
  },
  blockExplorers: {
    default: {
      name: "TenetScan Mainnet",
      url: "https://tenetscan.io",
      apiUrl: "https://tenetscan.io/api"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/thaiChain.js
var thaiChain = /* @__PURE__ */ defineChain({
  id: 7,
  name: "ThaiChain",
  nativeCurrency: { name: "TCH", symbol: "TCH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.thaichain.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://exp.thaichain.org",
      apiUrl: "https://exp.thaichain.org/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0DaD6130e832c21719C5CE3bae93454E16A84826",
      blockCreated: 4806386
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/that.js
var that = /* @__PURE__ */ defineChain({
  id: 8428,
  name: "THAT Mainnet",
  nativeCurrency: { name: "THAT", symbol: "THAT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.thatchain.io/mainnet"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://that.blockscout.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/theta.js
var theta = /* @__PURE__ */ defineChain({
  id: 361,
  name: "Theta Mainnet",
  nativeCurrency: { name: "TFUEL", symbol: "TFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-api.thetatoken.org/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Theta Explorer",
      url: "https://explorer.thetatoken.org"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/thetaTestnet.js
var thetaTestnet = /* @__PURE__ */ defineChain({
  id: 365,
  name: "Theta Testnet",
  nativeCurrency: { name: "TFUEL", symbol: "TFUEL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Theta Explorer",
      url: "https://testnet-explorer.thetatoken.org"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/thunderCore.js
var thunderCore = /* @__PURE__ */ defineChain({
  id: 108,
  name: "ThunderCore Mainnet",
  nativeCurrency: { name: "TT", symbol: "TT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet-rpc.thundercore.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "ThunderCore Explorer",
      url: "https://explorer-mainnet.thundercore.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 0
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/thunderTestnet.js
var thunderTestnet = /* @__PURE__ */ defineChain({
  id: 997,
  name: "5ireChain Thunder Testnet",
  nativeCurrency: { name: "5ire Token", symbol: "5IRE", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.5ire.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "5ireChain Thunder Explorer",
      url: "https://testnet.5irescan.io/"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/tiktrixTestnet.js
var tiktrixTestnet = /* @__PURE__ */ defineChain({
  id: 62092,
  name: "TikTrix Testnet",
  nativeCurrency: {
    name: "tTTX",
    symbol: "tTTX",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://tiktrix-rpc.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "TikTrix Testnet Explorer",
      url: "https://tiktrix.xyz"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/tomb.js
var tomb = /* @__PURE__ */ defineChain({
  id: 6969,
  name: "Tomb Mainnet",
  nativeCurrency: { name: "TOMB", symbol: "TOMB", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.tombchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Tomb Explorer",
      url: "https://tombscout.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/tron.js
var tron = /* @__PURE__ */ defineChain({
  id: 728126428,
  name: "Tron",
  nativeCurrency: { name: "TRON", symbol: "TRX", decimals: 6 },
  rpcUrls: {
    default: {
      http: ["https://api.trongrid.io/jsonrpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Tronscan",
      url: "https://tronscan.org",
      apiUrl: "https://apilist.tronscanapi.com/api"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/ubiq.js
var ubiq = /* @__PURE__ */ defineChain({
  id: 8,
  name: "Ubiq Mainnet",
  nativeCurrency: { name: "UBQ", symbol: "UBQ", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://pyrus2.ubiqscan.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ubiq Scan",
      url: "https://ubiqscan.io"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/ultron.js
var ultron = /* @__PURE__ */ defineChain({
  id: 1231,
  name: "Ultron Mainnet",
  nativeCurrency: { name: "ULX", symbol: "ULX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ultron-rpc.net"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ultron Scan",
      url: "https://ulxscan.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/ultronTestnet.js
var ultronTestnet = /* @__PURE__ */ defineChain({
  id: 1230,
  name: "Ultron Testnet",
  nativeCurrency: { name: "ULX", symbol: "ULX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://ultron-dev.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ultron Scan",
      url: "https://explorer.ultron-dev.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/unichainSepolia.js
var sourceId43 = 11155111;
var unichainSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 1301,
  name: "Unichain Sepolia",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.unichain.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Uniscan",
      url: "https://sepolia.uniscan.xyz",
      apiUrl: "https://api-sepolia.uniscan.xyz/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0
    },
    portal: {
      [sourceId43]: {
        address: "0x0d83dab629f0e0F9d36c0Cbc89B69a489f0751bD"
      }
    },
    l1StandardBridge: {
      [sourceId43]: {
        address: "0xea58fcA6849d79EAd1f26608855c2D6407d54Ce2"
      }
    },
    disputeGameFactory: {
      [sourceId43]: {
        address: "0xeff73e5aa3B9AEC32c659Aa3E00444d20a84394b"
      }
    }
  },
  testnet: true,
  sourceId: sourceId43
});

// node_modules/viem/_esm/chains/definitions/unique.js
var unique = /* @__PURE__ */ defineChain({
  id: 8880,
  name: "Unique Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "UNQ",
    symbol: "UNQ"
  },
  rpcUrls: {
    default: { http: ["https://rpc.unique.network"] }
  },
  blockExplorers: {
    default: {
      name: "Unique Subscan",
      url: "https://unique.subscan.io/"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/uniqueOpal.js
var uniqueOpal = /* @__PURE__ */ defineChain({
  id: 8882,
  name: "Opal Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "OPL",
    symbol: "OPL"
  },
  rpcUrls: {
    default: { http: ["https://rpc-opal.unique.network"] }
  },
  blockExplorers: {
    default: {
      name: "Opal Subscan",
      url: "https://opal.subscan.io/"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/uniqueQuartz.js
var uniqueQuartz = /* @__PURE__ */ defineChain({
  id: 8881,
  name: "Quartz Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "QTZ",
    symbol: "QTZ"
  },
  rpcUrls: {
    default: { http: ["https://rpc-quartz.unique.network"] }
  },
  blockExplorers: {
    default: {
      name: "Quartz Subscan",
      url: "https://quartz.subscan.io/"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/unreal.js
var unreal = /* @__PURE__ */ defineChain({
  id: 18233,
  name: "Unreal",
  nativeCurrency: {
    name: "reETH",
    decimals: 18,
    symbol: "reETH"
  },
  rpcUrls: {
    default: { http: ["https://rpc.unreal-orbit.gelato.digital"] }
  },
  blockExplorers: {
    default: {
      name: "Unreal Explorer",
      url: "https://unreal.blockscout.com",
      apiUrl: "https://unreal.blockscout.com/api/v2"
    }
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: "0x8b6B0e60D8CD84898Ea8b981065A12F876eA5677",
      blockCreated: 1745
    }
  }
});

// node_modules/viem/_esm/chains/definitions/vanar.js
var vanar = /* @__PURE__ */ defineChain({
  id: 2040,
  name: "Vanar Mainnet",
  nativeCurrency: { name: "VANRY", symbol: "VANRY", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.vanarchain.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vanar Mainnet Explorer",
      url: "https://explorer.vanarchain.com/"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/vechain.js
var vechain = /* @__PURE__ */ defineChain({
  id: 100009,
  name: "Vechain",
  nativeCurrency: { name: "VeChain", symbol: "VET", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.vechain.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vechain Explorer",
      url: "https://explore.vechain.org"
    },
    vechainStats: {
      name: "Vechain Stats",
      url: "https://vechainstats.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/velas.js
var velas = /* @__PURE__ */ defineChain({
  id: 106,
  name: "Velas EVM Mainnet",
  nativeCurrency: { name: "VLX", symbol: "VLX", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evmexplorer.velas.com/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Velas Explorer",
      url: "https://evmexplorer.velas.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 55883577
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/viction.js
var viction = /* @__PURE__ */ defineChain({
  id: 88,
  name: "Viction",
  nativeCurrency: { name: "Viction", symbol: "VIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "VIC Scan",
      url: "https://vicscan.xyz"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/victionTestnet.js
var victionTestnet = /* @__PURE__ */ defineChain({
  id: 89,
  name: "Viction Testnet",
  nativeCurrency: { name: "Viction", symbol: "VIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.viction.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "VIC Scan",
      url: "https://testnet.vicscan.xyz"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 12170179
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/vision.js
var vision = /* @__PURE__ */ defineChain({
  id: 888888,
  name: "Vision",
  nativeCurrency: { name: "VISION", symbol: "VS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://infragrid.v.network/ethereum/compatible"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vision Scan",
      url: "https://visionscan.org"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/visionTestnet.js
var visionTestnet = /* @__PURE__ */ defineChain({
  id: 666666,
  name: "Vision Testnet",
  nativeCurrency: { name: "VISION", symbol: "VS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://vpioneer.infragrid.v.network/ethereum/compatible"]
    }
  },
  blockExplorers: {
    default: {
      name: "Vision Scan",
      url: "https://visionscan.org/?chain=vpioneer"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/wanchain.js
var wanchain = /* @__PURE__ */ defineChain({
  id: 888,
  name: "Wanchain",
  nativeCurrency: { name: "WANCHAIN", symbol: "WAN", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://gwan-ssl.wandevs.org:56891",
        "https://gwan2-ssl.wandevs.org"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "WanScan",
      url: "https://wanscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcDF6A1566e78EB4594c86Fe73Fcdc82429e97fbB",
      blockCreated: 25312390
    }
  }
});

// node_modules/viem/_esm/chains/definitions/wanchainTestnet.js
var wanchainTestnet = /* @__PURE__ */ defineChain({
  id: 999,
  name: "Wanchain Testnet",
  nativeCurrency: { name: "WANCHAIN", symbol: "WANt", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://gwan-ssl.wandevs.org:46891"]
    }
  },
  blockExplorers: {
    default: {
      name: "WanScanTest",
      url: "https://wanscan.org"
    }
  },
  contracts: {
    multicall3: {
      address: "0x11c89bF4496c39FB80535Ffb4c92715839CC5324",
      blockCreated: 24743448
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/weavevmAlphanet.js
var weaveVMAlphanet = /* @__PURE__ */ defineChain({
  id: 9496,
  name: "WeaveVM Alphanet",
  nativeCurrency: { name: "Testnet WeaveVM", symbol: "tWVM", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.wvm.dev"] }
  },
  blockExplorers: {
    default: {
      name: "WeaveVM Alphanet Explorer",
      url: "https://explorer.wvm.dev"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/wemix.js
var wemix = /* @__PURE__ */ defineChain({
  id: 1111,
  name: "WEMIX",
  network: "wemix-mainnet",
  nativeCurrency: { name: "WEMIX", symbol: "WEMIX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.wemix.com"] }
  },
  blockExplorers: {
    default: {
      name: "wemixExplorer",
      url: "https://explorer.wemix.com"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/wemixTestnet.js
var wemixTestnet = /* @__PURE__ */ defineChain({
  id: 1112,
  name: "WEMIX Testnet",
  network: "wemix-testnet",
  nativeCurrency: { name: "WEMIX", symbol: "tWEMIX", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.test.wemix.com"] }
  },
  blockExplorers: {
    default: {
      name: "wemixExplorer",
      url: "https://testnet.wemixscan.com",
      apiUrl: "https://testnet.wemixscan.com/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/worldchain.js
var sourceId44 = 1;
var worldchain = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 480,
  name: "World Chain",
  network: "worldchain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://worldchain-mainnet.g.alchemy.com/public"] }
  },
  blockExplorers: {
    default: {
      name: "Worldscan",
      url: "https://worldscan.org",
      apiUrl: "https://api.worldscan.org/api"
    },
    blockscout: {
      name: "Blockscout",
      url: "https://worldchain-mainnet.explorer.alchemy.com",
      apiUrl: "https://worldchain-mainnet.explorer.alchemy.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0
    },
    disputeGameFactory: {
      [sourceId44]: {
        address: "0x0E90dCAFBC242D2C861A20Bb20EC8E7182965a52"
      }
    },
    l2OutputOracle: {
      [sourceId44]: {
        address: "0x19A6d1E9034596196295CF148509796978343c5D"
      }
    },
    portal: {
      [sourceId44]: {
        address: "0xd5ec14a83B7d95BE1E2Ac12523e2dEE12Cbeea6C"
      }
    },
    l1StandardBridge: {
      [sourceId44]: {
        address: "0x470458C91978D2d929704489Ad730DC3E3001113"
      }
    }
  },
  testnet: false,
  sourceId: sourceId44
});

// node_modules/viem/_esm/chains/definitions/worldchainSepolia.js
var sourceId45 = 11155111;
var worldchainSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 4801,
  name: "World Chain Sepolia",
  network: "worldchain-sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://worldchain-sepolia.g.alchemy.com/public"] },
    public: { http: ["https://worldchain-sepolia.g.alchemy.com/public"] }
  },
  blockExplorers: {
    default: {
      name: "Worldscan Sepolia",
      url: "https://sepolia.worldscan.org"
    },
    blockscout: {
      name: "Blockscout",
      url: "https://worldchain-sepolia.explorer.alchemy.com",
      apiUrl: "https://worldchain-sepolia.explorer.alchemy.com/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 0
    },
    disputeGameFactory: {
      [sourceId45]: {
        address: "0x8cF97Ee616C986a070F5020d973b456D0120C253"
      }
    },
    l2OutputOracle: {
      [sourceId45]: {
        address: "0xc8886f8BAb6Eaeb215aDB5f1c686BF699248300e"
      }
    },
    portal: {
      [sourceId45]: {
        address: "0xFf6EBa109271fe6d4237EeeD4bAb1dD9A77dD1A4"
      }
    },
    l1StandardBridge: {
      [sourceId45]: {
        address: "0xd7DF54b3989855eb66497301a4aAEc33Dbb3F8DE"
      }
    }
  },
  testnet: true,
  sourceId: sourceId45
});

// node_modules/viem/_esm/chains/definitions/worldLand.js
var worldLand = /* @__PURE__ */ defineChain({
  id: 103,
  name: "WorldLand Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "WLC",
    symbol: "WLC"
  },
  rpcUrls: {
    default: {
      http: ["https://seoul.worldland.foundation"]
    }
  },
  blockExplorers: {
    default: {
      name: "WorldLand Scan",
      url: "https://scan.worldland.foundation"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/xai.js
var xai = /* @__PURE__ */ defineChain({
  id: 660279,
  name: "Xai Mainnet",
  nativeCurrency: { name: "Xai", symbol: "XAI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://xai-chain.net/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://explorer.xai-chain.net"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 222549
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/xaiTestnet.js
var xaiTestnet = /* @__PURE__ */ defineChain({
  id: 37714555429,
  name: "Xai Testnet",
  nativeCurrency: { name: "sXai", symbol: "sXAI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-v2.xai-chain.net/rpc"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://testnet-explorer-v2.xai-chain.net"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/xdc.js
var xdc = /* @__PURE__ */ defineChain({
  id: 50,
  name: "XinFin Network",
  nativeCurrency: {
    decimals: 18,
    name: "XDC",
    symbol: "XDC"
  },
  rpcUrls: {
    default: { http: ["https://rpc.xdcrpc.com"] }
  },
  blockExplorers: {
    default: {
      name: "XDCScan",
      url: "https://xdcscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0x0B1795ccA8E4eC4df02346a082df54D437F8D9aF",
      blockCreated: 75884020
    }
  }
});

// node_modules/viem/_esm/chains/definitions/xdcTestnet.js
var xdcTestnet = /* @__PURE__ */ defineChain({
  id: 51,
  name: "Apothem Network",
  nativeCurrency: {
    decimals: 18,
    name: "TXDC",
    symbol: "TXDC"
  },
  rpcUrls: {
    default: { http: ["https://erpc.apothem.network"] }
  },
  blockExplorers: {
    default: {
      name: "XDCScan",
      url: "https://testnet.xdcscan.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 59765389
    }
  }
});

// node_modules/viem/_esm/chains/definitions/xLayer.js
var xLayer = /* @__PURE__ */ defineChain({
  id: 196,
  name: "X Layer Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB"
  },
  rpcUrls: {
    default: { http: ["https://rpc.xlayer.tech"] }
  },
  blockExplorers: {
    default: {
      name: "OKLink",
      url: "https://www.oklink.com/xlayer",
      apiUrl: "https://www.oklink.com/api/v5/explorer/xlayer/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 47416
    }
  }
});

// node_modules/viem/_esm/chains/definitions/xLayerTestnet.js
var xLayerTestnet = /* @__PURE__ */ defineChain({
  id: 195,
  name: "X1 Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "OKB",
    symbol: "OKB"
  },
  rpcUrls: {
    default: { http: ["https://xlayertestrpc.okx.com"] }
  },
  blockExplorers: {
    default: {
      name: "OKLink",
      url: "https://www.oklink.com/xlayer-test"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 624344
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/xrSepolia.js
var xrSepolia = /* @__PURE__ */ defineChain({
  id: 2730,
  name: "XR Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "tXR",
    symbol: "tXR"
  },
  rpcUrls: {
    default: { http: ["https://xr-sepolia-testnet.rpc.caldera.xyz/http"] }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://xr-sepolia-testnet.explorer.caldera.xyz"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/yooldoVerse.js
var yooldoVerse = /* @__PURE__ */ defineChain({
  id: 50005,
  name: "Yooldo Verse",
  nativeCurrency: { name: "OAS", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.yooldo-verse.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Yooldo Verse Explorer",
      url: "https://explorer.yooldo-verse.xyz"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/yooldoVerseTestnet.js
var yooldoVerseTestnet = /* @__PURE__ */ defineChain({
  id: 50006,
  name: "Yooldo Verse Testnet",
  nativeCurrency: { name: "OAS", symbol: "OAS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.testnet.yooldo-verse.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Yooldo Verse Testnet Explorer",
      url: "https://explorer.testnet.yooldo-verse.xyz"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zenchainTestnet.js
var zenchainTestnet = /* @__PURE__ */ defineChain({
  id: 8408,
  name: "Zenchain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ZCX",
    symbol: "ZCX"
  },
  rpcUrls: {
    default: {
      http: ["https://zenchain-testnet.api.onfinality.io/public"],
      webSocket: ["wss://zenchain-testnet.api.onfinality.io/public-ws"]
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 230019
    }
  },
  blockExplorers: {
    default: {
      name: "Zentrace",
      url: "https://zentrace.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zeniq.js
var zeniq = /* @__PURE__ */ defineChain({
  id: 383414847825,
  name: "Zeniq Mainnet",
  nativeCurrency: { name: "ZENIQ", symbol: "ZENIQ", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.zeniq.network"]
    }
  },
  blockExplorers: {
    default: {
      name: "Zeniq Explorer",
      url: "https://zeniqscan.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/zetachain.js
var zetachain = /* @__PURE__ */ defineChain({
  id: 7e3,
  name: "ZetaChain",
  nativeCurrency: {
    decimals: 18,
    name: "Zeta",
    symbol: "ZETA"
  },
  rpcUrls: {
    default: {
      http: ["https://zetachain-evm.blockpi.network/v1/rpc/public"]
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1632781
    }
  },
  blockExplorers: {
    default: {
      name: "ZetaScan",
      url: "https://explorer.zetachain.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/zetachainAthensTestnet.js
var zetachainAthensTestnet = /* @__PURE__ */ defineChain({
  id: 7001,
  name: "ZetaChain Athens Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Zeta",
    symbol: "aZETA"
  },
  rpcUrls: {
    default: {
      http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"]
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 2715217
    }
  },
  blockExplorers: {
    default: {
      name: "ZetaScan",
      url: "https://athens.explorer.zetachain.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zhejiang.js
var zhejiang = /* @__PURE__ */ defineChain({
  id: 1337803,
  name: "Zhejiang",
  nativeCurrency: { name: "Zhejiang Ether", symbol: "ZhejETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.zhejiang.ethpandaops.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Beaconchain",
      url: "https://zhejiang.beaconcha.in"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zilliqa.js
var zilliqa = /* @__PURE__ */ defineChain({
  id: 32769,
  name: "Zilliqa",
  network: "zilliqa",
  nativeCurrency: { name: "Zilliqa", symbol: "ZIL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://api.zilliqa.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethernal",
      url: "https://evmx.zilliqa.com"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/zilliqaTestnet.js
var zilliqaTestnet = /* @__PURE__ */ defineChain({
  id: 33101,
  name: "Zilliqa Testnet",
  network: "zilliqa-testnet",
  nativeCurrency: { name: "Zilliqa", symbol: "ZIL", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://dev-api.zilliqa.com"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethernal",
      url: "https://evmx.testnet.zilliqa.com"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zircuit.js
var zircuit = /* @__PURE__ */ defineChain({
  id: 48900,
  name: "Zircuit Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: [
        "https://zircuit1-mainnet.p2pify.com",
        "https://zircuit1-mainnet.liquify.com",
        "https://zircuit-mainnet.drpc.org"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Zircuit Explorer",
      url: "https://explorer.zircuit.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11"
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/zircuitTestnet.js
var zircuitTestnet = /* @__PURE__ */ defineChain({
  id: 48899,
  name: "Zircuit Testnet",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://zircuit1-testnet.p2pify.com",
        "https://zircuit1-testnet.liquify.com"
      ]
    }
  },
  blockExplorers: {
    default: {
      name: "Zircuit Testnet Explorer",
      url: "https://explorer.testnet.zircuit.com"
    }
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 6040287
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zkFair.js
var zkFair = /* @__PURE__ */ defineChain({
  id: 42766,
  name: "ZKFair Mainnet",
  network: "zkfair-mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "USD Coin",
    symbol: "USDC"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.zkfair.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "zkFair Explorer",
      url: "https://scan.zkfair.io",
      apiUrl: "https://scan.zkfair.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6090959
    }
  },
  testnet: false
});

// node_modules/viem/_esm/chains/definitions/zkFairTestnet.js
var zkFairTestnet = /* @__PURE__ */ defineChain({
  id: 43851,
  name: "ZKFair Testnet",
  network: "zkfair-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "USD Coin",
    symbol: "USDC"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.zkfair.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "zkFair Explorer",
      url: "https://testnet-scan.zkfair.io"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zkLinkNova.js
var zkLinkNova = /* @__PURE__ */ defineChain({
  id: 810180,
  name: "zkLink Nova",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://rpc.zklink.io"] }
  },
  blockExplorers: {
    default: {
      name: "zkLink Nova Block Explorer",
      url: "https://explorer.zklink.io"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/zkLinkNovaSepoliaTestnet.js
var zkLinkNovaSepoliaTestnet = /* @__PURE__ */ defineChain({
  id: 810181,
  name: "zkLink Nova Sepolia Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH"
  },
  rpcUrls: {
    default: { http: ["https://sepolia.rpc.zklink.io"] }
  },
  blockExplorers: {
    default: {
      name: "zkLink Nova Block Explorer",
      url: "https://sepolia.explorer.zklink.io"
    }
  }
});

// node_modules/viem/_esm/chains/definitions/zksync.js
var zksync = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 324,
  name: "ZKsync Era",
  network: "zksync-era",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet.era.zksync.io"],
      webSocket: ["wss://mainnet.era.zksync.io/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://era.zksync.network/",
      apiUrl: "https://api-era.zksync.network/api"
    },
    native: {
      name: "ZKsync Explorer",
      url: "https://explorer.zksync.io/",
      apiUrl: "https://block-explorer-api.mainnet.zksync.io/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    },
    universalSignatureVerifier: {
      address: "0xfB688330379976DA81eB64Fe4BF50d7401763B9C",
      blockCreated: 45659388
    }
  }
});

// node_modules/viem/_esm/chains/definitions/zksyncInMemoryNode.js
var zksyncInMemoryNode = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 260,
  name: "ZKsync InMemory Node",
  network: "zksync-in-memory-node",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:8011"]
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zksyncLocalCustomHyperchain.js
var zksyncLocalCustomHyperchain = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 272,
  name: "ZKsync CLI Local Custom Hyperchain",
  nativeCurrency: { name: "BAT", symbol: "BAT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:15200"],
      webSocket: ["ws://localhost:15201"]
    }
  },
  blockExplorers: {
    default: {
      name: "ZKsync explorer",
      url: "http://localhost:15005/",
      apiUrl: "http://localhost:15005/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zksyncLocalHyperchain.js
var zksyncLocalHyperchain = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 270,
  name: "ZKsync CLI Local Hyperchain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:15100"],
      webSocket: ["ws://localhost:15101"]
    }
  },
  blockExplorers: {
    default: {
      name: "ZKsync explorer",
      url: "http://localhost:15005/",
      apiUrl: "http://localhost:15005/api"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zksyncLocalHyperchainL1.js
var zksyncLocalHyperchainL1 = /* @__PURE__ */ defineChain({
  id: 9,
  name: "ZKsync CLI Local Hyperchain L1",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:15045"]
    }
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "http://localhost:15001/",
      apiUrl: "http://localhost:15001/api/v2"
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zksyncLocalNode.js
var zksyncLocalNode = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 270,
  name: "ZKsync CLI Local Node",
  network: "zksync-cli-local-node",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://localhost:3050"]
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zksyncSepoliaTestnet.js
var zksyncSepoliaTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig,
  id: 300,
  name: "ZKsync Sepolia Testnet",
  network: "zksync-sepolia-testnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.era.zksync.dev"],
      webSocket: ["wss://sepolia.era.zksync.dev/ws"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia-era.zksync.network/",
      apiUrl: "https://api-sepolia-era.zksync.network/api"
    },
    native: {
      name: "ZKsync Explorer",
      url: "https://sepolia.explorer.zksync.io/",
      blockExplorerApi: "https://block-explorer-api.sepolia.zksync.dev/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xF9cda624FBC7e059355ce98a31693d299FACd963"
    },
    universalSignatureVerifier: {
      address: "0xfB688330379976DA81eB64Fe4BF50d7401763B9C",
      blockCreated: 3855712
    }
  },
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zora.js
var sourceId46 = 1;
var zora = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 7777777,
  name: "Zora",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.zora.energy"],
      webSocket: ["wss://rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://explorer.zora.energy",
      apiUrl: "https://explorer.zora.energy/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId46]: {
        address: "0x9E6204F750cD866b299594e2aC9eA824E2e5f95c"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 5882
    },
    portal: {
      [sourceId46]: {
        address: "0x1a0ad011913A150f69f6A19DF447A0CfD9551054"
      }
    },
    l1StandardBridge: {
      [sourceId46]: {
        address: "0x3e2Ea9B92B7E48A52296fD261dc26fd995284631"
      }
    }
  },
  sourceId: sourceId46
});

// node_modules/viem/_esm/chains/definitions/zoraSepolia.js
var sourceId47 = 11155111;
var zoraSepolia = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 999999999,
  name: "Zora Sepolia",
  network: "zora-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Zora Sepolia",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.rpc.zora.energy"],
      webSocket: ["wss://sepolia.rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Zora Sepolia Explorer",
      url: "https://sepolia.explorer.zora.energy/",
      apiUrl: "https://sepolia.explorer.zora.energy/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    l2OutputOracle: {
      [sourceId47]: {
        address: "0x2615B481Bd3E5A1C0C7Ca3Da1bdc663E8615Ade9"
      }
    },
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 83160
    },
    portal: {
      [sourceId47]: {
        address: "0xeffE2C6cA9Ab797D418f0D91eA60807713f3536f"
      }
    },
    l1StandardBridge: {
      [sourceId47]: {
        address: "0x5376f1D543dcbB5BD416c56C189e4cB7399fCcCB"
      }
    }
  },
  sourceId: sourceId47,
  testnet: true
});

// node_modules/viem/_esm/chains/definitions/zoraTestnet.js
var sourceId48 = 5;
var zoraTestnet = /* @__PURE__ */ defineChain({
  ...chainConfig2,
  id: 999,
  name: "Zora Goerli Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Zora Goerli",
    symbol: "ETH"
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.zora.energy"],
      webSocket: ["wss://testnet.rpc.zora.energy"]
    }
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: "https://testnet.explorer.zora.energy",
      apiUrl: "https://testnet.explorer.zora.energy/api"
    }
  },
  contracts: {
    ...chainConfig2.contracts,
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 189123
    },
    portal: {
      [sourceId48]: {
        address: "0xDb9F51790365e7dc196e7D072728df39Be958ACe"
      }
    }
  },
  sourceId: sourceId48,
  testnet: true
});

// src/sdk/network/constants.ts
var NetworkNames = /* @__PURE__ */ ((NetworkNames2) => {
  NetworkNames2["BaseSepolia"] = "baseSepolia";
  NetworkNames2["Sepolia"] = "sepolia";
  NetworkNames2["Optimism"] = "optimism";
  NetworkNames2["Polygon"] = "polygon";
  NetworkNames2["Arbitrum"] = "arbitrum";
  NetworkNames2["ArbitrumSepolia"] = "arbitrumSepolia";
  NetworkNames2["Chiado"] = "chiado";
  NetworkNames2["Fuse"] = "fuse";
  NetworkNames2["FuseSparknet"] = "fuseSparknet";
  NetworkNames2["Gnosis"] = "gnosis";
  NetworkNames2["KromaTestnet"] = "kromaTestnet";
  NetworkNames2["Mainnet"] = "mainnet";
  NetworkNames2["OptimismSepolia"] = "optimismSepolia";
  NetworkNames2["Rootstock"] = "rootstock";
  NetworkNames2["RootstockTestnet"] = "rootstockTestnet";
  NetworkNames2["Mantle"] = "Mantle";
  NetworkNames2["MantleSepolia"] = "MantleSepolia";
  NetworkNames2["Avalanche"] = "avalanche";
  NetworkNames2["Base"] = "base";
  NetworkNames2["Bsc"] = "bsc";
  NetworkNames2["BscTestnet"] = "bscTestnet";
  NetworkNames2["Fuji"] = "fuji";
  NetworkNames2["Linea"] = "linea";
  NetworkNames2["LineaTestnet"] = "lineaTestnet";
  NetworkNames2["FlareTestnet"] = "flareTestnet";
  NetworkNames2["Flare"] = "flare";
  NetworkNames2["ScrollSepolia"] = "scrollSepolia";
  NetworkNames2["Scroll"] = "scroll";
  NetworkNames2["Ancient8Testnet"] = "ancient8Testnet";
  NetworkNames2["Ancient8"] = "ancient8";
  NetworkNames2["Amoy"] = "amoy";
  NetworkNames2["XDCTestnet"] = "xdcTestnet";
  NetworkNames2["XDCMainnet"] = "xdcMainnet";
  NetworkNames2["CeloTestnet"] = "celoTestnet";
  NetworkNames2["Celo"] = "celo";
  NetworkNames2["SxNetworkTestnet"] = "sxNetworkTestnet";
  return NetworkNames2;
})(NetworkNames || {});
var SupportedNetworks = [1, 10, 14, 30, 31, 50, 51, 56, 97, 100, 114, 122, 123, 137, 2357, 5e3, 5003, 8453, 10200, 42161, 42220, 43113, 43114, 44787, 59140, 59144, 80002, 84532, 421614, 534351, 534352, 11155111, 11155420, 28122024, 79479957, 888888888];
var NETWORK_NAME_TO_CHAIN_ID = {
  ["baseSepolia" /* BaseSepolia */]: 84532,
  ["sepolia" /* Sepolia */]: 11155111,
  ["optimism" /* Optimism */]: 10,
  ["polygon" /* Polygon */]: 137,
  ["arbitrum" /* Arbitrum */]: 42161,
  ["arbitrumSepolia" /* ArbitrumSepolia */]: 421614,
  ["chiado" /* Chiado */]: 10200,
  ["fuse" /* Fuse */]: 122,
  ["fuseSparknet" /* FuseSparknet */]: 123,
  ["gnosis" /* Gnosis */]: 100,
  ["kromaTestnet" /* KromaTestnet */]: 2357,
  ["mainnet" /* Mainnet */]: 1,
  ["optimismSepolia" /* OptimismSepolia */]: 11155420,
  ["rootstock" /* Rootstock */]: 30,
  ["rootstockTestnet" /* RootstockTestnet */]: 31,
  ["Mantle" /* Mantle */]: 5e3,
  ["MantleSepolia" /* MantleSepolia */]: 5003,
  ["avalanche" /* Avalanche */]: 43114,
  ["base" /* Base */]: 8453,
  ["bsc" /* Bsc */]: 56,
  ["bscTestnet" /* BscTestnet */]: 97,
  ["fuji" /* Fuji */]: 43113,
  ["linea" /* Linea */]: 59144,
  ["lineaTestnet" /* LineaTestnet */]: 59140,
  ["flareTestnet" /* FlareTestnet */]: 114,
  ["flare" /* Flare */]: 14,
  ["scrollSepolia" /* ScrollSepolia */]: 534351,
  ["scroll" /* Scroll */]: 534352,
  ["ancient8Testnet" /* Ancient8Testnet */]: 28122024,
  ["ancient8" /* Ancient8 */]: 888888888,
  ["amoy" /* Amoy */]: 80002,
  ["xdcTestnet" /* XDCTestnet */]: 51,
  ["xdcMainnet" /* XDCMainnet */]: 50,
  ["celoTestnet" /* CeloTestnet */]: 44787,
  ["celo" /* Celo */]: 42220,
  ["sxNetworkTestnet" /* SxNetworkTestnet */]: 79479957
};
var Networks = {
  [84532]: {
    chainId: 84532,
    chain: baseSepolia,
    bundler: "https://testnet-rpc.etherspot.io/v2/84532",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [11155111]: {
    chainId: 11155111,
    chain: sepolia,
    bundler: "https://testnet-rpc.etherspot.io/v2/11155111",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: "0x22A55192a663591586241D42E603221eac49ed09"
    }
  },
  [10]: {
    chainId: 10,
    // compilation issue for optimism mainnet, using custom config
    chain: optimism,
    bundler: "https://rpc.etherspot.io/v2/10",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [137]: {
    chainId: 137,
    chain: polygon,
    bundler: "https://rpc.etherspot.io/v2/137",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [42161]: {
    chainId: 42161,
    chain: arbitrum,
    bundler: "https://rpc.etherspot.io/v2/42161",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [1]: {
    chainId: 1,
    chain: mainnet,
    bundler: "https://rpc.etherspot.io/v2/1",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [10200]: {
    chainId: 10200,
    chain: null,
    bundler: "",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [122]: {
    chainId: 122,
    chain: fuse,
    bundler: "https://rpc.etherspot.io/v2/122",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [123]: {
    chainId: 123,
    // TODO no-support for ultron mainnet
    chain: null,
    bundler: "https://testnet-rpc.etherspot.io/v2/123",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [100]: {
    chainId: 100,
    chain: gnosis,
    bundler: "https://rpc.etherspot.io/v2/100",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [2357]: {
    chainId: 2357,
    chain: null,
    bundler: "",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [30]: {
    chainId: 30,
    chain: rootstock,
    bundler: "https://rpc.etherspot.io/v2/30",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [31]: {
    chainId: 31,
    chain: rootstockTestnet,
    bundler: "https://testnet-rpc.etherspot.io/v2/31",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [5e3]: {
    chainId: 5e3,
    chain: mantle,
    bundler: "https://rpc.etherspot.io/v2/5000",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [5003]: {
    chainId: 5003,
    chain: mantleSepoliaTestnet,
    bundler: "https://testnet-rpc.etherspot.io/v2/5003",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [43114]: {
    chainId: 43114,
    chain: avalanche,
    bundler: "https://rpc.etherspot.io/v2/43114",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [8453]: {
    chainId: 8453,
    chain: base,
    bundler: "https://rpc.etherspot.io/v2/8453",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [56]: {
    chainId: 56,
    chain: bsc,
    bundler: "https://rpc.etherspot.io/v2/56",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [97]: {
    chainId: 97,
    chain: bscTestnet,
    bundler: "https://testnet-rpc.etherspot.io/v2/97",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [43113]: {
    chainId: 43113,
    chain: avalancheFuji,
    bundler: "",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [59144]: {
    chainId: 59144,
    chain: linea,
    bundler: "https://rpc.etherspot.io/v2/59144",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [59140]: {
    chainId: 59140,
    chain: lineaGoerli,
    bundler: "",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [114]: {
    chainId: 114,
    chain: flareTestnet,
    bundler: "https://testnet-rpc.etherspot.io/v2/114",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [14]: {
    chainId: 14,
    chain: flare,
    bundler: "https://rpc.etherspot.io/v2/14",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [534351]: {
    chainId: 534351,
    chain: scrollSepolia,
    bundler: "https://testnet-rpc.etherspot.io/v2/534351",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [534352]: {
    chainId: 534352,
    chain: scroll,
    bundler: "https://rpc.etherspot.io/v2/534352",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [11155420]: {
    chainId: 11155420,
    chain: optimismSepolia,
    bundler: "https://testnet-rpc.etherspot.io/v2/11155420",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [28122024]: {
    chainId: 28122024,
    chain: ancient8Sepolia,
    bundler: "https://testnet-rpc.etherspot.io/v2/28122024",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [888888888]: {
    chainId: 888888888,
    chain: ancient8,
    bundler: "https://rpc.etherspot.io/v2/888888888",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [80002]: {
    chainId: 80002,
    chain: polygonAmoy,
    bundler: "https://testnet-rpc.etherspot.io/v2/80002",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: "0x22A55192a663591586241D42E603221eac49ed09"
    }
  },
  [421614]: {
    chainId: 421614,
    chain: arbitrumSepolia,
    bundler: "https://testnet-rpc.etherspot.io/v2/421614",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [51]: {
    chainId: 51,
    chain: xdcTestnet,
    bundler: "https://testnet-rpc.etherspot.io/v2/51",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [50]: {
    chainId: 50,
    chain: xdc,
    bundler: "https://rpc.etherspot.io/v2/50",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [44787]: {
    chainId: 44787,
    chain: celoAlfajores,
    bundler: "https://testnet-rpc.etherspot.io/v2/44787",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [42220]: {
    chainId: 42220,
    chain: celo,
    bundler: "https://rpc.etherspot.io/v2/42220",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  },
  [79479957]: {
    chainId: 79479957,
    chain: defineChain({
      id: 79479957,
      name: "SX Rollup Testnet",
      nativeCurrency: {
        decimals: 18,
        name: "SX",
        symbol: "SX"
      },
      rpcUrls: {
        default: {
          http: ["https://rpc.sx-rollup-testnet.t.raas.gelato.cloud/"]
        }
      }
    }),
    bundler: "https://testnet-rpc.etherspot.io/v2/79479957",
    contracts: {
      entryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactory: "0x2A40091f044e48DEB5C0FCbc442E443F3341B451",
      bootstrap: "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA",
      multipleOwnerECDSAValidator: "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906",
      erc20SessionKeyValidator: ""
    }
  }
};
var DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS = "0x22A55192a663591586241D42E603221eac49ed09";
var DEFAULT_BOOTSTRAP_ADDRESS = "0x0D5154d7751b6e2fDaa06F0cC9B400549394C8AA";
var DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS = "0x0740Ed7c11b9da33d9C80Bd76b826e4E90CC1906";
var DEFAULT_QUERY_PAGE_SIZE = 50;
var CHAIN_ID_TO_NETWORK_NAME = Object.entries(
  NETWORK_NAME_TO_CHAIN_ID
).reduce(
  (result, [networkName, chainId]) => ({
    ...result,
    [chainId]: networkName
  }),
  {}
);
function getNetworkConfig(key) {
  return Networks[key];
}

export {
  chains_exports,
  NetworkNames,
  SupportedNetworks,
  NETWORK_NAME_TO_CHAIN_ID,
  Networks,
  DEFAULT_ERC20_SESSION_KEY_VALIDATOR_ADDRESS,
  DEFAULT_BOOTSTRAP_ADDRESS,
  DEFAULT_MULTIPLE_OWNER_ECDSA_VALIDATOR_ADDRESS,
  DEFAULT_QUERY_PAGE_SIZE,
  CHAIN_ID_TO_NETWORK_NAME,
  getNetworkConfig
};
//# sourceMappingURL=chunk-EDY4DXI5.js.map