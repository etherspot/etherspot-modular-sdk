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

// src/sdk/common/rxjs/error.subject.ts
var error_subject_exports = {};
__export(error_subject_exports, {
  ErrorSubject: () => ErrorSubject
});
module.exports = __toCommonJS(error_subject_exports);
var import_rxjs = require("rxjs");
var ErrorSubject = class extends import_rxjs.Subject {
  complete() {
  }
  next(value) {
    if (value) {
      super.next(value);
    }
  }
  wrap(func) {
    let result;
    try {
      result = func();
      if (result instanceof Promise) {
        result = result.catch((err) => {
          this.next(err);
          return null;
        });
      }
    } catch (err) {
      this.next(err);
      result = null;
    }
    return result;
  }
  catch(func, onComplete) {
    const fireOnComplete = () => {
      if (onComplete) {
        onComplete();
        onComplete = null;
      }
    };
    try {
      const promise = func();
      if (promise instanceof Promise) {
        promise.catch((err) => {
          this.next(err);
        }).finally(() => {
          fireOnComplete();
        });
        return;
      }
      fireOnComplete();
    } catch (err) {
      this.next(err);
      fireOnComplete();
    }
  }
};
//# sourceMappingURL=error.subject.cjs.map