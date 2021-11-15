// import { TableColumnModel, TableModel } from "@/model/entity/TabelModel";
// import { DictNameEnum } from "@/constants/enum/dict-name.enum";
//
// const sysDict = (): TableModel => {
//   return new TableModel({
//     name: "sysDict",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "dictId",
//         label: "字典编号"
//       }),
//       new TableColumnModel({
//         prop: "appId",
//         label: "应用id"
//       }),
//       new TableColumnModel({
//         prop: "dictField",
//         label: "字典Key"
//       }),
//       new TableColumnModel({
//         prop: "dictName",
//         label: "字典名称"
//       }),
//       new TableColumnModel({
//         prop: "dictKey",
//         label: "字典项Key"
//       }),
//       new TableColumnModel({
//         prop: "dictValue",
//         label: "字典项Value"
//       }),
//       new TableColumnModel({
//         prop: "dictSortNo",
//         label: "显示顺序"
//       }),
//       new TableColumnModel({
//         prop: "useState",
//         label: "使用状态",
//         dict: DictNameEnum.USE_STATE
//       })
//     ]
//   });
// };
// const tableField = (): TableModel => {
//   return new TableModel({
//     name: "tableField",
//     showPage: false,
//     columns: [
//       new TableColumnModel({
//         prop: "tableSchema",
//         label: "数据源名"
//       }),
//       new TableColumnModel({
//         prop: "tableName",
//         label: "数据表名"
//       }),
//       new TableColumnModel({
//         prop: "isNullable",
//         label: "是否为null"
//       }),
//       new TableColumnModel({
//         prop: "dataType",
//         label: "数据类型"
//       }),
//       new TableColumnModel({
//         prop: "columnName",
//         label: "字段名"
//       }),
//       new TableColumnModel({
//         prop: "columnKey",
//         label: "主键"
//       }),
//       new TableColumnModel({
//         prop: "columnDefault",
//         label: "默认值"
//       }),
//       new TableColumnModel({
//         prop: "columnType",
//         label: "字段类型"
//       }),
//       new TableColumnModel({
//         prop: "columnComment",
//         label: "字段注释"
//       })
//     ]
//   });
// };
// const sysTable = (): TableModel => {
//   return new TableModel({
//     name: "sysTable",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "appId",
//         label: "应用id"
//       }),
//       new TableColumnModel({
//         prop: "name",
//         label: "名称"
//       }),
//       new TableColumnModel({
//         prop: "showPage",
//         label: "是否展示分页",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "height",
//         label: "高度"
//       }),
//       new TableColumnModel({
//         prop: "maxHeight",
//         label: "最大高度"
//       }),
//       new TableColumnModel({
//         prop: "stripe",
//         label: "是否有斑马线",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "border",
//         label: "是否有边框",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "size",
//         label: "表格尺寸"
//       }),
//       new TableColumnModel({
//         prop: "fit",
//         label: "是否自适应宽度",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "showHeader",
//         label: "是否展示表头",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "showSummary",
//         label: "是否展示合计",
//         dict: DictNameEnum.BOOLEAN
//       })
//     ]
//   });
// };
// const sysTableField = (): TableModel => {
//   return new TableModel({
//     name: "sysTableField",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "appId",
//         label: "应用id"
//       }),
//       new TableColumnModel({
//         prop: "prop",
//         label: "列属性"
//       }),
//       new TableColumnModel({
//         prop: "label",
//         label: "列名"
//       }),
//       new TableColumnModel({
//         prop: "type",
//         label: "列类型",
//         dict: DictNameEnum.TABLE_FIELD_TYPE
//       }),
//       new TableColumnModel({
//         prop: "dict",
//         label: "关联字典"
//       }),
//       new TableColumnModel({
//         prop: "reserveSelection",
//         label: "刷新时保留选中的历史数据",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "width",
//         label: "宽度"
//       }),
//       new TableColumnModel({
//         prop: "minWidth",
//         label: "最小宽度"
//       }),
//       new TableColumnModel({
//         prop: "fixed",
//         label: "是否固定左侧", // TODO 可设置right固定右侧
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "sortable",
//         label: "是否可排序",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "sortBy",
//         label: "关联排序字段"
//       }),
//       new TableColumnModel({
//         prop: "sortOrders",
//         label: "排序项"
//       }),
//       new TableColumnModel({
//         prop: "columnKey",
//         label: "filterChange事件key"
//       }),
//       new TableColumnModel({
//         prop: "resizable",
//         label: "是否动态改变宽度",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "showOverflowTooltip",
//         label: "宽度超出时展示tooltip",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "align",
//         label: "定位",
//         dict: DictNameEnum.TABLE_FIELD_ALIGN
//       }),
//       new TableColumnModel({
//         prop: "headerAlign",
//         label: "表头定位",
//         dict: DictNameEnum.TABLE_FIELD_ALIGN
//       })
//     ]
//   });
// };
// const sysForm = (): TableModel => {
//   return new TableModel({
//     name: "sysForm",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "appId",
//         label: "应用id"
//       }),
//       new TableColumnModel({
//         prop: "name",
//         label: "表单名称"
//       }),
//       new TableColumnModel({
//         prop: "labelPosition",
//         label: "标题定位",
//         dict: DictNameEnum.LABEL_POSITION
//       }),
//       new TableColumnModel({
//         prop: "labelWidth",
//         label: "标题宽度"
//       }),
//       new TableColumnModel({
//         prop: "disabled",
//         label: "是否禁用",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "validateOnRuleChange",
//         label: "是否校验规则改变后立即触发校验",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "hideRequiredAsterisk",
//         label: "是否必填项隐藏红色*",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "showMessage",
//         label: "是否显示校验错误信息",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "inlineMessage",
//         label: "是否inline形式显示校验错误信息",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "statusIcon",
//         label: "是否显示校验结果提示图标",
//         dict: DictNameEnum.BOOLEAN
//       })
//     ]
//   });
// };
// const sysFormField = (): TableModel => {
//   return new TableModel({
//     name: "sysFormField",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "appId",
//         label: "应用id"
//       }),
//       new TableColumnModel({
//         prop: "prop",
//         label: "名称"
//       }),
//       new TableColumnModel({
//         prop: "label",
//         label: "标题"
//       }),
//       new TableColumnModel({
//         prop: "type",
//         label: "类型",
//         dict: DictNameEnum.FORM_FIELD_TYPE
//       }),
//       new TableColumnModel({
//         prop: "disable",
//         label: "是否禁用",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "hidden",
//         label: "是否隐藏",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "labelWidth",
//         label: "标题宽度"
//       }),
//       new TableColumnModel({
//         prop: "spanCol",
//         label: "占有行数"
//       }),
//       new TableColumnModel({
//         prop: "placeholder",
//         label: "placeholder"
//       }),
//       new TableColumnModel({
//         prop: "required",
//         label: "是否必填",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "showMessage",
//         label: "是否显示校验错误信息",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "inlineMessage",
//         label: "是否inline形式显示校验错误信息",
//         dict: DictNameEnum.BOOLEAN
//       }),
//       new TableColumnModel({
//         prop: "prefix",
//         label: "前置图标"
//       }),
//       new TableColumnModel({
//         prop: "suffix",
//         label: "后置图标"
//       }),
//       new TableColumnModel({
//         prop: "prepend",
//         label: "前置插槽"
//       }),
//       new TableColumnModel({
//         prop: "append",
//         label: "后置插槽"
//       })
//     ]
//   });
// };
// const tenantInfo = (): TableModel => {
//   return new TableModel({
//     name: "tenantInfo",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "tenId",
//         label: "租户编号"
//       }),
//       new TableColumnModel({
//         prop: "tenName",
//         label: "租户名称"
//       }),
//       new TableColumnModel({
//         prop: "tenUseState",
//         label: "使用状态",
//         dict: DictNameEnum.USE_STATE
//       }),
//       new TableColumnModel({
//         prop: "tenIntDate",
//         label: "创建时间"
//       }),
//       new TableColumnModel({
//         prop: "tenUpdDate",
//         label: "最后修改时间"
//       })
//     ]
//   });
// };
// const sysDept = (): TableModel => {
//   return new TableModel({
//     name: "sysDept",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "deptId",
//         label: "部门编号"
//       }),
//       new TableColumnModel({
//         prop: "deptName",
//         label: "部门名称"
//       }),
//       new TableColumnModel({
//         prop: "deptUseState",
//         label: "使用状态",
//         dict: DictNameEnum.USE_STATE
//       }),
//       new TableColumnModel({
//         prop: "deptIntDate",
//         label: "创建时间"
//       }),
//       new TableColumnModel({
//         prop: "deptUpdDate",
//         label: "最后修改时间"
//       })
//     ]
//   });
// };
// const sysUser = (): TableModel => {
//   return new TableModel({
//     name: "sysUser",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "userId",
//         label: "用户编号"
//       }),
//       new TableColumnModel({
//         prop: "userCode",
//         label: "用户账号"
//       }),
//       new TableColumnModel({
//         prop: "userPhone",
//         label: "手机号"
//       }),
//       new TableColumnModel({
//         prop: "userName",
//         label: "用户名"
//       }),
//       new TableColumnModel({
//         prop: "userCardId",
//         label: "证件号码"
//       }),
//       new TableColumnModel({
//         prop: "userUseState",
//         label: "使用状态",
//         dict: DictNameEnum.USE_STATE
//       }),
//       new TableColumnModel({
//         prop: "userIntDate",
//         label: "创建时间"
//       }),
//       new TableColumnModel({
//         prop: "userUpdDate",
//         label: "最后修改时间"
//       })
//     ]
//   });
// };
//
// const sysRole = (): TableModel => {
//   return new TableModel({
//     name: "sysRole",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "roleId",
//         label: "角色编号"
//       }),
//       new TableColumnModel({
//         prop: "roleName",
//         label: "角色名称"
//       }),
//       new TableColumnModel({
//         prop: "roleType",
//         label: "角色类型",
//         dict: DictNameEnum.ROLE_REL_TYPE
//       }),
//       new TableColumnModel({
//         prop: "roleTenId",
//         label: "所属租户"
//       }),
//       new TableColumnModel({
//         prop: "roleUseState",
//         label: "使用状态",
//         dict: DictNameEnum.USE_STATE
//       }),
//       new TableColumnModel({
//         prop: "roleIntDate",
//         label: "创建时间"
//       }),
//       new TableColumnModel({
//         prop: "roleUpdDate",
//         label: "最后修改时间"
//       })
//     ]
//   });
// };
//
// const sysPost = (): TableModel => {
//   return new TableModel({
//     name: "sysPost",
//     showPage: true,
//     columns: [
//       new TableColumnModel({
//         prop: "postId",
//         label: "岗位编号"
//       }),
//       new TableColumnModel({
//         prop: "postName",
//         label: "岗位名称"
//       }),
//       new TableColumnModel({
//         prop: "postType",
//         label: "岗位类型"
//       }),
//       new TableColumnModel({
//         prop: "postTenId",
//         label: "所属租户"
//       }),
//       new TableColumnModel({
//         prop: "postUseState",
//         label: "使用状态",
//         dict: DictNameEnum.USE_STATE
//       }),
//       new TableColumnModel({
//         prop: "postIntDate",
//         label: "创建时间"
//       }),
//       new TableColumnModel({
//         prop: "postUpdDate",
//         label: "最后修改时间"
//       })
//     ]
//   });
// };
//
// export { sysFormField, sysForm, tenantInfo, sysDept, sysUser, sysRole, sysPost, sysTable, sysTableField };
