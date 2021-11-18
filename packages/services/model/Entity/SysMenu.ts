import { MenuTypeEnum } from "../../../constants/enum/menu-type.enum";

export interface SysMenu {
  menuId: string;
  menuName: string;
  menuType: MenuTypeEnum;
  menuUrl: string;
  menuIcon?: string;
  children: Array<SysMenu>;
}
