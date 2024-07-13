export type Result = { key: string, value: any };

export type Deferrable<T> = {
  [K in keyof T]: T[K] | Promise<T[K]>;
}

export const resolveProperties = async <T>(object: Readonly<Deferrable<T>>): Promise<T> => {
    const promises: Array<Promise<Result>> = Object.keys(object).map((key) => {
      const value = object[<keyof Deferrable<T>>key];
      return Promise.resolve(value).then((v) => ({ key: key, value: v }));
    });

    const results = await Promise.all(promises);

    return results.reduce((accum, result) => {
      accum[<keyof T>(result.key)] = result.value;
      return accum;
    }, <T>{});
  }