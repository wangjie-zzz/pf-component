import { RouteRecordRaw } from "vue-router";

export const pageConfigRouter: Array<RouteRecordRaw> = [
  {
    path: "page-config",
    name: "PageConfig",
    component: () => import(/* webpackChunkName: "PageConfig" */ "@/views/page-config/PageConfig.vue"),
    children: [
      {
        path: "form",
        name: "FormConfig",
        component: () => import(/* webpackChunkName: "PageConfig" */ "@/views/page-config/form/FormConfig.vue")
      },
      {
        path: "create-form",
        name: "CreateFormConfig",
        component: () => import(/* webpackChunkName: "PageConfig" */ "@/views/page-config/form/CreateFormConfig.vue"),
        meta: { name: "创建表单", menuId: "form" },
        props: true /*route => {
          const params: any = {};
          Object.keys(route.query).forEach(key => {
            params[key] = route.query[key];
          });
          return params;
        }*/
      },
      {
        path: "table",
        name: "TableConfig",
        component: () => import(/* webpackChunkName: "PageConfig" */ "@/views/page-config/table/TableConfig.vue")
      },
      {
        path: "create-table",
        name: "CreateTableConfig",
        component: () => import(/* webpackChunkName: "PageConfig" */ "@/views/page-config/table/CreateTableConfig.vue"),
        meta: { name: "创建表格", menuId: "table" },
        props: true
      },
      {
        path: "layout",
        name: "LayoutConfig",
        component: () => import(/* webpackChunkName: "PageConfig" */ "@/views/page-config/layout/LayoutConfig.vue")
      },
      {
        path: "meta-data",
        name: "MetadataConfig",
        component: () => import(/* webpackChunkName: "PageConfig" */ "@/views/page-config/meta-data/MetadataConfig.vue")
      }
    ]
  },
  {
    path: "tenant",
    name: "Tenant",
    component: () => import(/* webpackChunkName: "System" */ "@/views/system/tenant/Tenant.vue")
  },
  {
    path: "user",
    name: "User",
    component: () => import(/* webpackChunkName: "System" */ "@/views/system/org/Org.vue")
  },
  {
    path: "role",
    name: "Role",
    component: () => import(/* webpackChunkName: "System" */ "@/views/system/role/Role.vue")
  },
  {
    path: "post",
    name: "Post",
    component: () => import(/* webpackChunkName: "System" */ "@/views/system/post/Post.vue")
  },
  {
    path: "dict",
    name: "Dict",
    component: () => import(/* webpackChunkName: "System" */ "@/views/system/Dict.vue")
  }
];
