import {
  ErrorSubject
} from "./chunk-JGJFWWZ2.js";

// src/sdk/context.ts
var Context = class {
  constructor(services) {
    this.services = services;
    const items = [...Object.values(services)];
    for (const item of items) {
      this.attach(item);
    }
  }
  error$ = new ErrorSubject();
  attached = [];
  attach(service) {
    this.attached.push(service);
    service.init(this);
  }
  destroy() {
    for (const attached of this.attached) {
      attached.destroy();
    }
  }
};

export {
  Context
};
//# sourceMappingURL=chunk-LT6TVN3Y.js.map