import { Injectable, Inject } from '@nestjs/common';
import { use } from 'passport';

import { FACEBOOK_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../config.constants';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
// import { IUser } from '../../user/interfaces/user.interface';

const FacebookTokenStrategy = require('passport-facebook-token');

@Injectable()
export class FacebookStrategy {
  constructor(
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig
  ) {
    this.init();
  }
   private init(): void {
    use('facebook', new FacebookTokenStrategy({
      clientID: this.fbConfig.client_id,
      clientSecret: this.fbConfig.client_secret
    }, function(accessToken: string, refreshToken: string, profile: any, done: Function) {
      console.log(profile);
    }))
  }
}
