import { Api, BaseApi } from "@/constants/api/base-api";
import { MethodTypeEnum } from "@/constants/enum/method-type.enum";
import { HeaderTypeEnum } from "@/constants/enum/header-type.enum";

class SystemApi extends BaseApi {
  tenantApi: Api = {};
  companyApi: Api = {};
  userApi: Api = {};
  appApi: Api = {};
  dictApi: Api = {};
  metadataApi: Api = {};
  formConfigApi: Api = {};
  tableConfigApi: Api = {};
  menuApi: Api = {};
  roleApi: Api = {};
  postApi: Api = {};
  constructor() {
    super("pf-system");
    this.initKm();
  }

  initKm() {
    this.userApi = {
      adminCreate: {
        url: this.getUrl() + "/sysUserInfo/adminCreate",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.menuApi = {
      list: {
        url: this.getUrl() + "/sysMenuInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.postApi = {
      list: {
        url: this.getUrl() + "/sysPostInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      add: {
        url: this.getUrl() + "/sysPostInfo/add",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      addUser: {
        url: this.getUrl() + "/sysPostInfo/addUser",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      listUser: {
        url: this.getUrl() + "/sysPostInfo/listUser",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.roleApi = {
      list: {
        url: this.getUrl() + "/sysRoleInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      add: {
        url: this.getUrl() + "/sysRoleInfo/add",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      addRoleRel: {
        url: this.getUrl() + "/sysRoleInfo/addRoleRel",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      addRoleAuth: {
        url: this.getUrl() + "/sysRoleInfo/addRoleAuth",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      listRoleRel: {
        url: this.getUrl() + "/sysRoleInfo/listRoleRel",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      listRoleAuth: {
        url: this.getUrl() + "/sysRoleInfo/listRoleAuth",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.dictApi = {
      cacheList: {
        url: this.getUrl() + "/sysDictInfo/cacheList",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      list: {
        url: this.getUrl() + "/sysDictInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      delete: {
        url: this.getUrl() + "/sysDictInfo/delete",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      update: {
        url: this.getUrl() + "/sysDictInfo/update",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.appApi = {
      list: {
        url: this.getUrl() + "/sysAppInfo/selectAppAndMenuList",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.companyApi = {
      userList: {
        url: this.getUrl() + "/sysCompanyInfo/userList",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      list: {
        url: this.getUrl() + "/sysCompanyInfo/selectComTree",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      deptList: {
        url: this.getUrl() + "/sysCompanyInfo/deptList",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      addCompany: {
        url: this.getUrl() + "/sysCompanyInfo/addCompany",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      addDept: {
        url: this.getUrl() + "/sysCompanyInfo/addDept",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.tenantApi = {
      list: {
        url: this.getUrl() + "/sysTenantInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      delete: {
        url: this.getUrl() + "/sysTenantInfo/delete",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      update: {
        url: this.getUrl() + "/sysTenantInfo/update",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.metadataApi = {
      dbNames: {
        url: this.getUrl() + "/metadata/dbNames",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      getTableNamesByDb: {
        url: this.getUrl() + "/metadata/getTableNamesByDb",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      getTableNamesByDbAndTb: {
        url: this.getUrl() + "/metadata/getTableNamesByDbAndTb",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.formConfigApi = {
      cacheList: {
        url: this.getUrl() + "/sysFormInfo/cacheList",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      list: {
        url: this.getUrl() + "/sysFormInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      formInfo: {
        url: this.getUrl() + "/sysFormInfo/info",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      createForm: {
        url: this.getUrl() + "/sysFormInfo/createForm",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      createByTable: {
        url: this.getUrl() + "/sysFormInfo/createByTable",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      /*createFormField: { // 用于form-data.ts的数据导入
        url: this.getUrl() + "/sysFormInfo/createFormField",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },*/
      updateFormField: {
        url: this.getUrl() + "/sysFormInfo/updateFormField",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
    this.tableConfigApi = {
      cacheList: {
        url: this.getUrl() + "/sysTableInfo/cacheList",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      list: {
        url: this.getUrl() + "/sysTableInfo/list",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      info: {
        url: this.getUrl() + "/sysTableInfo/info",
        method: MethodTypeEnum.GET,
        header: HeaderTypeEnum.AUTH
      },
      create: {
        url: this.getUrl() + "/sysTableInfo/create",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      createByTable: {
        url: this.getUrl() + "/sysTableInfo/createByTable",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      createField: {
        // 用于table-data.ts的数据导入
        url: this.getUrl() + "/sysTableInfo/createField",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      },
      updateField: {
        url: this.getUrl() + "/sysTableInfo/updateField",
        method: MethodTypeEnum.POST,
        header: HeaderTypeEnum.AUTH
      }
    };
  }
}
export const systemApi = new SystemApi();
