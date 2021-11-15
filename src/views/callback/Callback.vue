<template>
  <div class="pf-callback">
    <div class="pf-flex pf-jc-center pf-mb-30">
      <img class="pf-vertical-middle" src="@/assets/images/logo.gif" />
      <span class="pf-fs-20 pf-lh-50 pf-ml-30 pf-nowrap">DCMS</span>
      <span v-if="logining">正在登录中.....</span>
      <span v-else>认证失败</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { clientService } from "@/services/client-service";
import { authApi } from "@/constants/api/auth-api";
import { Constants } from "@/constants/constants";
import router from "@/router";
import { authService } from "@/services/auth-service";
export default defineComponent({
  name: "Callback",
  setup() {
    const logining = ref(true);
    const route = useRoute();
    const initToken = () => {
      if (route.query.code) {
        clientService
          .general(authApi.oauthApi.callback, undefined, {
            ...Constants.AUTHORIZE_CALLBACK_PARAMS,
            ...route.query
          })
          .then(res => {
            console.log(res);
            if (res.code === Constants.CODE.SUCCESS) {
              authService.setCache(res.data);
              router.push(Constants.HOME_PAGE);
            } else {
              logining.value = false;
            }
          });
      } else {
        logining.value = false;
      }
    };
    onMounted(() => {
      initToken();
    });
    return {
      logining,
      initToken
    };
  }
});
</script>

<style scoped lang="scss">
.#{$prefix} {
  &-callback {
  }
}
</style>
