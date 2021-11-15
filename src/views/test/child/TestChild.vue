<template>
  <div class="pf-bgwhite">
    <p v-if="aa.aa">来自Test:{{ aa }}</p>
    <el-button @click="click()">{{ refObj0 }}</el-button>
    <el-button @click="click1()">{{ refObj1 }}</el-button>
    <el-button @click="click2()">{{ refObj2 }}</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, inject } from "vue";

export default defineComponent({
  name: "TestChild",
  props: {
    refObj: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props) {
    const aa = inject("parent");
    const { refObj } = toRefs(props);
    const refObj1 = { ...props.refObj }; // aa 失去响应性 若加上toRefs则全部失去响应性
    const refObj2 = { ...props };
    return {
      aa,
      refObj0: refObj,
      refObj1,
      refObj2,
      click() {
        refObj.value.aa = new Date().getTime();
        refObj.value.bb.bbb = new Date().getTime();
        console.log(refObj.value.aa);
      },
      click1() {
        refObj1.aa = new Date().getTime();
        refObj1.bb.bbb = new Date().getTime();
        console.log(refObj1.aa);
      },
      click2() {
        refObj2.refObj.aa = new Date().getTime();
        refObj2.refObj.bb.bbb = new Date().getTime();
        console.log(refObj2.refObj.aa);
      }
    };
  }
});
</script>

<style scoped></style>
