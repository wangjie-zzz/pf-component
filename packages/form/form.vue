<template>
  <form class="el-form pf-flex pf-flex-wrap" :class="[config.labelPosition ? 'el-form--label-' + config.labelPosition : '', { 'el-form--inline': config.inline }]">
    <template v-for="field in config.fields" :key="field.prop">
      <template v-if="!field.hidden">
        <el-form-item
          :style="calcWidth(field)"
          :prop="field.prop"
          :show-message="field.showMessage"
          :inline-message="field.inlineMessage"
          :label="field.label"
          :label-width="field.labelWidth"
          :rules="field.rules"
        >
          <!--:size="" 以form为准-->
          <!--:error="" 统一移至rules-->
          <!--:required="field.required" 统一移至rules-->
          <template v-if="!config.disabled">
            <el-input
              type="text"
              :disabled="field.disable"
              :prefix-icon="field.prefix"
              :suffix-icon="field.suffix"
              :show-password="field.showPassword"
              class="pf-w-100"
              :placeholder="field.placeholder"
              v-if="field.type === formTypes.INPUT.code"
              v-model="formValue[field.prop]"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
              @input="
                newV => {
                  inputEvent(newV, field.prop);
                }
              "
              @blur="blurEvent(field)"
              @focus="focusEvent(field)"
            >
              <template #append v-if="field.append">
                <slot :name="field.append"></slot>
              </template>
              <template #prepend v-if="field.prepend">
                <slot :name="field.prepend"></slot>
              </template>
            </el-input>
            <el-input
              type="textarea"
              :disabled="field.disable"
              :prefix-icon="field.prefix"
              :suffix-icon="field.suffix"
              :show-password="field.showPassword"
              class="pf-w-100"
              :placeholder="field.placeholder"
              v-if="field.type === formTypes.TEXTAREA.code"
              v-model="formValue[field.prop]"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
              @input="
                newV => {
                  inputEvent(newV, field.prop);
                }
              "
              @blur="blurEvent(field)"
              @focus="focusEvent(field)"
            />
            <el-input-number
              class="pf-w-100"
              controls-position="right"
              :disabled="field.disable"
              :placeholder="field.placeholder"
              v-else-if="field.type === formTypes.NUMBER.code"
              v-model="formValue[field.prop]"
              @change="
                (newV, oldV) => {
                  changeEvent(newV, field.prop);
                }
              "
              @blur="blurEvent(field)"
              @focus="focusEvent(field)"
            />
            <el-select
              class="pf-w-100"
              :placeholder="field.placeholder"
              :disabled="field.disable"
              :multiple="field.multiple"
              :clearable="field.clearable"
              :filterable="field.filterable"
              :allow-create="field.allowCreate"
              :remote="field.remote"
              :collapse-tags="field.collapseTags"
              v-else-if="field.type === formTypes.SELECT.code"
              v-model="formValue[field.prop]"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
              @blur="blurEvent(field)"
              @focus="focusEvent(field)"
              @remove-tag="removeK => {}"
            >
              <el-option v-for="item in field.options" :key="item.key" :label="item.value" :value="item.key" :disabled="item.disabled"> </el-option>
            </el-select>
            <el-cascader
              class="pf-w-100"
              :placeholder="field.placeholder"
              :disabled="field.disable"
              :clearable="field.clearable"
              :filterable="field.filterable"
              :props="field.cascaderProp"
              :options="field.options"
              :collapse-tags="field.collapseTags"
              v-else-if="field.type === formTypes.CASCADER.code"
              v-model="formValue[field.prop]"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
              @blur="blurEvent(field)"
              @focus="focusEvent(field)"
              @remove-tag="removeK => {}"
            >
            </el-cascader>
            <el-checkbox-group
              class="pf-w-100"
              :disabled="field.disable"
              v-else-if="field.type === formTypes.CHECKBOX.code"
              v-model="formValue[field.prop]"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
            >
              <el-checkbox v-for="item in field.options" :key="item.key" :label="item.key">{{ item.value }}</el-checkbox>
            </el-checkbox-group>
            <el-radio-group
              class="pf-w-100"
              v-else-if="field.type === formTypes.RADIO.code"
              v-model="formValue[field.prop]"
              :disabled="field.disable"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
            >
              <el-radio v-for="item in field.options" :key="item.key" :label="item.key">{{ item.value }}</el-radio>
            </el-radio-group>
            <el-date-picker
              :disabled="field.disable"
              type="date"
              :placeholder="field.placeholder"
              class="pf-w-100"
              v-else-if="field.type === formTypes.DATE.code"
              v-model="formValue[field.prop]"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
              @blur="blurEvent(field)"
              @focus="focusEvent(field)"
            />
            <el-time-picker
              :disabled="field.disable"
              :placeholder="field.placeholder"
              class="pf-w-100"
              v-else-if="field.type === formTypes.TIME.code"
              v-model="formValue[field.prop]"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
              @blur="blurEvent(field)"
              @focus="focusEvent(field)"
            />
            <el-date-picker
              type="datetime"
              :disabled="field.disable"
              :placeholder="field.placeholder"
              class="pf-w-100"
              v-else-if="field.type === formTypes.DATETIME.code"
              v-model="formValue[field.prop]"
              @change="
                newV => {
                  changeEvent(newV, field.prop);
                }
              "
              @blur="blurEvent(field)"
              @focus="focusEvent(field)"
            />
            <!--        <el-input v-else v-model="formValue[field.prop]" />-->
          </template>
          <template v-else>
            <span class="">{{ convertDict(field.dict, formValue[field.prop]) }}</span>
          </template>
        </el-form-item>
      </template>
    </template>
  </form>
</template>

<script lang="ts">
import { defineComponent, provide, watch, ref, computed, reactive, toRefs, toRef, PropType } from "vue";
import mitt from "mitt";
import { elFormKey, ElFormItemContext as FormItemCtx, elFormEvents, ValidateFieldCallback, ComponentSize } from "./token";
import { FieldErrorList } from "async-validator";
// import { FormModel, FormTypeEnum } from "../../src/components/model/FormModel";
import ElFormItem from "./form-item.vue";
import { useDict } from "../util/dict-convert";
import { FormTypeEnum } from "../services/model/FormModel";

function useFormLabelWidth() {
  const potentialLabelWidthArr: any = ref([]);
  const autoLabelWidth = computed(() => {
    if (!potentialLabelWidthArr.value.length) return "0";
    const max = Math.max(...potentialLabelWidthArr.value);
    return max ? `${max}px` : "";
  });

  function getLabelWidthIndex(width: number) {
    const index = potentialLabelWidthArr.value.indexOf(width);
    if (index === -1) {
      console.warn("[Element Warn][ElementForm]unexpected width " + width);
    }
    return index;
  }

  function registerLabelWidth(val: number, oldVal: number) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.value.splice(index, 1, val);
    } else if (val) {
      potentialLabelWidthArr.value.push(val);
    }
  }

  function deregisterLabelWidth(val: number) {
    const index = getLabelWidthIndex(val);
    index > -1 && potentialLabelWidthArr.value.splice(index, 1);
  }
  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth
  };
}

interface Callback {
  (isValid?: boolean, invalidFields?: FieldErrorList): void;
}

export default defineComponent({
  name: "ElForm",
  components: { ElFormItem },
  props: {
    model: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    config: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
    colCount: {
      type: Number,
      default: 2
    },
    size: String as PropType<ComponentSize>
  },
  emits: ["validate", "blurEvent", "focusEvent", "changeEvent", "inputEvent"],
  setup(props, { emit }) {
    const formMitt = mitt();
    const formValue = reactive(toRefs(props).model);
    const fields: FormItemCtx[] = [];

    formMitt.on<FormItemCtx>(elFormEvents.addField, field => {
      if (field) {
        console.log(field);
        fields.push(field);
      }
    });

    formMitt.on<FormItemCtx>(elFormEvents.removeField, field => {
      if (field && field.prop) {
        fields.splice(fields.indexOf(field), 1);
      }
    });

    const resetFields = () => {
      if (!props.model) {
        console.warn("[Element Warn][Form]model is required for resetFields to work.");
        return;
      }
      fields.forEach(field => {
        field.resetField();
      });
    };

    const clearValidate = (props: string | string[] = []) => {
      const fds = props.length
        ? typeof props === "string"
          ? fields.filter(field => props === field.prop)
          : fields.filter(field => field && field.prop !== undefined && props.indexOf(field.prop) > -1)
        : fields;
      fds.forEach(field => {
        field.clearValidate();
      });
    };

    const validate = (callback?: Callback) => {
      if (!props.model) {
        console.warn("[Element Warn][Form]model is required for validate to work!");
        return;
      }

      let promise: Promise<boolean> | undefined;
      // if no callback, return promise
      if (typeof callback !== "function") {
        promise = new Promise((resolve, reject) => {
          callback = function(valid, invalidFields) {
            if (valid) {
              resolve(true);
            } else {
              reject(invalidFields);
            }
          };
        });
      }

      if (fields.length === 0) {
        callback && callback(true);
      }
      let valid = true;
      let count = 0;
      let invalidFields = {};
      for (const field of fields) {
        field.validate("", (message, field) => {
          if (message) {
            valid = false;
          }
          invalidFields = { ...invalidFields, ...field };
          if (++count === fields.length) {
            callback && callback(valid, invalidFields);
          }
        });
      }
      return promise;
    };

    const validateField = (props: string | string[], cb: ValidateFieldCallback) => {
      props = [].concat(props as any);
      const fds = fields.filter(field => field.prop !== undefined && props.indexOf(field.prop) !== -1);
      if (!fields.length) {
        console.warn("[Element Warn]please pass correct props!");
        return;
      }

      fds.forEach(field => {
        field.validate("", cb);
      });
    };
    const elForm = reactive({
      formMitt,
      ...toRefs(props.config),
      size: toRef(props, "size"),
      model: reactive(toRef(props, "model")),
      resetFields,
      clearValidate,
      validateField,
      emit,
      ...useFormLabelWidth()
    });

    provide(elFormKey, elForm as any);

    watch(
      () => props.config.rules,
      () => {
        fields.forEach(field => {
          field.removeValidateEvents();
          field.addValidateEvents();
        });

        if (props.config.validateOnRuleChange) {
          validate(() => ({}));
        }
      }
    );
    const calcWidth = computed(() => {
      return (f: any) => {
        // console.log(f);
        let wd = 50;
        const spanCol = f.spanCol > 0 ? f.spanCol : 1;
        if (!isNaN(props.colCount)) {
          wd = Math.round(Number(100 / props.colCount));
        }
        return { width: `calc(${wd * spanCol}% - 30px)` };
      };
    });
    const changeEvent = (newV: any, prop: string) => {
      emit("changeEvent", newV, prop);
    };
    const blurEvent = (field: any) => {
      emit("blurEvent", field);
    };
    const focusEvent = (field: any) => {
      emit("focusEvent", field);
    };
    const inputEvent = (newV: any, prop: string) => {
      emit("inputEvent", newV, prop);
    };
    const { convertDict } = useDict();
    return {
      validate, // export
      resetFields,
      clearValidate,
      validateField,
      calcWidth,
      blurEvent,
      inputEvent,
      focusEvent,
      changeEvent,
      convertDict,
      formTypes: FormTypeEnum,
      formValue
    };
  }
});
</script>
<style scoped lang="scss">
.#{$prefix} {
  &-form {
    display: block;
    width: 100%;
    height: 0;
  }
}
</style>
