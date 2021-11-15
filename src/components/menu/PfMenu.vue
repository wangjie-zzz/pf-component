<template>
  <template v-for="menu in menuList" :key="menu.menuId">
    <el-submenu v-if="menu.children && menu.children.length" :index="menu.menuId" @open="open" @close="close">
      <template v-slot:title>
        <i v-if="menu.menuIcon" :class="menu.menuIcon"></i>
        <span>{{ menu.menuName }}</span>
      </template>
      <pf-menu :menu-list="menu.children" @menuClick="menuClick"></pf-menu>
    </el-submenu>
    <el-menu-item v-else :index="menu.menuId" @click="menuClick(menu)">
      <i v-if="menu.menuIcon" :class="menu.menuIcon"></i>
      <template v-slot:title>
        <span>{{ menu.menuName }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { menusService } from "@/components/menu/menus-service.ts";
import { SysMenu } from "@/model/SysMenu";

export default defineComponent({
  name: "PfMenu",
  props: {
    menuList: {
      type: Array,
      default: () => {
        return menusService;
      }
    }
  },
  emits: ["menuClick"],
  setup(prop, { emit }) {
    const open = () => {};
    const close = () => {};
    const menuClick = (e: SysMenu) => {
      emit("menuClick", e);
    };
    return {
      open,
      close,
      menuClick
    };
  }
});
</script>

<style scoped></style>
