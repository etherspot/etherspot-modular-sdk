"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBytes = getBytes;
function getBytes(value, name, copy) {
    if (value instanceof Uint8Array) {
        if (copy) {
            return new Uint8Array(value);
        }
        return value;
    }
    if (typeof (value) === "string" && value.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
        const result = new Uint8Array((value.length - 2) / 2);
        let offset = 2;
        for (let i = 0; i < result.length; i++) {
            result[i] = parseInt(value.substring(offset, offset + 2), 16);
            offset += 2;
        }
        return result;
    }
    throw new Error('Invalid value for getBytes!');
}
//# sourceMappingURL=get-bytes.js.map