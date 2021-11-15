import { SysFormField } from "@/model/entity/SysFormField";

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
