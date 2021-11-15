import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import ElementLocale from "element-plus/lib/locale";
import { locale } from "element-plus";
import { createI18n } from "vue-i18n";
import { App } from "vue";
export function i18n(app: App): App {
  // 设置语言
  const messages = {
    [zhLocale.name]: {
      // el 这个属性很关键，一定要保证有这个属性，
      el: zhLocale.el,
      // 定义您自己的字典，但是请不要和 `el` 重复，这样会导致 ElementPlus 内部组件的翻译失效.
      message: {}
    }
  };
  locale(zhLocale);
  const i18n = createI18n({
    locale: zhLocale.name,
    fallbackLocale: zhLocale.name,
    messages
  });
  app.use(i18n);
  ElementLocale.i18n(i18n.global.t);
  return app;
}
