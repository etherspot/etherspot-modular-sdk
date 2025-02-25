import { OperatorFunction } from 'rxjs';

declare function distinctUniqueKey<T, K extends keyof T>(key: K): OperatorFunction<T, T[K]>;

export { distinctUniqueKey };
