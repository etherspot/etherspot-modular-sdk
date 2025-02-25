import { distinctUntilKeyChanged, pluck, map } from 'rxjs/operators';
import { deepCompare } from '../utils/index.js';
/**
 * @ignore
 */
export function distinctUniqueKey(key) {
    return (input$) => input$.pipe(map((value) => {
        return (value ? value : { [key]: null });
    }), distinctUntilKeyChanged(key, deepCompare), pluck(key));
}
//# sourceMappingURL=distinct-unique-key.operator.js.map