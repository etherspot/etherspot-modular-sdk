"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSubject = void 0;
const rxjs_1 = require("rxjs");
class ErrorSubject extends rxjs_1.Subject {
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
        }
        catch (err) {
            this.next(err);
            result = null;
        }
        return result;
    }
    catch(func, onComplete) {
        const fireOnComplete = () => {
            if (onComplete) {
                onComplete();
            }
        };
        try {
            const promise = func();
            if (promise instanceof Promise) {
                promise
                    .catch((err) => {
                    this.next(err);
                })
                    .finally(() => {
                    fireOnComplete();
                });
                return;
            }
            fireOnComplete();
        }
        catch (err) {
            this.next(err);
            fireOnComplete();
        }
    }
}
exports.ErrorSubject = ErrorSubject;
//# sourceMappingURL=error.subject.js.map