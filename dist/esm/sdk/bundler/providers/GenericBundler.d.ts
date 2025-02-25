import { BundlerProvider } from '../interface.js';

declare class GenericBundler implements BundlerProvider {
    readonly url: string;
    constructor(bundlerUrl: string);
}

export { GenericBundler };
