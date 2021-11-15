import { MethodTypeEnum } from "@/constants/enum/method-type.enum";
import { HeaderTypeEnum } from "@/constants/enum/header-type.enum";
import { HeaderService } from "@/services/header-service";
import { Constants } from "@/constants/constants";
import { CommonResult } from "@/model/CommonResult";
import { ApiDetail } from "@/constants/api/base-api";
import { authApi } from "@/constants/api/auth-api";
import { authService } from "@/services/auth-service";
import { useNotice } from "@/components/element-plus/notice";

export class ClientService extends HeaderService {
  static readonly INSTANCE: ClientService = new ClientService();
  private constructor() {
    super();
  }
  private fetch0(path: string, method: MethodTypeEnum = MethodTypeEnum.GET, param: any, requestConfig: RequestInit): Promise<any> {
    if (typeof param === "object") param = JSON.stringify(param);
    return fetch(path, {
      method: method,
      body: param || null,
      headers: requestConfig.headers,
      credentials: "include"
    })
      .then(this.successHanlder())
      .catch(this.errorHandler());
  }

  general<T>(api: ApiDetail, query?: any, params?: any): Promise<CommonResult<T>> {
    if (!api) {
      return Promise.resolve({} as any);
    }
    const path = api.url;
    let requestConfig: RequestInit;
    switch (api.header) {
      case HeaderTypeEnum.BASE:
        requestConfig = this.createBasicHeaders();
        break;
      case HeaderTypeEnum.AUTH:
        requestConfig = this.createAuthHeaders();
        break;
      default:
        requestConfig = this.createBasicHeaders();
    }

    return this.fetch(path, api.method, requestConfig, query, params);
  }
  fetch<T>(path: string, method: MethodTypeEnum, requestConfig: RequestInit, query?: any, params?: any): Promise<T> {
    path = this.urlQueryConvert(path, query);
    const { loading } = useNotice();
    loading.open();
    return this.fetch0(path, method, params, requestConfig)
      .then(response => {
        loading.close();
        if (response.code) {
          // TODO 后端Long的序列化丢失精度问题导致code也返回了string，待优化
          response.code = Number(response.code);
        }
        if (response.code === Constants.CODE.INVALID_TOKEN) {
          console.warn("token已过期，刷新中...");
          return this.refreshToken().then((res: boolean) => {
            if (res) {
              requestConfig = Object.assign(requestConfig, this.createAuthHeaders());
              return this.fetch(path, method, requestConfig, undefined, params);
            } else {
              return Promise.resolve(response);
            }
          });
        } else if (response.code === Constants.CODE.FORCE_LOGOUT) {
          // TODO 添加被踢出提示
          const href = this.urlQueryConvert(authApi.oauthApi.authorize.url, Constants.AUTHORIZE_CODE_PARAMS);
          location.href = href;
        } else {
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        return Promise.resolve(error);
      });
  }

  successHanlder() {
    return (response: Response) => {
      // console.log(response);
      if (typeof response === "object") {
        if (response.ok && response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          return { code: 404, message: "请求路径错误" };
        } else if (response.status === 401) {
          //TODO 添加sessionId异常提示
          /*response = Response {type: "basic", 
          url: "http://localhost:4200/xxxxxxxxxxxxx", redirected: false, status: 401, ok: false, …}*/
          const href = this.urlQueryConvert(authApi.oauthApi.authorize.url, Constants.AUTHORIZE_CODE_PARAMS);
          location.href = href;
        } else if (response.status === 503) {
          return { code: Constants.CODE.SERVER_FAIL, message: "请求服务响应异常" };
        }
      } else {
        return { code: Constants.CODE.SERVER_FAIL, message: "服务器响应异常" };
      }
    };
  }

  errorHandler() {
    return (error: any) => {
      // console.log(error === "TypeError: Failed to fetch");
      return { code: Constants.CODE.SERVER_FAIL, message: "服务器异常", data: error };
    };
  }

  jsonToFormData(params: any) {
    if (params != null) {
      const formData = new FormData();
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });
      return formData;
    }
  }

  urlQueryConvert(url: string, query: any) {
    if (query) {
      let connectiveSymbol = "";
      if (url.indexOf("?") !== -1) {
        connectiveSymbol = "&";
      } else {
        connectiveSymbol = "?";
      }
      Object.keys(query).forEach((key, idx) => {
        const val = query[key];
        if (idx === 0) {
          if (val != null && val !== "null" && val !== "undefined") {
            url += connectiveSymbol + key + "=" + val;
          } else {
            url += connectiveSymbol + key + "=";
          }
        } else {
          if (val != null && val !== "null" && val !== "undefined") {
            url += "&" + key + "=" + val;
          } else {
            url += "&" + key + "=";
          }
        }
      });
    }
    return url;
  }

  refreshToken(): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const params = { ...Constants.AUTHORIZE_CALLBACK_PARAMS, refresh_token: authService.getRefreshToken() };
    return this.general(authApi.oauthApi.refreshToken, undefined, params).then(res => {
      authService.setCache(res.data);
      return Promise.resolve(true);
    });
  }
}
export const clientService = ClientService.INSTANCE;
