import { App } from "vue";
import ElTableColumn from "./table/table-column";
import ElTable from "./table/table.vue";
import Form from "./form/form.vue";

export default {
  install(app: App): void {
    app.component(Form.name, Form);
    app.component(ElTable.name, ElTable);
    app.component(ElTableColumn.name, ElTableColumn);
  }
};
