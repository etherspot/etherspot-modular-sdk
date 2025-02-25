import { BehaviorSubject } from 'rxjs';
import { deepCompare } from '../utils/index.js';
/**
 * @ignore
 */
export class UniqueSubject extends BehaviorSubject {
    constructor(value = null) {
        super(value);
    }
    next(value) {
        if (!deepCompare(this.value, value)) {
            super.next(value);
        }
    }
}
//# sourceMappingURL=unique.subject.js.map