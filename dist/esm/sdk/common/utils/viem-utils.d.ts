import * as node_modules_viem__types_actions_siwe_verifySiweMessage_js from 'node_modules/viem/_types/actions/siwe/verifySiweMessage.js';
import * as viem from 'viem';
import { PublicClient, Address, Transport, Chain, Hex, Account, createWalletClient } from 'viem';
import * as chains from 'viem/chains';

declare const isContract: ({ client, address, }: {
    client: PublicClient;
    address: Address;
}) => Promise<boolean>;
declare const getPublicClient: ({ chainId, transport }: {
    chainId: number;
    transport: Transport;
}) => {
    account: {
        address: undefined;
        type: "json-rpc";
    };
    batch?: viem.ClientConfig["batch"] | undefined;
    cacheTime: number;
    ccipRead?: viem.ClientConfig["ccipRead"] | undefined;
    chain: Chain;
    key: string;
    name: string;
    pollingInterval: number;
    request: viem.EIP1193RequestFn<[{
        Method: "web3_clientVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "web3_sha3";
        Parameters: [data: viem.Hash];
        ReturnType: string;
    }, {
        Method: "net_listening";
        Parameters?: undefined;
        ReturnType: boolean;
    }, {
        Method: "net_peerCount";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "net_version";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_blobBaseFee";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_blockNumber";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_call";
        Parameters: [transaction: viem.ExactPartial<viem.RpcTransactionRequest>] | [transaction: viem.ExactPartial<viem.RpcTransactionRequest>, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier] | [transaction: viem.ExactPartial<viem.RpcTransactionRequest>, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier, stateOverrideSet: viem.RpcStateOverride];
        ReturnType: Hex;
    }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_coinbase";
        Parameters?: undefined;
        ReturnType: Address;
    }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: viem.RpcTransactionRequest] | [transaction: viem.RpcTransactionRequest, block: viem.RpcBlockNumber | viem.BlockTag] | [transaction: viem.RpcTransactionRequest, block: viem.RpcBlockNumber | viem.BlockTag, stateOverride: viem.RpcStateOverride];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_feeHistory";
        Parameters: [blockCount: viem.Quantity, newestBlock: viem.RpcBlockNumber | viem.BlockTag, rewardPercentiles: number[] | undefined];
        ReturnType: viem.RpcFeeHistory;
    }, {
        Method: "eth_gasPrice";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBalance";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBlockByHash";
        Parameters: [hash: viem.Hash, includeTransactionObjects: boolean];
        ReturnType: viem.RpcBlock | null;
    }, {
        Method: "eth_getBlockByNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, includeTransactionObjects: boolean];
        ReturnType: viem.RpcBlock | null;
    }, {
        Method: "eth_getBlockTransactionCountByHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBlockTransactionCountByNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getCode";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getFilterChanges";
        Parameters: [filterId: viem.Quantity];
        ReturnType: viem.RpcLog[] | Hex[];
    }, {
        Method: "eth_getFilterLogs";
        Parameters: [filterId: viem.Quantity];
        ReturnType: viem.RpcLog[];
    }, {
        Method: "eth_getLogs";
        Parameters: [{
            address?: Address | Address[] | undefined;
            topics?: viem.LogTopic[] | undefined;
        } & ({
            fromBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            toBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            blockHash?: undefined;
        } | {
            fromBlock?: undefined;
            toBlock?: undefined;
            blockHash?: viem.Hash | undefined;
        })];
        ReturnType: viem.RpcLog[];
    }, {
        Method: "eth_getProof";
        Parameters: [address: Address, storageKeys: viem.Hash[], block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.RpcProof;
    }, {
        Method: "eth_getStorageAt";
        Parameters: [address: Address, index: viem.Quantity, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getTransactionByBlockHashAndIndex";
        Parameters: [hash: viem.Hash, index: viem.Quantity];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByBlockNumberAndIndex";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, index: viem.Quantity];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionCount";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getTransactionReceipt";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.RpcTransactionReceipt | null;
    }, {
        Method: "eth_getUncleByBlockHashAndIndex";
        Parameters: [hash: viem.Hash, index: viem.Quantity];
        ReturnType: viem.RpcUncle | null;
    }, {
        Method: "eth_getUncleByBlockNumberAndIndex";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, index: viem.Quantity];
        ReturnType: viem.RpcUncle | null;
    }, {
        Method: "eth_getUncleCountByBlockHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getUncleCountByBlockNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_maxPriorityFeePerGas";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newBlockFilter";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newFilter";
        Parameters: [filter: {
            fromBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            toBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            address?: Address | Address[] | undefined;
            topics?: viem.LogTopic[] | undefined;
        }];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newPendingTransactionFilter";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_protocolVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: viem.Hash;
    }, {
        Method: "eth_uninstallFilter";
        Parameters: [filterId: viem.Quantity];
        ReturnType: boolean;
    }, ...any[]]>;
    transport: viem.TransportConfig<string, viem.EIP1193RequestFn> & Record<string, any>;
    type: string;
    uid: string;
    call: (parameters: viem.CallParameters<Chain>) => Promise<viem.CallReturnType>;
    createBlockFilter: () => Promise<viem.CreateBlockFilterReturnType>;
    createContractEventFilter: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi> | undefined, args extends viem.MaybeExtractEventArgsFromAbi<abi, eventName> | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.CreateContractEventFilterParameters<abi, eventName, args, strict, fromBlock, toBlock>) => Promise<viem.CreateContractEventFilterReturnType<abi, eventName, args, strict, fromBlock, toBlock>>;
    createEventFilter: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, _EventName extends string | undefined = viem.MaybeAbiEventName<abiEvent>, _Args extends viem.MaybeExtractEventArgsFromAbi<abiEvents, _EventName> | undefined = undefined>(args?: viem.CreateEventFilterParameters<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args> | undefined) => Promise<viem.CreateEventFilterReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args>>;
    createPendingTransactionFilter: () => Promise<viem.CreatePendingTransactionFilterReturnType>;
    estimateContractGas: <chain extends Chain | undefined, const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "nonpayable" | "payable">, args extends viem.ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>>(args: viem.EstimateContractGasParameters<abi, functionName, args, chain>) => Promise<viem.EstimateContractGasReturnType>;
    estimateGas: (args: viem.EstimateGasParameters<Chain>) => Promise<viem.EstimateGasReturnType>;
    getBalance: (args: viem.GetBalanceParameters) => Promise<viem.GetBalanceReturnType>;
    getBlobBaseFee: () => Promise<viem.GetBlobBaseFeeReturnType>;
    getBlock: <includeTransactions extends boolean = false, blockTag extends viem.BlockTag = "latest">(args?: viem.GetBlockParameters<includeTransactions, blockTag>) => Promise<viem.GetBlockReturnType<Chain, includeTransactions, blockTag>>;
    getBlockNumber: (args?: viem.GetBlockNumberParameters | undefined) => Promise<viem.GetBlockNumberReturnType>;
    getBlockTransactionCount: (args?: viem.GetBlockTransactionCountParameters | undefined) => Promise<viem.GetBlockTransactionCountReturnType>;
    getBytecode: (args: viem.GetBytecodeParameters) => Promise<viem.GetBytecodeReturnType>;
    getChainId: () => Promise<viem.GetChainIdReturnType>;
    getCode: (args: viem.GetBytecodeParameters) => Promise<viem.GetBytecodeReturnType>;
    getContractEvents: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetContractEventsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getEip712Domain: (args: viem.GetEip712DomainParameters) => Promise<viem.GetEip712DomainReturnType>;
    getEnsAddress: (args: viem.GetEnsAddressParameters) => Promise<viem.GetEnsAddressReturnType>;
    getEnsAvatar: (args: viem.GetEnsAvatarParameters) => Promise<viem.GetEnsAvatarReturnType>;
    getEnsName: (args: viem.GetEnsNameParameters) => Promise<viem.GetEnsNameReturnType>;
    getEnsResolver: (args: viem.GetEnsResolverParameters) => Promise<viem.GetEnsResolverReturnType>;
    getEnsText: (args: viem.GetEnsTextParameters) => Promise<viem.GetEnsTextReturnType>;
    getFeeHistory: (args: viem.GetFeeHistoryParameters) => Promise<viem.GetFeeHistoryReturnType>;
    estimateFeesPerGas: <chainOverride extends Chain | undefined = undefined, type extends viem.FeeValuesType = "eip1559">(args?: viem.EstimateFeesPerGasParameters<Chain, chainOverride, type>) => Promise<viem.EstimateFeesPerGasReturnType<type>>;
    getFilterChanges: <filterType extends viem.FilterType, const abi extends viem.Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetFilterChangesParameters<filterType, abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetFilterChangesReturnType<filterType, abi, eventName, strict, fromBlock, toBlock>>;
    getFilterLogs: <const abi extends viem.Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetFilterLogsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetFilterLogsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getGasPrice: () => Promise<viem.GetGasPriceReturnType>;
    getLogs: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args?: viem.GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> | undefined) => Promise<viem.GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>>;
    getProof: (args: viem.GetProofParameters) => Promise<viem.GetProofReturnType>;
    estimateMaxPriorityFeePerGas: <chainOverride extends Chain | undefined = undefined>(args?: {
        chain: chainOverride;
    }) => Promise<viem.EstimateMaxPriorityFeePerGasReturnType>;
    getStorageAt: (args: viem.GetStorageAtParameters) => Promise<viem.GetStorageAtReturnType>;
    getTransaction: <blockTag extends viem.BlockTag = "latest">(args: viem.GetTransactionParameters<blockTag>) => Promise<viem.GetTransactionReturnType<Chain, blockTag>>;
    getTransactionConfirmations: (args: viem.GetTransactionConfirmationsParameters<Chain>) => Promise<viem.GetTransactionConfirmationsReturnType>;
    getTransactionCount: (args: viem.GetTransactionCountParameters) => Promise<viem.GetTransactionCountReturnType>;
    getTransactionReceipt: (args: viem.GetTransactionReceiptParameters) => Promise<viem.GetTransactionReceiptReturnType<Chain>>;
    multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: viem.MulticallParameters<contracts, allowFailure>) => Promise<viem.MulticallReturnType<contracts, allowFailure>>;
    prepareTransactionRequest: <const request extends viem.PrepareTransactionRequestRequest<Chain, chainOverride>, chainOverride extends Chain | undefined = undefined, accountOverride extends Account | Address | undefined = undefined>(args: viem.PrepareTransactionRequestParameters<Chain, Account, chainOverride, accountOverride, request>) => Promise<viem.PrepareTransactionRequestReturnType<Chain, Account, chainOverride, accountOverride, request>>;
    readContract: <const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "pure" | "view">, const args extends viem.ContractFunctionArgs<abi, "pure" | "view", functionName>>(args: viem.ReadContractParameters<abi, functionName, args>) => Promise<viem.ReadContractReturnType<abi, functionName, args>>;
    sendRawTransaction: (args: viem.SendRawTransactionParameters) => Promise<viem.SendRawTransactionReturnType>;
    simulateContract: <const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "nonpayable" | "payable">, const args_1 extends viem.ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainOverride extends Chain | undefined, accountOverride extends Account | Address | undefined = undefined>(args: viem.SimulateContractParameters<abi, functionName, args_1, Chain, chainOverride, accountOverride>) => Promise<viem.SimulateContractReturnType<abi, functionName, args_1, Chain, Account, chainOverride, accountOverride>>;
    verifyMessage: (args: viem.VerifyMessageActionParameters) => Promise<viem.VerifyMessageActionReturnType>;
    verifySiweMessage: (args: node_modules_viem__types_actions_siwe_verifySiweMessage_js.VerifySiweMessageParameters) => Promise<node_modules_viem__types_actions_siwe_verifySiweMessage_js.VerifySiweMessageReturnType>;
    verifyTypedData: (args: viem.VerifyTypedDataActionParameters) => Promise<viem.VerifyTypedDataActionReturnType>;
    uninstallFilter: (args: viem.UninstallFilterParameters) => Promise<viem.UninstallFilterReturnType>;
    waitForTransactionReceipt: (args: viem.WaitForTransactionReceiptParameters<Chain>) => Promise<viem.WaitForTransactionReceiptReturnType<Chain>>;
    watchBlockNumber: (args: viem.WatchBlockNumberParameters) => viem.WatchBlockNumberReturnType;
    watchBlocks: <includeTransactions extends boolean = false, blockTag extends viem.BlockTag = "latest">(args: viem.WatchBlocksParameters<Transport, Chain, includeTransactions, blockTag>) => viem.WatchBlocksReturnType;
    watchContractEvent: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi>, strict extends boolean | undefined = undefined>(args: viem.WatchContractEventParameters<abi, eventName, strict, Transport>) => viem.WatchContractEventReturnType;
    watchEvent: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined>(args: viem.WatchEventParameters<abiEvent, abiEvents, strict, Transport>) => viem.WatchEventReturnType;
    watchPendingTransactions: (args: viem.WatchPendingTransactionsParameters<Transport>) => viem.WatchPendingTransactionsReturnType;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & viem.ExactPartial<Pick<viem.PublicActions<Transport, Chain, {
        address: undefined;
        type: "json-rpc";
    }>, "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<viem.WalletActions<Chain, {
        address: undefined;
        type: "json-rpc";
    }>, "sendTransaction" | "writeContract">>>(fn: (client: viem.Client<Transport, Chain, {
        address: undefined;
        type: "json-rpc";
    }, [{
        Method: "web3_clientVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "web3_sha3";
        Parameters: [data: viem.Hash];
        ReturnType: string;
    }, {
        Method: "net_listening";
        Parameters?: undefined;
        ReturnType: boolean;
    }, {
        Method: "net_peerCount";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "net_version";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_blobBaseFee";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_blockNumber";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_call";
        Parameters: [transaction: viem.ExactPartial<viem.RpcTransactionRequest>] | [transaction: viem.ExactPartial<viem.RpcTransactionRequest>, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier] | [transaction: viem.ExactPartial<viem.RpcTransactionRequest>, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier, stateOverrideSet: viem.RpcStateOverride];
        ReturnType: Hex;
    }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_coinbase";
        Parameters?: undefined;
        ReturnType: Address;
    }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: viem.RpcTransactionRequest] | [transaction: viem.RpcTransactionRequest, block: viem.RpcBlockNumber | viem.BlockTag] | [transaction: viem.RpcTransactionRequest, block: viem.RpcBlockNumber | viem.BlockTag, stateOverride: viem.RpcStateOverride];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_feeHistory";
        Parameters: [blockCount: viem.Quantity, newestBlock: viem.RpcBlockNumber | viem.BlockTag, rewardPercentiles: number[] | undefined];
        ReturnType: viem.RpcFeeHistory;
    }, {
        Method: "eth_gasPrice";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBalance";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBlockByHash";
        Parameters: [hash: viem.Hash, includeTransactionObjects: boolean];
        ReturnType: viem.RpcBlock | null;
    }, {
        Method: "eth_getBlockByNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, includeTransactionObjects: boolean];
        ReturnType: viem.RpcBlock | null;
    }, {
        Method: "eth_getBlockTransactionCountByHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBlockTransactionCountByNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getCode";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getFilterChanges";
        Parameters: [filterId: viem.Quantity];
        ReturnType: viem.RpcLog[] | Hex[];
    }, {
        Method: "eth_getFilterLogs";
        Parameters: [filterId: viem.Quantity];
        ReturnType: viem.RpcLog[];
    }, {
        Method: "eth_getLogs";
        Parameters: [{
            address?: Address | Address[] | undefined;
            topics?: viem.LogTopic[] | undefined;
        } & ({
            fromBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            toBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            blockHash?: undefined;
        } | {
            fromBlock?: undefined;
            toBlock?: undefined;
            blockHash?: viem.Hash | undefined;
        })];
        ReturnType: viem.RpcLog[];
    }, {
        Method: "eth_getProof";
        Parameters: [address: Address, storageKeys: viem.Hash[], block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.RpcProof;
    }, {
        Method: "eth_getStorageAt";
        Parameters: [address: Address, index: viem.Quantity, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getTransactionByBlockHashAndIndex";
        Parameters: [hash: viem.Hash, index: viem.Quantity];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByBlockNumberAndIndex";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, index: viem.Quantity];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionCount";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getTransactionReceipt";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.RpcTransactionReceipt | null;
    }, {
        Method: "eth_getUncleByBlockHashAndIndex";
        Parameters: [hash: viem.Hash, index: viem.Quantity];
        ReturnType: viem.RpcUncle | null;
    }, {
        Method: "eth_getUncleByBlockNumberAndIndex";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, index: viem.Quantity];
        ReturnType: viem.RpcUncle | null;
    }, {
        Method: "eth_getUncleCountByBlockHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getUncleCountByBlockNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_maxPriorityFeePerGas";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newBlockFilter";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newFilter";
        Parameters: [filter: {
            fromBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            toBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            address?: Address | Address[] | undefined;
            topics?: viem.LogTopic[] | undefined;
        }];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newPendingTransactionFilter";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_protocolVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: viem.Hash;
    }, {
        Method: "eth_uninstallFilter";
        Parameters: [filterId: viem.Quantity];
        ReturnType: boolean;
    }, ...any[]], viem.PublicActions<Transport, Chain>>) => client) => viem.Client<Transport, Chain, {
        address: undefined;
        type: "json-rpc";
    }, [{
        Method: "web3_clientVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "web3_sha3";
        Parameters: [data: viem.Hash];
        ReturnType: string;
    }, {
        Method: "net_listening";
        Parameters?: undefined;
        ReturnType: boolean;
    }, {
        Method: "net_peerCount";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "net_version";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_blobBaseFee";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_blockNumber";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_call";
        Parameters: [transaction: viem.ExactPartial<viem.RpcTransactionRequest>] | [transaction: viem.ExactPartial<viem.RpcTransactionRequest>, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier] | [transaction: viem.ExactPartial<viem.RpcTransactionRequest>, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier, stateOverrideSet: viem.RpcStateOverride];
        ReturnType: Hex;
    }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_coinbase";
        Parameters?: undefined;
        ReturnType: Address;
    }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: viem.RpcTransactionRequest] | [transaction: viem.RpcTransactionRequest, block: viem.RpcBlockNumber | viem.BlockTag] | [transaction: viem.RpcTransactionRequest, block: viem.RpcBlockNumber | viem.BlockTag, stateOverride: viem.RpcStateOverride];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_feeHistory";
        Parameters: [blockCount: viem.Quantity, newestBlock: viem.RpcBlockNumber | viem.BlockTag, rewardPercentiles: number[] | undefined];
        ReturnType: viem.RpcFeeHistory;
    }, {
        Method: "eth_gasPrice";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBalance";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBlockByHash";
        Parameters: [hash: viem.Hash, includeTransactionObjects: boolean];
        ReturnType: viem.RpcBlock | null;
    }, {
        Method: "eth_getBlockByNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, includeTransactionObjects: boolean];
        ReturnType: viem.RpcBlock | null;
    }, {
        Method: "eth_getBlockTransactionCountByHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getBlockTransactionCountByNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getCode";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getFilterChanges";
        Parameters: [filterId: viem.Quantity];
        ReturnType: viem.RpcLog[] | Hex[];
    }, {
        Method: "eth_getFilterLogs";
        Parameters: [filterId: viem.Quantity];
        ReturnType: viem.RpcLog[];
    }, {
        Method: "eth_getLogs";
        Parameters: [{
            address?: Address | Address[] | undefined;
            topics?: viem.LogTopic[] | undefined;
        } & ({
            fromBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            toBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            blockHash?: undefined;
        } | {
            fromBlock?: undefined;
            toBlock?: undefined;
            blockHash?: viem.Hash | undefined;
        })];
        ReturnType: viem.RpcLog[];
    }, {
        Method: "eth_getProof";
        Parameters: [address: Address, storageKeys: viem.Hash[], block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.RpcProof;
    }, {
        Method: "eth_getStorageAt";
        Parameters: [address: Address, index: viem.Quantity, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getTransactionByBlockHashAndIndex";
        Parameters: [hash: viem.Hash, index: viem.Quantity];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByBlockNumberAndIndex";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, index: viem.Quantity];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.RpcTransaction | null;
    }, {
        Method: "eth_getTransactionCount";
        Parameters: [address: Address, block: viem.RpcBlockNumber | viem.BlockTag | viem.RpcBlockIdentifier];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getTransactionReceipt";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.RpcTransactionReceipt | null;
    }, {
        Method: "eth_getUncleByBlockHashAndIndex";
        Parameters: [hash: viem.Hash, index: viem.Quantity];
        ReturnType: viem.RpcUncle | null;
    }, {
        Method: "eth_getUncleByBlockNumberAndIndex";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag, index: viem.Quantity];
        ReturnType: viem.RpcUncle | null;
    }, {
        Method: "eth_getUncleCountByBlockHash";
        Parameters: [hash: viem.Hash];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_getUncleCountByBlockNumber";
        Parameters: [block: viem.RpcBlockNumber | viem.BlockTag];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_maxPriorityFeePerGas";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newBlockFilter";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newFilter";
        Parameters: [filter: {
            fromBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            toBlock?: viem.RpcBlockNumber | viem.BlockTag | undefined;
            address?: Address | Address[] | undefined;
            topics?: viem.LogTopic[] | undefined;
        }];
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_newPendingTransactionFilter";
        Parameters?: undefined;
        ReturnType: viem.Quantity;
    }, {
        Method: "eth_protocolVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: viem.Hash;
    }, {
        Method: "eth_uninstallFilter";
        Parameters: [filterId: viem.Quantity];
        ReturnType: boolean;
    }, ...any[]], chains.Prettify<client> & (viem.PublicActions<Transport, Chain> extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } ? viem.PublicActions<Transport, Chain> : unknown)>;
};
declare const getWalletClientFromPrivateKey: ({ rpcUrl, chainId, privateKey }: {
    rpcUrl: string;
    chainId: number;
    privateKey: string;
}) => ReturnType<typeof createWalletClient>;
declare const getWalletClientFromAccount: ({ rpcUrl, chainId, account }: {
    rpcUrl: string;
    chainId: number;
    account: Account;
}) => ReturnType<typeof createWalletClient>;
declare const getViemAccount: (privateKey: string) => Account;
declare const getViemAddress: (address: string) => Address;
declare const getChain: (chainId: number) => Chain;
declare function prepareAddress(value: string, zeroAddressAsNull?: boolean): string;
declare function prepareAddresses<T extends {}>(data: T, ...keys: (keyof T)[]): T;
declare function addressesEqual(address1: string, address2: string): boolean;
declare function isAddress(value: string): boolean;

export { addressesEqual, getChain, getPublicClient, getViemAccount, getViemAddress, getWalletClientFromAccount, getWalletClientFromPrivateKey, isAddress, isContract, prepareAddress, prepareAddresses };
