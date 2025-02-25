import {
  ObjectSubject
} from "./chunk-LY6TS44P.js";

// src/sdk/common/rxjs/synchronized.subject.ts
var SynchronizedSubject = class extends ObjectSubject {
  prepareForCompare(value) {
    const { synchronizedAt, ...data } = value;
    return data;
  }
  prepareForNext(value) {
    if (value !== null && value.synchronizedAt !== null) {
      value.synchronizedAt = /* @__PURE__ */ new Date();
    }
    return value;
  }
};

export {
  SynchronizedSubject
};
//# sourceMappingURL=chunk-EX2L45PO.js.map