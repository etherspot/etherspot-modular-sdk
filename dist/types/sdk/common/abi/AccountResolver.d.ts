export declare const AccountResolverAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_v1Factory";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_v2Factory";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_ecdsaModule";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "ecdsaOwnershipModule";
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
        readonly name: "_eoa";
        readonly type: "address";
    }, {
        readonly internalType: "uint8";
        readonly name: "_maxIndex";
        readonly type: "uint8";
    }];
    readonly name: "resolveAddresses";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "accountAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "factoryAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "currentImplementation";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "currentVersion";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "factoryVersion";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "deploymentIndex";
            readonly type: "uint256";
        }];
        readonly internalType: "struct IAddressResolver.SmartAccountResult[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_eoa";
        readonly type: "address";
    }, {
        readonly internalType: "uint8";
        readonly name: "_maxIndex";
        readonly type: "uint8";
    }, {
        readonly internalType: "address";
        readonly name: "_moduleAddress";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "_moduleSetupData";
        readonly type: "bytes";
    }];
    readonly name: "resolveAddressesFlexibleForV2";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "accountAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "factoryAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "currentImplementation";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "currentVersion";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "factoryVersion";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "deploymentIndex";
            readonly type: "uint256";
        }];
        readonly internalType: "struct IAddressResolver.SmartAccountResult[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_eoa";
        readonly type: "address";
    }, {
        readonly internalType: "uint8";
        readonly name: "_maxIndex";
        readonly type: "uint8";
    }];
    readonly name: "resolveAddressesV1";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "accountAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "factoryAddress";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "currentImplementation";
            readonly type: "address";
        }, {
            readonly internalType: "string";
            readonly name: "currentVersion";
            readonly type: "string";
        }, {
            readonly internalType: "string";
            readonly name: "factoryVersion";
            readonly type: "string";
        }, {
            readonly internalType: "uint256";
            readonly name: "deploymentIndex";
            readonly type: "uint256";
        }];
        readonly internalType: "struct IAddressResolver.SmartAccountResult[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "smartAccountFactoryV1";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "smartAccountFactoryV2";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=AccountResolver.d.ts.map