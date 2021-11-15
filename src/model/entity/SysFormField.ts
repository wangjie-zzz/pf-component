import { DictNameEnum } from "@/constants/enum/dict-name.enum";

export interface SysFormField {
  fieldId: string;
  appId: string;
  formId: string;
  prop: string;
  type: number;
  value: string;
  dict: DictNameEnum;
  clearable: number;
  multiple: number;
  allowCreate: number;
  filterable: number;
  remote: number;
  collapseTags: number;
  showAllLevels: number;

  label: string;
  labelWidth: string;
  spanCol: number;
  disable: number;
  hidden: number;
  placeholder: string;
  required: number;
  showMessage: number;
  inlineMessage: number;
  showPassword: number;

  prefix: string;
  suffix: string;
  prepend: string;
  append: string;
}
