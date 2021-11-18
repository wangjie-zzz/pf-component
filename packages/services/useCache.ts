import { useHttpClient } from "./useHttpClient";
import { SysDict } from "./model/Entity/SysDict";
import { systemApi } from "./api/system-api";
import { Constants } from "../constants/Constants";
import { useDict } from "../util/dict-convert";

export const useCache = () => {
  const TOKEN = "access_token";
  const REFRESH_TOKEN = "refresh_token";
  const USER = "user_identity";

  const setCache = (token: any) => {
    sessionStorage.setItem(TOKEN, token.accessToken);
    sessionStorage.setItem(REFRESH_TOKEN, token.refreshToken);
    sessionStorage.setItem(USER, token.jti);
    useHttpClient()
      .general<SysDict[]>(systemApi.dictApi.list)
      .then(response => {
        if (response.code === Constants.CODE.SUCCESS) {
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
  return { clearCache, getToken, getRefreshToken, checkToken, getUser, setCache };
};
