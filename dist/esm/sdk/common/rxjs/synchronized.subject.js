import { ObjectSubject } from './object.subject.js';
/**
 * @ignore
 */
export class SynchronizedSubject extends ObjectSubject {
    prepareForCompare(value) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { synchronizedAt, ...data } = value;
        return data;
    }
    prepareForNext(value) {
        if (value !== null && value.synchronizedAt !== null) {
            value.synchronizedAt = new Date();
        }
        return value;
    }
}
//# sourceMappingURL=synchronized.subject.js.map