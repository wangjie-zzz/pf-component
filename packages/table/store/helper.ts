import Store from "./index";
/* eslint-disable */
// @ts-ignore
import debounce from "lodash/debounce";
import { Table } from "../table.type";

export function createStore(table: Table, initialState = {}) {
  if (!table) {
    throw new Error("Table is required.");
  }

  const store = Store();
  // fix https://github.com/ElemeFE/element/issues/14075
  // related pr https://github.com/ElemeFE/element/pull/14146
  store.toggleAllSelection = debounce(store._toggleAllSelection, 10);
  Object.keys(initialState).forEach(key => {
    // @ts-ignore
    store.states[key].value = initialState[key];
  });
  return store;
}

export function mapStates<T>(mapper: T): any {
  const res = {};
  Object.keys(mapper).forEach(key => {
    // @ts-ignore
    const value = mapper[key];
    let fn;
    if (typeof value === "string") {
      fn = function() {
        // @ts-ignore
        return this.store.states[value];
      };
    } else if (typeof value === "function") {
      fn = function() {
        // @ts-ignore
        return value.call(this, this.store.states);
      };
    } else {
      console.error("invalid value type");
    }
    if (fn) {
      // @ts-ignore
      res[key] = fn;
    }
  });
  return res as any;
}
