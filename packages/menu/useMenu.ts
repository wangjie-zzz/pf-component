import { SysMenu } from "../services/model/Entity/SysMenu";
import { Crumb } from "../services/model/Crumb";
import { useHttpClient } from "../services/useHttpClient";
import { ResponseCodeEnum } from "../constants/enum/response-code.enum";
import { SystemApi } from "../services/api/system-api";
export const useMenu = () => {
  const list = (): Promise<SysMenu[]> => {
    const { general } = useHttpClient();
    return general<any[]>(SystemApi.INSTANCE.menuApi.list).then(res => {
      if (res.code === ResponseCodeEnum.SUCCESS) {
        return res.data;
      } else {
        console.error("菜单获取失败");
        return [];
      }
    });
  };
  const refreshCrumbs = (fullpath: string, routeName: string, routeParams: any, routeMeta: any, crumbs: Crumb[], menus: SysMenu[]): string => {
    // TODO fullPath携带get参数，不同的get参数会有两个crumb，需要使用name跳转
    const c = crumbs.find(c => c.path === fullpath);
    if (c) {
      c.params = routeParams;
      return c.menuId;
    } else {
      let title: string = routeMeta.name as string;
      let menuId: string = routeMeta.menuId as string;
      if (!title) {
        const menu = recursiveSearchByUrl(fullpath, menus);
        if (menu) {
          title = menu.menuName;
          menuId = menu.menuId;
        }
      }
      if (title && menuId) {
        const c: Crumb = {
          menuId: menuId,
          name: title,
          path: fullpath,
          component: routeName,
          params: routeParams
        };
        crumbs.push(c);
      }
      return menuId;
    }
  };

  const recursiveSearchByUrl = (url: string, menus: SysMenu[]): SysMenu | undefined => {
    let res: SysMenu | undefined;
    for (const e of menus) {
      if (e.menuUrl === url) {
        res = e;
      } else if (e.children.length > 0) {
        res = recursiveSearchByUrl(url, e.children);
      }
      if (res) break;
    }
    return res;
  };
  return { list, refreshCrumbs };
};
