import { App } from "vue";
import ElTableColumn from "./table/table-column";
import ElTable from "./table/table.vue";
import Form from "./form/form.vue";
import PfTest from "./test/PfTest.vue";
import { SysDict } from "./services/model/Entity/SysDict";
import { isNull } from "./util/objects-utils";
import { useDict } from "./util/dict-convert";
import { authService } from "./services/auth-service";
import { clientService } from "./services/client-service";
import { dataService } from "./services/data-service";

export default {
  install(
    app: App,
    ops: {
      dicts: SysDict[];
      clientId: string;
      secret: string;
      redirect: string;
    }
  ): void {
    if (!isNull(ops?.dicts)) {
      useDict().setDict(ops.dicts);
    } else {
      useDict().setDict([]);
    }
    authService.init(ops.clientId, ops.secret, ops.redirect);
    app.config.globalProperties.$client = clientService;
    app.config.globalProperties.$auth = authService;
    app.config.globalProperties.$data = dataService;

    app.component(Form.name, Form);
    app.component(ElTable.name, ElTable);
    app.component(ElTableColumn.name, ElTableColumn);
    app.component(PfTest.name, PfTest);
  }
};
