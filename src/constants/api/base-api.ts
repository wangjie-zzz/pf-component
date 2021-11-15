import { HeaderTypeEnum } from "@/constants/enum/header-type.enum";
import { MethodTypeEnum } from "@/constants/enum/method-type.enum";

export type Api = {
  [key: string]: ApiDetail;
};
export type ApiDetail = {
  url: string;
  method: MethodTypeEnum;
  header: HeaderTypeEnum;
};
const ProjectUrl = {
  "pf-gateway": process.env.VUE_APP_BASE_URL,
  "pf-system": process.env.VUE_APP_SYSTEM_URL,
  "pf-auth": process.env.VUE_APP_AUTH_URL
};
export class BaseApi {
  protected baseUrl: string;
  prefix: string;
  permit: string;
  project: string;
  enableGateway: boolean;
  enableProxy: boolean;

  constructor(project?: string) {
    this.prefix = process.env.VUE_APP_API_PREFIX || "";
    this.project = project || "";
    this.permit = "/permitAll";
    this.baseUrl = "";
    this.enableProxy = !!process.env.VUE_APP_ENABLE_PROXY && process.env.VUE_APP_ENABLE_PROXY === "true";
    this.enableGateway = !!process.env.VUE_APP_ENABLE_GATEWAY && process.env.VUE_APP_ENABLE_GATEWAY === "true";
    this.initBaseUrl();
  }
  initBaseUrl(): void {
    if (this.enableProxy) {
      // 开启代理
      if (this.enableGateway) {
        // 开启网关
        this.baseUrl = `/pf-gateway-api`;
      } else {
        // 不开启网关
        this.baseUrl = `/${this.project}-api`;
      }
    } else {
      // 不开代理
      if (this.enableGateway) {
        // 开启网关
        this.baseUrl = ProjectUrl["pf-gateway"] || "";
      } else {
        // 不开启网关
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.baseUrl = ProjectUrl[this.project];
      }
    }
  }
  getUrl(): string {
    return this.baseUrl + "/" + this.project + this.prefix;
  }
  getUrlNotPrefix(): string {
    return this.baseUrl + "/" + this.project;
  }
}
