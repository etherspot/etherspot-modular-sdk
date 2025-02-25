declare class ErrorHandler extends Error {
    error: string;
    code?: number;
    rawError: string;
    constructor(error: string, code?: number);
}

export { ErrorHandler };
