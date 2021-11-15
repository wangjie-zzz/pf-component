import {
  ElButton,
  ElMenuItem,
  ElSelect,
  ElTooltip,
  ElSubmenu,
  ElMenu,
  ElTabs,
  ElTabPane,
  ElTree,
  ElScrollbar,
  ElDropdownMenu,
  ElDropdownItem,
  ElDropdown,
  ElInput,
  ElOption,
  ElCheckbox,
  ElDatePicker,
  ElRadio,
  ElRadioGroup,
  ElTimePicker,
  ElCheckboxGroup,
  ElPopper,
  ElInputNumber,
  ElEmpty,
  ElPagination,
  ElTag,
  ElDialog,
  ElTransfer,
  ElSpace,
  ElCascader
} from "element-plus";
import { App } from "vue";

export default {
  install(app: App): void {
    app.config.globalProperties.$ELEMENT = { size: "small", zIndex: 3000 };
    app
      .use(ElMenu)
      .use(ElSubmenu)
      .use(ElMenuItem)
      .use(ElButton)
      .use(ElTabs)
      .use(ElTabPane)
      .use(ElEmpty)
      .use(ElPagination as any)

      .use(ElInput)
      .use(ElInputNumber)
      .use(ElSelect)
      .use(ElOption as any)
      .use(ElCascader)
      .use(ElCheckboxGroup)
      .use(ElCheckbox)
      .use(ElRadioGroup)
      .use(ElRadio)
      .use(ElDatePicker as any)
      .use(ElTimePicker as any)

      .use(ElScrollbar)
      .use(ElPopper)

      .use(ElTree)
      .use(ElDropdown)
      .use(ElDropdownMenu)
      .use(ElDropdownItem)
      .use(ElTooltip as any)
      .use(ElTag)
      .use(ElDialog)
      .use(ElSpace)
      .use(ElTransfer);
  }
};
