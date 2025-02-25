"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectSubject = void 0;
const rxjs_1 = require("rxjs");
const index_js_1 = require("../utils/index.js");
const distinct_unique_key_operator_js_1 = require("./distinct-unique-key.operator.js");
class ObjectSubject extends rxjs_1.BehaviorSubject {
    constructor(value = null) {
        super(value);
    }
    observeKey(key) {
        return this.pipe((0, distinct_unique_key_operator_js_1.distinctUniqueKey)(key));
    }
    next(value) {
        if (!value) {
            super.next(null);
        }
        else if (!this.value ||
            !(0, index_js_1.deepCompare)(this.prepareForCompare(this.value), this.prepareForCompare(value))) {
            super.next(this.prepareForNext(value));
        }
    }
    nextData(value) {
        if (!value) {
            super.next('');
        }
        else if (!this.value ||
            !(0, index_js_1.deepCompare)(this.prepareForCompare(this.value), this.prepareForCompare(value))) {
            super.next(this.prepareForNext(value));
        }
    }
    prepareForNext(value) {
        return value;
    }
    prepareForCompare(value) {
        return value;
    }
}
exports.ObjectSubject = ObjectSubject;
//# sourceMappingURL=object.subject.js.map