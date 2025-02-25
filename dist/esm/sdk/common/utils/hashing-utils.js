import { encodePacked } from "viem";
import { isAddress } from "./viem-utils.js";
import { isHex as isAHex, stringToBytes } from 'viem';
export function keccak256(data) {
    let result = null;
    if (data) {
        switch (typeof data) {
            case 'string':
                if (isAddress(data)) {
                    result = keccak256(encodePacked(['address'], [data]));
                }
                else if (isHex(data)) {
                    result = keccak256(encodePacked(['bytes'], [data]));
                }
                else {
                    result = keccak256(encodePacked(['string'], [data]));
                }
                break;
            case 'object': {
                //result = utils.solidityKeccak256(['bytes'], [data]);
                // TODO-LibraryFix - this needs debugging as its migrated from ethers
                result = keccak256(encodePacked(['bytes'], [data.toString()]));
                break;
            }
        }
    }
    return result;
}
export function isHex(hex, size = 0) {
    let result = isAHex(hex);
    if (result && size > 0) {
        result = hex.length === size * 2 + 2;
    }
    return result;
}
export function toHexFromBytesLike(data) {
    let result = null;
    if (data !== null) {
        switch (typeof data) {
            case 'string':
                if (isHex(data)) {
                    result = data;
                }
                else {
                    result = toHexFromBytesLike(stringToBytes(data));
                }
                break;
            case 'object':
                try {
                    result = toHexFromBytesLike(data);
                }
                catch (err) {
                    result = null;
                }
                break;
        }
    }
    if (!result) {
        throw new Error('invalid hex data');
    }
    return result;
}
export function concatHex(...hex) {
    return hex.map((item, index) => (index ? item.slice(2) : item)).join('');
}
//# sourceMappingURL=hashing-utils.js.map