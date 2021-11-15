<template>
  <el-empty class="pf-table">
    <h1>您要找的页面走失了!!!</h1>
  </el-empty>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Table",
  setup() {
    const router = useRoute();
    console.log(router.params);
    const isCollapse = ref(false);
    return { isCollapse };
  }
});
</script>
<style scoped lang="scss">
.#{$prefix} {
  &-table {
  }
}
</style>
