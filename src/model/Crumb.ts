export interface Crumb {
  menuId: string;
  path: string;
  name: string;
  component: string;
  params: any /* path跳转用不到 */;
}
