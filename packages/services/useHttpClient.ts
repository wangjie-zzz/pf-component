import { ApiDetail } from "./model/Api";
import { CommonResult } from "./model/CommonResult";
import { MethodTypeEnum } from "../constants/enum/method-type.enum";
import { HeaderTypeEnum } from "../constants/enum/header-type.enum";
import { useHttpHeader } from "./useHttpHeader";
import { useAuth } from "./useAuth";
import { ResponseCodeEnum } from "../constants/enum/response-code.enum";

export const useHttpClient = () => {
  const fetch0 = (path: string, method: MethodTypeEnum = MethodTypeEnum.GET, param: any, requestConfig: RequestInit): Promise<any> => {
    if (typeof param === "object") param = JSON.stringify(param);
    return fetch(path, {
      method: method,
      body: param || null,
      headers: requestConfig.headers,
      credentials: "include"
    })
      .then(successHanlder())
      .catch(errorHandler());
  };

  const general = <T>(api: ApiDetail, query?: any, params?: any): Promise<CommonResult<T>> => {
    const { createBasicHeaders, createAuthHeaders } = useHttpHeader();
    if (!api) {
      return Promise.resolve({} as any);
    }
    const path = api.url;
    let requestConfig: RequestInit;
    switch (api.header) {
      case HeaderTypeEnum.BASE:
        requestConfig = createBasicHeaders();
        break;
      case HeaderTypeEnum.AUTH:
        requestConfig = createAuthHeaders();
        break;
      default:
        requestConfig = createBasicHeaders();
    }

    return _fetch(path, api.method, requestConfig, query, params);
  };

  const _fetch = <T>(path: string, method: MethodTypeEnum, requestConfig: RequestInit, query?: any, params?: any): Promise<T> => {
    const { authCode, refreshToken } = useAuth();
    const { createBasicHeaders, createAuthHeaders } = useHttpHeader();
    path = urlQueryConvert(path, query);
    return fetch0(path, method, params, requestConfig)
      .then(response => {
        if (response.code) {
          // TODO 后端Long的序列化丢失精度问题导致code也返回了string，待优化
          response.code = Number(response.code);
        }
        if (response.code === ResponseCodeEnum.INVALID_TOKEN) {
          console.warn("token已过期，刷新中...");
          return refreshToken().then((res: boolean) => {
            if (res) {
              requestConfig = Object.assign(requestConfig, createAuthHeaders());
              return _fetch(path, method, requestConfig, undefined, params);
            } else {
              return Promise.resolve(response);
            }
          });
        } else if (response.code === ResponseCodeEnum.FORCE_LOGOUT) {
          // TODO 添加被踢出提示
          authCode();
        } else {
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        return Promise.resolve(error);
      });
  };

  const successHanlder = () => {
    const { authCode, refreshToken } = useAuth();
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
          authCode();
        } else if (response.status === 503) {
          return { code: ResponseCodeEnum.SERVER_FAIL, message: "请求服务响应异常" };
        }
      } else {
        return { code: ResponseCodeEnum.SERVER_FAIL, message: "服务器响应异常" };
      }
    };
  };

  const errorHandler = () => {
    return (error: any) => {
      // console.log(error === "TypeError: Failed to fetch");
      return { code: ResponseCodeEnum.SERVER_FAIL, message: "服务器异常", data: error };
    };
  };

  const jsonToFormData = (params: any) => {
    if (params != null) {
      const formData = new FormData();
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });
      return formData;
    }
  };

  const urlQueryConvert = (url: string, query: any): string => {
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
  };
  return { _fetch, general, jsonToFormData, urlQueryConvert };
};
