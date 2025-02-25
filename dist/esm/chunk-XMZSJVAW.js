import {
  deepCompare
} from "./chunk-N2P4NRH3.js";

// src/sdk/common/rxjs/unique.subject.ts
import { BehaviorSubject } from "rxjs";
var UniqueSubject = class extends BehaviorSubject {
  constructor(value = null) {
    super(value);
  }
  next(value) {
    if (!deepCompare(this.value, value)) {
      super.next(value);
    }
  }
};

export {
  UniqueSubject
};
//# sourceMappingURL=chunk-XMZSJVAW.js.map