import { BigNumberish } from '../types/bignumber.cjs';

interface BatchUserOpsRequest {
    to: string[];
    data?: string[];
    value?: BigNumberish[];
}
interface UserOpsRequest {
    to: string;
    data?: string;
    value?: BigNumberish;
}

export type { BatchUserOpsRequest, UserOpsRequest };
