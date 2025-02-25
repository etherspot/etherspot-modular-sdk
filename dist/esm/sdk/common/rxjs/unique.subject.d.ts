import { BehaviorSubject } from 'rxjs';

declare class UniqueSubject<T = any> extends BehaviorSubject<T> {
    constructor(value?: T);
    next(value: T): void;
}

export { UniqueSubject };
