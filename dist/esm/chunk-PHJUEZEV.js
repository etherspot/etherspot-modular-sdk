import {
  deepCompare
} from "./chunk-PTN4HFUV.js";

// src/sdk/common/rxjs/distinct-unique-key.operator.ts
import { distinctUntilKeyChanged, pluck, map } from "rxjs/operators";
function distinctUniqueKey(key) {
  return (input$) => input$.pipe(
    map((value) => {
      return value ? value : { [key]: null };
    }),
    distinctUntilKeyChanged(key, deepCompare),
    pluck(key)
  );
}

export {
  distinctUniqueKey
};
//# sourceMappingURL=chunk-PHJUEZEV.js.map