/* istanbul ignore next */
// Here I want to use the type CSSStyleDeclaration, but the definition for CSSStyleDeclaration
// has { [index: number]: string } in its type annotation, which does not satisfy the method
// camelize(s: string)
// Same as the return type
import { camelize, isObject } from "@vue/shared";
import { isServer } from "../table/util";

/* istanbul ignore next */
export const off = function(element: HTMLElement | Document | Window, event: string, handler: EventListenerOrEventListenerObject, useCapture = false): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture);
  }
};

/* istanbul ignore next */
export const on = function(element: HTMLElement | Document | Window, event: string, handler: EventListenerOrEventListenerObject, useCapture = false): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};
export const getStyle = function(element: any, styleName: string): string {
  if (isServer) return "";
  if (!element || !styleName) return "";
  styleName = camelize(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }
  try {
    const style = element.style[styleName];
    if (style) return style;
    const computed: any = document.defaultView?.getComputedStyle(element, "");
    return computed ? computed[styleName] : "";
  } catch (e) {
    return element.style[styleName];
  }
};

/* istanbul ignore next */
export function setStyle(element: any, styleName: CSSStyleDeclaration | string, value?: string): void {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    Object.keys(styleName).forEach((prop: any) => {
      setStyle(element, prop, styleName[prop]);
    });
  } else {
    styleName = camelize(styleName);
    element.style[styleName] = value;
  }
}

/* istanbul ignore next */
export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1) throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

/* istanbul ignore next */
export function addClass(el: HTMLElement, cls: string): void {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/* istanbul ignore next */
export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = curClass.trim();
  }
}
