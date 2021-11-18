import { useCache } from "./useCache";

export const useHttpHeader = () => {
  const createBasicHeaders = (): RequestInit => {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
  };

  const createAuthHeaders = (): RequestInit => {
    const { getToken, getUser } = useCache();
    return {
      headers: {
        Authorization: "Bearer " + getToken(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_identity: getUser(),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
  };

  /*createFileDownloadAuthorizationHeader(): RequestInit {
    return {
      headers: {
        "Content-Type": "application/json",
        Authentication: "bearer " + authService.getToken()?.accessToken,
        idenId: authService.getUserIdentity()
      },
      responseType: "blob"
    };
  }*/
  return { createAuthHeaders, createBasicHeaders };
};
