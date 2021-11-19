export type ConfigOps = {
  clientId: string;
  secret: string;
  redirect: string;
  systemUrl: string;
  gatewayUrl: string;
  authUrl: string;
  enableProxy: boolean;
  enableGateway: boolean;
  authPrefix: string;
  systemPrefix: string;
};
export class Config {
  private REDIRECT_URI = "";
  private AUTHORIZE_CALLBACK_PARAMS = {};
  private AUTHORIZE_CODE_PARAMS = {};
  private GATEWAY_URL = "";
  private SYSTEM_URL = "";
  private AUTH_URL = "";
  static readonly INSTANCE: Config = new Config();
  private constructor() {}
  set(props: ConfigOps) {
    this.GATEWAY_URL = props.gatewayUrl;
    this.SYSTEM_URL = props.systemUrl;
    this.AUTH_URL = props.authUrl;
    this.REDIRECT_URI = props.redirect;
    this.AUTHORIZE_CALLBACK_PARAMS = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: props.clientId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_secret: props.secret,
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: `${this.REDIRECT_URI}`
    } as any;
    this.AUTHORIZE_CODE_PARAMS = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: props.clientId,
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: `${this.REDIRECT_URI}`,
      // eslint-disable-next-line @typescript-eslint/camelcase
      response_type: "code"
    } as any;
  }
  getCallbackParams() {
    return this.AUTHORIZE_CALLBACK_PARAMS;
  }
  getAuthCodeParams() {
    return this.AUTHORIZE_CODE_PARAMS;
  }
  getAuthUrl() {
    return this.AUTH_URL;
  }
  getGatewayUrl() {
    return this.GATEWAY_URL;
  }
  getSystemUrl() {
    return this.SYSTEM_URL;
  }
}
