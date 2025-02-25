declare function parseJson<T>(raw: string, defaultValue?: T): T;
declare function stringifyJson<T>(value: T, space?: number): string;

export { parseJson, stringifyJson };
