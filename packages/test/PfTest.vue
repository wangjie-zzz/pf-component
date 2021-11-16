<template>
  <div>
    <span>{{ title }}</span>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "PfTest",
  props: {
    title: {
      type: String,
      default: "null: "
    }
  },
  setup(props) {
    console.log("pftest setup ............");
    onMounted(() => {
      console.log("pftest on mounted ............");
    });
    return {};
  }
});
</script>

<style scoped></style>
