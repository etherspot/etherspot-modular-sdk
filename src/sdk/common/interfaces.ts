import { BigNumberish } from "../types/bignumber.js";

export interface BatchUserOpsRequest {
  to: string[];
  data: string[];
  value: BigNumberish[];
}

export interface UserOpsRequest { 
  to: string;
  data?: string;
  value?: BigNumberish;
}
