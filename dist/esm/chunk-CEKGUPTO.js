import {
  distinctUniqueKey
} from "./chunk-PHJUEZEV.js";
import {
  deepCompare
} from "./chunk-PTN4HFUV.js";

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
//# sourceMappingURL=chunk-CEKGUPTO.js.map