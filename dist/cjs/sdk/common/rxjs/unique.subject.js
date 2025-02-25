"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueSubject = void 0;
const rxjs_1 = require("rxjs");
const index_js_1 = require("../utils/index.js");
class UniqueSubject extends rxjs_1.BehaviorSubject {
    constructor(value = null) {
        super(value);
    }
    next(value) {
        if (!(0, index_js_1.deepCompare)(this.value, value)) {
            super.next(value);
        }
    }
}
exports.UniqueSubject = UniqueSubject;
//# sourceMappingURL=unique.subject.js.map