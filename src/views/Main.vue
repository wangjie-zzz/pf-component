<template>
  <pf-layout>
    <div class="pf-main">
      <router-view v-slot="{ Component }">
        <!--离场无动画-->
        <transition mode="out-in" appear enter-active-class="animate__animated animate__fadeIn" leave-active-class="">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </pf-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PfLayout from "@/components/layout/PfLayout.vue";

export default defineComponent({
  name: "Main",
  components: { PfLayout },
  setup() {
    return {};
  }
});
</script>
<style scoped lang="scss">
.#{$prefix} {
  &-main {
    margin: 10px;
    padding: 0;
    overflow-y: auto;
    height: calc(100% - 60px);
  }
}
</style>
