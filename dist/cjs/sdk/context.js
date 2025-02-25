"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const index_js_1 = require("./common/index.js");
class Context {
    constructor(services) {
        this.services = services;
        this.error$ = new index_js_1.ErrorSubject();
        this.attached = [];
        const items = [...Object.values(services)];
        for (const item of items) {
            this.attach(item);
        }
    }
    attach(service) {
        this.attached.push(service);
        service.init(this);
    }
    destroy() {
        for (const attached of this.attached) {
            attached.destroy();
        }
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map