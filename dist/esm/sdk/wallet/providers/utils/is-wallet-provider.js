import { isHex } from 'viem';
export function isWalletProvider(provider) {
    let result = false;
    if (provider) {
        switch (typeof provider) {
            case 'string':
                result = isHex(provider);
                break;
            case 'object':
                const { privateKey } = provider;
                if (isHex(privateKey)) {
                    result = true;
                }
                else {
                    const { type, signMessage } = provider;
                    result = !!type && typeof signMessage === 'function';
                }
                break;
        }
    }
    return result;
}
//# sourceMappingURL=is-wallet-provider.js.map