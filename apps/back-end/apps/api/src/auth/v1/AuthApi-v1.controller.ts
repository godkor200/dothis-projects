import { Controller, Get, UseGuards, Req, Inject } from '@nestjs/common';
import { GoogleOAuthGuard } from '@Libs/commons/src/oauth/guards/google-oauth.guard';
import { AuthApiService } from '../AuthApi.service';
import { Request } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('auth')
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
