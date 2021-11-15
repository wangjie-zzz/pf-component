import { clientService } from "@/services/client-service";
import { SysDict } from "@/model/SysDict";
import { systemApi } from "@/constants/api/system-api";
import { Constants } from "@/constants/constants";
import { useNotice } from "@/components/element-plus/notice";
import { DictNameEnum } from "@/constants/enum/dict-name.enum";
import { SysFormInfo } from "@/model/entity/SysFormInfo";
import { FormNameEnum } from "@/constants/enum/form-name.enum";
import { FormFieldModel, FormModel, Options } from "@/model/entity/FormModel";
import { SysFormField } from "@/model/entity/SysFormField";
import { isTrue } from "@/constants/enum/dicts/bool.enum";
import { isNull, isNullAndNotZero } from "@/constants/util/objects-utils";
import { useDict } from "@/constants/util/dict-convert";
import { Ref } from "vue";
import { SysTableField } from "@/model/entity/SysTableField";
import { TableColumnModel, TableModel } from "@/model/entity/TabelModel";
import { SysTableInfo } from "@/model/entity/SysTableInfo";
import { isNormal } from "@/constants/enum/dicts/table-field-type.enum";
import { TableNameEnum } from "@/constants/enum/table-name.enum";

interface FormServiceModel {
  name: FormNameEnum;
  config: Ref<FormModel>;
  info: Ref<any>;
}
interface TableServiceModel {
  name: TableNameEnum;
  config: Ref<TableModel>;
  // info: Ref<any>;
}
class DataService {
  loadForm(forms: FormServiceModel[]): Promise<boolean> {
    if (isNull(forms)) return Promise.resolve(false);
    return clientService
      .general<SysFormInfo[]>(
        systemApi.formConfigApi.cacheList,
        undefined,
        forms.map(form => form.name)
      )
      .then(response => {
        if (response.code === Constants.CODE.SUCCESS) {
          if (!isNull(response.data)) {
            let res = true;
            forms.forEach(form => {
              const sysFormInfo = response.data.find(sysFormInfo => sysFormInfo.name === form.name);
              if (sysFormInfo) {
                form.config.value = this.toFormModel(sysFormInfo);
                form.info.value = this.toFormValue(form.config.value);
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
          useNotice().message.error(response.message);
          return Promise.resolve(false);
        }
      });
  }
  loadDict(fields: DictNameEnum[]): Promise<SysDict[]> {
    return clientService.general<SysDict[]>(systemApi.dictApi.cacheList, undefined, fields).then(response => {
      if (response.code === Constants.CODE.SUCCESS) {
        return Promise.resolve(response.data);
      } else {
        useNotice().message.error(response.message);
        return Promise.resolve([]);
      }
    });
  }
  loadTable(tables: TableServiceModel[]): Promise<boolean> {
    if (isNull(tables)) return Promise.resolve(false);
    return clientService
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
                table.config.value = this.toTableModel(sysTableInfo);
              } else {
                table.config.value = {} as any;
                res = false;
              }
            });
            return Promise.resolve(res);
          }
          return Promise.resolve(false);
        } else {
          useNotice().message.error(response.message);
          return Promise.resolve(false);
        }
      });
  }
  private toFormFieldModel(obj: SysFormField, options?: Options[]): FormFieldModel {
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
  }

  toFormModel(obj: SysFormInfo): FormModel {
    return new FormModel({
      name: obj.name,
      fields: isNull(obj.fieldDtos) ? [] : obj.fieldDtos.map(field => this.toFormFieldModel(field)),
      // rules?: RuleItem[];
      labelPosition: useDict().convertDict(DictNameEnum.LABEL_POSITION, obj.labelPosition),
      labelWidth: obj.labelWidth,
      disabled: isTrue(obj.disabled),
      validateOnRuleChange: isTrue(obj.validateOnRuleChange),
      hideRequiredAsterisk: isTrue(obj.hideRequiredAsterisk),
      showMessage: isTrue(obj.showMessage),
      inlineMessage: isTrue(obj.inlineMessage),
      statusIcon: isTrue(obj.statusIcon)
    });
  }
  toFormValue(form: FormModel, value?: any): any {
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
  }
  private toTableFieldModel(obj: SysTableField): TableColumnModel {
    return new TableColumnModel({
      prop: obj.prop,
      label: obj.label,
      dict: obj.dict,
      type: isNormal(obj.type) ? undefined : useDict().convertDict(DictNameEnum.TABLE_FIELD_TYPE, obj.type),
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
      align: useDict().convertDict(DictNameEnum.TABLE_FIELD_ALIGN, obj.align),
      headerAlign: useDict().convertDict(DictNameEnum.TABLE_FIELD_ALIGN, obj.headerAlign)
    });
  }
  toTableModel(obj: SysTableInfo): TableModel {
    return new TableModel({
      name: obj.name,
      showPage: isTrue(obj.showPage),

      height: obj.height,
      maxHeight: obj.maxHeight,
      stripe: isTrue(obj.stripe),
      border: isTrue(obj.border),
      size: useDict().convertDict(DictNameEnum.UI_SIZE, obj.size),
      fit: isTrue(obj.fit),
      showHeader: isTrue(obj.showHeader),
      highlightCurrentRow: isTrue(obj.highlightCurrentRow),
      rowKey: obj.rowKey,
      emptyText: obj.emptyText,
      showSummary: isTrue(obj.showSummary),
      sumText: obj.sumText,
      selectOnIndeterminate: isTrue(obj.selectOnIndeterminate),
      columns: obj.fieldDtos.map(field => this.toTableFieldModel(field))
    });
  }
}
export const dataService = new DataService();
