import { BaseApi } from "./base-api";
import { MethodTypeEnum } from "../../constants/enum/method-type.enum";
import { HeaderTypeEnum } from "../../constants/enum/header-type.enum";
import { Api } from "../model/Api";
import { Config } from "../Config";

export class AuthApi extends BaseApi {
  static readonly INSTANCE: AuthApi = new AuthApi();

  oauthApi: Api = {};
  private constructor() {
    super("pf-auth", "", "", "");
  }

  initPf(enableProxy: boolean, enableGateway: boolean, prefix: string) {
    this.projectUrl["pf-auth"] = Config.INSTANCE.getAuthUrl();
    this.projectUrl["pf-gateway"] = Config.INSTANCE.getGatewayUrl();
    this.enableGateway = enableGateway;
    this.enableProxy = enableProxy;
    this.prefix = prefix;
    this.initBaseUrl();
    console.log("auth地址初始化：", this.getUrlNotPrefix());
    this.oauthApi = {
      authorize: {
        url: Config.INSTANCE.getAuthUrl() + "/pf-auth/oauth/authorize", // TODO href 地址
        // url: this.getUrlNotPrefix() + "/oauth/authorize",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.BASE
      },
      callback: {
        url: this.getUrlNotPrefix() + "/oauth/callback",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.BASE
      },
      logout: {
        url: this.getUrlNotPrefix() + "/logout",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      refreshToken: {
        url: this.getUrlNotPrefix() + "/sso/refreshToken",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
  }
}
