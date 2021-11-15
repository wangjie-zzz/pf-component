<template>
  <div class="pf-layout-config">
    <h1>LayoutConfig完善中。。。</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PfLayout from "@/components/layout/PfLayout.vue";

export default defineComponent({
  name: "LayoutConfig",
  setup() {
    return {};
  }
});
</script>
<style scoped lang="scss">
.#{$prefix} {
  &-layout-config {
    margin: 10px;
    padding: 0;
    overflow-y: auto;
    height: calc(100% - 60px);
  }
}
</style>
