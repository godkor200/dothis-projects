import { Controller, Get, UseGuards, Req, Inject, Res } from '@nestjs/common';
import { GoogleOAuthGuard } from '@Libs/commons/src/oauth/guards/google-oauth.guard';
import { AuthApiService } from '../AuthApi.service';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
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
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authApiService.googleLogin(req);
  }
}
