import { Subject } from 'rxjs';
/**
 * @ignore
 */
export declare class ErrorSubject extends Subject<any> {
    complete(): void;
    next(value?: any): void;
    wrap<T>(func: () => T): T;
    catch<T>(func: () => T, onComplete?: () => any): void;
}
//# sourceMappingURL=error.subject.d.ts.map