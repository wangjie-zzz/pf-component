import { useNotice } from "@/components/element-plus/notice";
import { systemApi } from "@/constants/api/system-api";
import { clientService } from "@/services/client-service";
import { Constants } from "@/constants/constants";

export const usePost = () => {
  const { message } = useNotice();
  const list = (): Promise<any[]> => {
    return clientService.general<any[]>(systemApi.postApi.list).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return res.data;
      } else {
        message.error(res.message);
        return [];
      }
    });
  };
  const add = (body: any): Promise<boolean> => {
    return clientService.general(systemApi.postApi.add, undefined, body).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return true;
      } else {
        message.error(res.message);
        return false;
      }
    });
  };
  const addUser = (postId: string, userIds: string[]): Promise<boolean> => {
    return clientService.general(systemApi.postApi.addUser, { postId }, userIds).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return true;
      } else {
        message.error(res.message);
        return false;
      }
    });
  };
  const listUser = (postId: string): Promise<any[]> => {
    return clientService
      .general<any[]>(systemApi.postApi.listUser, { postId })
      .then(res => {
        if (res.code === Constants.CODE.SUCCESS) {
          const all = res.data.map(e => {
            return { key: e.userId, label: e.userName, disabled: false };
          });
          const rel = res.data
            .filter(e => e.postId)
            .map(e => {
              return e.userId;
            });
          return [all, rel];
        } else {
          message.error(res.message);
          return [];
        }
      });
  };
  return { list, add, addUser, listUser };
};
