<template>
  <h1>
    Async Test2 Component<br />
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  provide,
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
export default defineComponent({
  name: "AsyncTest2",
  setup(props, { emit }) {
    onBeforeMount(() => {
      console.log("Async Test2 Component is onBeforeMount!");
    });
    onMounted(() => {
      console.log("Async Test2 Component is mounted!");
    });
    onBeforeUpdate(() => {
      console.log("Async Test2 Component is onBeforeUpdate!");
    });
    onUpdated(() => {
      console.log("Async Test2 Component is onUpdated!");
    });
    onBeforeUnmount(() => {
      console.log("Async Test2 Component is onBeforeUnmount!");
    });
    onUnmounted(() => {
      console.log("Async Test2 Component is onUnmounted!");
    });
    onErrorCaptured(() => {
      console.log("Async Test2 Component is onErrorCaptured!");
    });
    onRenderTracked(() => {
      console.log("Async Test2 Component is onRenderTracked!");
    });
    onRenderTriggered(() => {
      console.log("Async Test2 Component is onRenderTriggered!");
    });
    onBeforeRouteLeave((to, from) => {
      console.log("Async onBeforeRouteLeave", to, from);
      return true;
    });
    onBeforeRouteUpdate(async (to, from) => {
      console.log("Async onBeforeRouteUpdate", to, from);
    });

    return {};
  }
});
</script>

<style scoped></style>
