import { BaseApi } from "./base-api";
import { MethodTypeEnum } from "../../constants/enum/method-type.enum";
import { HeaderTypeEnum } from "../../constants/enum/header-type.enum";
import { Api } from "../model/Api";
import { Config } from "../Config";

export class SystemApi extends BaseApi {
  static readonly INSTANCE: SystemApi = new SystemApi();
  private constructor() {
    super("pf-system", "", "", "");
  }

  menuApi: Api = {};
  dictApi: Api = {};
  formConfigApi: Api = {};
  tableConfigApi: Api = {};

  initPf(enableProxy: boolean, enableGateway: boolean, prefix: string) {
    this.projectUrl["pf-system"] = Config.INSTANCE.getSystemUrl();
    this.projectUrl["pf-gateway"] = Config.INSTANCE.getGatewayUrl();
    this.enableProxy = enableProxy;
    this.enableGateway = enableGateway;
    this.prefix = prefix;
    this.initBaseUrl();
    console.log("system地址初始化：", this.getUrl());

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
