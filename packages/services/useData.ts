import { Ref } from "vue";
import { FormFieldModel, FormModel, Options } from "./model/FormModel";
import { TableColumnModel, TableModel } from "./model/TabelModel";
import { FormNameEnum, SysFormInfo } from "./model/Entity/SysFormInfo";
import { SysTableInfo, TableNameEnum } from "./model/Entity/SysTableInfo";
import { isNull, isNullAndNotZero } from "../util/objects-utils";
import { systemApi } from "./api/system-api";
import { Constants } from "../constants/Constants";
import { DictNameEnum, SysDict } from "./model/Entity/SysDict";
import { SysFormField } from "./model/Entity/SysFormField";
import { isTrue } from "../constants/enum/dicts/bool.enum";
import { useDict } from "../util/dict-convert";
import { SysTableField } from "./model/Entity/SysTableField";
import { DictNameEnums } from "../constants/enum/dict-name.enum";
import { isNormal } from "../constants/enum/dicts/table-field-type.enum";
import { useHttpClient } from "./useHttpClient";

type FormServiceModel = {
  name: FormNameEnum;
  config: Ref<FormModel>;
  info: Ref<any>;
};
type TableServiceModel = {
  name: TableNameEnum;
  config: Ref<TableModel>;
  // info: Ref<any>;
};
export const useData = () => {
  const loadDict = (fields: DictNameEnum[]): Promise<SysDict[]> => {
    const { general } = useHttpClient();
    return general<SysDict[]>(systemApi.dictApi.cacheList, undefined, fields).then(response => {
      if (response.code === Constants.CODE.SUCCESS) {
        return Promise.resolve(response.data);
      } else {
        return Promise.resolve([]);
      }
    });
  };
  const loadForm = (forms: FormServiceModel[]): Promise<boolean> => {
    const { general } = useHttpClient();
    if (isNull(forms)) return Promise.resolve(false);
    return general<SysFormInfo[]>(
      systemApi.formConfigApi.cacheList,
      undefined,
      forms.map(form => form.name)
    ).then(response => {
      if (response.code === Constants.CODE.SUCCESS) {
        if (!isNull(response.data)) {
          let res = true;
          forms.forEach(form => {
            const sysFormInfo = response.data.find(sysFormInfo => sysFormInfo.name === form.name);
            if (sysFormInfo) {
              form.config.value = toFormModel(sysFormInfo);
              form.info.value = toFormValue(form.config.value);
            } else {
              form.config.value = {} as any;
              form.info.value = {} as any;
              res = false;
            }
          });
          return Promise.resolve(res);
        }
        return Promise.resolve(false);
      } else {
        return Promise.resolve(false);
      }
    });
  };
  const loadTable = (tables: TableServiceModel[]): Promise<boolean> => {
    if (isNull(tables)) return Promise.resolve(false);
    return useHttpClient()
      .general<SysTableInfo[]>(
        systemApi.tableConfigApi.cacheList,
        undefined,
        tables.map(table => table.name)
      )
      .then(response => {
        if (response.code === Constants.CODE.SUCCESS) {
          if (!isNull(response.data)) {
            let res = true;
            tables.forEach(table => {
              const sysTableInfo = response.data.find(sysTableInfo => sysTableInfo.name === table.name);
              if (sysTableInfo) {
                table.config.value = toTableModel(sysTableInfo);
              } else {
                table.config.value = {} as any;
                res = false;
              }
            });
            return Promise.resolve(res);
          }
          return Promise.resolve(false);
        } else {
          return Promise.resolve(false);
        }
      });
  };
  const toFormFieldModel = (obj: SysFormField, options?: Options[]): FormFieldModel => {
    return new FormFieldModel({
      prop: obj.prop,
      label: obj.label,
      multiple: isTrue(obj.multiple),
      clearable: isTrue(obj.clearable),
      filterable: isTrue(obj.filterable),
      allowCreate: isTrue(obj.allowCreate),
      remote: isTrue(obj.remote),
      collapseTags: isTrue(obj.collapseTags),
      showAllLevels: isTrue(obj.showAllLevels),
      placeholder: obj.placeholder,
      labelWidth: obj.labelWidth,
      spanCol: obj.spanCol,
      disable: isTrue(obj.disable),
      hidden: isTrue(obj.hidden),
      type: obj.type,
      dict: obj.dict,
      value: obj.value,
      required: isTrue(obj.required),
      showMessage: isTrue(obj.showMessage),
      inlineMessage: isTrue(obj.inlineMessage),
      showPassword: isTrue(obj.showPassword),
      prefix: obj.prefix,
      suffix: obj.suffix,
      prepend: obj.prepend,
      append: obj.append,
      options: options
    });
  };

  const toFormModel = (obj: SysFormInfo): FormModel => {
    return new FormModel({
      name: obj.name,
      fields: isNull(obj.fieldDtos) ? [] : obj.fieldDtos.map(field => toFormFieldModel(field)),
      // rules?: RuleItem[];
      labelPosition: useDict().convertDict(DictNameEnums.LABEL_POSITION, obj.labelPosition),
      labelWidth: obj.labelWidth,
      disabled: isTrue(obj.disabled),
      validateOnRuleChange: isTrue(obj.validateOnRuleChange),
      hideRequiredAsterisk: isTrue(obj.hideRequiredAsterisk),
      showMessage: isTrue(obj.showMessage),
      inlineMessage: isTrue(obj.inlineMessage),
      statusIcon: isTrue(obj.statusIcon)
    });
  };
  const toFormValue = (form: FormModel, value?: any): any => {
    if (!value) {
      value = {};
    }
    form.fields.forEach(f => {
      if (isNullAndNotZero(value[f.prop])) {
        if (!isNull(f.dict)) {
          value[f.prop] = Number(f.value); // 字典的默认值需要转number，后端存放的是String
        } else {
          value[f.prop] = f.value;
        }
      }
    });
    return value;
  };
  const toTableFieldModel = (obj: SysTableField): TableColumnModel => {
    return new TableColumnModel({
      prop: obj.prop,
      label: obj.label,
      dict: obj.dict,
      type: isNormal(obj.type) ? undefined : useDict().convertDict(DictNameEnums.TABLE_FIELD_TYPE, obj.type),
      reserveSelection: isTrue(obj.reserveSelection),
      columnKey: obj.columnKey,
      width: obj.width,
      minWidth: obj.minWidth,
      fixed: isTrue(obj.fixed),
      sortable: isTrue(obj.sortable),
      sortBy: obj.sortBy,
      // sortOrders: obj.sortOrders, TODO 默认
      resizable: isTrue(obj.resizable),
      showOverflowTooltip: isTrue(obj.showOverflowTooltip),
      align: useDict().convertDict(DictNameEnums.TABLE_FIELD_ALIGN, obj.align),
      headerAlign: useDict().convertDict(DictNameEnums.TABLE_FIELD_ALIGN, obj.headerAlign)
    });
  };
  const toTableModel = (obj: SysTableInfo): TableModel => {
    return new TableModel({
      name: obj.name,
      showPage: isTrue(obj.showPage),

      height: obj.height,
      maxHeight: obj.maxHeight,
      stripe: isTrue(obj.stripe),
      border: isTrue(obj.border),
      size: useDict().convertDict(DictNameEnums.UI_SIZE, obj.size),
      fit: isTrue(obj.fit),
      showHeader: isTrue(obj.showHeader),
      highlightCurrentRow: isTrue(obj.highlightCurrentRow),
      rowKey: obj.rowKey,
      emptyText: obj.emptyText,
      showSummary: isTrue(obj.showSummary),
      sumText: obj.sumText,
      selectOnIndeterminate: isTrue(obj.selectOnIndeterminate),
      columns: obj.fieldDtos.map(field => toTableFieldModel(field))
    });
  };
  return { toTableModel, toFormModel, toFormValue, loadDict, loadForm, loadTable };
};
