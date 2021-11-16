import { FormFieldModel, FormModel, FormTypeEnum } from "../components/model/FormModel";
import { isNull, isNullAndNotZero } from "@/components/util/objects-utils";

export const toFormValue = (form: FormModel, value?: any): any => {
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
export const testForm = (): FormModel => {
  return new FormModel({
    name: "testForm",
    fields: [
      new FormFieldModel({
        prop: "name",
        label: "姓名",
        type: FormTypeEnum.INPUT.code,
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      }),
      new FormFieldModel({
        prop: "sex",
        label: "性别",
        type: FormTypeEnum.RADIO.code,
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        options: [
          { key: "1", value: "男" },
          { key: "0", value: "女" }
        ],
        rules: []
      }),
      new FormFieldModel({
        prop: "age",
        label: "年龄",
        type: FormTypeEnum.NUMBER.code,
        value: 0,
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      }),
      new FormFieldModel({
        prop: "class",
        label: "班级",
        type: FormTypeEnum.SELECT.code,
        options: [
          { key: "1", value: "A班" },
          { key: "0", value: "B班" }
        ],
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      }),
      new FormFieldModel({
        prop: "subject",
        label: "选修课程",
        multiple: true,
        filterable: true,
        clearable: true,
        allowCreate: true,
        remote: true,
        type: FormTypeEnum.SELECT.code,
        options: [
          { key: "1", value: "C" },
          { key: "2", value: "C++" },
          { key: "3", value: "C#" },
          { key: "4", value: "Java" },
          { key: "5", value: "Python" }
        ],
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      }),
      new FormFieldModel({
        prop: "address",
        label: "籍贯",
        clearable: true,
        type: FormTypeEnum.CASCADER.code,
        options: [
          {
            key: "0",
            value: "北京",
            children: [
              { key: "0-1", value: "东城区", leaf: true },
              { key: "0-2", value: "西城区", leaf: true },
              { key: "0-3", value: "海淀区", leaf: true }
            ]
          },
          {
            key: "1",
            value: "山东",
            children: [
              { key: "1-1", value: "青岛", leaf: true },
              { key: "1-2", value: "济南", leaf: true },
              { key: "1-3", value: "泰安", leaf: true }
            ]
          }
        ],
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      }),
      new FormFieldModel({
        prop: "hobby",
        label: "爱好",
        type: FormTypeEnum.CHECKBOX.code,
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        options: [
          { key: "1", value: "男" },
          { key: "0", value: "女" },
          { key: "2", value: "中" }
        ],
        value: "",
        rules: []
      }),
      new FormFieldModel({
        prop: "remark",
        label: "备注",
        type: FormTypeEnum.TEXTAREA.code,
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      }),
      new FormFieldModel({
        prop: "birthday",
        label: "生日",
        type: FormTypeEnum.DATE.code,
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      }),
      new FormFieldModel({
        prop: "birthdayTime",
        label: "生日时间",
        type: FormTypeEnum.TIME.code,
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      }),
      new FormFieldModel({
        prop: "joinTime",
        label: "入学时间",
        type: FormTypeEnum.DATETIME.code,
        required: true,
        showMessage: true,
        inlineMessage: false,
        showPassword: false,
        rules: []
      })
    ],
    labelWidth: "120px",
    rules: []
  });
};
