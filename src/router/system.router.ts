import { RouteRecordRaw } from "vue-router";

export const systemRouter: Array<RouteRecordRaw> = [
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
