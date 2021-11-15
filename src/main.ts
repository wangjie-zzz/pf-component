import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "@/components/element-plus";
import Pf from "../lib/index.umd.js";
import "../lib/index.css";
import { i18n } from "@/components/element-plus/i18n";
import "element-plus/lib/theme-chalk/index.css";
import "@/assets/css/animate.min.css";
import "@/assets/css/index.scss";
declare module "@vue/runtime-core" {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  import { ClientService } from "@/services/client-service.";
  export interface ComponentCustomProperties {
    $client: typeof ClientService;
  }
}
const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(Pf)
  .use(ElementPlus);
i18n(app);
app.mount("#app");
