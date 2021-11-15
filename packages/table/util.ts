import { off, on } from "../../src/constants/util/dom-util";
import { createPopper } from "@popperjs/core";
import { AnyObject, TableColumnCtx } from "./table.type";
import ResizeObserver from "resize-observer-polyfill";
/* eslint-disable */
export const isServer: boolean = typeof window === "undefined";

export const getValueByPath = (obj: any, paths = ""): unknown => {
  let ret: unknown = obj;
  paths.split(".").map(path => {
    // @ts-ignore
    ret = ret?.[path];
  });
  return ret;
};

export function getPropByPath(
  obj: any,
  path: string,
  strict: boolean
): {
  o: unknown;
  k: string;
  v: any;
} {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");

  const keyArr = path.split(".");
  let i = 0;
  for (i; i < keyArr.length - 1; i++) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];

    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error("please transfer a valid prop path to form item!");
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj?.[keyArr[i]]
  };
}
// import PopupManager from "element-plus/packages/utils/popup-manager";
/* eslint-disable */
export const getCell = function(event: Event): HTMLElement {
  let cell = event.target as HTMLElement;

  while (cell && cell.tagName.toUpperCase() !== "HTML") {
    if (cell.tagName.toUpperCase() === "TD") {
      return cell;
    }
    cell = cell.parentNode as HTMLElement;
  }

  return null as any;
};

const isObject = function(obj: null) {
  return obj !== null && typeof obj === "object";
};
// @ts-ignore
export const orderBy = function(array, sortKey, reverse, sortMethod, sortBy) {
  if (!sortKey && !sortMethod && (!sortBy || (Array.isArray(sortBy) && !sortBy.length))) {
    return array;
  }
  if (typeof reverse === "string") {
    reverse = reverse === "descending" ? -1 : 1;
  } else {
    reverse = reverse && reverse < 0 ? -1 : 1;
  }
  const getKey = sortMethod
    ? null
      // @ts-ignore
    : function(value, index) {
        if (sortBy) {
          if (!Array.isArray(sortBy)) {
            sortBy = [sortBy];
          }
          // @ts-ignore
          return sortBy.map(function(by) {
            if (typeof by === "string") {
              return getValueByPath(value, by);
            } else {
              return by(value, index, array);
            }
          });
        }
        if (sortKey !== "$key") {
          if (isObject(value) && "$value" in value) value = value.$value;
        }
        return [isObject(value) ? getValueByPath(value, sortKey) : value];
      };
  // @ts-ignore
  const compare = function(a, b) {
    if (sortMethod) {
      return sortMethod(a.value, b.value);
    }
    for (let i = 0, len = a.key.length; i < len; i++) {
      if (a.key[i] < b.key[i]) {
        return -1;
      }
      if (a.key[i] > b.key[i]) {
        return 1;
      }
    }
    return 0;
  };
  return array
      // @ts-ignore
    .map(function(value, index) {
      return {
        value: value,
        index: index,
        key: getKey ? getKey(value, index) : null
      };
    })
      // @ts-ignore
    .sort(function(a, b) {
      let order = compare(a, b);
      if (!order) {
        // make stable https://en.wikipedia.org/wiki/Sorting_algorithm#Stability
        order = a.index - b.index;
      }
      return order * reverse;
    })
      // @ts-ignore
    .map(item => item.value);
};

export const getColumnById = function(
  table: {
    columns: TableColumnCtx[];
  },
  columnId: string
): null | TableColumnCtx {
  let column = null;
  table.columns.forEach(function(item) {
    if (item.id === columnId) {
      column = item;
    }
  });
  return column;
};

export const getColumnByKey = function(
  table: {
    columns: TableColumnCtx[];
  },
  columnKey: string
): TableColumnCtx {
  let column = null;
  for (let i = 0; i < table.columns.length; i++) {
    const item = table.columns[i];
    if (item.columnKey === columnKey) {
      column = item;
      break;
    }
  }
  // @ts-ignore
  return column;
};

export const getColumnByCell = function(
  table: {
    columns: TableColumnCtx[];
  },
  cell: HTMLElement
): null | TableColumnCtx {
  const matches = (cell.className || "").match(/el-table_[^\s]+/gm);
  if (matches) {
    return getColumnById(table, matches[0]);
  }
  return null;
};

// @ts-ignore
export const getRowIdentity = (row: AnyObject, rowKey: any): string => {
  if (!row) throw new Error("row is required when get row identity");
  if (typeof rowKey === "string") {
    if (rowKey.indexOf(".") < 0) {
      return row[rowKey];
    }
    const key = rowKey.split(".");
    let current = row;
    for (let i = 0; i < key.length; i++) {
      current = current[key[i]];
    }
    return (current as unknown) as string;
  } else if (typeof rowKey === "function") {
    return rowKey.call(null, row);
  }
};

export const getKeysMap = function(array: AnyObject[], rowKey: any): AnyObject {
  const arrayMap = {};
  (array || []).forEach((row, index) => {
    // @ts-ignore
    arrayMap[getRowIdentity(row, rowKey)] = { row, index };
  });
  return arrayMap;
};

function hasOwn(obj: AnyObject, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function mergeOptions<T, K>(defaults: T, config: K): T & K {
  const options = {} as T & K;
  let key;
  for (key in defaults) {
    // @ts-ignore
    options[key] = defaults[key];
  }
  for (key in config) {
    if (hasOwn(config, key)) {
      // @ts-ignore
      const value = config[key];
      if (typeof value !== "undefined") {
        // @ts-ignore
        options[key] = value;
      }
    }
  }
  return options;
}

export function parseWidth(width: number | string): number | string {
  if (width !== undefined) {
    width = parseInt(width as string, 10);
    if (isNaN(width)) {
      // @ts-ignore
      width = null;
    }
  }
  return width;
}
// @ts-ignore
export function parseMinWidth(minWidth): number {
  if (typeof minWidth !== "undefined") {
    minWidth = parseWidth(minWidth);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
}

export function parseHeight(height: number | string) {
  if (typeof height === "number") {
    return height;
  }
  if (typeof height === "string") {
    if (/^\d+(?:px)?$/.test(height)) {
      return parseInt(height, 10);
    } else {
      return height;
    }
  }
  return null;
}

// https://github.com/reduxjs/redux/blob/master/src/compose.js
// @ts-ignore
export function compose(...funcs) {
  if (funcs.length === 0) {
    // @ts-ignore
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // @ts-ignore
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export function toggleRowStatus(statusArr: AnyObject[], row: AnyObject, newVal: boolean): boolean {
  let changed = false;
  const index = statusArr.indexOf(row);
  const included = index !== -1;

  const addRow = () => {
    statusArr.push(row);
    changed = true;
  };
  const removeRow = () => {
    statusArr.splice(index, 1);
    changed = true;
  };

  if (typeof newVal === "boolean") {
    if (newVal && !included) {
      addRow();
    } else if (!newVal && included) {
      removeRow();
    }
  } else {
    if (included) {
      removeRow();
    } else {
      addRow();
    }
  }
  return changed;
}
// @ts-ignore
export function walkTreeNode(root, cb, childrenKey = "children", lazyKey = "hasChildren") {
// @ts-ignore
  const isNil = array => !(Array.isArray(array) && array.length);

// @ts-ignore
  function _walker(parent, children, level) {
    cb(parent, children, level);
// @ts-ignore
    children.forEach(item => {
      if (item[lazyKey]) {
        cb(item, null, level + 1);
        return;
      }
      const children = item[childrenKey];
      if (!isNil(children)) {
        _walker(item, children, level + 1);
      }
    });
  }

// @ts-ignore
  root.forEach(item => {
    if (item[lazyKey]) {
      cb(item, null, 0);
      return;
    }
    const children = item[childrenKey];
    if (!isNil(children)) {
      _walker(item, children, 0);
    }
  });
}

// @ts-ignore
export let removePopper;

export function createTablePopper(trigger: HTMLElement, popperContent: string, popperOptions: Partial<any>, tooltipEffect: string) {
  function renderContent(): HTMLDivElement {
    const isLight = tooltipEffect === "light";
    const content = document.createElement("div");
    content.className = `el-popper ${isLight ? "is-light" : "is-dark"}`;
    content.innerHTML = popperContent;
    content.style.zIndex = "9999"/*String(PopupManager.nextZIndex())*/;
    document.body.appendChild(content);
    return content;
  }
  function renderArrow(): HTMLDivElement {
    const arrow = document.createElement("div");
    arrow.className = "el-popper__arrow";
    arrow.style.bottom = "-4px";
    return arrow;
  }
  function showPopper() {
    popperInstance && popperInstance.update();
  }
  removePopper = function removePopper() {
    try {
      popperInstance && popperInstance.destroy();
      content && document.body.removeChild(content);
      off(trigger, "mouseenter", showPopper);
    } catch {}
  };
  off(trigger, "mouseleave", removePopper);
// @ts-ignore
  let popperInstance: any = null;
  const content = renderContent();
  const arrow = renderArrow();
  content.appendChild(arrow);

  popperInstance = createPopper(trigger, content, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      },
      {
        name: "arrow",
        options: {
          element: arrow,
          padding: 10
        }
      }
    ],
    ...popperOptions
  });
  on(trigger, "mouseenter", showPopper);
  on(trigger, "mouseleave", removePopper);
}

/* istanbul ignore next */
const resizeHandler = function(entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    const listeners =
        (entry.target as any).__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach((fn: () => void) => {
        fn()
      })
    }
  }
}
/* istanbul ignore next */
export const addResizeListener = function(
    element: any,
    fn: (...args: unknown[]) => unknown,
): void {
  if (isServer || !element) return
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    element.__ro__ = new ResizeObserver(resizeHandler)
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}

/* istanbul ignore next */
export const removeResizeListener = function(
    element: any,
    fn: (...args: unknown[]) => unknown,
): void {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(
      element.__resizeListeners__.indexOf(fn),
      1,
  )
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect()
  }
}


let scrollBarWidth: number;
export const scrollbarWidth = (): number => {
  if (isServer) return 0
  if (scrollBarWidth !== undefined) return scrollBarWidth

  const outer = document.createElement('div')
  outer.className = 'el-scrollbar__wrap'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  // @ts-ignore
  outer.parentNode.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll

  return scrollBarWidth
}
