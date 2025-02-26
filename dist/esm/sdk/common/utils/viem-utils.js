import { createPublicClient, createWalletClient, http, getAddress, extractChain } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import * as chains from "viem/chains";
import { Networks } from '../../network/index.js';
import { AddressZero } from '../constants.js';
export const isContract = async ({ client, address, }) => {
    const bytecode = await client.getBytecode({
        address: address,
    });
    return bytecode && bytecode !== '0x';
};
export const getPublicClient = ({ chainId, transport }) => {
    const publicClient = createPublicClient({
        chain: Networks[chainId].chain,
        transport: transport
    });
    return publicClient;
};
export const getWalletClientFromPrivateKey = ({ rpcUrl, chainId, privateKey }) => {
    return createWalletClient({
        account: privateKeyToAccount(privateKey),
        chain: Networks[chainId].chain,
        transport: http(rpcUrl), // Asserting to `any` to bypass the deep instantiation check
    });
};
export const getWalletClientFromAccount = ({ rpcUrl, chainId, account }) => {
    return createWalletClient({
        account: account,
        chain: Networks[chainId].chain,
        transport: http(rpcUrl), // Asserting to `any` to bypass the deep instantiation check
    });
};
export const getViemAccount = (privateKey) => {
    return privateKeyToAccount(privateKey);
};
export const getViemAddress = (address) => {
    return getAddress(address);
};
/**
 * Utility method for converting a chainId to a {@link Chain} object
 *
 * @param chainId
 * @returns a {@link Chain} object for the given chainId
 * @throws if the chainId is not found
 */
export const getChain = (chainId) => {
    return extractChain({
        chains: Object.values(chains),
        id: chainId,
    });
};
export function prepareAddress(value, zeroAddressAsNull = false) {
    let result = '';
    try {
        result = getAddress(value);
        if (result === AddressZero) {
            result = '';
        }
    }
    catch (err) {
        //
    }
    if (!result && zeroAddressAsNull) {
        result = AddressZero;
    }
    return result;
}
export function prepareAddresses(data, ...keys) {
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
            //
        }
    }
    return result;
}
export function addressesEqual(address1, address2) {
    return (address1 || '').toLowerCase() === (address2 || '').toLowerCase();
}
export function isAddress(value) {
    let result = false;
    if (value && value !== AddressZero) {
        try {
            const address = getAddress(value);
            if (address) {
                result = address === value;
            }
        }
        catch (err) {
            result = false;
        }
    }
    else if (value === AddressZero) {
        result = true;
    }
    return result;
}
//# sourceMappingURL=viem-utils.js.map