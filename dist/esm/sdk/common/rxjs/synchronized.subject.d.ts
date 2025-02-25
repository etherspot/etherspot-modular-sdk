import { Synchronized } from '../classes/synchronized.js';
import { ObjectSubject } from './object.subject.js';
import 'rxjs';

declare class SynchronizedSubject<T extends Synchronized, K extends keyof T = keyof T> extends ObjectSubject<T, K> {
    prepareForCompare(value: T): any;
    prepareForNext(value: T): T;
}

export { SynchronizedSubject };
