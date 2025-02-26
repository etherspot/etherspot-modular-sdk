"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keccak256 = keccak256;
exports.isHex = isHex;
exports.toHexFromBytesLike = toHexFromBytesLike;
exports.concatHex = concatHex;
const viem_1 = require("viem");
const viem_utils_js_1 = require("./viem-utils.js");
const viem_2 = require("viem");
function keccak256(data) {
    let result = '';
    if (data) {
        switch (typeof data) {
            case 'string':
                if ((0, viem_utils_js_1.isAddress)(data)) {
                    result = keccak256((0, viem_1.encodePacked)(['address'], [data]));
                }
                else if (isHex(data)) {
                    result = keccak256((0, viem_1.encodePacked)(['bytes'], [data]));
                }
                else {
                    result = keccak256((0, viem_1.encodePacked)(['string'], [data]));
                }
                break;
            case 'object': {
                result = keccak256((0, viem_1.encodePacked)(['bytes'], [data.toString()]));
                break;
            }
        }
    }
    return result;
}
function isHex(hex, size = 0) {
    let result = (0, viem_2.isHex)(hex);
    if (result && size > 0) {
        result = hex.length === size * 2 + 2;
    }
    return result;
}
function toHexFromBytesLike(data) {
    let result = '';
    if (data !== null) {
        switch (typeof data) {
            case 'string':
                if (isHex(data)) {
                    result = data;
                }
                else {
                    result = toHexFromBytesLike((0, viem_2.stringToBytes)(data));
                }
                break;
            case 'object':
                try {
                    result = toHexFromBytesLike(data);
                }
                catch (err) {
                    result = '';
                }
                break;
        }
    }
    if (!result) {
        throw new Error('invalid hex data');
    }
    return result;
}
function concatHex(...hex) {
    return hex.map((item, index) => (index ? item.slice(2) : item)).join('');
}
//# sourceMappingURL=hashing-utils.js.map