// import { FormFieldModel, FormModel, FormTypeEnum } from "@/model/entity/FormModel";
// import { UseStateEnum } from "@/constants/enum/use-state.enum";
// import { DictNameEnum } from "@/constants/enum/dict-name.enum";
// import { Constants } from "@/constants/constants";
//
// const toFormValue = (form: FormModel, value?: any) => {
//   if (!value) {
//     value = {};
//   }
//   form.fields.forEach(f => {
//     if (!value[f.prop] && value[f.prop] !== 0) value[f.prop] = f.value;
//   });
//   return value;
// };
// const testForm = (): FormModel => {
//   return new FormModel({
//     name: "testForm",
//     fields: [
//       new FormFieldModel({
//         prop: "name",
//         label: "姓名",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "sex",
//         label: "性别",
//         type: FormTypeEnum.RADIO.code,
//         required: true,
//         options: [
//           { key: "1", value: "男" },
//           { key: "0", value: "女" }
//         ],
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "age",
//         label: "年龄",
//         type: FormTypeEnum.NUMBER.code,
//         value: 0,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "class",
//         label: "班级",
//         type: FormTypeEnum.SELECT.code,
//         options: [
//           { key: "1", value: "A班" },
//           { key: "0", value: "B班" }
//         ],
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "subject",
//         label: "选修课程",
//         multiple: true,
//         filterable: true,
//         clearable: true,
//         allowCreate: true,
//         remote: true,
//         type: FormTypeEnum.SELECT.code,
//         options: [
//           { key: "1", value: "C" },
//           { key: "2", value: "C++" },
//           { key: "3", value: "C#" },
//           { key: "4", value: "Java" },
//           { key: "5", value: "Python" }
//         ],
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "address",
//         label: "籍贯",
//         clearable: true,
//         type: FormTypeEnum.CASCADER.code,
//         options: [
//           {
//             key: "0",
//             value: "北京",
//             children: [
//               { key: "0-1", value: "东城区", leaf: true },
//               { key: "0-2", value: "西城区", leaf: true },
//               { key: "0-3", value: "海淀区", leaf: true }
//             ]
//           },
//           {
//             key: "1",
//             value: "山东",
//             children: [
//               { key: "1-1", value: "青岛", leaf: true },
//               { key: "1-2", value: "济南", leaf: true },
//               { key: "1-3", value: "泰安", leaf: true }
//             ]
//           }
//         ],
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "hobby",
//         label: "爱好",
//         type: FormTypeEnum.CHECKBOX.code,
//         options: [
//           { key: "1", value: "男" },
//           { key: "0", value: "女" },
//           { key: "2", value: "中" }
//         ],
//         value: [],
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "remark",
//         label: "备注",
//         type: FormTypeEnum.TEXTAREA.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "birthday",
//         label: "生日",
//         type: FormTypeEnum.DATE.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "birthdayTime",
//         label: "生日时间",
//         type: FormTypeEnum.TIME.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "joinTime",
//         label: "入学时间",
//         type: FormTypeEnum.DATETIME.code,
//         required: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
//
// const sysFormForm = (): FormModel => {
//   return new FormModel({
//     name: "sysFormForm",
//     fields: [
//       new FormFieldModel({
//         prop: "appId",
//         label: "所属应用",
//         type: FormTypeEnum.INPUT.code,
//         value: Constants.DEFAULT_APP_ID,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "name",
//         label: "表单名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "labelPosition",
//         label: "label定位",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.LABEL_POSITION,
//         value: 0,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "labelWidth",
//         label: "label宽度",
//         type: FormTypeEnum.INPUT.code,
//         value: "80px",
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "disabled",
//         label: "是否禁用",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         value: 0,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "validateOnRuleChange",
//         label: "是否rule变更后立即触发校验",
//         type: FormTypeEnum.SELECT.code,
//         value: 1,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "hideRequiredAsterisk",
//         label: "是否必填项隐藏红色*",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         value: 0,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "showMessage",
//         label: "是否显示校验错误信息",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         value: 1,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "inlineMessage",
//         label: "是否inline形式显示校验错误信息",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         value: 0,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "statusIcon",
//         label: "是否显示校验结果图标",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         value: 1,
//         required: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
// const sysFieldForm = (): FormModel => {
//   return new FormModel({
//     name: "sysFieldForm",
//     fields: [
//       new FormFieldModel({
//         prop: "appId",
//         label: "所属应用",
//         type: FormTypeEnum.INPUT.code,
//         value: Constants.DEFAULT_APP_ID,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "prop",
//         label: "名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "label",
//         label: "标题",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "labelWidth",
//         label: "标题宽度",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         value: "80px",
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "spanCol",
//         label: "占有列数",
//         type: FormTypeEnum.NUMBER.code,
//         required: true,
//         value: 1,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "disable",
//         label: "是否禁用",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 0,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "hidden",
//         label: "是否隐藏",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 0,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "placeholder",
//         label: "placeholder",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "required",
//         label: "是否必填",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 1,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "prefix",
//         label: "前置图标",
//         type: FormTypeEnum.INPUT.code,
//         // required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "suffix",
//         label: "后置图标",
//         type: FormTypeEnum.INPUT.code,
//         // required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "prepend",
//         label: "前置插槽",
//         type: FormTypeEnum.INPUT.code,
//         // required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "append",
//         label: "后置插槽",
//         type: FormTypeEnum.INPUT.code,
//         // required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "showMessage",
//         label: "是否展示错误提示",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 1,
//         rules: []
//       }),
//       /*showMessage*/
//       new FormFieldModel({
//         prop: "inlineMessage",
//         label: "是否inline形式展示错误提示",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 0,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "type",
//         label: "类型",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.FORM_FIELD_TYPE,
//         required: true,
//         value: FormTypeEnum.INPUT.code,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "value",
//         label: "默认值",
//         type: FormTypeEnum.INPUT.code,
//         // required: true,
//         rules: []
//       }),
//
//       /* INPUT */
//       new FormFieldModel({
//         prop: "showPassword",
//         label: "是否隐藏密码",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 0,
//         rules: []
//       }),
//       /* SELECT */
//       new FormFieldModel({
//         prop: "dict",
//         label: "关联字典",
//         type: FormTypeEnum.SELECT.code,
//         required: true,
//         // TODO
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "clearable",
//         label: "是否可清空",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 1,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "multiple",
//         label: "是否可多选",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 0,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "allowCreate",
//         label: "是否可新增",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 0,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "filterable",
//         label: "是否可筛选",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         required: true,
//         value: 1,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "remote",
//         label: "是否远程获取地址",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         value: 0,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "collapseTags",
//         label: "是否多选时开启折叠tags",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         value: 0,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "showAllLevels",
//         label: "是否级联选择时显示完整路径",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.BOOLEAN,
//         value: 0,
//         required: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
// const sysDictForm = (): FormModel => {
//   return new FormModel({
//     name: "sysDictForm",
//     fields: [
//       new FormFieldModel({
//         prop: "appId",
//         label: "所属应用",
//         type: FormTypeEnum.INPUT.code,
//         value: Constants.DEFAULT_APP_ID,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "dictField",
//         label: "字典Key",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "dictName",
//         label: "字典名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "dictKey",
//         label: "字典项Key",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "dictValue",
//         label: "字典项名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "dictSortNo",
//         label: "显示顺序",
//         type: FormTypeEnum.NUMBER.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "useState",
//         label: "使用状态",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.USE_STATE,
//         value: UseStateEnum.VAILD,
//         required: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
// const tenantForm = (): FormModel => {
//   return new FormModel({
//     name: "tenantForm",
//     fields: [
//       new FormFieldModel({
//         prop: "tenName",
//         label: "租户名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "tenUseState",
//         label: "使用状态",
//         type: FormTypeEnum.SELECT.code,
//         dict: DictNameEnum.USE_STATE,
//         value: UseStateEnum.VAILD,
//         required: true,
//         rules: []
//       })
//     ],
//     rules: []
//   });
// };
// const companyForm = (): FormModel => {
//   return new FormModel({
//     name: "companyForm",
//     fields: [
//       new FormFieldModel({
//         prop: "comName",
//         label: "公司名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "comTenId",
//         label: "所属租户",
//         type: FormTypeEnum.SELECT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "comSupComId",
//         label: "上级公司名称",
//         type: FormTypeEnum.CASCADER.code,
//         // required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "comTelMan",
//         label: "公司联系人",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "comOrgPhone",
//         label: "公司电话",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "comAddresss",
//         label: "公司地址",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
// const deptForm = (): FormModel => {
//   return new FormModel({
//     name: "deptForm",
//     fields: [
//       new FormFieldModel({
//         prop: "deptName",
//         label: "部门名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "deptTenId",
//         label: "所属租户",
//         type: FormTypeEnum.SELECT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "deptComId",
//         label: "所属公司",
//         type: FormTypeEnum.CASCADER.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "deptSupDeptId",
//         label: "上级部门名称",
//         type: FormTypeEnum.CASCADER.code,
//         // required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "deptManager",
//         label: "部门管理员",
//         type: FormTypeEnum.SELECT.code,
//         required: true,
//         hidden: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
// const sysUserForm = (): FormModel => {
//   return new FormModel({
//     name: "sysUserForm",
//     fields: [
//       new FormFieldModel({
//         prop: "userName",
//         label: "用户名",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "userTenId",
//         label: "所属租户",
//         type: FormTypeEnum.SELECT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "userComId",
//         label: "所属公司",
//         type: FormTypeEnum.CASCADER.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "userDeptId",
//         label: "所属部门",
//         type: FormTypeEnum.CASCADER.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "userPhone",
//         label: "手机号",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       }),
//       new FormFieldModel({
//         prop: "userCardId",
//         label: "证件号码",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
// const sysRoleForm = (): FormModel => {
//   return new FormModel({
//     name: "sysRoleForm",
//     fields: [
//       new FormFieldModel({
//         prop: "roleName",
//         label: "角色名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
// const sysPostForm = (): FormModel => {
//   return new FormModel({
//     name: "sysPostForm",
//     fields: [
//       new FormFieldModel({
//         prop: "postName",
//         label: "岗位名称",
//         type: FormTypeEnum.INPUT.code,
//         required: true,
//         rules: []
//       })
//     ],
//     labelWidth: "120px",
//     rules: []
//   });
// };
