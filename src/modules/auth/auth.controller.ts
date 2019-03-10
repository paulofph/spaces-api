import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';
import { UserService } from '../user/user.service';
// import { RolesGuard } from '../../guards/roles.guard';
// import { Roles } from '../../decorators/roles.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('facebook/uri')
  async requestFacebookRedirectUrl(): Promise<{redirect_uri: string}> {
    return await this.authService.requestFacebookRedirectUri();
  }
   @Post('facebook/token')
  async requestFacebookAccessToken(@Req() req: Request): Promise<IToken> {
    const accessToken = await this.authService.requestFacebookAccessToken(req.body.code);
    return accessToken;
  }
   @Post('facebook/signin')
  async facebookSignIn(@Req() req: any): Promise<any> {
    const user = await this.userService.findUserById(req.user.id);
    return await this.authService.createToken(user);
  }

  @Get('authorized')
  @UseGuards(AuthGuard('jwt'))
  public async authorized(): Promise<any> {
    return {'message': 'Hello'};
  }
}