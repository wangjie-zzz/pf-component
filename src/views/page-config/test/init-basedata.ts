// import { clientService } from "@/services/client-service";
// import { systemApi } from "@/constants/api/system-api";
// import { Constants } from "@/constants/constants";
// import { FormFieldModel, FormModel } from "@/model/entity/FormModel";
// import { DictNameEnum } from "@/constants/enum/dict-name.enum";
// import { SysDict } from "@/model/SysDict";
// import { authService } from "@/services/auth-service";
// import { TableColumnModel, TableModel } from "@/model/entity/TabelModel";
// import { SysTableInfo } from "@/model/entity/SysTableInfo";
// import { SysTableField } from "@/model/entity/SysTableField";
// import { SysFormInfo } from "@/model/entity/SysFormInfo";
// import { SysFormField } from "@/model/entity/SysFormField";
// import { isNull } from "@/constants/util/objects-utils";
// import { sysDict, sysFormField, sysForm, tenantInfo, sysDept, sysUser, sysRole, sysPost, tableField, sysTable, sysTableField } from "@/constants/data/table-data";
//
// const formDatas: FormModel[] = [
//   // testForm(), tenantForm()
//   // sysFormForm(),
//   // sysFieldForm(),
//   // sysDictForm(),
//   // companyForm(),
//   // deptForm(),
//   // sysUserForm(),
//   // sysRoleForm(),
//   // sysPostForm()
// ];
// const tableDatas: TableModel[] = [
//   // sysDict()
//   // sysFormField()
//   // sysForm()
//   // tenantInfo()
//   // sysDept(),
//   sysUser(),
//   sysRole(),
//   sysPost(),
//   tableField(),
//   sysTable(),
//   sysTableField()
// ];
// const convertDictName = (name: DictNameEnum, dictVal: string): number => {
//   if (name) {
//     const dicts: SysDict[] =
//       authService
//         .getDict()
//         .filter(d => d.dictField === name)
//         .filter(d1 => d1.dictValue === dictVal) || [];
//     if (dicts.length > 0) return dicts[0].dictKey;
//   }
//   throw new Error();
// };
// const transferForm = (form: FormModel): SysFormInfo => {
//   return {
//     appId: Constants.DEFAULT_APP_ID,
//     name: form.name,
//     labelPosition: convertDictName(DictNameEnum.LABEL_POSITION, form.labelPosition),
//     labelWidth: form.labelWidth,
//     disabled: form.disabled ? 1 : 0,
//     validateOnRuleChange: form.validateOnRuleChange ? 1 : 0,
//     hideRequiredAsterisk: form.hideRequiredAsterisk ? 1 : 0,
//     showMessage: form.showMessage ? 1 : 0,
//     inlineMessage: form.inlineMessage ? 1 : 0,
//     statusIcon: form.statusIcon ? 1 : 0,
//     /*------------------------*/
//     formId: undefined as any,
//     fieldDtos: []
//   };
// };
// const transferFields = (fields: FormFieldModel[], formId: any): SysFormField[] => {
//   return fields.map(field => {
//     return {
//       appId: Constants.DEFAULT_APP_ID,
//       formId: formId,
//       prop: field.prop,
//       type: field.type,
//       value: typeof field.value === "object" ? "" : field.value || "", // TODO 不能返回object
//       dict: field.dict || ("" as DictNameEnum),
//       // /*cascader/select 是否可以清空输入值*/
//       clearable: field.clearable ? 1 : 0,
//       // /*select 多选*/
//       multiple: field.multiple ? 1 : 0,
//       allowCreate: field.allowCreate ? 1 : 0,
//       filterable: field.filterable ? 1 : 0,
//       remote: field.remote ? 1 : 0,
//       // // filterMethod?: boolean;
//       // // remoteMethod?: boolean;
//       collapseTags: field.collapseTags ? 1 : 0 /*select 多选时开启折叠tag*/,
//       showAllLevels: field.showAllLevels ? 1 : 0 /*cascader-select 输入框中是否显示选中值的完整路径*/,
//       label: field.label,
//       labelWidth: field.labelWidth,
//       spanCol: field.spanCol,
//       disable: field.disable ? 1 : 0,
//       hidden: field.hidden ? 1 : 0,
//       placeholder: field.placeholder || "",
//       // options?: Options[];
//       required: field.required ? 1 : 0 /*必填，如不设置，则会根据校验规则自动生成 false*/,
//       showMessage: field.showMessage ? 1 : 0 /*显示校验错误信息 true*/,
//       inlineMessage: field.inlineMessage ? 1 : 0 /*inline形式显示校验信息 false*/,
//       showPassword: field.showPassword ? 1 : 0,
//       prefix: field.prefix || "" /*头部图标*/,
//       suffix: field.suffix || "" /*尾部图标*/,
//       prepend: field.prepend || "" /*前缀插槽名称*/,
//       append: field.append || "" /*后缀插槽名称*/,
//       // rules?: RuleItem[];
//       // cascaderProp: any;
//       /*--------------------------------*/
//       fieldId: undefined as any
//     };
//   });
// };
// const transferTable = (table: TableModel): SysTableInfo => {
//   return {
//     appId: Constants.DEFAULT_APP_ID,
//     name: table.name,
//     tableId: "",
//     showPage: table.showPage ? 1 : 0,
//
//     height: table.height || "",
//     maxHeight: table.maxHeight || "",
//     stripe: table.stripe ? 1 : 0,
//     border: table.border ? 1 : 0,
//     size: convertDictName(DictNameEnum.UI_SIZE, table.size || "medium"),
//     fit: table.fit ? 1 : 0,
//     showHeader: table.showHeader ? 1 : 0,
//     highlightCurrentRow: table.highlightCurrentRow ? 1 : 0,
//     rowKey: table.rowKey || "",
//     emptyText: table.emptyText || "--",
//     showSummary: table.showSummary ? 1 : 0,
//     sumText: table.sumText || "合计",
//     selectOnIndeterminate: table.selectOnIndeterminate ? 1 : 0,
//     fieldDtos: []
//   };
// };
// const transferTableFields = (fields: TableColumnModel[], tableId: any): SysTableField[] => {
//   return fields.map(field => {
//     return {
//       appId: Constants.DEFAULT_APP_ID,
//       fieldId: undefined as any,
//       tableId: tableId,
//       prop: field.prop,
//       label: field.label,
//       type: field.type ? convertDictName(DictNameEnum.TABLE_FIELD_TYPE, field.type) : 3,
//       dict: field.dict || ("" as DictNameEnum),
//       reserveSelection: field.reserveSelection ? 1 : 0,
//       width: field.width || "",
//       minWidth: field.minWidth || "",
//       fixed: isNull(field.fixed) ? 1 : 0,
//       sortable: field.sortable ? 1 : 0,
//       sortBy: typeof field.sortBy === "string" ? field.sortBy : "",
//       columnKey: field.columnKey || "",
//       sortOrders: field.sortOrders?.join(",") || "",
//       resizable: field.resizable ? 1 : 0,
//       showOverflowTooltip: field.showOverflowTooltip ? 1 : 0,
//       align: convertDictName(DictNameEnum.TABLE_FIELD_ALIGN, field.align || "center"),
//       headerAlign: convertDictName(DictNameEnum.TABLE_FIELD_ALIGN, field.headerAlign || "center")
//     };
//   });
// };
// export const init = () => {
//   /*formDatas.forEach((form, idx) => {
//     if (idx === 0) {
//       clientService.general(systemApi.formConfigApi.createForm, undefined, transferForm(form)).then(res => {
//         console.log(res);
//         if (res.code === Constants.CODE.SUCCESS) {
//           clientService.general(systemApi.formConfigApi.createFormField, undefined, transferFields(form.fields, res.data)).then(res => {
//             console.log(res);
//           });
//         }
//       });
//     }
//   });*/
//   tableDatas.forEach((table, idx) => {
//     // eslint-disable-next-line no-constant-condition
//     if (/*idx === 0*/ true) {
//       clientService.general(systemApi.tableConfigApi.create, undefined, transferTable(table)).then(res => {
//         console.log(res);
//         if (res.code === Constants.CODE.SUCCESS) {
//           clientService.general(systemApi.tableConfigApi.createField, undefined, transferTableFields(table.columns, res.data)).then(res => {
//             console.log(res);
//             if (res.code === Constants.CODE.SUCCESS) {
//               // console.log();
//             } else {
//               console.log("field插入失败：" + res.data);
//               // 不能return,会中止table插入的
//               // return;
//             }
//           });
//         } else {
//           console.log("table插入错误中止：" + table);
//           return;
//         }
//       });
//     }
//   });
// };
