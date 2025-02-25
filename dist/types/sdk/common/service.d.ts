import { Subscription } from 'rxjs';
import { Context } from '../context.js';
export declare abstract class Service {
    protected context: Context;
    private inited;
    private destroyed;
    private attachedCounter;
    private subscriptions;
    init(context: Context): void;
    destroy(): void;
    protected onInit?(): void;
    protected onDestroy?(): void;
    protected get error$(): Context['error$'];
    protected get services(): Context['services'];
    protected addSubscriptions(...subscriptions: Subscription[]): void;
    protected removeSubscriptions(): void;
    protected replaceSubscriptions(...subscriptions: Subscription[]): void;
}
//# sourceMappingURL=service.d.ts.map