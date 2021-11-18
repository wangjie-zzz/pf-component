import { SysFormField } from "./SysFormField";

export type FormNameEnum = string;
export interface SysFormInfo {
  appId: string;
  formId: string;
  name: string;
  labelPosition: number;
  labelWidth: string;
  disabled: number;
  validateOnRuleChange: number;
  hideRequiredAsterisk: number;
  showMessage: number;
  inlineMessage: number;
  statusIcon: number;
  fieldDtos: SysFormField[];
}
