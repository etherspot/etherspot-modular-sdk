import { CALL_TYPE, EXEC_TYPE } from "../constants";
import { concat, pad } from "viem";

export type Result = { key: string, value: any };

export type Deferrable<T> = {
  [K in keyof T]: T[K] | Promise<T[K]>;
}

export const resolveProperties = async <T>(object: Readonly<Deferrable<T>>): Promise<T> => {
    const promises: Array<Promise<Result>> = Object.keys(object).map((key) => {
      const value = object[<keyof Deferrable<T>>key];
      return Promise.resolve(value).then((v) => ({ key: key, value: v }));
    });

    const results = await Promise.all(promises);

    return results.reduce((accum, result) => {
      accum[<keyof T>(result.key)] = result.value;
      return accum;
    }, <T>{});
  }

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
        pad("0x00000000", {size: 22})
    ]);
}
