import { CALL_TYPE, EXEC_TYPE } from '../constants.js';
import 'viem';

type Result = {
    key: string;
    value: any;
};
type Deferrable<T> = {
    [K in keyof T]: T[K] | Promise<T[K]>;
};
declare const resolveProperties: <T>(object: Readonly<Deferrable<T>>) => Promise<T>;
declare const getExecuteMode: ({ callType, execType }: {
    callType: CALL_TYPE;
    execType: EXEC_TYPE;
}) => string;

export { type Deferrable, type Result, getExecuteMode, resolveProperties };
