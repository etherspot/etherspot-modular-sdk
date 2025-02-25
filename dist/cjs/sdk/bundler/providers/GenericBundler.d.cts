import { BundlerProvider } from '../interface.cjs';

declare class GenericBundler implements BundlerProvider {
    readonly url: string;
    constructor(bundlerUrl: string);
}

export { GenericBundler };
