import { ErrorSubject, Service } from './common/index.js';
import { NetworkService } from './network/index.js';
import { WalletService } from './wallet/index.js';
export declare class Context {
    readonly services: {
        networkService: NetworkService;
        walletService: WalletService;
    };
    readonly error$: ErrorSubject;
    private readonly attached;
    constructor(services: {
        networkService: NetworkService;
        walletService: WalletService;
    });
    attach<T extends Service>(service: T): void;
    destroy(): void;
}
//# sourceMappingURL=context.d.ts.map