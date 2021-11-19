import { App } from "vue";
import ElTableColumn from "./table/table-column";
import ElTable from "./table/table.vue";
import Form from "./form/form.vue";
import PfLayout from "./layout/PfLayout.vue";
import PfMain from "./layout/PfMain.vue";
import PfTest from "./test/PfTest.vue";
import { Config, ConfigOps } from "./services/Config";
import { useAuth } from "./services/useAuth";
import { useDict } from "./util/dict-convert";
import { useHttpClient } from "./services/useHttpClient";
import { useData } from "./services/useData";
import { useHttpHeader } from "./services/useHttpHeader";
import { useMenu } from "./menu/useMenu";
import { TableModel, TableColumnModel, emptyTable } from "./services/model/TabelModel";
import { emptyForm, FormFieldModel, FormModel, Options } from "./services/model/FormModel";
import { DictNameEnum, SysDict } from "./services/model/Entity/SysDict";
import { SysFormInfo } from "./services/model/Entity/SysFormInfo";
import { SysFormField } from "./services/model/Entity/SysFormField";
import { SysTableInfo } from "./services/model/Entity/SysTableInfo";
import { SysTableField } from "./services/model/Entity/SysTableField";
import { SysMenu } from "./services/model/Entity/SysMenu";
import { Api, ApiDetail } from "./services/model/Api";
import { MethodTypeEnum } from "./constants/enum/method-type.enum";
import { MenuTypeEnum } from "./constants/enum/menu-type.enum";
import { HeaderTypeEnum } from "./constants/enum/header-type.enum";
import { isTrue } from "./constants/enum/dicts/bool.enum";
import { isNormal } from "./constants/enum/dicts/table-field-type.enum";
import { Crumb } from "./services/model/Crumb";
import { Page } from "./services/model/Page";
import { ResponseCodeEnum } from "./constants/enum/response-code.enum";
import { BaseApi } from "./services/api/base-api";
export {
  useAuth,
  useDict,
  useHttpClient,
  useHttpHeader,
  useData,
  useMenu,
  /*模型*/
  Api,
  ApiDetail,
  BaseApi,
  TableModel,
  TableColumnModel,
  emptyTable,
  FormModel,
  FormFieldModel,
  emptyForm,
  Options,
  Crumb,
  Page,
  /*数据库实体*/
  SysDict,
  SysFormInfo,
  SysFormField,
  SysTableInfo,
  SysTableField,
  SysMenu,
  /*枚举*/
  MethodTypeEnum,
  MenuTypeEnum,
  HeaderTypeEnum,
  DictNameEnum,
  ResponseCodeEnum,
  /*字典公共方法*/
  isTrue,
  isNormal
  /*公共方法*/
  /*常量*/
};
export default {
  install(app: App, ops: ConfigOps): void {
    Config.INSTANCE.set(ops);

    app.component(Form.name, Form);
    app.component(ElTable.name, ElTable);
    app.component(ElTableColumn.name, ElTableColumn);
    app.component(PfTest.name, PfTest);
    app.component(PfLayout.name, PfLayout);
    app.component(PfMain.name, PfMain);
  }
};
