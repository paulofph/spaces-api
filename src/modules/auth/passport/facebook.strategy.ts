import { Injectable, Inject } from '@nestjs/common';
import { use } from 'passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FACEBOOK_CONFIG_TOKEN, USER_MODEL_TOKEN } from '../../../config.constants';
import { IFacebookConfig } from '../interfaces/facebook-config.interface';
import { User } from 'src/modules/user/entities/user.entity';
// import { IUser } from '../../user/interfaces/user.interface';

const FacebookTokenStrategy = require('passport-facebook-token');

@Injectable()
export class FacebookStrategy {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig
  ) {
    this.init();
  }
  private init(): void {
    use('facebook', new FacebookTokenStrategy({
      clientID: this.fbConfig.client_id,
      clientSecret: this.fbConfig.client_secret
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
      try {
        const existingUser: User = await this.userRepository.findOne({ facebookKey: profile.id});
        if (existingUser) {
          return done(null, existingUser);
        }
        const email: string = profile.emails.shift().value;
        const user: User = {
          id: null,
          facebookKey: profile.id,
          name: profile.displayName
        };

        done(null, await this.userRepository.save(user));
      } catch (err) {
        done(err, null);
      }
    }));
  }
}
