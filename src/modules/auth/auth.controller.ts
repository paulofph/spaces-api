import { Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
// import { IToken } from './interfaces/token.interface';
// import { RolesGuard } from '../../guards/roles.guard';
// import { Roles } from '../../decorators/roles.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('facebook/uri')
  async requestFacebookRedirectUrl(): Promise<{redirect_uri: string}> {
    return await this.authService.requestFacebookRedirectUri();
  }

  @Post('facebook/signin')
  async facebookSignIn(): Promise<any> {
    return await this.authService.facebookSignIn(null);
  }

  @Post('facebook/token')
  async requestJsonWebTokenAfterFacebookSignIn(@Req() req: any): Promise<any> {
    console.log(222222)
    return await this.authService.createToken(req.user);
  }

//   @Get('authorized')
//   @Roles('user')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   public async authorized(): Promise<any> {
//     console.log('Authorized route...');
//     return {'message': 'Hello'};
//   }
}