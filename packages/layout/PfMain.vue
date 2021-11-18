<template>
  <div class="pf-bgwhite pf-p-10">
    <div v-if="title" class="pf-title pf-pl-10">
      <span>{{ title }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PfMain",
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="scss">
.#{$prefix} {
  &-title {
    position: relative;
  }
  &-title:before {
    content: "";
    background-color: #3796ec;
    width: 4px;
    height: 23px;
    position: absolute;
    left: 0;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
  }
}
</style>
