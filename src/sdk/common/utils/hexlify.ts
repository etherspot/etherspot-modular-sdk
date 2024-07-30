"use strict";

import { Bytes, BytesLike } from "../types";

///////////////////////////////
// Exported Types

//export type BytesLike = Bytes | string;

export type DataOptions = {
    allowMissingPrefix?: boolean;
    hexPad?: "left" | "right" | null;
};

export interface Hexable {
    toHexString(): string;
}

///////////////////////////////


function isHexableValue(value: any): value is Hexable {
    return !!(value.toHexString);
}

export function isBytesLikeValue(value: any): value is BytesLike {
    return ((isHexString(value) && !(value.length % 2)) || isBytes(value));
}

function isInteger(value: number) {
    return (typeof(value) === "number" && value == value && (value % 1) === 0);
}

export function isBytes(value: any): value is Bytes {
    if (value == null) { return false; }

    if (value.constructor === Uint8Array) { return true; }
    if (typeof (value) === "string") { return false; }
    if (!isInteger(value.length) || value.length < 0) { return false; }

    for (let i = 0; i < value.length; i++) {
        const v = value[i];
        if (!isInteger(v) || v < 0 || v >= 256) { return false; }
    }
    return true;
}

export function isHexString(value: any, length?: number): boolean {
    if (typeof (value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false
    }
    if (length && value.length !== 2 + 2 * length) { return false; }
    return true;
}


export function checkSafeUint53(value: number, message?: string): void {
    if (typeof (value) !== "number") { return; }

    if (message == null) { message = "value not safe"; }

    if (value < 0 || value >= 0x1fffffffffffff) {
        throw new Error(`Invalid Hexlify value - CheckSafeInteger Failed due to out-of-safe-range value: ${value}`);
    }

    if (value % 1) {
        throw new Error(`Invalid Hexlify value - CCheckSafeInteger Failed due to non-integer value: ${value}`);
    }
}

const HexCharacters = "0123456789abcdef";

export function hexlifyValue(value: BytesLike | Hexable | number | bigint, options?: DataOptions): string {
    if (!options) { options = {}; }

    if (typeof (value) === "number") {
        checkSafeUint53(value);

        let hex = "";
        while (value) {
            hex = HexCharacters[value & 0xf] + hex;
            value = Math.floor(value / 16);
        }

        if (hex.length) {
            if (hex.length % 2) { hex = "0" + hex; }
            return "0x" + hex;
        }

        return "0x00";
    }

    if (typeof (value) === "bigint") {
        value = value.toString(16);
        if (value.length % 2) { return ("0x0" + value); }
        return "0x" + value;
    }

    if (options.allowMissingPrefix && typeof (value) === "string" && value.substring(0, 2) !== "0x") {
        value = "0x" + value;
    }

    if (isHexableValue(value)) { return value.toHexString(); }

    if (isHexString(value)) {
        if ((<string>value).length % 2) {
            if (options.hexPad === "left") {
                value = "0x0" + (<string>value).substring(2);
            } else if (options.hexPad === "right") {
                value += "0";
            } else {
                throw new Error(`invalid hexlify value - hex data is odd-length for value: ${value}`);
            }
        }
        return (<string>value).toLowerCase();
    }

    if (isBytes(value)) {
        let result = "0x";
        for (let i = 0; i < value.length; i++) {
            const v = value[i];
            result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
        }
        return result;
    }

    throw new Error(`invalid hexlify value - ${value}`);
}
