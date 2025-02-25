var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/sdk/common/service.ts
var service_exports = {};
__export(service_exports, {
  Service: () => Service
});
module.exports = __toCommonJS(service_exports);
var Service = class {
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
};
//# sourceMappingURL=service.cjs.map