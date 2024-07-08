import { ethers } from "ethers";
import { encodeFunctionData, parseAbi } from "viem";

export interface BootstrapConfig {
    module: string;
    data: string;
}

export const BOOTSTRAP_ABI = [
    {
        "inputs": [

        ],
        "name": "AccountAccessUnauthorized",
        "type": "error"
    },
    {
        "inputs": [

        ],
        "name": "CannotRemoveLastValidator",
        "type": "error"
    },
    {
        "inputs": [

        ],
        "name": "FallbackInvalidCallType",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "currentHook",
                "type": "address"
            }
        ],
        "name": "HookAlreadyInstalled",
        "type": "error"
    },
    {
        "inputs": [

        ],
        "name": "HookPostCheckFailed",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "caller",
                "type": "address"
            }
        ],
        "name": "InvalidFallbackCaller",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "module",
                "type": "address"
            }
        ],
        "name": "InvalidModule",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "entry",
                "type": "address"
            }
        ],
        "name": "LinkedList_EntryAlreadyInList",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "entry",
                "type": "address"
            }
        ],
        "name": "LinkedList_InvalidEntry",
        "type": "error"
    },
    {
        "inputs": [

        ],
        "name": "LinkedList_InvalidPage",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "selector",
                "type": "bytes4"
            }
        ],
        "name": "NoFallbackHandler",
        "type": "error"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct BootstrapConfig[]",
                "name": "$valdiators",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct BootstrapConfig[]",
                "name": "$executors",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct BootstrapConfig",
                "name": "_hook",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct BootstrapConfig[]",
                "name": "_fallbacks",
                "type": "tuple[]"
            }
        ],
        "name": "_getInitMSACalldata",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "init",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [

        ],
        "name": "entryPoint",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "functionSig",
                "type": "bytes4"
            }
        ],
        "name": "getActiveFallbackHandler",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "handler",
                        "type": "address"
                    },
                    {
                        "internalType": "CallType",
                        "name": "calltype",
                        "type": "bytes1"
                    },
                    {
                        "internalType": "address[]",
                        "name": "allowedCallers",
                        "type": "address[]"
                    }
                ],
                "internalType": "struct ModuleManager.FallbackHandler",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [

        ],
        "name": "getActiveHook",
        "outputs": [
            {
                "internalType": "address",
                "name": "hook",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "cursor",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "size",
                "type": "uint256"
            }
        ],
        "name": "getExecutorsPaginated",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "array",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "next",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "cursor",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "size",
                "type": "uint256"
            }
        ],
        "name": "getValidatorPaginated",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "array",
                "type": "address[]"
            },
            {
                "internalType": "address",
                "name": "next",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct BootstrapConfig[]",
                "name": "$valdiators",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct BootstrapConfig[]",
                "name": "$executors",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct BootstrapConfig",
                "name": "_hook",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct BootstrapConfig[]",
                "name": "_fallbacks",
                "type": "tuple[]"
            }
        ],
        "name": "initMSA",
        "outputs": [

        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IModule",
                "name": "validator",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "singleInitMSA",
        "outputs": [

        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

export const bootstrapAbi = [
    'function singleInitMSA(address validator, bytes calldata data)',
    'function initMSA(BootstrapConfig[] calldata $valdiators,BootstrapConfig[] calldata $executors,BootstrapConfig calldata _hook,BootstrapConfig[] calldata _fallbacks)',
    'function onInstall(bytes calldata data)',
    'struct BootstrapConfig {address module;bytes data;}',
]

export function _makeBootstrapConfig(module: string, data: string): BootstrapConfig {
    const config: BootstrapConfig = {
        module: "",
        data: ""
    };
    config.module = module;
    config.data = generateBootstrapConfigData(data);
    return config;
}

export function makeBootstrapConfig(module: string, data: string): BootstrapConfig[] {
    const config: BootstrapConfig[] = [];
    const calldata = generateBootstrapConfigData(data)
    const newConfig: BootstrapConfig = {
        module: module,
        data: calldata
    };
    config.push(newConfig);
    return config;
}


function generateBootstrapConfigData(data: string) {
    return encodeFunctionData({
        functionName: 'onInstall',
        abi: parseAbi(bootstrapAbi),
        args: [
            data,
        ],
    });
}

