import { useNotice } from "@/components/element-plus/notice";
import { systemApi } from "@/constants/api/system-api";
import { clientService } from "@/services/client-service";
import { Constants } from "@/constants/constants";

export const useRole = () => {
  const { message } = useNotice();
  const roleList = (): Promise<any[]> => {
    return clientService.general<any[]>(systemApi.roleApi.list).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return res.data;
      } else {
        message.error(res.message);
        return [];
      }
    });
  };
  const addRole = (body: any): Promise<boolean> => {
    return clientService.general(systemApi.roleApi.add, undefined, body).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return true;
      } else {
        message.error(res.message);
        return false;
      }
    });
  };
  const addRoleRel = (body: any[]): Promise<boolean> => {
    return clientService.general(systemApi.roleApi.addRoleRel, undefined, body).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return true;
      } else {
        message.error(res.message);
        return false;
      }
    });
  };
  const addRoleAuth = (body: any[]): Promise<boolean> => {
    return clientService.general(systemApi.roleApi.addRoleAuth, undefined, body).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return true;
      } else {
        message.error(res.message);
        return false;
      }
    });
  };
  const listRoleRel = (body: any): Promise<any[]> => {
    return clientService.general<any[]>(systemApi.roleApi.listRoleRel, undefined, body).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return res.data;
      } else {
        message.error(res.message);
        return [];
      }
    });
  };
  const listRoleAuth = (body: any): Promise<any[]> => {
    return clientService.general<any[]>(systemApi.roleApi.listRoleAuth, undefined, body).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return res.data;
      } else {
        message.error(res.message);
        return [];
      }
    });
  };
  return { roleList, addRole, addRoleAuth, addRoleRel, listRoleAuth, listRoleRel };
};
