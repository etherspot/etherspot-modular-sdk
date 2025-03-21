

export function parseJson<T>(raw: string, defaultValue?: T): T | undefined {
    let result: T | undefined;
    try {
      result = JSON.parse(raw);
    } catch (err) {
      result = defaultValue;
    }
  
    return result;
  }

  export function stringifyJson<T>(value: T, space?: number): string {
    return JSON.stringify(value, null, space);
  }
  