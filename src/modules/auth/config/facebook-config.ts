import { IFacebookConfig } from '../interfaces/facebook-config.interface';

export const facebookConfig: IFacebookConfig = {
  login_dialog_uri: 'https://www.facebook.com/v2.12/dialog/oauth',
  access_token_uri: 'https://graph.facebook.com/v2.12/oauth/access_token',
  client_id: '351930102025951',
  client_secret: 'b21d3b41bdff9ff0c4a2d43f79a661c1',
  oauth_redirect_uri: 'http://localhost:4200/',
  state: '{fbstate}'
};