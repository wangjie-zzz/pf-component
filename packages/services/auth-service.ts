import { clientService } from "./client-service";
import { SysDict } from "./model/Entity/SysDict";
import { systemApi } from "./api/system-api";
import { useDict } from "../util/dict-convert";
import { authApi } from "./api/auth-api";
import { isNull } from "../util/objects-utils";
import { Constants } from "../constants/Constants";

class AuthService {
  private static readonly TOKEN = "access_token";
  private static readonly REFRESH_TOKEN = "refresh_token";
  private static readonly USER = "user_identity";

  private REDIRECT_URI = "";
  private AUTHORIZE_CALLBACK_PARAMS = {};
  private AUTHORIZE_CODE_PARAMS = {};
  init(clientId: string, clientSecret: string, redirect: string) {
    this.REDIRECT_URI = redirect;
    this.AUTHORIZE_CALLBACK_PARAMS = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: clientId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_secret: clientSecret,
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: `${this.REDIRECT_URI}`
    } as any;
    this.AUTHORIZE_CODE_PARAMS = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: clientId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: `${this.REDIRECT_URI}`,
      // eslint-disable-next-line @typescript-eslint/camelcase
      response_type: "code"
    } as any;
  }

  private initDict(): Promise<boolean> {
    return clientService.general<SysDict[]>(systemApi.dictApi.list).then(response => {
      if (response.code === Constants.CODE.SUCCESS) {
        useDict().setDict(response.data);
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  }

  setCache(token: any) {
    sessionStorage.setItem(AuthService.TOKEN, token.accessToken);
    sessionStorage.setItem(AuthService.REFRESH_TOKEN, token.refreshToken);
    sessionStorage.setItem(AuthService.USER, token.jti);
    this.initDict().then(res => {
      if (!res) {
        console.error("加载字典失败");
      }
    });
  }
  clearCache() {
    sessionStorage.clear();
  }
  getToken() {
    return sessionStorage.getItem(AuthService.TOKEN);
  }
  checkToken(): boolean {
    return !sessionStorage.getItem(AuthService.TOKEN);
  }
  getUser(): string {
    return sessionStorage.getItem(AuthService.USER) || "";
  }
  logout(): Promise<boolean> {
    return clientService.general(authApi.oauthApi.logout).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        this.clearCache();
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  }
  authCode(): void {
    const href = clientService.urlQueryConvert(authApi.oauthApi.authorize.url, this.AUTHORIZE_CODE_PARAMS);
    location.href = href;
  }
  token(params: any): Promise<boolean> {
    if (isNull(params) || isNull(params.code)) {
      return Promise.resolve(false);
    }
    return clientService
      .general(authApi.oauthApi.callback, undefined, {
        ...this.AUTHORIZE_CALLBACK_PARAMS,
        ...params
      })
      .then(res => {
        console.log(res);
        if (res.code === Constants.CODE.SUCCESS) {
          this.setCache(res.data);
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      });
  }
  refreshToken(): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const params = { ...this.AUTHORIZE_CALLBACK_PARAMS, refresh_token: this.getRefreshToken() };
    return clientService.general(authApi.oauthApi.refreshToken, undefined, params).then(res => {
      this.setCache(res.data);
      return Promise.resolve(true);
    });
  }
  private getRefreshToken(): string {
    return sessionStorage.getItem(AuthService.REFRESH_TOKEN) || "";
  }
}
export const authService = new AuthService();
