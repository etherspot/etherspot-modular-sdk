"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynchronizedSubject = void 0;
const object_subject_js_1 = require("./object.subject.js");
class SynchronizedSubject extends object_subject_js_1.ObjectSubject {
    prepareForCompare(value) {
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
exports.SynchronizedSubject = SynchronizedSubject;
//# sourceMappingURL=synchronized.subject.js.map