import { BaseApi } from "./base-api";
import { MethodTypeEnum } from "../../constants/enum/method-type.enum";
import { HeaderTypeEnum } from "../../constants/enum/header-type.enum";
import { Api } from "../model/Api";

class SystemApi extends BaseApi {
  menuApi: Api = {};
  dictApi: Api = {};
  formConfigApi: Api = {};
  tableConfigApi: Api = {};
  constructor() {
    super("pf-system", process.env.VUE_APP_SYSTEM_URL);
    this.initKm();
  }

  initKm() {
    this.menuApi = {
      list: {
        url: this.getUrl() + "/sysMenuInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.dictApi = {
      list: {
        url: this.getUrl() + "/sysDictInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.formConfigApi = {
      cacheList: {
        url: this.getUrl() + "/sysFormInfo/cacheList",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.tableConfigApi = {
      cacheList: {
        url: this.getUrl() + "/sysTableInfo/cacheList",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
  }
}
export const systemApi = new SystemApi();
