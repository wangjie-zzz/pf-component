type ProjectUrlModel = {
  [key: string]: string;
};
export class BaseApi {
  protected projectUrl: ProjectUrlModel;
  protected baseUrl: string;
  prefix: string;
  permit: string;
  project: string;
  enableGateway: boolean;
  enableProxy: boolean;

  constructor(project: string, url: string, gatewayUrl: string, prefix: string, enableProxy?: boolean, enableGateway?: boolean) {
    this.enableProxy = enableProxy || false; // 默认不开启代理
    this.enableGateway = enableGateway || false; // 默认不开启网关
    this.prefix = prefix;
    this.project = project;
    this.projectUrl = { "pf-gateway": gatewayUrl };
    this.projectUrl[project] = url;
    this.permit = "/permitAll";
    this.baseUrl = "";
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
