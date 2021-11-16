import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "@/components/element-plus";
import Pf from "../packages";
// import Pf from "../packages";
import { i18nInstall } from "@/components/element-plus/i18n";
import "element-plus/lib/theme-chalk/index.css";
import "@/assets/css/animate.min.css";
import "@/assets/css/index.scss";

const app = createApp(App);
app.use(ElementPlus).use(Pf);
i18nInstall(app);
app.mount("#app");
