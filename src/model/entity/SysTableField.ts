import { DictNameEnum } from "@/constants/enum/dict-name.enum";

export interface SysTableField {
  fieldId: string;
  appId: string;
  tableId: string;
  prop: string;
  label: string;
  type: number;
  dict: DictNameEnum;

  reserveSelection: number;
  width: string;
  minWidth: string;
  fixed: number;
  sortable: number;
  sortBy: string;
  columnKey: string;
  sortOrders: string;
  resizable: number;
  showOverflowTooltip: number;
  align: number;
  headerAlign: number;
}
