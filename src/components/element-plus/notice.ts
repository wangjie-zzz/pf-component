import { ElLoading, ElMessage } from "element-plus";

export const useNotice = () => {
  const loading = {
    instance: {} as any,
    open: (text?: string) => {
      loading.instance = ElLoading.service({
        lock: true,
        fullscreen: true,
        text: text || "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(248,243,243,0.7)"
        /*parent?: ILoadingParentElement
                background?: string
                spinner?: boolean | string
                text?: string
                fullscreen?: boolean
                body?: boolean
                lock?: boolean
                customClass?: string
                visible?: boolean
                target?: string | HTMLElement*/
      });
    },
    close: () => {
      if (typeof loading.instance.close === "function") loading.instance.close();
    }
  };
  const message = {
    open: (text: string) => ElMessage(text),
    success: (text: string) =>
      ElMessage.success({
        message: text,
        type: "success"
      }),
    warning: (text: string) =>
      ElMessage.warning({
        message: text,
        type: "warning"
      }),
    error: (text: string) => ElMessage.error(text)
  };
  return {
    loading,
    message
  };
};
