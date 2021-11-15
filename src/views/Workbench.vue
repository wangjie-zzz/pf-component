<template>
  <div>
    <h1>欢迎来到工作台！！！</h1>
    <el-button @click="menuList">menuList</el-button>
    <el-button @click="access">access auth</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { clientService } from "@/services/client-service";
import { systemApi } from "@/constants/api/system-api";
import { authApi } from "@/constants/api/auth-api";
import { Constants } from "@/constants/constants";
import { authService } from "@/services/auth-service";
export default defineComponent({
  name: "Workbench",
  setup() {
    const menuList = () => {
      clientService.general(systemApi.menuApi.list, undefined).then(res => {
        console.log(res);
      });
    };
    const access = () => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const params = { ...Constants.AUTHORIZE_CALLBACK_PARAMS, refresh_token: authService.getRefreshToken() };
      clientService.general(authApi.oauthApi.refreshToken, undefined, params).then(res => {
        console.log(res);
      });
    };
    return {
      menuList,
      access
    };
  }
});
</script>

<style scoped lang="scss"></style>
