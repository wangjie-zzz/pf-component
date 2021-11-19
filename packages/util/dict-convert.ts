import { DictNameEnum, SysDict } from "../services/model/Entity/SysDict";
import { Options } from "../services/model/FormModel";
import { Constants } from "../constants/Constants";
/*
 * TODO dictKey需要转Number()，待后端调整为Integer
 * */
export const useDict = () => {
  const setDict = (data: SysDict[]): void => {
    sessionStorage.setItem(Constants.CACHE_KEY.DICT, JSON.stringify(data));
  };
  const getDict = (): SysDict[] => {
    const dictStr = sessionStorage.getItem(Constants.CACHE_KEY.DICT);
    if (dictStr) {
      const dicts = JSON.parse(dictStr);
      return dicts;
    }
    return [];
  };
  const convertDict = (name: DictNameEnum, code: number): string => {
    if (name) {
      const dicts: SysDict[] =
        getDict()
          .filter(d => d.dictField === name)
          .filter(d1 => Number(d1.dictKey) === code) || [];
      if (dicts.length > 0) return dicts[0].dictValue;
    }
    return String(code);
  };
  const convertAllOptions = (): Options[] => {
    const options: any[] = [];
    getDict().map(d1 => {
      if (options.findIndex(opt => opt.key === d1.dictField) === -1) {
        options.push({
          key: d1.dictField,
          value: d1.dictName
        });
      }
    });
    return options;
  };
  const convertOptions = (dict: DictNameEnum): Options[] => {
    if (!dict) return [];
    return getDict()
      .filter(d => d.dictField === dict)
      .map(d1 => {
        return {
          key: Number(d1.dictKey),
          value: d1.dictValue,
          disabled: false // !isValid(d1.useState) TODO 后端不会返回useState了，全部为有效状态
        };
      });
  };
  return { setDict, getDict, convertDict, convertOptions, convertAllOptions };
};
