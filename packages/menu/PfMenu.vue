<template>
  <template v-for="menu in menuList" :key="menu.menuId">
    <el-submenu v-if="menu.children && menu.children.length" :index="menu.menuId">
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
import { SysMenu } from "../services/model/Entity/SysMenu";

export default defineComponent({
  name: "PfMenu",
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ["menuClick"],
  setup(prop, { emit }) {
    const menuClick = (e: SysMenu) => {
      emit("menuClick", e);
    };
    return {
      menuClick
    };
  }
});
</script>

<style scoped></style>
