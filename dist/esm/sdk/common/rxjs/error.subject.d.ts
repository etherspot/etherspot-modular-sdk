import { Subject } from 'rxjs';

declare class ErrorSubject extends Subject<any> {
    complete(): void;
    next(value?: any): void;
    wrap<T>(func: () => T): T;
    catch<T>(func: () => T, onComplete?: () => any): void;
}

export { ErrorSubject };
