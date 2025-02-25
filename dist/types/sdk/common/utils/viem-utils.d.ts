import { PublicClient, Address, createWalletClient, Account, Chain, Hex, Transport } from 'viem';
import * as chains from "viem/chains";
export declare const isContract: ({ client, address, }: {
    client: PublicClient;
    address: Address;
}) => Promise<boolean>;
export declare const getPublicClient: ({ chainId, transport }: {
    chainId: number;
    transport: Transport;
}) => {
    account: {
        address: undefined;
        type: "json-rpc";
    };
    batch?: import("viem").ClientConfig["batch"] | undefined;
    cacheTime: number;
    ccipRead?: import("viem").ClientConfig["ccipRead"] | undefined;
    chain: Chain;
    key: string;
    name: string;
    pollingInterval: number;
    request: import("viem").EIP1193RequestFn<[{
        Method: "web3_clientVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "web3_sha3";
        Parameters: [data: import("viem").Hash];
        ReturnType: string;
    }, {
        Method: "net_listening";
        Parameters?: undefined;
        ReturnType: boolean;
    }, {
        Method: "net_peerCount";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "net_version";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_blobBaseFee";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_blockNumber";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_call";
        Parameters: [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>] | [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier] | [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier, stateOverrideSet: import("viem").RpcStateOverride];
        ReturnType: Hex;
    }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_coinbase";
        Parameters?: undefined;
        ReturnType: Address;
    }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: import("viem").RpcTransactionRequest] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag, stateOverride: import("viem").RpcStateOverride];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_feeHistory";
        Parameters: [blockCount: import("viem").Quantity, newestBlock: import("viem").RpcBlockNumber | import("viem").BlockTag, rewardPercentiles: number[] | undefined];
        ReturnType: import("viem").RpcFeeHistory;
    }, {
        Method: "eth_gasPrice";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBalance";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBlockByHash";
        Parameters: [hash: import("viem").Hash, includeTransactionObjects: boolean];
        ReturnType: import("viem").RpcBlock | null;
    }, {
        Method: "eth_getBlockByNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, includeTransactionObjects: boolean];
        ReturnType: import("viem").RpcBlock | null;
    }, {
        Method: "eth_getBlockTransactionCountByHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBlockTransactionCountByNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getCode";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getFilterChanges";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: import("viem").RpcLog[] | Hex[];
    }, {
        Method: "eth_getFilterLogs";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: import("viem").RpcLog[];
    }, {
        Method: "eth_getLogs";
        Parameters: [{
            address?: Address | Address[] | undefined;
            topics?: import("viem").LogTopic[] | undefined;
        } & ({
            fromBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            toBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            blockHash?: undefined;
        } | {
            fromBlock?: undefined;
            toBlock?: undefined;
            blockHash?: import("viem").Hash | undefined;
        })];
        ReturnType: import("viem").RpcLog[];
    }, {
        Method: "eth_getProof";
        Parameters: [address: Address, storageKeys: import("viem").Hash[], block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").RpcProof;
    }, {
        Method: "eth_getStorageAt";
        Parameters: [address: Address, index: import("viem").Quantity, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getTransactionByBlockHashAndIndex";
        Parameters: [hash: import("viem").Hash, index: import("viem").Quantity];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByBlockNumberAndIndex";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, index: import("viem").Quantity];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionCount";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getTransactionReceipt";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").RpcTransactionReceipt | null;
    }, {
        Method: "eth_getUncleByBlockHashAndIndex";
        Parameters: [hash: import("viem").Hash, index: import("viem").Quantity];
        ReturnType: import("viem").RpcUncle | null;
    }, {
        Method: "eth_getUncleByBlockNumberAndIndex";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, index: import("viem").Quantity];
        ReturnType: import("viem").RpcUncle | null;
    }, {
        Method: "eth_getUncleCountByBlockHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getUncleCountByBlockNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_maxPriorityFeePerGas";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newBlockFilter";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newFilter";
        Parameters: [filter: {
            fromBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            toBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            address?: Address | Address[] | undefined;
            topics?: import("viem").LogTopic[] | undefined;
        }];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newPendingTransactionFilter";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_protocolVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: import("viem").Hash;
    }, {
        Method: "eth_uninstallFilter";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: boolean;
    }, ...any[]]>;
    transport: import("viem").TransportConfig<string, import("viem").EIP1193RequestFn> & Record<string, any>;
    type: string;
    uid: string;
    call: (parameters: import("viem").CallParameters<Chain>) => Promise<import("viem").CallReturnType>;
    createBlockFilter: () => Promise<import("viem").CreateBlockFilterReturnType>;
    createContractEventFilter: <const abi extends import("viem").Abi | readonly unknown[], eventName extends import("viem").ContractEventName<abi> | undefined, args extends import("viem").MaybeExtractEventArgsFromAbi<abi, eventName> | undefined, strict extends boolean | undefined = undefined, fromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, toBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args: import("viem").CreateContractEventFilterParameters<abi, eventName, args, strict, fromBlock, toBlock>) => Promise<import("viem").CreateContractEventFilterReturnType<abi, eventName, args, strict, fromBlock, toBlock>>;
    createEventFilter: <const abiEvent extends import("viem").AbiEvent | undefined = undefined, const abiEvents extends readonly import("viem").AbiEvent[] | readonly unknown[] | undefined = abiEvent extends import("viem").AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, toBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, _EventName extends string | undefined = import("viem").MaybeAbiEventName<abiEvent>, _Args extends import("viem").MaybeExtractEventArgsFromAbi<abiEvents, _EventName> | undefined = undefined>(args?: import("viem").CreateEventFilterParameters<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args> | undefined) => Promise<import("viem").CreateEventFilterReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args>>;
    createPendingTransactionFilter: () => Promise<import("viem").CreatePendingTransactionFilterReturnType>;
    estimateContractGas: <chain extends Chain | undefined, const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "nonpayable" | "payable">, args extends import("viem").ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>>(args: import("viem").EstimateContractGasParameters<abi, functionName, args, chain>) => Promise<import("viem").EstimateContractGasReturnType>;
    estimateGas: (args: import("viem").EstimateGasParameters<Chain>) => Promise<import("viem").EstimateGasReturnType>;
    getBalance: (args: import("viem").GetBalanceParameters) => Promise<import("viem").GetBalanceReturnType>;
    getBlobBaseFee: () => Promise<import("viem").GetBlobBaseFeeReturnType>;
    getBlock: <includeTransactions extends boolean = false, blockTag extends import("viem").BlockTag = "latest">(args?: import("viem").GetBlockParameters<includeTransactions, blockTag>) => Promise<import("viem").GetBlockReturnType<Chain, includeTransactions, blockTag>>;
    getBlockNumber: (args?: import("viem").GetBlockNumberParameters | undefined) => Promise<import("viem").GetBlockNumberReturnType>;
    getBlockTransactionCount: (args?: import("viem").GetBlockTransactionCountParameters | undefined) => Promise<import("viem").GetBlockTransactionCountReturnType>;
    getBytecode: (args: import("viem").GetBytecodeParameters) => Promise<import("viem").GetBytecodeReturnType>;
    getChainId: () => Promise<import("viem").GetChainIdReturnType>;
    getCode: (args: import("viem").GetBytecodeParameters) => Promise<import("viem").GetBytecodeReturnType>;
    getContractEvents: <const abi extends import("viem").Abi | readonly unknown[], eventName extends import("viem").ContractEventName<abi> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, toBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetContractEventsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<import("viem").GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getEip712Domain: (args: import("viem").GetEip712DomainParameters) => Promise<import("viem").GetEip712DomainReturnType>;
    getEnsAddress: (args: import("viem").GetEnsAddressParameters) => Promise<import("viem").GetEnsAddressReturnType>;
    getEnsAvatar: (args: import("viem").GetEnsAvatarParameters) => Promise<import("viem").GetEnsAvatarReturnType>;
    getEnsName: (args: import("viem").GetEnsNameParameters) => Promise<import("viem").GetEnsNameReturnType>;
    getEnsResolver: (args: import("viem").GetEnsResolverParameters) => Promise<import("viem").GetEnsResolverReturnType>;
    getEnsText: (args: import("viem").GetEnsTextParameters) => Promise<import("viem").GetEnsTextReturnType>;
    getFeeHistory: (args: import("viem").GetFeeHistoryParameters) => Promise<import("viem").GetFeeHistoryReturnType>;
    estimateFeesPerGas: <chainOverride extends Chain | undefined = undefined, type extends import("viem").FeeValuesType = "eip1559">(args?: import("viem").EstimateFeesPerGasParameters<Chain, chainOverride, type>) => Promise<import("viem").EstimateFeesPerGasReturnType<type>>;
    getFilterChanges: <filterType extends import("viem").FilterType, const abi extends import("viem").Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, toBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetFilterChangesParameters<filterType, abi, eventName, strict, fromBlock, toBlock>) => Promise<import("viem").GetFilterChangesReturnType<filterType, abi, eventName, strict, fromBlock, toBlock>>;
    getFilterLogs: <const abi extends import("viem").Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, toBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args: import("viem").GetFilterLogsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<import("viem").GetFilterLogsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getGasPrice: () => Promise<import("viem").GetGasPriceReturnType>;
    getLogs: <const abiEvent extends import("viem").AbiEvent | undefined = undefined, const abiEvents extends readonly import("viem").AbiEvent[] | readonly unknown[] | undefined = abiEvent extends import("viem").AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined, toBlock extends import("viem").BlockNumber | import("viem").BlockTag | undefined = undefined>(args?: import("viem").GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> | undefined) => Promise<import("viem").GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>>;
    getProof: (args: import("viem").GetProofParameters) => Promise<import("viem").GetProofReturnType>;
    estimateMaxPriorityFeePerGas: <chainOverride extends Chain | undefined = undefined>(args?: {
        chain: chainOverride;
    }) => Promise<import("viem").EstimateMaxPriorityFeePerGasReturnType>;
    getStorageAt: (args: import("viem").GetStorageAtParameters) => Promise<import("viem").GetStorageAtReturnType>;
    getTransaction: <blockTag extends import("viem").BlockTag = "latest">(args: import("viem").GetTransactionParameters<blockTag>) => Promise<import("viem").GetTransactionReturnType<Chain, blockTag>>;
    getTransactionConfirmations: (args: import("viem").GetTransactionConfirmationsParameters<Chain>) => Promise<import("viem").GetTransactionConfirmationsReturnType>;
    getTransactionCount: (args: import("viem").GetTransactionCountParameters) => Promise<import("viem").GetTransactionCountReturnType>;
    getTransactionReceipt: (args: import("viem").GetTransactionReceiptParameters) => Promise<import("viem").GetTransactionReceiptReturnType<Chain>>;
    multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: import("viem").MulticallParameters<contracts, allowFailure>) => Promise<import("viem").MulticallReturnType<contracts, allowFailure>>;
    prepareTransactionRequest: <const request extends import("viem").PrepareTransactionRequestRequest<Chain, chainOverride>, chainOverride extends Chain | undefined = undefined, accountOverride extends Account | Address | undefined = undefined>(args: import("viem").PrepareTransactionRequestParameters<Chain, Account, chainOverride, accountOverride, request>) => Promise<import("viem").PrepareTransactionRequestReturnType<Chain, Account, chainOverride, accountOverride, request>>;
    readContract: <const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "pure" | "view">, const args extends import("viem").ContractFunctionArgs<abi, "pure" | "view", functionName>>(args: import("viem").ReadContractParameters<abi, functionName, args>) => Promise<import("viem").ReadContractReturnType<abi, functionName, args>>;
    sendRawTransaction: (args: import("viem").SendRawTransactionParameters) => Promise<import("viem").SendRawTransactionReturnType>;
    simulateContract: <const abi extends import("viem").Abi | readonly unknown[], functionName extends import("viem").ContractFunctionName<abi, "nonpayable" | "payable">, const args_1 extends import("viem").ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>, chainOverride extends Chain | undefined, accountOverride extends Account | Address | undefined = undefined>(args: import("viem").SimulateContractParameters<abi, functionName, args_1, Chain, chainOverride, accountOverride>) => Promise<import("viem").SimulateContractReturnType<abi, functionName, args_1, Chain, Account, chainOverride, accountOverride>>;
    verifyMessage: (args: import("viem").VerifyMessageActionParameters) => Promise<import("viem").VerifyMessageActionReturnType>;
    verifySiweMessage: (args: {
        blockNumber?: bigint | undefined;
        blockTag?: import("viem").BlockTag;
        nonce?: string | undefined;
        address?: Address | undefined;
        domain?: string | undefined;
        scheme?: string | undefined;
        time?: Date | undefined;
        message: string;
        signature: Hex;
    }) => Promise<boolean>;
    verifyTypedData: (args: import("viem").VerifyTypedDataActionParameters) => Promise<import("viem").VerifyTypedDataActionReturnType>;
    uninstallFilter: (args: import("viem").UninstallFilterParameters) => Promise<import("viem").UninstallFilterReturnType>;
    waitForTransactionReceipt: (args: import("viem").WaitForTransactionReceiptParameters<Chain>) => Promise<import("viem").WaitForTransactionReceiptReturnType<Chain>>;
    watchBlockNumber: (args: import("viem").WatchBlockNumberParameters) => import("viem").WatchBlockNumberReturnType;
    watchBlocks: <includeTransactions extends boolean = false, blockTag extends import("viem").BlockTag = "latest">(args: import("viem").WatchBlocksParameters<Transport, Chain, includeTransactions, blockTag>) => import("viem").WatchBlocksReturnType;
    watchContractEvent: <const abi extends import("viem").Abi | readonly unknown[], eventName extends import("viem").ContractEventName<abi>, strict extends boolean | undefined = undefined>(args: import("viem").WatchContractEventParameters<abi, eventName, strict, Transport>) => import("viem").WatchContractEventReturnType;
    watchEvent: <const abiEvent extends import("viem").AbiEvent | undefined = undefined, const abiEvents extends readonly import("viem").AbiEvent[] | readonly unknown[] | undefined = abiEvent extends import("viem").AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined>(args: import("viem").WatchEventParameters<abiEvent, abiEvents, strict, Transport>) => import("viem").WatchEventReturnType;
    watchPendingTransactions: (args: import("viem").WatchPendingTransactionsParameters<Transport>) => import("viem").WatchPendingTransactionsReturnType;
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
    } & import("viem").ExactPartial<Pick<import("viem").PublicActions<Transport, Chain, {
        address: undefined;
        type: "json-rpc";
    }>, "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "prepareTransactionRequest" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<import("viem").WalletActions<Chain, {
        address: undefined;
        type: "json-rpc";
    }>, "sendTransaction" | "writeContract">>>(fn: (client: import("viem").Client<Transport, Chain, {
        address: undefined;
        type: "json-rpc";
    }, [{
        Method: "web3_clientVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "web3_sha3";
        Parameters: [data: import("viem").Hash];
        ReturnType: string;
    }, {
        Method: "net_listening";
        Parameters?: undefined;
        ReturnType: boolean;
    }, {
        Method: "net_peerCount";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "net_version";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_blobBaseFee";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_blockNumber";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_call";
        Parameters: [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>] | [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier] | [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier, stateOverrideSet: import("viem").RpcStateOverride];
        ReturnType: Hex;
    }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_coinbase";
        Parameters?: undefined;
        ReturnType: Address;
    }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: import("viem").RpcTransactionRequest] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag, stateOverride: import("viem").RpcStateOverride];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_feeHistory";
        Parameters: [blockCount: import("viem").Quantity, newestBlock: import("viem").RpcBlockNumber | import("viem").BlockTag, rewardPercentiles: number[] | undefined];
        ReturnType: import("viem").RpcFeeHistory;
    }, {
        Method: "eth_gasPrice";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBalance";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBlockByHash";
        Parameters: [hash: import("viem").Hash, includeTransactionObjects: boolean];
        ReturnType: import("viem").RpcBlock | null;
    }, {
        Method: "eth_getBlockByNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, includeTransactionObjects: boolean];
        ReturnType: import("viem").RpcBlock | null;
    }, {
        Method: "eth_getBlockTransactionCountByHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBlockTransactionCountByNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getCode";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getFilterChanges";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: import("viem").RpcLog[] | Hex[];
    }, {
        Method: "eth_getFilterLogs";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: import("viem").RpcLog[];
    }, {
        Method: "eth_getLogs";
        Parameters: [{
            address?: Address | Address[] | undefined;
            topics?: import("viem").LogTopic[] | undefined;
        } & ({
            fromBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            toBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            blockHash?: undefined;
        } | {
            fromBlock?: undefined;
            toBlock?: undefined;
            blockHash?: import("viem").Hash | undefined;
        })];
        ReturnType: import("viem").RpcLog[];
    }, {
        Method: "eth_getProof";
        Parameters: [address: Address, storageKeys: import("viem").Hash[], block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").RpcProof;
    }, {
        Method: "eth_getStorageAt";
        Parameters: [address: Address, index: import("viem").Quantity, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getTransactionByBlockHashAndIndex";
        Parameters: [hash: import("viem").Hash, index: import("viem").Quantity];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByBlockNumberAndIndex";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, index: import("viem").Quantity];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionCount";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getTransactionReceipt";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").RpcTransactionReceipt | null;
    }, {
        Method: "eth_getUncleByBlockHashAndIndex";
        Parameters: [hash: import("viem").Hash, index: import("viem").Quantity];
        ReturnType: import("viem").RpcUncle | null;
    }, {
        Method: "eth_getUncleByBlockNumberAndIndex";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, index: import("viem").Quantity];
        ReturnType: import("viem").RpcUncle | null;
    }, {
        Method: "eth_getUncleCountByBlockHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getUncleCountByBlockNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_maxPriorityFeePerGas";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newBlockFilter";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newFilter";
        Parameters: [filter: {
            fromBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            toBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            address?: Address | Address[] | undefined;
            topics?: import("viem").LogTopic[] | undefined;
        }];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newPendingTransactionFilter";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_protocolVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: import("viem").Hash;
    }, {
        Method: "eth_uninstallFilter";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: boolean;
    }, ...any[]], import("viem").PublicActions<Transport, Chain>>) => client) => import("viem").Client<Transport, Chain, {
        address: undefined;
        type: "json-rpc";
    }, [{
        Method: "web3_clientVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "web3_sha3";
        Parameters: [data: import("viem").Hash];
        ReturnType: string;
    }, {
        Method: "net_listening";
        Parameters?: undefined;
        ReturnType: boolean;
    }, {
        Method: "net_peerCount";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "net_version";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_blobBaseFee";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_blockNumber";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_call";
        Parameters: [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>] | [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier] | [transaction: import("viem").ExactPartial<import("viem").RpcTransactionRequest>, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier, stateOverrideSet: import("viem").RpcStateOverride];
        ReturnType: Hex;
    }, {
        Method: "eth_chainId";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_coinbase";
        Parameters?: undefined;
        ReturnType: Address;
    }, {
        Method: "eth_estimateGas";
        Parameters: [transaction: import("viem").RpcTransactionRequest] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag] | [transaction: import("viem").RpcTransactionRequest, block: import("viem").RpcBlockNumber | import("viem").BlockTag, stateOverride: import("viem").RpcStateOverride];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_feeHistory";
        Parameters: [blockCount: import("viem").Quantity, newestBlock: import("viem").RpcBlockNumber | import("viem").BlockTag, rewardPercentiles: number[] | undefined];
        ReturnType: import("viem").RpcFeeHistory;
    }, {
        Method: "eth_gasPrice";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBalance";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBlockByHash";
        Parameters: [hash: import("viem").Hash, includeTransactionObjects: boolean];
        ReturnType: import("viem").RpcBlock | null;
    }, {
        Method: "eth_getBlockByNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, includeTransactionObjects: boolean];
        ReturnType: import("viem").RpcBlock | null;
    }, {
        Method: "eth_getBlockTransactionCountByHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getBlockTransactionCountByNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getCode";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getFilterChanges";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: import("viem").RpcLog[] | Hex[];
    }, {
        Method: "eth_getFilterLogs";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: import("viem").RpcLog[];
    }, {
        Method: "eth_getLogs";
        Parameters: [{
            address?: Address | Address[] | undefined;
            topics?: import("viem").LogTopic[] | undefined;
        } & ({
            fromBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            toBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            blockHash?: undefined;
        } | {
            fromBlock?: undefined;
            toBlock?: undefined;
            blockHash?: import("viem").Hash | undefined;
        })];
        ReturnType: import("viem").RpcLog[];
    }, {
        Method: "eth_getProof";
        Parameters: [address: Address, storageKeys: import("viem").Hash[], block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").RpcProof;
    }, {
        Method: "eth_getStorageAt";
        Parameters: [address: Address, index: import("viem").Quantity, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: Hex;
    }, {
        Method: "eth_getTransactionByBlockHashAndIndex";
        Parameters: [hash: import("viem").Hash, index: import("viem").Quantity];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByBlockNumberAndIndex";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, index: import("viem").Quantity];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionByHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").RpcTransaction | null;
    }, {
        Method: "eth_getTransactionCount";
        Parameters: [address: Address, block: import("viem").RpcBlockNumber | import("viem").BlockTag | import("viem").RpcBlockIdentifier];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getTransactionReceipt";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").RpcTransactionReceipt | null;
    }, {
        Method: "eth_getUncleByBlockHashAndIndex";
        Parameters: [hash: import("viem").Hash, index: import("viem").Quantity];
        ReturnType: import("viem").RpcUncle | null;
    }, {
        Method: "eth_getUncleByBlockNumberAndIndex";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag, index: import("viem").Quantity];
        ReturnType: import("viem").RpcUncle | null;
    }, {
        Method: "eth_getUncleCountByBlockHash";
        Parameters: [hash: import("viem").Hash];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_getUncleCountByBlockNumber";
        Parameters: [block: import("viem").RpcBlockNumber | import("viem").BlockTag];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_maxPriorityFeePerGas";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newBlockFilter";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newFilter";
        Parameters: [filter: {
            fromBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            toBlock?: import("viem").RpcBlockNumber | import("viem").BlockTag | undefined;
            address?: Address | Address[] | undefined;
            topics?: import("viem").LogTopic[] | undefined;
        }];
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_newPendingTransactionFilter";
        Parameters?: undefined;
        ReturnType: import("viem").Quantity;
    }, {
        Method: "eth_protocolVersion";
        Parameters?: undefined;
        ReturnType: string;
    }, {
        Method: "eth_sendRawTransaction";
        Parameters: [signedTransaction: Hex];
        ReturnType: import("viem").Hash;
    }, {
        Method: "eth_uninstallFilter";
        Parameters: [filterId: import("viem").Quantity];
        ReturnType: boolean;
    }, ...any[]], chains.Prettify<client> & (import("viem").PublicActions<Transport, Chain> extends {
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
    } ? import("viem").PublicActions<Transport, Chain> : unknown)>;
};
export declare const getWalletClientFromPrivateKey: ({ rpcUrl, chainId, privateKey }: {
    rpcUrl: string;
    chainId: number;
    privateKey: string;
}) => ReturnType<typeof createWalletClient>;
export declare const getWalletClientFromAccount: ({ rpcUrl, chainId, account }: {
    rpcUrl: string;
    chainId: number;
    account: Account;
}) => ReturnType<typeof createWalletClient>;
export declare const getViemAccount: (privateKey: string) => Account;
export declare const getViemAddress: (address: string) => Address;
/**
 * Utility method for converting a chainId to a {@link Chain} object
 *
 * @param chainId
 * @returns a {@link Chain} object for the given chainId
 * @throws if the chainId is not found
 */
export declare const getChain: (chainId: number) => Chain;
export declare function prepareAddress(value: string, zeroAddressAsNull?: boolean): string;
export declare function prepareAddresses<T extends {}>(data: T, ...keys: (keyof T)[]): T;
export declare function addressesEqual(address1: string, address2: string): boolean;
export declare function isAddress(value: string): boolean;
//# sourceMappingURL=viem-utils.d.ts.map