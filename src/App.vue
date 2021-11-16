<template>
  <div>
    <PfTest :title="'self-test: '"><span>i'm pf content </span></PfTest>
    <el-form
      class="pf-mb-50"
      :col-count="3"
      :config="formConfig"
      :model="formInfo"
      @validate="validate"
      @blurEvent="blurEvent"
      @changeEvent="changeEvent"
      @focusEvent="focusEvent"
      @inputEvent="inputEvent"
    ></el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { FormModel } from "../packages/services/model/FormModel";
import { testForm, toFormValue } from "@/test-data/form";
export default defineComponent({
  props: {},
  setup() {
    const formConfig: Ref<FormModel> = ref(testForm());
    const formInfo: Ref<any> = ref(toFormValue(formConfig.value));
    const changeEvent = (newV: any, prop: string) => {
      console.log("changeEvent", newV, prop);
    };
    const blurEvent = (field: any) => {
      console.log("blurEvent", field, formInfo.value[field.prop]);
    };
    const focusEvent = (field: any) => {
      console.log("focusEvent", field, formInfo.value[field.prop]);
    };
    const inputEvent = (newV: any, prop: string) => {
      console.log("inputEvent", newV, prop);
    };
    const validate = (val: any, val2: any, val3: any) => {
      console.log("validate", val, val2, val3);
    };
    const disable = () => {
      formConfig.value?.setDisable("name", !formConfig.value.getDisable("name"));
      console.log(formConfig.value?.getDisable("name"));
    };
    return {
      formConfig,
      formInfo,
      changeEvent,
      blurEvent,
      focusEvent,
      inputEvent,
      validate,
      disable
    };
  }
});
</script>
