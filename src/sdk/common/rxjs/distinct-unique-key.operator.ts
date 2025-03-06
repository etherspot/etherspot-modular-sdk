import { OperatorFunction, distinctUntilKeyChanged, map, pluck } from 'rxjs';
import { deepCompare } from '../utils/index.js';

/**
 * @ignore
 */
export function distinctUniqueKey<T, K extends keyof T>(key: K): OperatorFunction<T, T[K]> {
  return (input$) =>
    input$.pipe(
      map((value) => {
        return (value ? value : { [key]: null }) as T;
      }),
      distinctUntilKeyChanged(key, deepCompare),
      pluck(key),
    );
}
