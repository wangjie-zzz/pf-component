import { DictNameEnum } from "@/constants/enum/dict-name.enum";

export interface SysDict {
  dictId: string;
  appId: string;
  dictField: DictNameEnum;
  dictName: string;
  dictKey: number;
  dictValue: string;
  dictSortNo: number;
  useState: number;
}
