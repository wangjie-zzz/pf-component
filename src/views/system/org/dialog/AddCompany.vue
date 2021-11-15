<template>
  <el-dialog title="新增公司" v-model="show">
    <el-form ref="dictForm" :config="formConfig" :model="formInfo"></el-form>
    <template #footer>
      <div class="pf-text-right">
        <el-button type="primary" @click="confirmCreate">确认</el-button>
        <el-button @click="show = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AddCompany",
  props: {
    show: { type: Boolean, default: false }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
