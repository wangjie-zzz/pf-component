import { authService } from "./auth-service";

export class HeaderService {
  createBasicHeaders(): RequestInit {
    return {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
  }

  createAuthHeaders(): RequestInit {
    return {
      headers: {
        Authorization: "Bearer " + authService.getToken(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_identity: authService.getUser(),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
  }

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
}
