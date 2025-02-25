"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distinctUniqueKey = distinctUniqueKey;
const operators_1 = require("rxjs/operators");
const index_js_1 = require("../utils/index.js");
function distinctUniqueKey(key) {
    return (input$) => input$.pipe((0, operators_1.map)((value) => {
        return (value ? value : { [key]: null });
    }), (0, operators_1.distinctUntilKeyChanged)(key, index_js_1.deepCompare), (0, operators_1.pluck)(key));
}
//# sourceMappingURL=distinct-unique-key.operator.js.map