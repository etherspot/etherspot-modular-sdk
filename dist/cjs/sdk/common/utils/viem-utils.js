"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChain = exports.getViemAddress = exports.getViemAccount = exports.getWalletClientFromAccount = exports.getWalletClientFromPrivateKey = exports.getPublicClient = exports.isContract = void 0;
exports.prepareAddress = prepareAddress;
exports.prepareAddresses = prepareAddresses;
exports.addressesEqual = addressesEqual;
exports.isAddress = isAddress;
const tslib_1 = require("tslib");
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains = tslib_1.__importStar(require("viem/chains"));
const index_js_1 = require("../../network/index.js");
const constants_js_1 = require("../constants.js");
const isContract = async ({ client, address, }) => {
    const bytecode = await client.getBytecode({
        address: address,
    });
    return bytecode && bytecode !== '0x';
};
exports.isContract = isContract;
const getPublicClient = ({ chainId, transport }) => {
    const publicClient = (0, viem_1.createPublicClient)({
        chain: index_js_1.Networks[chainId].chain,
        transport: transport
    });
    return publicClient;
};
exports.getPublicClient = getPublicClient;
const getWalletClientFromPrivateKey = ({ rpcUrl, chainId, privateKey }) => {
    return (0, viem_1.createWalletClient)({
        account: (0, accounts_1.privateKeyToAccount)(privateKey),
        chain: index_js_1.Networks[chainId].chain,
        transport: (0, viem_1.http)(rpcUrl),
    });
};
exports.getWalletClientFromPrivateKey = getWalletClientFromPrivateKey;
const getWalletClientFromAccount = ({ rpcUrl, chainId, account }) => {
    return (0, viem_1.createWalletClient)({
        account: account,
        chain: index_js_1.Networks[chainId].chain,
        transport: (0, viem_1.http)(rpcUrl),
    });
};
exports.getWalletClientFromAccount = getWalletClientFromAccount;
const getViemAccount = (privateKey) => {
    return (0, accounts_1.privateKeyToAccount)(privateKey);
};
exports.getViemAccount = getViemAccount;
const getViemAddress = (address) => {
    return (0, viem_1.getAddress)(address);
};
exports.getViemAddress = getViemAddress;
const getChain = (chainId) => {
    return (0, viem_1.extractChain)({
        chains: Object.values(chains),
        id: chainId,
    });
};
exports.getChain = getChain;
function prepareAddress(value, zeroAddressAsNull = false) {
    let result = '';
    try {
        result = (0, viem_1.getAddress)(value);
        if (result === constants_js_1.AddressZero) {
            result = '';
        }
    }
    catch (err) {
    }
    if (!result && zeroAddressAsNull) {
        result = constants_js_1.AddressZero;
    }
    return result;
}
function prepareAddresses(data, ...keys) {
    const result = {
        ...data,
    };
    for (const key of keys) {
        if (!result[key]) {
            continue;
        }
        try {
            if (Array.isArray(result[key])) {
                const addresses = result[key].map((item) => {
                    let result = item;
                    if (item) {
                        const address = prepareAddress(item);
                        if (address) {
                            result = address;
                        }
                    }
                    return result;
                });
                result[key] = addresses;
            }
            else {
                const address = prepareAddress(result[key]);
                if (address) {
                    result[key] = address;
                }
            }
        }
        catch (err) {
        }
    }
    return result;
}
function addressesEqual(address1, address2) {
    return (address1 || '').toLowerCase() === (address2 || '').toLowerCase();
}
function isAddress(value) {
    let result = false;
    if (value && value !== constants_js_1.AddressZero) {
        try {
            const address = (0, viem_1.getAddress)(value);
            if (address) {
                result = address === value;
            }
        }
        catch (err) {
            result = false;
        }
    }
    else if (value === constants_js_1.AddressZero) {
        result = true;
    }
    return result;
}
//# sourceMappingURL=viem-utils.js.map