import { App } from "vue";
import ElTableColumn from "./table/table-column";
import ElTable from "./table/table.vue";
import Form from "./form/form.vue";
import PfLayout from "./layout/PfLayout.vue";
import PfMain from "./layout/PfMain.vue";
import PfTest from "./test/PfTest.vue";
import { SysDict } from "./services/model/Entity/SysDict";
import { isNull } from "./util/objects-utils";
import { useDict } from "./util/dict-convert";
import { Config, ConfigOps } from "./services/Config";
import { useAuth } from "./services/useAuth";
import { useHttpClient } from "./services/useHttpClient";
import { useHttpHeader } from "./services/useHttpHeader";
import { useData } from "./services/useData";
import { useMenu } from "./menu/useMenu";

const PF = {
  install(
    app: App,
    ops: {
      dicts: SysDict[];
      config: ConfigOps;
    }
  ): void {
    if (!isNull(ops?.dicts)) {
      useDict().setDict(ops.dicts);
    } else {
      useDict().setDict([]);
    }
    Config.INSTANCE.set(ops.config);

    app.component(Form.name, Form);
    app.component(ElTable.name, ElTable);
    app.component(ElTableColumn.name, ElTableColumn);
    app.component(PfTest.name, PfTest);
    app.component(PfLayout.name, PfLayout);
    app.component(PfMain.name, PfMain);
  }
};
export default { PF, useDict, useAuth, useHttpClient, useHttpHeader, useData, useMenu };
