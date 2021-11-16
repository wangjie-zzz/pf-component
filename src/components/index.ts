import { App } from "vue";
import ElTableColumn from "../../packages/table/table-column";
import ElTable from "../../packages/table/table.vue";
import Form from "../../packages/form/form.vue";
import { SysDict } from "./model/SysDict";
import { isNull } from "./util/objects-utils";
import { useDict } from "./util/dict-convert";

export default {
  install(
    app: App,
    ops: {
      dicts: SysDict[];
    }
  ): void {
    if (!isNull(ops?.dicts)) {
      useDict().setDict(ops.dicts);
    } else {
      useDict().setDict([]);
    }
    app.component(Form.name, Form);
    app.component(ElTable.name, ElTable);
    app.component(ElTableColumn.name, ElTableColumn);
  }
};
