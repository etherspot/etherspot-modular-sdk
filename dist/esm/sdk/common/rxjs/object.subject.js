import { BehaviorSubject } from 'rxjs';
import { deepCompare } from '../utils/index.js';
import { distinctUniqueKey } from './distinct-unique-key.operator.js';
/**
 * @ignore
 */
export class ObjectSubject extends BehaviorSubject {
    constructor(value = null) {
        super(value);
    }
    observeKey(key) {
        return this.pipe(distinctUniqueKey(key));
    }
    next(value) {
        if (!value) {
            super.next(null);
        }
        else if (!this.value || //
            !deepCompare(this.prepareForCompare(this.value), this.prepareForCompare(value))) {
            super.next(this.prepareForNext(value));
        }
    }
    nextData(value) {
        if (!value) {
            super.next('');
        }
        else if (!this.value || //
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
}
//# sourceMappingURL=object.subject.js.map