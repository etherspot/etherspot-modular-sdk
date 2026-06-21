import assert from 'node:assert/strict';
import { hexlifyValue } from '../src/sdk/common/utils/hexlify.js';

assert.equal(hexlifyValue(0n), '0x00');
assert.equal(hexlifyValue(15n), '0x0f');
assert.equal(hexlifyValue(16n), '0x10');
assert.throws(() => hexlifyValue(-1n), /negative bigint value/);
assert.throws(() => hexlifyValue(-16n), /negative bigint value/);
