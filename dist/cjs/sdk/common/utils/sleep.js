"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
function sleep(sec) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}
//# sourceMappingURL=sleep.js.map