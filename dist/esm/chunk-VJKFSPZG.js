// src/sdk/common/service.ts
var Service = class {
  context;
  inited = false;
  destroyed = false;
  attachedCounter = 0;
  subscriptions = [];
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
};

export {
  Service
};
//# sourceMappingURL=chunk-VJKFSPZG.js.map