import { useHttpClient } from "./useHttpClient";
import { authApi } from "./api/auth-api";
import { isNull } from "../util/objects-utils";
import { Constants } from "../constants/Constants";
import { useCache } from "./useCache";
import { Config } from "./Config";

export const useAuth = () => {
  const logout = (): Promise<boolean> => {
    const { getRefreshToken, setCache, clearCache } = useCache();
    const { general, urlQueryConvert } = useHttpClient();
    return general(authApi.oauthApi.logout).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        clearCache();
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  };
  const authCode = (): void => {
    const { general, urlQueryConvert } = useHttpClient();
    const href = urlQueryConvert(authApi.oauthApi.authorize.url, Config.INSTANCE.getAuthCodeParams());
    location.href = href;
  };
  const token = (params: any): Promise<boolean> => {
    const { getRefreshToken, setCache, clearCache } = useCache();
    const { general, urlQueryConvert } = useHttpClient();
    if (isNull(params) || isNull(params.code)) {
      return Promise.resolve(false);
    }
    return general(authApi.oauthApi.callback, undefined, {
      ...Config.INSTANCE.getCallbackParams(),
      ...params
    }).then(res => {
      console.log(res);
      if (res.code === Constants.CODE.SUCCESS) {
        setCache(res.data);
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  };
  const refreshToken = (): Promise<boolean> => {
    const { getRefreshToken, setCache, clearCache } = useCache();
    const { general, urlQueryConvert } = useHttpClient();
    // eslint-disable-next-line @typescript-eslint/camelcase
    const params = { ...Config.INSTANCE.getCallbackParams(), refresh_token: getRefreshToken() };
    return general(authApi.oauthApi.refreshToken, undefined, params).then(res => {
      useCache().setCache(res.data);
      return Promise.resolve(true);
    });
  };
  return { logout, refreshToken, token, authCode };
};
