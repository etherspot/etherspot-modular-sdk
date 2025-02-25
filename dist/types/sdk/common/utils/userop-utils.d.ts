import { CALL_TYPE, EXEC_TYPE } from "../constants.js";
export type Result = {
    key: string;
    value: any;
};
export type Deferrable<T> = {
    [K in keyof T]: T[K] | Promise<T[K]>;
};
export declare const resolveProperties: <T>(object: Readonly<Deferrable<T>>) => Promise<T>;
export declare const getExecuteMode: ({ callType, execType }: {
    callType: CALL_TYPE;
    execType: EXEC_TYPE;
}) => string;
//# sourceMappingURL=userop-utils.d.ts.map