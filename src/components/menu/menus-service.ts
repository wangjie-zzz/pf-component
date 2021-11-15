import { MenuTypeEnum } from "@/constants/enum/menu-type.enum";
import { SysMenu } from "@/model/SysMenu";
import { Crumb } from "@/model/Crumb";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { clientService } from "@/services/client-service";
import { systemApi } from "@/constants/api/system-api";
import { Constants } from "@/constants/constants";
import { useNotice } from "@/components/element-plus/notice";
class MenusService {
  menus: SysMenu[] = [
    {
      menuId: "workbench",
      menuName: "工作台 ",
      menuType: MenuTypeEnum.LINK.code,
      menuUrl: "/main/workbench",
      children: []
    },
    {
      menuId: "system",
      menuName: "系统管理",
      menuType: MenuTypeEnum.LINK.code,
      menuUrl: "/main",
      menuIcon: "el-icon-setting",
      children: [
        {
          menuId: "tenant",
          menuName: "租户管理",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/tenant",
          children: []
        },
        {
          menuId: "user",
          menuName: "用户管理",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/user",
          children: []
        },
        {
          menuId: "post",
          menuName: "岗位管理",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/post",
          children: []
        },
        {
          menuId: "role",
          menuName: "角色配置",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/role",
          children: []
        },
        {
          menuId: "dict",
          menuName: "系统字典",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/dict",
          children: []
        }
      ]
    },
    {
      menuId: "page-config",
      menuName: "页面配置",
      menuType: MenuTypeEnum.LINK.code,
      menuUrl: "/main/page-config",
      menuIcon: "el-icon-tickets",
      children: [
        {
          menuId: "meta-data",
          menuName: "元数据管理",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/page-config/meta-data",
          children: []
        },
        {
          menuId: "form",
          menuName: "表单配置",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/page-config/form",
          children: []
        },
        {
          menuId: "table",
          menuName: "表格配置",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/page-config/table",
          children: []
        },
        {
          menuId: "layout",
          menuName: "布局配置",
          menuType: MenuTypeEnum.LINK.code,
          menuUrl: "/main/page-config/layout",
          children: []
        }
      ]
    },
    {
      menuId: "help",
      menuName: "帮助",
      menuType: MenuTypeEnum.LINK.code,
      menuUrl: "/main/help",
      menuIcon: "el-icon-question",
      children: []
    },
    {
      menuId: "test",
      menuName: "测试",
      menuType: MenuTypeEnum.LINK.code,
      menuUrl: "/main/test",
      menuIcon: "el-icon-edit",
      children: []
    }
  ];
  list(): Promise<SysMenu[]> {
    return clientService.general<any[]>(systemApi.menuApi.list).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return res.data;
      } else {
        useNotice().message.error(res.message);
        return [];
      }
    });
  }
  recursiveSearchByUrl(url: string, menus: SysMenu[]): SysMenu | undefined {
    let res: SysMenu | undefined;
    for (const e of menus) {
      if (e.menuUrl === url) {
        res = e;
      } else if (e.children.length > 0) {
        res = this.recursiveSearchByUrl(url, e.children);
      }
      if (res) break;
    }
    return res;
  }
  refreshCrumbs(route: RouteLocationNormalizedLoaded, crumbs: Crumb[]): string {
    // TODO fullPath携带get参数，不同的get参数会有两个crumb
    const c = crumbs.find(c => c.path === route.fullPath);
    if (c) {
      c.params = route.params;
      return c.menuId;
    } else {
      let title: string = route.meta.name as string;
      let menuId: string = route.meta.menuId as string;
      if (!title) {
        const menu = this.recursiveSearchByUrl(route.fullPath, this.menus);
        if (menu) {
          title = menu.menuName;
          menuId = menu.menuId;
        }
      }
      if (title && menuId) {
        const c: Crumb = {
          menuId: menuId,
          name: title,
          path: route.fullPath,
          component: route.name as string,
          params: route.params
        };
        crumbs.push(c);
      }
      return menuId;
    }
  }
}

export const menusService = new MenusService();
