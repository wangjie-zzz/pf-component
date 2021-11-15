<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, reactive, Ref, ref, provide, watch } from "vue";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import { Crumb } from "@/model/Crumb";
import { menusService } from "@/components/menu/menus-service";

export default defineComponent({
  props: {},
  setup() {
    const route = useRoute();
    const crumbs: Crumb[] = reactive([]);
    const activeCrumb: Ref<string> = ref("");
    const activeMenuId: Ref<string> = ref(menusService.menus[0].menuId);
    provide("crumbs", crumbs);
    provide("activeCrumb", activeCrumb);
    provide("activeMenuId", activeMenuId);
    watch(
      () => route.name,
      () => {
        const menuId = menusService.refreshCrumbs(route, crumbs);
        // 跳转的路由：不是菜单 && 没有meta信息则不加到crumbs
        if (menuId) {
          activeCrumb.value = route.fullPath;
          activeMenuId.value = menuId;
        }
      }
    );
    return {};
  }
});
</script>
