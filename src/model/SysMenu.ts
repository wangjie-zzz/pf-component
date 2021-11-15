export interface SysMenu {
  menuId: string;
  menuName: string;
  menuType: string;
  menuUrl: string;
  menuIcon?: string;
  children: Array<SysMenu>;
}
