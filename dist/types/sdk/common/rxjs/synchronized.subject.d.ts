import { Synchronized } from '../classes/index.js';
import { ObjectSubject } from './object.subject.js';
/**
 * @ignore
 */
export declare class SynchronizedSubject<T extends Synchronized, K extends keyof T = keyof T> extends ObjectSubject<T, K> {
    prepareForCompare(value: T): any;
    prepareForNext(value: T): T;
}
//# sourceMappingURL=synchronized.subject.d.ts.map