import {
  distinctUniqueKey
} from "./chunk-KE62UF5Z.js";
import {
  deepCompare
} from "./chunk-N2P4NRH3.js";

// src/sdk/common/rxjs/object.subject.ts
import { BehaviorSubject } from "rxjs";
var ObjectSubject = class extends BehaviorSubject {
  constructor(value = null) {
    super(value);
  }
  observeKey(key) {
    return this.pipe(distinctUniqueKey(key));
  }
  next(value) {
    if (!value) {
      super.next(null);
    } else if (!this.value || //
    !deepCompare(this.prepareForCompare(this.value), this.prepareForCompare(value))) {
      super.next(this.prepareForNext(value));
    }
  }
  nextData(value) {
    if (!value) {
      super.next("");
    } else if (!this.value || //
    !deepCompare(this.prepareForCompare(this.value), this.prepareForCompare(value))) {
      super.next(this.prepareForNext(value));
    }
  }
  prepareForNext(value) {
    return value;
  }
  prepareForCompare(value) {
    return value;
  }
};

export {
  ObjectSubject
};
//# sourceMappingURL=chunk-LY6TS44P.js.map