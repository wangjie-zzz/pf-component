export type ConfigOps = {
  clientId: string;
  secret: string;
  redirect: string;
};
export class Config {
  private REDIRECT_URI = "";
  private AUTHORIZE_CALLBACK_PARAMS = {};
  private AUTHORIZE_CODE_PARAMS = {};
  static readonly INSTANCE: Config = new Config();
  private constructor() {}
  set(props: ConfigOps) {
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
}
