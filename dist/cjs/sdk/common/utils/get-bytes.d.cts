import { BytesLike } from '../types.cjs';
import 'viem';

declare function getBytes(value: BytesLike, name?: string, copy?: boolean): Uint8Array;

export { getBytes };
