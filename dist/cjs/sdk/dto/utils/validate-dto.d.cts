declare function validateDto<T extends {}>(dto: Partial<T>, DtoConstructor: {
    new (): T;
}, options?: {
    addressKeys?: (keyof T)[];
}): Promise<T>;

export { validateDto };
