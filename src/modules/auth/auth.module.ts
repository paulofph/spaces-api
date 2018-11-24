import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
  } from '@nestjs/common';
  import { authenticate } from 'passport';
  
  // Strategies
//   import { LocalStrategy } from './passport/local.strategy';
//   import { JwtStrategy } from './passport/jwt.strategy';
  import { FacebookStrategy } from './passport/facebook.strategy';
//   import { TwitterStrategy } from './passport/twitter.strategy';
//   import { GoogleStrategy } from './passport/google-plus.strategy';
  
//   import { UserModule } from '../user/user.module';
  import { authProviders } from './auth.providers';
  import { AuthService } from './auth.service';
  import { AuthController } from './auth.controller';
//   import { bodyValidatorMiddleware } from './middlewares/body-validator.middleware';
  
  @Module({
    imports: [
        // UserModule
    ],
    providers: [
      ...authProviders,
      AuthService,
      FacebookStrategy,
    ],
    controllers: [AuthController]
  })
  export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {  
      consumer
        .apply(authenticate('facebook', { session: false }))
        .forRoutes('api/auth/facebook/token');
  
    }
  }