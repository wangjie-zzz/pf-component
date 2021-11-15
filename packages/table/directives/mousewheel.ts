/* eslint-disable */
// @ts-ignore
import normalizeWheel from "normalize-wheel";
import { ObjectDirective } from "vue";

const isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

const mousewheel = function(element: any, callback: any) {
  if (element && element.addEventListener) {
    const fn = function(event: any) {
      const normalized = normalizeWheel(event);
      // @ts-ignore
      callback && callback.apply(this, [event, normalized]);
    };
    if (isFirefox) {
      element.addEventListener("DOMMouseScroll", fn);
    } else {
      element.onmousewheel = fn;
    }
  }
};

export const Mousewheel: ObjectDirective = {
  beforeMount(el, binding) {
    mousewheel(el, binding.value);
  }
};
