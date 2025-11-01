import { useCallback, useLayoutEffect, useState } from "react";
import { createObservableSet } from "./observable-set";
import { SetStore, StoreAction, StoreUpdater, isStoreAction } from "./store";

export function createLocalSetStore<T>(
  storeId: string,
  defaultValue: T,
  parse: (maybeT: unknown) => T
): SetStore<T> {
  const { notify, subscribe, unsubscribe } = createObservableSet<T>();

  function get(id: string): T {
    try {
      const stringOrNull = localStorage.getItem(`${storeId}/${id}`);
      return stringOrNull === null
        ? defaultValue
        : parse(JSON.parse(stringOrNull));
    } catch {
      localStorage.removeItem(`${storeId}/${id}`);
      return defaultValue;
    }
  }

  function set(id: string): StoreUpdater<T> {
    return function (valueOrAction: T | StoreAction<T>): T {
      const store = isStoreAction(valueOrAction)
        ? valueOrAction(get(id))
        : valueOrAction;
      localStorage.setItem(`${storeId}/${id}`, JSON.stringify(store));
      notify(id, store);
      return store;
    };
  }

  function remove(id: string): void {
    localStorage.removeItem(`${storeId}/${id}`);
  }

  function use(id: string): [T, StoreUpdater<T>] {
    const [value, setValue] = useState(() => get(id));
    useLayoutEffect(() => subscribe(id, setValue), [id]);
    useLayoutEffect(() => setValue(get(id)), [id]);
    return [value, useCallback((...args) => set(id)(...args), [id])];
  }

  function useValue(id: string): T {
    const [value, setValue] = useState(() => get(id));
    useLayoutEffect(() => subscribe(id, setValue), [id]);
    useLayoutEffect(() => setValue(get(id)), [id]);
    return value;
  }

  function useSetValue(id: string): StoreUpdater<T> {
    return useCallback((...args) => set(id)(...args), [id]);
  }

  return {
    get,
    remove,
    set,

    use,
    useSetValue,
    useValue,

    subscribe,
    unsubscribe,
  };
}
