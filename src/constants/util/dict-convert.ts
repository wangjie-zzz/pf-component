import { SysDict } from "@/model/SysDict";
import { Options } from "@/model/entity/FormModel";
import { authService } from "@/services/auth-service";
import { DictNameEnum } from "@/constants/enum/dict-name.enum";
import { isValid } from "@/constants/enum/dicts/use-state.enum";
/*
 * TODO dictKey需要转Number()，待后端调整为Integer
 * */
export function useDict() {
  const convertDict = (name: DictNameEnum, code: number): string => {
    if (name) {
      const dicts: SysDict[] =
        authService
          .getDict()
          .filter(d => d.dictField === name)
          .filter(d1 => Number(d1.dictKey) === code) || [];
      if (dicts.length > 0) return dicts[0].dictValue;
    }
    return String(code);
  };
  const convertAllOptions = (): Options[] => {
    const options: any[] = [];
    authService.getDict().map(d1 => {
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
    return authService
      .getDict()
      .filter(d => d.dictField === dict)
      .map(d1 => {
        return {
          key: Number(d1.dictKey),
          value: d1.dictValue,
          disabled: false // !isValid(d1.useState) TODO 后端不会返回useState了，全部为有效状态
        };
      });
  };
  return { convertDict, convertOptions, convertAllOptions };
}
