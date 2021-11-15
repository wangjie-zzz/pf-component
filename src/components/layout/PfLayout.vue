<template>
  <div class="pf-flex pf-flex-column">
    <div class="pf-flex pf-top">
      <div class="pf-top-logo">
        <img class="pf-vertical-middle" src="@/assets/images/logo.gif" />
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
import { defineComponent, ref, Ref, computed, inject } from "vue";
import PfMenu from "@/components/menu/PfMenu.vue";
import { menusService } from "@/components/menu/menus-service.ts";
import { Crumb } from "@/model/Crumb";
import { useRouter } from "vue-router";
import { clientService } from "@/services/client-service";
import { ElMessageBox } from "element-plus";
import { SysMenu } from "@/model/SysMenu";
import { authApi } from "@/constants/api/auth-api";
import { Constants } from "@/constants/constants";
import { authService } from "@/services/auth-service";

export default defineComponent({
  name: "PfLayout",
  props: {},
  components: { PfMenu },
  setup() {
    const menus: SysMenu[] = menusService.menus;
    /*menusService.list().then(res => {
      menus = res;
    });*/
    const collapse: Ref<boolean> = ref(false);
    const router = useRouter();
    const crumbs: Crumb[] = inject("crumbs") || [];
    const activeCrumb = inject("activeCrumb");
    const activeMenuId = inject("activeMenuId");
    const closable = computed(() => {
      return crumbs.length > 1;
    });
    const tabClick = (e: any) => {
      const idx = crumbs.findIndex(c => c.path === e.paneName);
      if (e.paneName && idx !== -1) {
        /*
      path忽略params属性，params参数可匹配路径参数 或者 隐藏
      fullpath会包含query参数
      * */
        // this.$router.push({ path: e.paneName, params: this.crumbs[idx].params });
        router.push({ path: e.paneName });
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
      ElMessageBox.confirm("退出当前用户，是否确认？", { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }).then(() => {
        /*点击确认*/
        clientService.general(authApi.oauthApi.logout).then(res => {
          if (res.code === Constants.CODE.SUCCESS) {
            authService.clearCache();
          }
          window.location.reload();
        });
      });
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
      menuClick(e: any) {
        router.push({ path: e.menuUrl });
      },
      handleOpen() {
        console.log("handleOpen");
      },
      handleClose() {
        console.log("handleClose");
      }
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
