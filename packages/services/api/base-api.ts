import { isTrue } from "../../constants/enum/dicts/bool.enum";

type ProjectUrlModel = {
  [key: string]: string;
};
export class BaseApi {
  private projectUrl: ProjectUrlModel = { "pf-gateway": process.env.VUE_APP_BASE_URL };
  protected baseUrl: string;
  prefix: string;
  permit: string;
  project: string;
  enableGateway: boolean;
  enableProxy: boolean;

  constructor(project: string, url: string) {
    this.prefix = process.env.VUE_APP_API_PREFIX || "";
    this.project = project;
    this.projectUrl[project] = url;
    this.permit = "/permitAll";
    this.baseUrl = "";
    this.enableProxy = isTrue(process.env.VUE_APP_ENABLE_PROXY);
    this.enableGateway = isTrue(process.env.VUE_APP_ENABLE_GATEWAY);
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
        this.baseUrl = this.projectUrl["pf-gateway"] || "";
      } else {
        // 不开启网关
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.baseUrl = this.projectUrl[this.project];
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
