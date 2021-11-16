import { App } from "vue";
import ElTableColumn from "./table/table-column";
import ElTable from "./table/table.vue";
import Form from "./form/form.vue";
import PfTest from "./test/PfTest.vue";
import { SysDict } from "./services/model/Entity/SysDict";
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
    app.component(PfTest.name, PfTest);
  }
};
