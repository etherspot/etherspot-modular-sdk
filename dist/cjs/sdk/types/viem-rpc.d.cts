interface ViemRpcRequestError {
    details: string;
    metaMessages: string[];
    shortMessage: string;
    name: string;
    version: string;
    message: string;
    cause: {
        message: string;
        code: number;
    };
    code: number;
}

export type { ViemRpcRequestError };
