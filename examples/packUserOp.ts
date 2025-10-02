import { encodeAbiParameters, encodeFunctionData, Hex, keccak256, parseAbiParameters } from "viem";
import { NETWORK_NAME_TO_CHAIN_ID, NetworkConfig, NetworkNames, Networks, NotPromise, packUserOp } from "../src/sdk";
import { BaseAccountUserOperationStruct } from "../src/sdk/types/user-operation-types";

export function getUserOpHashFromBaseUserOperationStruct(op: NotPromise<BaseAccountUserOperationStruct>, entryPoint: string, chainId: number): string {
  const userOpHash = keccak256(packUserOp(op, true) as Hex);
  const enc = encodeAbiParameters(parseAbiParameters('bytes32, address, uint256'), [userOpHash, entryPoint as Hex, BigInt(chainId)]);
  return keccak256(enc as Hex);
}

export const packUserOpData = () => {

    // accountGasLimit was set to higher value
    // copy `sender`, numerical form of `nonce`, `calldata` and `signagture` from the `UserOp` generated for `estimate` function-call of resourceLockGeneration in pulse
    const userOp = {
        sender: "0x25ee95a6ee844cae2c7a925e33b2ba20e945f5d7",
        nonce: "105536289485642755440082734817444903425693974099072517556511689519320545624064",
        initCode: "0x",
        callData: "0xe9ae5c530100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000ef085141b983b76618348104851122472df6d4af0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001c4495079a0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000a4b100000000000000000000000025ee95a6ee844cae2c7a925e33b2ba20e945f5d7000000000000000000000000961e4b81eb692a7df5ecd738da863d17361f5ce40000000000000000000000000000000000000000000000000000000068b049770000000000000000000000000000000000000000000000000000000068b19c110000000000000000000000007c84f10502fcdea2e403b70fea96a4ae990a34df323214e417b74c9498967f46a670e0d99f7db0ec93d31bdfc1d558653303752e00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000af88d065e77c8cc2239327c5edb3a432268e583100000000000000000000000000000000000000000000000000000000000186a000000000000000000000000000000000000000000000000000000000",
        accountGasLimits: "0x000000000000000000000000000fffff0000000000000000000000000005c9bd",
        preVerificationGas: "42100",
        gasFees: "0x00000000000000000000000000030d4000000000000000000000000000030f2e",
        paymasterAndData: "0x",
        signature: "0x6e093d81beaf62bfdbc43ffc9514db41638c0a176aad0b88a69ea09d0e8b6b7840cf2b12713bfa80db2b28b7566cc9fb487f4510e8731155e47a5229760e50361c141169e72c8e832ea0a3f7ff22e58fa60d7ed3c9cc6d9a6feb23f1bb691b0ba7bc36789e7a1e281436464229828f817d6612f7b477d66591ff96a9e064bcc98a"
    };
    
    const chainId : number = NETWORK_NAME_TO_CHAIN_ID[NetworkNames.Arbitrum];

  const networkConfig: NetworkConfig = Networks[chainId];

    const userOpHashGenerated = getUserOpHashFromBaseUserOperationStruct(userOp, networkConfig.contracts.entryPoint, chainId);
    console.log(`userOpHashGenerated is: ${userOpHashGenerated}`);

    const validateUserOpABIFragment = [
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "nonce",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes",
                            "name": "initCode",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "callData",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "accountGasLimits",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint256",
                            "name": "preVerificationGas",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "gasFees",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "bytes",
                            "name": "paymasterAndData",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "signature",
                            "type": "bytes"
                        }
                    ],
                    "internalType": "struct PackedUserOperation",
                    "name": "userOp",
                    "type": "tuple"
                },
                {
                    "internalType": "bytes32",
                    "name": "userOpHash",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint256",
                    "name": "missingAccountFunds",
                    "type": "uint256"
                }
            ],
            "name": "validateUserOp",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "validSignature",
                    "type": "uint256"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        }
    ];

    const validateUserOpCalldata = encodeFunctionData({
        abi: validateUserOpABIFragment,
        functionName: 'validateUserOp',
        args: [userOp, userOpHashGenerated, 0]
    });

    console.log(`validateUserOpCalldata is: ${validateUserOpCalldata}`);
}






//const packedUserOp = packUserOp(raw, true);

//console.log(`packedUserOp is: ${JSON.stringify(packedUserOp)}`)





// tsx examples/pack
packUserOpData();