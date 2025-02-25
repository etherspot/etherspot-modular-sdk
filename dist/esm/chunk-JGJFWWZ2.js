// src/sdk/common/rxjs/error.subject.ts
import { Subject } from "rxjs";
var ErrorSubject = class extends Subject {
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

export {
  ErrorSubject
};
//# sourceMappingURL=chunk-JGJFWWZ2.js.map