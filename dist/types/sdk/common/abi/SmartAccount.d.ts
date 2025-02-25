export declare const BiconomyAccountAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "contract IEntryPoint";
        readonly name: "anEntryPoint";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "AlreadyInitialized";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "BaseImplementationCannotBeZero";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "caller";
        readonly type: "address";
    }];
    readonly name: "CallerIsNotAnEntryPoint";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "caller";
        readonly type: "address";
    }];
    readonly name: "CallerIsNotEntryPoint";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "caller";
        readonly type: "address";
    }];
    readonly name: "CallerIsNotEntryPointOrOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "caller";
        readonly type: "address";
    }];
    readonly name: "CallerIsNotEntryPointOrSelf";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "caller";
        readonly type: "address";
    }];
    readonly name: "CallerIsNotOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "caller";
        readonly type: "address";
    }];
    readonly name: "CallerIsNotSelf";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "DelegateCallsOnly";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "EntryPointCannotBeZero";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "HandlerCannotBeZero";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "implementationAddress";
        readonly type: "address";
    }];
    readonly name: "InvalidImplementation";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "caller";
        readonly type: "address";
    }];
    readonly name: "MixedAuthFail";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "ModuleAlreadyEnabled";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "expectedModule";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "returnedModule";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "prevModule";
        readonly type: "address";
    }];
    readonly name: "ModuleAndPrevModuleMismatch";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "ModuleCannotBeZeroOrSentinel";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "ModuleNotEnabled";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ModulesAlreadyInitialized";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ModulesSetupExecutionFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "OwnerCanNotBeSelf";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "OwnerCannotBeZero";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "OwnerProvidedIsSame";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "TransferToZeroAddressAttempt";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "destLength";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "valueLength";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "funcLength";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "operationLength";
        readonly type: "uint256";
    }];
    readonly name: "WrongBatchProvided";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "contractSignature";
        readonly type: "bytes";
    }];
    readonly name: "WrongContractSignature";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "uintS";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "contractSignatureLength";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "signatureLength";
        readonly type: "uint256";
    }];
    readonly name: "WrongContractSignatureFormat";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "moduleAddressProvided";
        readonly type: "address";
    }];
    readonly name: "WrongValidationModule";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousHandler";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "handler";
        readonly type: "address";
    }];
    readonly name: "ChangedFallbackHandler";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "DisabledModule";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "EnabledModule";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }, {
        readonly indexed: false;
        readonly internalType: "enum Enum.Operation";
        readonly name: "operation";
        readonly type: "uint8";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "txGas";
        readonly type: "uint256";
    }];
    readonly name: "ExecutionFailure";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "ExecutionFromModuleFailure";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "ExecutionFromModuleSuccess";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }, {
        readonly indexed: false;
        readonly internalType: "enum Enum.Operation";
        readonly name: "operation";
        readonly type: "uint8";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "txGas";
        readonly type: "uint256";
    }];
    readonly name: "ExecutionSuccess";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "oldImplementation";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newImplementation";
        readonly type: "address";
    }];
    readonly name: "ImplementationUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }, {
        readonly indexed: false;
        readonly internalType: "enum Enum.Operation";
        readonly name: "operation";
        readonly type: "uint8";
    }];
    readonly name: "ModuleTransaction";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "SmartAccountReceivedNativeToken";
    readonly type: "event";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "fallback";
}, {
    readonly inputs: readonly [];
    readonly name: "VERSION";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "addDeposit";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "prevModule";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "disableModule";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "enableModule";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "entryPoint";
    readonly outputs: readonly [{
        readonly internalType: "contract IEntryPoint";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "to";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "value";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes[]";
        readonly name: "data";
        readonly type: "bytes[]";
    }, {
        readonly internalType: "enum Enum.Operation[]";
        readonly name: "operations";
        readonly type: "uint8[]";
    }];
    readonly name: "execBatchTransactionFromModule";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "success";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }, {
        readonly internalType: "enum Enum.Operation";
        readonly name: "operation";
        readonly type: "uint8";
    }, {
        readonly internalType: "uint256";
        readonly name: "txGas";
        readonly type: "uint256";
    }];
    readonly name: "execTransactionFromModule";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "success";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }, {
        readonly internalType: "enum Enum.Operation";
        readonly name: "operation";
        readonly type: "uint8";
    }];
    readonly name: "execTransactionFromModule";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }, {
        readonly internalType: "enum Enum.Operation";
        readonly name: "operation";
        readonly type: "uint8";
    }];
    readonly name: "execTransactionFromModuleReturnData";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "success";
        readonly type: "bool";
    }, {
        readonly internalType: "bytes";
        readonly name: "returnData";
        readonly type: "bytes";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "dest";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "func";
        readonly type: "bytes";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "dest";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "value";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes[]";
        readonly name: "func";
        readonly type: "bytes[]";
    }];
    readonly name: "executeBatch";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "dest";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "value";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes[]";
        readonly name: "func";
        readonly type: "bytes[]";
    }];
    readonly name: "executeBatch_y6U";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "dest";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "func";
        readonly type: "bytes";
    }];
    readonly name: "execute_ncC";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getDeposit";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getFallbackHandler";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "_handler";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getImplementation";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "_implementation";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "start";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "pageSize";
        readonly type: "uint256";
    }];
    readonly name: "getModulesPaginated";
    readonly outputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "array";
        readonly type: "address[]";
    }, {
        readonly internalType: "address";
        readonly name: "next";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "handler";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "moduleSetupContract";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "moduleSetupData";
        readonly type: "bytes";
    }];
    readonly name: "init";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "module";
        readonly type: "address";
    }];
    readonly name: "isModuleEnabled";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "dataHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes";
        readonly name: "signature";
        readonly type: "bytes";
    }];
    readonly name: "isValidSignature";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint192";
        readonly name: "_key";
        readonly type: "uint192";
    }];
    readonly name: "nonce";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "noncesDeprecated";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "ownerDeprecated";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "handler";
        readonly type: "address";
    }];
    readonly name: "setFallbackHandler";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "setupContract";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "setupData";
        readonly type: "bytes";
    }];
    readonly name: "setupAndEnableModule";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "_interfaceId";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_implementation";
        readonly type: "address";
    }];
    readonly name: "updateImplementation";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "initCode";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "callData";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "callGasLimit";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "verificationGasLimit";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "preVerificationGas";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "maxFeePerGas";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "maxPriorityFeePerGas";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "paymasterAndData";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly internalType: "struct UserOperation";
        readonly name: "userOp";
        readonly type: "tuple";
    }, {
        readonly internalType: "bytes32";
        readonly name: "userOpHash";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "missingAccountFunds";
        readonly type: "uint256";
    }];
    readonly name: "validateUserOp";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "validationData";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address payable";
        readonly name: "withdrawAddress";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "withdrawDepositTo";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=SmartAccount.d.ts.map