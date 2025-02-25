"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor() {
        this.inited = false;
        this.destroyed = false;
        this.attachedCounter = 0;
        this.subscriptions = [];
    }
    init(context) {
        if (!this.inited) {
            this.inited = true;
            this.context = context;
            if (this.onInit) {
                this.onInit();
            }
            if (this.error$) {
                this.addSubscriptions(this.error$.subscribe());
            }
        }
        ++this.attachedCounter;
    }
    destroy() {
        if (!this.attachedCounter) {
            return;
        }
        --this.attachedCounter;
        if (!this.attachedCounter && !this.destroyed) {
            this.destroyed = true;
            this.removeSubscriptions();
            if (this.onDestroy) {
                this.onDestroy();
            }
        }
    }
    get error$() {
        return this.context.error$;
    }
    get services() {
        return this.context.services;
    }
    addSubscriptions(...subscriptions) {
        this.subscriptions.push(...subscriptions.filter((subscription) => !!subscription));
    }
    removeSubscriptions() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }
    replaceSubscriptions(...subscriptions) {
        this.removeSubscriptions();
        this.addSubscriptions(...subscriptions);
    }
}
exports.Service = Service;
//# sourceMappingURL=service.js.map