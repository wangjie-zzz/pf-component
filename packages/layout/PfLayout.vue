<template>
  <div class="pf-flex pf-flex-column">
    <div class="pf-flex pf-top">
      <div class="pf-top-logo">
        <img class="pf-vertical-middle" :src="logoPath" />
      </div>
      <div class="pf-flex pf-flex-1 pf-ai-center pf-white">
        <div class="pf-flex-1">
          <el-button class="pf-vertical-middle" type="text" @click="collapse = !collapse">
            <i class="pf-fs-40 pf-white" :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </el-button>
          <span class="pf-ml-5">欢迎进入developer-platform</span>
        </div>
        <el-button class="pf-h-50 pf-mr-15" @click="logout">退出登录</el-button>
      </div>
    </div>
    <div class="pf-content pf-flex">
      <el-menu :class="{ 'pf-content-menu': !collapse }" :default-active="activeMenuId" @open="handleOpen" @close="handleClose" :collapse="collapse">
        <pf-menu :menu-list="menus" @menuClick="menuClick"></pf-menu>
      </el-menu>
      <div class="pf-flex-1 pf-w-0">
        <el-tabs class="pf-bgwhite" v-model="activeCrumb" :closable="closable" @tab-remove="tabRemove" @tab-click="tabClick">
          <el-tab-pane v-for="c in crumbs" :key="c.path" :label="c.name" :name="c.path"></el-tab-pane>
        </el-tabs>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, inject, toRefs } from "vue";
import PfMenu from "../menu/PfMenu.vue";
import { useMenu } from "../menu/useMenu";
import { Crumb } from "../services/model/Crumb";
import { SysMenu } from "../services/model/Entity/SysMenu";
import { isNull } from "../util/objects-utils";

export default defineComponent({
  name: "PfLayout",
  props: {
    logoPath: {
      type: String,
      default: ""
    },
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  emits: ["tab-click", "menu-click", "logout", "menu-open", "menu-close"],
  components: { PfMenu },
  setup(props, { emit }) {
    const { list } = useMenu();
    let menus: SysMenu[] = toRefs(props).menuList as any;
    if (isNull(menus)) {
      list().then(res => {
        menus = res;
      });
    }
    const collapse: Ref<boolean> = ref(false);
    const crumbs: Crumb[] = inject("crumbs") || [];
    const activeCrumb = inject("activeCrumb");
    const activeMenuId = inject("activeMenuId");
    const closable = computed(() => {
      return crumbs.length > 1;
    });
    const tabClick = (e: any) => {
      const idx = crumbs.findIndex(c => c.path === e.paneName);
      if (e.paneName && idx !== -1) {
        emit("tab-click", crumbs[idx]);
      } else {
        emit("tab-click", null);
      }
    };
    const tabRemove = (path: string) => {
      const idx = crumbs.findIndex(e => e.path === path);
      if (idx > -1) {
        crumbs.splice(idx, 1);
        if (path === activeCrumb) {
          tabClick({ paneName: crumbs[0].path });
        }
      }
    };
    const logout = () => {
      emit("logout");
    };
    const menuClick = (e: SysMenu) => {
      emit("menu-click", e);
    };
    const handleOpen = () => {
      emit("menu-open");
    };
    const handleClose = () => {
      emit("menu-close");
    };
    return {
      menus,
      collapse,
      activeMenuId,
      activeCrumb,
      crumbs,
      closable,
      tabClick,
      tabRemove,
      logout,
      menuClick,
      handleOpen,
      handleClose
    };
  }
});
</script>

<style scoped lang="scss">
.#{$prefix} {
  &-top {
    height: 60px;
    line-height: 60px;
    background: #409eff;
    &-logo {
      min-width: 200px;
      max-width: 200px;
      text-align: center;
    }
  }
  &-content {
    height: calc(100vh - 60px);
    &-menu {
      overflow: auto;
      min-width: 200px;
    }
  }
}
</style>
