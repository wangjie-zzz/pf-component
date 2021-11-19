import { useHttpClient } from "./useHttpClient";
import { isNull } from "../util/objects-utils";
import { Config } from "./Config";
import { SysDict } from "./model/Entity/SysDict";
import { useDict } from "..";
import { ResponseCodeEnum } from "../constants/enum/response-code.enum";
import { SystemApi } from "./api/system-api";
import { AuthApi } from "./api/auth-api";

export const useAuth = () => {
  const TOKEN = "access_token";
  const REFRESH_TOKEN = "refresh_token";
  const USER = "user_identity";

  const setCache = (token: any) => {
    sessionStorage.setItem(TOKEN, token.accessToken);
    sessionStorage.setItem(REFRESH_TOKEN, token.refreshToken);
    sessionStorage.setItem(USER, token.jti);
    useHttpClient()
      .general<SysDict[]>(SystemApi.INSTANCE.dictApi.list)
      .then(response => {
        if (response.code === ResponseCodeEnum.SUCCESS) {
          useDict().setDict(response.data);
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      })
      .then(res => {
        if (!res) {
          console.error("加载字典失败");
        }
      });
  };
  const clearCache = () => {
    sessionStorage.clear();
  };
  const getToken = () => {
    return sessionStorage.getItem(TOKEN);
  };

  const getRefreshToken = (): string => {
    return sessionStorage.getItem(REFRESH_TOKEN) || "";
  };
  const checkToken = (): boolean => {
    return !sessionStorage.getItem(TOKEN);
  };
  const getUser = (): string => {
    return sessionStorage.getItem(USER) || "";
  };

  const logout = (): Promise<boolean> => {
    const { general, urlQueryConvert } = useHttpClient();
    return general(AuthApi.INSTANCE.oauthApi.logout).then(res => {
      if (res.code === ResponseCodeEnum.SUCCESS) {
        clearCache();
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  };
  const authCode = (): void => {
    const { general, urlQueryConvert } = useHttpClient();
    const href = urlQueryConvert(AuthApi.INSTANCE.oauthApi.authorize.url, Config.INSTANCE.getAuthCodeParams());
    location.href = href;
  };
  const token = (params: any): Promise<boolean> => {
    const { general, urlQueryConvert } = useHttpClient();
    if (isNull(params) || isNull(params.code)) {
      return Promise.resolve(false);
    }
    return general(AuthApi.INSTANCE.oauthApi.callback, undefined, {
      ...Config.INSTANCE.getCallbackParams(),
      ...params
    }).then(res => {
      console.log(res);
      if (res.code === ResponseCodeEnum.SUCCESS) {
        setCache(res.data);
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  };
  const refreshToken = (): Promise<boolean> => {
    const { general, urlQueryConvert } = useHttpClient();
    // eslint-disable-next-line @typescript-eslint/camelcase
    const params = { ...Config.INSTANCE.getCallbackParams(), refresh_token: getRefreshToken() };
    return general(AuthApi.INSTANCE.oauthApi.refreshToken, undefined, params).then(res => {
      setCache(res.data);
      return Promise.resolve(true);
    });
  };
  return { logout, refreshToken, token, authCode, clearCache, getToken, getRefreshToken, checkToken, getUser, setCache };
};
