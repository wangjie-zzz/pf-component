<template>
  <div class="pf-page-config">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageConfig",
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.#{$prefix} {
  &-page-config {
  }
}
</style>
