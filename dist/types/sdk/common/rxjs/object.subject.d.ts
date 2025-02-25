import { Observable, BehaviorSubject } from 'rxjs';
/**
 * @ignore
 */
export declare class ObjectSubject<T extends {}, K extends keyof T = keyof T> extends BehaviorSubject<T> {
    constructor(value?: T);
    observeKey<R = T[K]>(key: K): Observable<R>;
    next(value: T): void;
    nextData(value: T): void;
    prepareForNext(value: T): T;
    prepareForCompare(value: T): any;
}
//# sourceMappingURL=object.subject.d.ts.map