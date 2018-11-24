import { FACEBOOK_CONFIG_TOKEN, TWITTER_CONFIG_TOKEN, GOOGLE_CONFIG_TOKEN } from '../../config.constants';
import { facebookConfig } from './config/facebook-config';

export const authProviders = [
  {
    provide: FACEBOOK_CONFIG_TOKEN,
    useValue: facebookConfig
  }
];