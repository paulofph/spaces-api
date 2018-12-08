import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SERVER_CONFIG } from '../../../config.constants';
import { UserService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SERVER_CONFIG.jwtSecret,
    });
  }

  public async validate(payload: any, done: Function) {
    const user: User = await this.userService.findUserById(payload.sub);
    
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}