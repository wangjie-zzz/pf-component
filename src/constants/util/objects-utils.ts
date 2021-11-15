const isNull = (obj: any): boolean => {
  if (typeof obj === "undefined") {
    return true;
  } else if (typeof obj === "object") {
    if (obj == null || obj.length == 0) {
      return true;
    }
  } else if (typeof obj === "string" && obj == "") {
    return true;
  } else if (typeof obj === "number" && obj == 0) {
    return true;
  }
  return false;
};
const isNullAndNotZero = (obj: any): boolean => {
  return isNull(obj) && obj !== 0;
};
const copy = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
const stringify = (obj: any): string => {
  if (isNull(obj)) return "";
  return JSON.stringify(obj);
};
const parse = <T>(obj: string): T | undefined => {
  if (isNull(obj)) return undefined;
  return JSON.parse(JSON.stringify(obj));
};

export { isNull, copy, stringify, parse, isNullAndNotZero };
