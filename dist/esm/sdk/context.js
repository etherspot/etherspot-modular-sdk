import { ErrorSubject } from './common/index.js';
export class Context {
    constructor(services) {
        this.services = services;
        this.error$ = new ErrorSubject();
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
//# sourceMappingURL=context.js.map