import { Controller, Get, UseGuards, Req, Inject } from '@nestjs/common';
import { GoogleOAuthGuard } from '@Libs/commons/oauth/google-oauth.guard';
import { AuthApiService } from '../AuthApi.service';
import { Request } from 'express';
@Controller('/auth')
export class AuthApiController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authApiService: AuthApiService,
  ) {}
  @Get('/google-login')
  @UseGuards(GoogleOAuthGuard)
  googleAuth() {
    return { message: 'Google Authentication' };
  }

  @Get('/google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req: Request) {
    return this.authApiService.googleLogin(req);
  }
}
