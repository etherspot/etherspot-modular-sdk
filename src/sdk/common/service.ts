import { Subscription } from 'rxjs';
import { Context } from '../context.js';

/**
 * Abstract base class for services with lifecycle and subscription management.
 */
export abstract class Service {
  protected context: Context;
  private inited = false;
  private destroyed = false;
  private attachedCounter = 0;
  private subscriptions: Subscription[] = [];

  /**
   * Initialize the service with the given context. Idempotent.
   * @param context Service context
   */
  init(context: Context): void {
    if (!this.inited) {
      this.inited = true;
      this.context = context;

      if (this.onInit) {
        this.onInit();
      }

      if (this.error$) {
        this.addSubscriptions(this.error$.subscribe());
      }
    }

    ++this.attachedCounter;
  }

  /**
   * Destroy the service and clean up subscriptions. Idempotent.
   */
  destroy(): void {
    if (!this.attachedCounter) {
      return;
    }

    --this.attachedCounter;

    if (!this.attachedCounter && !this.destroyed) {
      this.destroyed = true;

      this.removeSubscriptions();

      if (this.onDestroy) {
        this.onDestroy();
      }
    }
  }

  protected onInit?(): void;

  protected onDestroy?(): void;

  protected get error$(): Context['error$'] {
    return this.context.error$;
  }

  protected get services(): Context['services'] {
    return this.context.services;
  }

  /**
   * Add subscriptions, preventing duplicates.
   * @param subscriptions Subscriptions to add
   */
  protected addSubscriptions(...subscriptions: Subscription[]): void {
    for (const sub of subscriptions) {
      if (sub && !this.subscriptions.includes(sub)) {
        this.subscriptions.push(sub);
      }
    }
  }

  /**
   * Remove and unsubscribe all subscriptions.
   */
  protected removeSubscriptions(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
  }

  /**
   * Replace all subscriptions with new ones.
   * @param subscriptions New subscriptions
   */
  protected replaceSubscriptions(...subscriptions: Subscription[]): void {
    this.removeSubscriptions();
    this.addSubscriptions(...subscriptions);
  }
}
