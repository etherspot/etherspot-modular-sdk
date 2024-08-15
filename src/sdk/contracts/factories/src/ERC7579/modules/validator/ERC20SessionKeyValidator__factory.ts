/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import {
    ERC20SessionKeyValidator,
    ERC20SessionKeyValidatorInterface
} from "../../../../../src/ERC7579/modules/ERC20SessionKeyValidator"

const _abi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "smartAccount",
          type: "address",
        },
      ],
      name: "AlreadyInitialized",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "total",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "spendCap",
          type: "uint256",
        },
      ],
      name: "ERC20SKV_ExceedsExecutorSpendCap",
      type: "error",
    },
    {
      inputs: [],
      name: "ERC20SKV_InsufficientApprovalAmount",
      type: "error",
    },
    {
      inputs: [],
      name: "ERC20SKV_InvalidSessionKey",
      type: "error",
    },
    {
      inputs: [],
      name: "ERC20SKV_SessionKeySpendLimitExceeded",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sessionKey",
          type: "address",
        },
      ],
      name: "ERC20SKV_SessionPaused",
      type: "error",
    },
    {
      inputs: [],
      name: "ERC20SKV_UnsuportedToken",
      type: "error",
    },
    {
      inputs: [],
      name: "ERC20SKV_UnsupportedInterface",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "bytes4",
          name: "selectorUsed",
          type: "bytes4",
        },
      ],
      name: "ERC20SKV_UnsupportedSelector",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "target",
          type: "address",
        },
      ],
      name: "InvalidTargetAddress",
      type: "error",
    },
    {
      inputs: [],
      name: "NotImplemented",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "smartAccount",
          type: "address",
        },
      ],
      name: "NotInitialized",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newCap",
          type: "uint256",
        },
      ],
      name: "ERC20SKV_ExecutorSpendCapReduced",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sessionKey",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "wallet",
          type: "address",
        },
      ],
      name: "ERC20SKV_SessionKeyDisabled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sessionKey",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "wallet",
          type: "address",
        },
      ],
      name: "ERC20SKV_SessionKeyEnabled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "newLimit",
          type: "uint256",
        },
      ],
      name: "ERC20SKV_SessionKeySpentLimitReduced",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sessionKey",
          type: "address",
        },
      ],
      name: "checkSessionKeyPaused",
      outputs: [
        {
          internalType: "bool",
          name: "paused",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_session",
          type: "address",
        },
      ],
      name: "disableSessionKey",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "_sessionData",
          type: "bytes",
        },
      ],
      name: "enableSessionKey",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAssociatedSessionKeys",
      outputs: [
        {
          internalType: "address[]",
          name: "keys",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sessionKey",
          type: "address",
        },
      ],
      name: "getSessionKeyData",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "bytes4",
              name: "interfaceId",
              type: "bytes4",
            },
            {
              internalType: "bytes4",
              name: "funcSelector",
              type: "bytes4",
            },
            {
              internalType: "uint256",
              name: "spendingLimit",
              type: "uint256",
            },
            {
              internalType: "uint48",
              name: "validAfter",
              type: "uint48",
            },
            {
              internalType: "uint48",
              name: "validUntil",
              type: "uint48",
            },
            {
              internalType: "bool",
              name: "paused",
              type: "bool",
            },
          ],
          internalType: "struct ERC20SessionKeyValidator.SessionData",
          name: "data",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "smartAccount",
          type: "address",
        },
      ],
      name: "isInitialized",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "moduleTypeId",
          type: "uint256",
        },
      ],
      name: "isModuleType",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "hash",
          type: "bytes32",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "isValidSignatureWithSender",
      outputs: [
        {
          internalType: "bytes4",
          name: "",
          type: "bytes4",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "onInstall",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "onUninstall",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_oldSessionKey",
          type: "address",
        },
        {
          internalType: "bytes",
          name: "_newSessionData",
          type: "bytes",
        },
      ],
      name: "rotateSessionKey",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sessionKey",
          type: "address",
        },
        {
          internalType: "address",
          name: "wallet",
          type: "address",
        },
      ],
      name: "sessionData",
      outputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "bytes4",
          name: "interfaceId",
          type: "bytes4",
        },
        {
          internalType: "bytes4",
          name: "funcSelector",
          type: "bytes4",
        },
        {
          internalType: "uint256",
          name: "spendingLimit",
          type: "uint256",
        },
        {
          internalType: "uint48",
          name: "validAfter",
          type: "uint48",
        },
        {
          internalType: "uint48",
          name: "validUntil",
          type: "uint48",
        },
        {
          internalType: "bool",
          name: "paused",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sessionKey",
          type: "address",
        },
      ],
      name: "toggleSessionKeyPause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_sessionKey",
          type: "address",
        },
        {
          components: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "initCode",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "callData",
              type: "bytes",
            },
            {
              internalType: "bytes32",
              name: "accountGasLimits",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "preVerificationGas",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "gasFees",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "paymasterAndData",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "signature",
              type: "bytes",
            },
          ],
          internalType: "struct PackedUserOperation",
          name: "userOp",
          type: "tuple",
        },
      ],
      name: "validateSessionKeyParams",
      outputs: [
        {
          internalType: "bool",
          name: "valid",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "nonce",
              type: "uint256",
            },
            {
              internalType: "bytes",
              name: "initCode",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "callData",
              type: "bytes",
            },
            {
              internalType: "bytes32",
              name: "accountGasLimits",
              type: "bytes32",
            },
            {
              internalType: "uint256",
              name: "preVerificationGas",
              type: "uint256",
            },
            {
              internalType: "bytes32",
              name: "gasFees",
              type: "bytes32",
            },
            {
              internalType: "bytes",
              name: "paymasterAndData",
              type: "bytes",
            },
            {
              internalType: "bytes",
              name: "signature",
              type: "bytes",
            },
          ],
          internalType: "struct PackedUserOperation",
          name: "userOp",
          type: "tuple",
        },
        {
          internalType: "bytes32",
          name: "userOpHash",
          type: "bytes32",
        },
      ],
      name: "validateUserOp",
      outputs: [
        {
          internalType: "uint256",
          name: "validationData",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "wallet",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "walletSessionKeys",
      outputs: [
        {
          internalType: "address",
          name: "assocSessionKeys",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ] as const;
  
  const _bytecode =
    "0x608060405234801561001057600080fd5b506114a0806100206000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063c037ee1911610097578063d8d38e4211610066578063d8d38e4214610463578063e08dd00814610476578063ecd059611461048b578063f551e2ee1461049f57600080fd5b8063c037ee1914610407578063c602e59c1461042a578063cc8cbd281461043d578063d60b347f1461045057600080fd5b80636d61fe70116100d35780636d61fe70146103a95780638a91b0e3146103a95780638aaa6a40146103bb57806397003203146103e657600080fd5b8063110891c11461010557806320cbdcc61461026f578063495079a0146102c357806352721fdd146102d6575b600080fd5b6101ef610113366004611013565b6040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810191909152506001600160a01b039081166000908152600160208181526040808420338552825292839020835160e08082018652825496871682526001600160e01b0319600160a01b8804821b811694830194909452600160c01b90960490951b9091169284019290925281015460608301526002015465ffffffffffff8082166080840152600160301b82041660a083015260ff600160601b90910416151560c082015290565b6040805182516001600160a01b031681526020808401516001600160e01b0319908116918301919091528383015116918101919091526060808301519082015260808083015165ffffffffffff9081169183019190915260a0808401519091169082015260c09182015115159181019190915260e0015b60405180910390f35b6102c161027d366004611013565b6001600160a01b031660009081526001602090815260408083203384529091529020600201805460ff60601b198116600160601b9182900460ff1615909102179055565b005b6102c16102d136600461107e565b6104ba565b61034f6102e43660046110c0565b600160208181526000938452604080852090915291835291208054918101546002909101546001600160a01b03831692600160a01b810460e090811b93600160c01b909204901b9165ffffffffffff80821691600160301b810490911690600160601b900460ff1687565b604080516001600160a01b039890981688526001600160e01b031996871660208901529490951693860193909352606085019190915265ffffffffffff90811660808501521660a0830152151560c082015260e001610266565b6102c16103b736600461107e565b5050565b6103ce6103c93660046110f3565b61081a565b6040516001600160a01b039091168152602001610266565b6103f96103f4366004611136565b610852565b604051908152602001610266565b61041a61041536600461117b565b610940565b6040519015158152602001610266565b6102c16104383660046111c9565b610ba3565b61041a61044b366004611013565b610bbb565b61041a61045e366004611013565b610bee565b6102c1610471366004611013565b610c09565b61047e610c95565b604051610266919061121c565b61041a610499366004611269565b60011490565b6104ad61045e366004611282565b60405161026691906112dc565b60006104c960148284866112f1565b6104d29161131b565b60601c905060006104e76028601485876112f1565b6104f09161131b565b60601c90506000610505602c602886886112f1565b61050e91611350565b905060006105206030602c87896112f1565b61052991611350565b9050600061053b60506030888a6112f1565b6105449161137e565b9050600061055660566050898b6112f1565b61055f9161139c565b60d01c90506000610574605c60568a8c6112f1565b61057d9161139c565b60d01c905061058b84610cfe565b6105b3578360405163a47eb18d60e01b81526004016105aa91906112dc565b60405180910390fd5b6040518060e00160405280876001600160a01b03168152602001866001600160e01b0319168152602001856001600160e01b03191681526020018481526020018365ffffffffffff1681526020018265ffffffffffff1681526020016000151581525060016000896001600160a01b03166001600160a01b031681526020019081526020016000206000336001600160a01b03166001600160a01b0316815260200190815260200160002060008201518160000160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060208201518160000160146101000a81548163ffffffff021916908360e01c021790555060408201518160000160186101000a81548163ffffffff021916908360e01c02179055506060820151816001015560808201518160020160006101000a81548165ffffffffffff021916908365ffffffffffff16021790555060a08201518160020160066101000a81548165ffffffffffff021916908365ffffffffffff16021790555060c082015181600201600c6101000a81548160ff021916908315150217905550905050600080336001600160a01b03166001600160a01b03168152602001908152602001600020879080600181540180825580915050600190039060005260206000200160009091909190916101000a8154816001600160a01b0302191690836001600160a01b031602179055507f3c8d6097a1246293dc66a3eeb0db267cb28a5b6c3367e2de5f331659222eb1ff87336040516108079291906001600160a01b0392831681529116602082015260400190565b60405180910390a1505050505050505050565b6000602052816000526040600020818154811061083657600080fd5b6000918252602090912001546001600160a01b03169150829050565b600080610884836020527b19457468657265756d205369676e6564204d6573736167653a0a3332600052603c60042090565b905060006108d48261089a6101008801886113ca565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250610e5992505050565b90506108e08186610940565b6108ef5760019250505061093a565b6001600160a01b03811660009081526001602090815260408083203384529091528120600281015490916109349165ffffffffffff600160301b820481169116610eea565b93505050505b92915050565b6000368161095160608501856113ca565b9150915060008060008060006109678787610f22565b6001600160a01b038f16600090815260016020908152604080832033845290915290206002810154959a509398509196509450925090600160301b900465ffffffffffff1615806109cb5750600281015442600160301b90910465ffffffffffff16105b156109e957604051636ed16c7960e01b815260040160405180910390fd5b80546001600160a01b03868116911614610a165760405163218d2fb360e11b815260040160405180910390fd5b80546040516301ffc9a760e01b81526001600160a01b038716916301ffc9a791610a4d91600160a01b900460e01b906004016112dc565b602060405180830381865afa158015610a6a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a8e9190611411565b1515600003610ab057604051630863587160e11b815260040160405180910390fd5b80546001600160e01b0319878116600160c01b90920460e01b1614610aea578560405163a47eb18d60e01b81526004016105aa91906112dc565b8060010154821115610b0f57604051638d6d48cb60e01b815260040160405180910390fd5b610b188b610bbb565b15610b41576040516374d12a8360e01b81526001600160a01b038c1660048201526024016105aa565b818160010154610b519190611433565b600182018190556040805184815260208101929092527fb10c143a4d4e1ac2eb4bef814c5b1904c6b22e51893cb1124ff8be22f8fdb55f910160405180910390a15060019a9950505050505050505050565b610bac83610c09565b610bb682826104ba565b505050565b6001600160a01b03166000908152600160209081526040808320338452909152902060020154600160601b900460ff1690565b600060405163d623472560e01b815260040160405180910390fd5b6001600160a01b03811660008181526001602081815260408084203380865290835281852080546001600160e01b031916815593840194909455600290920180546cffffffffffffffffffffffffff1916905581519384528301919091527f3552ecdbdb725cc8b621be8a316008bbcb5bc1e72e9a6b08da9b20bd7f78266d910160405180910390a150565b3360009081526020818152604091829020805483518184028101840190945280845260609392830182828015610cf457602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610cd6575b5050505050905090565b60408051600480825260a082019092526000918291906020820160808036833701905050905063095ea7b360e01b81600081518110610d3f57610d3f611454565b6001600160e01b031990921660209283029190910190910152805163a9059cbb60e01b9082906001908110610d7657610d76611454565b6001600160e01b03199092166020928302919091019091015280516323b872dd60e01b9082906002908110610dad57610dad611454565b6001600160e01b031990921660209283029190910190910152805163010a5c0b60e41b9082906003908110610de457610de4611454565b6001600160e01b03199092166020928302919091019091015260005b8151811015610e4f57818181518110610e1b57610e1b611454565b60200260200101516001600160e01b031916846001600160e01b03191603610e47575060019392505050565b600101610e00565b5060009392505050565b6040516001908360005260208301516040526040835103610e9557604083015160ff81901c601b016020526001600160ff1b0316606052610ebb565b6041835103610eb657606083015160001a6020526040830151606052610ebb565b600091505b6020600160806000855afa5191503d610edc57638baa579f6000526004601cfd5b600060605260405292915050565b600060d08265ffffffffffff16901b60a08465ffffffffffff16901b85610f12576000610f15565b60015b60ff161717949350505050565b6000600483013581808086356001600160e01b0319811663095ea7b360e01b1480610f5d57506001600160e01b0319811663a9059cbb60e01b145b80610f7857506001600160e01b0319811663010a5c0b60e41b145b15610f9a57945050505060048401359050602484013560006044860135610fed565b63dc478d2360e01b6001600160e01b0319821601610fd257945050505060048401359050604484013560248501356064860135610fed565b8060405163a47eb18d60e01b81526004016105aa91906112dc565b9295509295909350565b80356001600160a01b038116811461100e57600080fd5b919050565b60006020828403121561102557600080fd5b61102e82610ff7565b9392505050565b60008083601f84011261104757600080fd5b50813567ffffffffffffffff81111561105f57600080fd5b60208301915083602082850101111561107757600080fd5b9250929050565b6000806020838503121561109157600080fd5b823567ffffffffffffffff8111156110a857600080fd5b6110b485828601611035565b90969095509350505050565b600080604083850312156110d357600080fd5b6110dc83610ff7565b91506110ea60208401610ff7565b90509250929050565b6000806040838503121561110657600080fd5b61110f83610ff7565b946020939093013593505050565b6000610120828403121561113057600080fd5b50919050565b6000806040838503121561114957600080fd5b823567ffffffffffffffff81111561116057600080fd5b61116c8582860161111d565b95602094909401359450505050565b6000806040838503121561118e57600080fd5b61119783610ff7565b9150602083013567ffffffffffffffff8111156111b357600080fd5b6111bf8582860161111d565b9150509250929050565b6000806000604084860312156111de57600080fd5b6111e784610ff7565b9250602084013567ffffffffffffffff81111561120357600080fd5b61120f86828701611035565b9497909650939450505050565b6020808252825182820181905260009190848201906040850190845b8181101561125d5783516001600160a01b031683529284019291840191600101611238565b50909695505050505050565b60006020828403121561127b57600080fd5b5035919050565b6000806000806060858703121561129857600080fd5b6112a185610ff7565b935060208501359250604085013567ffffffffffffffff8111156112c457600080fd5b6112d087828801611035565b95989497509550505050565b6001600160e01b031991909116815260200190565b6000808585111561130157600080fd5b8386111561130e57600080fd5b5050820193919092039150565b6bffffffffffffffffffffffff1981358181169160148510156113485780818660140360031b1b83161692505b505092915050565b6001600160e01b031981358181169160048510156113485760049490940360031b84901b1690921692915050565b8035602083101561093a57600019602084900360031b1b1692915050565b6001600160d01b031981358181169160068510156113485760069490940360031b84901b1690921692915050565b6000808335601e198436030181126113e157600080fd5b83018035915067ffffffffffffffff8211156113fc57600080fd5b60200191503681900382131561107757600080fd5b60006020828403121561142357600080fd5b8151801515811461102e57600080fd5b8181038181111561093a57634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fdfea2646970667358221220ce038f6e945c9ba1d1cdf21e902b46ee133cd1730bbab3412819dd0c75bf4d8064736f6c63430008170033";
  
  type ERC20SessionKeyValidatorConstructorParams =
    | [signer?: Signer]
    | ConstructorParameters<typeof ContractFactory>;
  
  const isSuperArgs = (
    xs: ERC20SessionKeyValidatorConstructorParams
  ): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;
  
  export class ERC20SessionKeyValidator__factory extends ContractFactory {
    constructor(...args: ERC20SessionKeyValidatorConstructorParams) {
      if (isSuperArgs(args)) {
        super(...args);
      } else {
        super(_abi, _bytecode, args[0]);
      }
    }
  
    override deploy(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ERC20SessionKeyValidator> {
      return super.deploy(overrides || {}) as Promise<ERC20SessionKeyValidator>;
    }
    override getDeployTransaction(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): TransactionRequest {
      return super.getDeployTransaction(overrides || {});
    }
    override attach(address: string): ERC20SessionKeyValidator {
      return super.attach(address) as ERC20SessionKeyValidator;
    }
    override connect(signer: Signer): ERC20SessionKeyValidator__factory {
      return super.connect(signer) as ERC20SessionKeyValidator__factory;
    }
  
    static readonly bytecode = _bytecode;
    static readonly abi = _abi;
    static createInterface(): ERC20SessionKeyValidatorInterface {
      return new utils.Interface(_abi) as ERC20SessionKeyValidatorInterface;
    }
    static connect(
      address: string,
      signerOrProvider: Signer | Provider
    ): ERC20SessionKeyValidator {
      return new Contract(
        address,
        _abi,
        signerOrProvider
      ) as ERC20SessionKeyValidator;
    }
  }
  