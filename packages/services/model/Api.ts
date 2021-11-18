import { MethodTypeEnum } from "../../constants/enum/method-type.enum";
import { HeaderTypeEnum } from "../../constants/enum/header-type.enum";

export type Api = {
  [key: string]: ApiDetail;
};
export type ApiDetail = {
  url: string;
  method: MethodTypeEnum;
  header: HeaderTypeEnum;
};
