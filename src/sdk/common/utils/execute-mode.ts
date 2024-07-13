import { CALL_TYPE, EXEC_TYPE } from "../constants";
import { concat, pad } from "viem";

export const getExecuteMode = ({
    callType,
    execType
}: {
    callType: CALL_TYPE
    execType: EXEC_TYPE
}): string => {
    return concat([
        callType, // 1 byte
        execType, // 1 byte
        "0x00000000", // 4 bytes
        "0x00000000", // 4 bytes
        pad("0x00000000", {size: 32})
    ]);
}
