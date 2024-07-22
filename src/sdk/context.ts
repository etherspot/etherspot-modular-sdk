import { ErrorSubject, Service } from './common';
import { NetworkService } from './network';
import { StateService } from './state';

export class Context {
  readonly error$ = new ErrorSubject();

  private readonly attached: Service[] = [];

  constructor(
    readonly services: {
      stateService: StateService;
      networkService: NetworkService;
    },
  ) {
    const items = [...Object.values(services)];

    for (const item of items) {
      this.attach(item);
    }
  }

  attach<T extends Service>(service: T): void {
    this.attached.push(service);
    service.init(this);
  }

  destroy(): void {
    for (const attached of this.attached) {
      attached.destroy();
    }
  }
}
