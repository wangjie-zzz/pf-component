import { RuleItem } from "async-validator";
import { useDict } from "@/constants/util/dict-convert";
import { DictNameEnum } from "@/constants/enum/dict-name.enum";
import { isNull } from "@/constants/util/objects-utils";

export const FormTypeEnum = {
  INPUT: { code: 1, name: "输入框" },
  NUMBER: { code: 2, name: "数字框" },
  SELECT: { code: 3, name: "下拉选择框" },
  CHECKBOX: { code: 4, name: "多选框" },
  RADIO: { code: 5, name: "单选框" },
  TEXTAREA: { code: 6, name: "文本" },
  DATE: { code: 7, name: "日期" },
  TIME: { code: 8, name: "时间" },
  DATETIME: { code: 9, name: "日期时间" },
  CASCADER: { code: 10, name: "级联选择" }
};
export class FormModel {
  name: string;
  fields: FormFieldModel[];
  // inline: boolean;
  rules: RuleItem[];
  labelPosition: string; /* right/left/top */
  labelWidth: string;
  disabled: boolean; /*禁用表单项 false*/
  validateOnRuleChange: boolean; /*rules属性改变后立即触发一次验证 true*/
  hideRequiredAsterisk: boolean; /*必填项隐藏红色星号 false*/
  showMessage: boolean; /*显示校验错误信息 true*/
  inlineMessage: boolean; /*inline形式显示校验信息 false*/
  statusIcon: boolean; /*在输入框中显示校验结果反馈图标 false*/
  constructor(param: {
    name: string;
    fields?: FormFieldModel[];
    rules?: RuleItem[];
    labelPosition?: string;
    labelWidth?: string;
    disabled?: boolean;
    validateOnRuleChange?: boolean;
    hideRequiredAsterisk?: boolean;
    showMessage?: boolean;
    inlineMessage?: boolean;
    statusIcon?: boolean;
  }) {
    this.name = param.name;
    this.fields = param.fields || [];
    // this.inline = param.inline || false;
    this.rules = param.rules || [];
    this.labelPosition = param.labelPosition || "right";
    this.labelWidth = param.labelWidth || "80px";
    this.disabled = param.disabled || false;
    this.validateOnRuleChange = typeof param.validateOnRuleChange !== "undefined" ? param.validateOnRuleChange : true;
    this.hideRequiredAsterisk = param.hideRequiredAsterisk || false;
    this.showMessage = typeof param.showMessage !== "undefined" ? param.showMessage : true;
    this.inlineMessage = param.inlineMessage || false;
    this.statusIcon = typeof param.statusIcon !== "undefined" ? param.statusIcon : true;
    this.initRules();
  }
  initRules(): void {
    this.fields.forEach((field, idx) => {
      if (field.required) {
        this.setRequired0(field, true);
      }
    });
  }
  /*
   * 设置整体是否编辑状态
   * */
  setFormDisable(disable?: boolean): void {
    this.disabled = isNull(disable) ? true : (disable as boolean);
  }
  /*
   * 设置全部字段是否编辑状态
   * */
  setAllDisable(disable: boolean): void {
    if (this.fields && this.fields.length) {
      this.fields.forEach(f => {
        f.disable = disable;
      });
    }
  }
  /*
   * 设置某字段是否可见
   * */
  setHidden(prop: string, hidden?: boolean): void {
    const f = this.fields.find(f => f.prop === prop);
    if (f) f.hidden = !!hidden;
  }
  /*
   * 获取某字段是否可见
   * */
  getHidden(prop: string): boolean | undefined {
    return this.fields.find(f => f.prop === prop)?.hidden;
  }
  /*
   * 设置某字段是否编辑状态
   * */
  setDisable(prop: string, disable: boolean): void {
    const f = this.fields.find(f => f.prop === prop);
    if (f) f.disable = disable;
  }
  /*
   * 获取某字段是否编辑状态
   * */
  getDisable(prop: string): boolean | undefined {
    return this.fields.find(f => f.prop === prop)?.disable;
  }
  /*
   * 设置某字段下拉选项
   * */
  setOptions(prop: string, options: Options[]): void {
    const f = this.fields.find(f => f.prop === prop);
    if (f) f.options = options;
  }
  /*
   * 获取某字段下拉选项
   * */
  getOptions(prop: string): Options[] | undefined {
    return this.fields.find(f => f.prop === prop)?.options;
  }
  /*
   * 设置某字段校验规则
   * */
  setRule(prop: string, rules: RuleItem[]): void {
    const f = this.fields.find(f => f.prop === prop);
    if (f) f.rules = rules;
  }
  /*
   * 获取某字段校验规则
   * */
  getRule(prop: string): RuleItem[] | undefined {
    return this.fields.find(f => f.prop === prop)?.rules;
  }
  /*
   * 设置某字段必填/非必填
   * */
  setRequired(prop: string, required?: boolean): void {
    const field = this.fields.find(f => f.prop === prop);
    if (field) this.setRequired0(field, !!required);
  }
  setRequired0(field: FormFieldModel, required: boolean): void {
    if (!field.rules) field.rules = [];
    if (required) {
      if (field.rules.findIndex(f => f.required) === -1) {
        if (field.label) field.rules.push({ required: true, message: `${field.label}不能为空` });
        else field.rules.push({ required: true, message: `${field.prop}不能为空` });
      }
    } else {
      const idx = field.rules.findIndex(f => f.required);
      if (idx > -1) {
        field.rules.splice(idx, 1);
      }
    }
  }
}
// TODO 页面挂载前，将null 或 undefined 传入<form>时，会有问题：因为对象新增的属性，是没有响应式的
export const emptyForm = new FormModel({ name: "" });
export interface Options {
  key: string | number;
  value: string;
  children?: Options[];
  leaf?: boolean;
  disabled?: boolean;
}
const { convertOptions } = useDict();
export class FormFieldModel {
  prop: string;
  type: number;
  value?: any;
  dict?: DictNameEnum;
  /*cascader/select 是否可以清空输入值*/
  clearable: boolean;
  /*select 多选*/
  multiple: boolean;
  allowCreate: boolean;
  filterable: boolean;
  remote: boolean;
  // filterMethod?: boolean;
  // remoteMethod?: boolean;
  collapseTags: boolean; /*select 多选时开启折叠tag*/
  showAllLevels: boolean; /*cascader-select 输入框中是否显示选中值的完整路径*/
  label: string;
  labelWidth: string;
  spanCol: number;
  disable: boolean;
  hidden: boolean;
  placeholder?: string;
  options?: Options[];
  required: boolean; /*必填，如不设置，则会根据校验规则自动生成 false*/
  showMessage: boolean; /*显示校验错误信息 true*/
  inlineMessage: boolean; /*inline形式显示校验信息 false*/
  showPassword: boolean;
  prefix?: string; /*头部图标*/
  suffix?: string; /*尾部图标*/
  prepend?: string; /*前缀插槽名称*/
  append?: string; /*后缀插槽名称*/
  rules?: RuleItem[];
  cascaderProp: any;

  constructor(param: {
    prop: string;
    label?: string;
    multiple?: boolean;
    clearable?: boolean;
    filterable?: boolean;
    allowCreate?: boolean;
    remote?: boolean;
    // filterMethod?: boolean;
    // remoteMethod?: boolean;
    collapseTags?: boolean;
    showAllLevels?: boolean;
    placeholder?: string;
    labelWidth?: string;
    spanCol?: number;
    disable?: boolean;
    hidden?: boolean;
    type?: number;
    dict?: DictNameEnum;
    value?: any;
    options?: Options[];
    required: boolean;
    showMessage: boolean;
    inlineMessage: boolean;
    showPassword: boolean;
    prefix?: string;
    suffix?: string;
    prepend?: string;
    append?: string;
    rules?: RuleItem[];
  }) {
    this.prop = param.prop;
    this.label = param.label || "";
    this.labelWidth = param.labelWidth || "80px";
    this.spanCol = param.spanCol || 1;
    this.multiple = param.multiple || false;
    this.clearable = param.clearable || false;
    this.filterable = param.filterable || false;
    this.allowCreate = param.allowCreate || false;
    this.remote = param.remote || false;
    // filterMethod?: boolean;
    // remoteMethod?: boolean;
    this.collapseTags = param.collapseTags || false;
    this.showAllLevels = param.showAllLevels || false;
    this.disable = param.disable || false;
    this.hidden = param.hidden || false;
    this.placeholder = param.placeholder;
    this.type = param.type || FormTypeEnum.INPUT.code;
    this.dict = param.dict;
    this.value = param.value;
    this.options = param.options && param.options.length ? param.options : this.dict ? convertOptions(this.dict) : [];
    this.required = param.required;
    this.showMessage = param.showMessage;
    this.inlineMessage = param.inlineMessage;
    this.showPassword = param.showPassword;
    this.prefix = param.prefix;
    this.suffix = param.suffix;
    this.prepend = param.prepend;
    this.append = param.append;
    this.rules = param.rules;
    if (this.type === FormTypeEnum.CASCADER.code) {
      this.initCascader();
    }
  }
  initCascader() {
    this.cascaderProp = {
      expandTrigger: "hover",
      multiple: this.multiple,
      checkStrictly: true, // 可以选择各级选项 否则只能选择最后一级
      emitPath: false /*是否包含父级节点key组成的数组*/,
      lazy: false,
      // lazyLoad:
      value: "key",
      label: "value",
      children: "children",
      leaf: "leaf",
      disabled: "disabled"
    };
  }
}
