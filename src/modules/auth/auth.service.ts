import { Injectable, Inject } from '@nestjs/common';
// import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { get, post, Response } from 'request';

import {
  SERVER_CONFIG,
//   USER_MODEL_TOKEN,
  FACEBOOK_CONFIG_TOKEN,
//   TWITTER_CONFIG_TOKEN,
//   GOOGLE_CONFIG_TOKEN
} from '../../config.constants';
// import { IUser } from '../user/interfaces/user.interface';
// import { IToken } from './interfaces/token.interface';
import { IFacebookConfig } from './interfaces/facebook-config.interface';
// import { ITwitterConfig } from './interfaces/twitter-config.interface';
// import { IGoogleConfig } from './interfaces/google-config.interface';

@Injectable()
export class AuthService {
  private url: string;

  constructor(
    // @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
    // @Inject(TWITTER_CONFIG_TOKEN) private readonly twitterConfig: ITwitterConfig,
    // @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: IGoogleConfig
  ) {
    this.url = `${SERVER_CONFIG.httpProtocol}://${SERVER_CONFIG.domain}:3000`;
  }

  async createToken(user: any): Promise<any> {
    console.log("creating token")
    const expiresIn: string = '48h';
    const token: string = sign({
      sub: user.id
    }, SERVER_CONFIG.jwtSecret, {expiresIn});

    return {
      token
    };
  }

  // async findUserById(id: string): Promise<IUser> {
  //   return await this.userModel.findById(id);
  // }

  async requestFacebookRedirectUri(): Promise<{redirect_uri: string}> {
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `state=${this.fbConfig.state}`
    ];
    const redirect_uri: string = `${this.fbConfig.login_dialog_uri}?${queryParams.join('&')}`;

    return {
      redirect_uri
    };
  }

  async facebookSignIn(code: string): Promise<any> {
    code = 'AQBophgswhSIT4rITZqE0uEkqkjid7ri7hALWmQiDwdE7nkJsGxBu5sFn6xq2i6QESABRcQ9BKXl7IdPsXS_3d_SIcss7C8Q8CEdStpfmWax6e628IDNQq33Tr0HJ99QTxx4yFmSws6xqhozGIGDwufdnESEc9uF_D_kebb0dp_Fubxf5pIIF2i4ns_02NipC6pjSVlmi00e-w4-lysgRurGZETU2VkFULHvSYXHDAdH90aIKuOC2-FKyGG0LIpbgbxRQjjReMD6OwY1hWO2xLezEvVfezwiIAwD4LncXtMYusoHnYkteHNwaGfaGEeRlfmAH8K9YIisOfndWHwSSoDj&state=%7Bfbstate%7D#_=_';
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `client_secret=${this.fbConfig.client_secret}`,
      `code=${code}`
    ];
    const uri: string = `${this.fbConfig.access_token_uri}?${queryParams.join('&')}`;
  
    return new Promise((resolve: Function, reject: Function) => { 
      get(uri, (error: Error, response: Response, body: any) => {
        if (error) {
          return reject(error);
        }

        if (body.error) {
          return reject(body.error);
        }
        
        const { access_token } = JSON.parse(body);
        console.log(JSON.parse(body))
        console.log(`${this.url}/api/auth/facebook/token`)
        post({
          url: `${this.url}/api/auth/facebook/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: {
            access_token
          }
        }, async (err: Error, res: Response, body: any) => {
          console.log(1, err)
          if (err) {
            return reject(err);
          }
          console.log(2, body.error)
          if (body.error) {
            return reject(body.error);
          }
          console.log(3, body)
          resolve(body);
        });
      });
    });
  }
}
