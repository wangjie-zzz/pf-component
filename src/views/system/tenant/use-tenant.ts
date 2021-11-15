import { clientService } from "@/services/client-service";
import { systemApi } from "@/constants/api/system-api";
import { Constants } from "@/constants/constants";
import { useNotice } from "@/components/element-plus/notice";

export const useTenant = () => {
  const { message } = useNotice();
  const list = (): Promise<any[]> => {
    return clientService.general<any[]>(systemApi.tenantApi.list).then(res => {
      if (res.code === Constants.CODE.SUCCESS) {
        return res.data;
      } else {
        message.error(res.message);
        return [];
      }
    });
  };
  const update = (body: any): Promise<boolean> => {
    return clientService.general(systemApi.tenantApi.update, undefined, body).then(res => {
      if (res.code !== Constants.CODE.SUCCESS) {
        message.error(res.message);
      }
      return res.code === Constants.CODE.SUCCESS;
    });
  };
  const deleteTen = (body: string[]): Promise<boolean> => {
    return clientService.general(systemApi.tenantApi.delete, undefined, body).then(res => {
      if (res.code !== Constants.CODE.SUCCESS) {
        message.error(res.message);
      }
      return res.code === Constants.CODE.SUCCESS;
    });
  };
  return { list, update, deleteTen };
};
