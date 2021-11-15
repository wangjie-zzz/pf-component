import { SysTableField } from "@/model/entity/SysTableField";

export interface SysTableInfo {
  appId: string;
  tableId: string;
  name: string;
  showPage: number;

  height: string;
  maxHeight: string;
  stripe: number;
  border: number;
  size: number;
  fit: number;
  showHeader: number;
  highlightCurrentRow: number;
  rowKey: string;
  emptyText: string;
  showSummary: number;
  sumText: string;
  selectOnIndeterminate: number;
  fieldDtos: SysTableField[];
}
