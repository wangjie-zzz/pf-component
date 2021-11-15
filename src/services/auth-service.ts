import { clientService } from "@/services/client-service";
import { SysDict } from "@/model/SysDict";
import { systemApi } from "@/constants/api/system-api";
import { Constants } from "@/constants/constants";
import { useNotice } from "@/components/element-plus/notice";

class AuthService {
  private DICT = "dict";
  private TOKEN = "access_token";
  private REFRESH_TOKEN = "refresh_token";
  private USER = "user_identity";
  private initDict(): Promise<boolean> {
    return clientService.general<SysDict[]>(systemApi.dictApi.list).then(response => {
      if (response.code === Constants.CODE.SUCCESS) {
        this.setDict(response.data);
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  }

  setDict(data: SysDict[]): void {
    sessionStorage.setItem(this.DICT, JSON.stringify(data));
  }
  getDict(): SysDict[] {
    const dictStr = sessionStorage.getItem(this.DICT);
    if (dictStr) {
      const dicts = JSON.parse(dictStr);
      return dicts;
    }
    return [];
  }
  setCache(token: any) {
    this.initDict().then(res => {
      if (!res) {
        useNotice().message.error("加载字典失败");
      }
      sessionStorage.setItem(this.TOKEN, token.accessToken);
      sessionStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
      sessionStorage.setItem(this.USER, token.jti);
    });
  }
  clearCache() {
    sessionStorage.clear();
  }
  getToken() {
    return sessionStorage.getItem(this.TOKEN);
  }
  getRefreshToken(): string {
    return sessionStorage.getItem(this.REFRESH_TOKEN) || "";
  }
  checkToken(): boolean {
    return !sessionStorage.getItem(this.TOKEN);
  }
  getUser(): string {
    return sessionStorage.getItem(this.USER) || "";
  }
}
export const authService = new AuthService();
