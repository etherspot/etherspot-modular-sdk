import { Subject } from 'rxjs';

/**
 * ErrorSubject is a Subject for error handling, enforcing Error types.
 */
export class ErrorSubject extends Subject<Error> {
  /**
   * Complete the error subject.
   */
  complete(): void {
    //
  }

  /**
   * Emit an error if it is an instance of Error.
   * @param value Error to emit
   */
  next(value?: Error): void {
    if (value instanceof Error) {
      super.next(value);
    } else if (value) {
      // Wrap non-Error values
      super.next(new Error(String(value)));
    }
  }

  /**
   * Wrap a function and emit any errors thrown as Error.
   * @param func Function to execute
   */
  wrap<T>(func: () => T): T | null {
    let result: T | null;
    try {
      result = func();
      if (result instanceof Promise) {
        result = (result.catch((err) => {
          this.next(err instanceof Error ? err : new Error(String(err)));
          return null;
        }) as unknown) as T;
      }
    } catch (err) {
      this.next(err instanceof Error ? err : new Error(String(err)));
      result = null;
    }
    return result;
  }

  /**
   * Catch errors from a function and emit them, optionally call onComplete.
   * @param func Function to execute
   * @param onComplete Optional completion callback
   */
  catch<T>(func: () => T, onComplete?: () => any): void {
    const fireOnComplete = () => {
      if (onComplete) {
        onComplete();
      }
    };
    try {
      const promise = func();
      if (promise instanceof Promise) {
        promise
          .catch((err) => {
            this.next(err instanceof Error ? err : new Error(String(err)));
          })
          .finally(() => {
            fireOnComplete();
          });
        return;
      }
      fireOnComplete();
    } catch (err) {
      this.next(err instanceof Error ? err : new Error(String(err)));
      fireOnComplete();
    }
  }
}
