import {
  Controller,
  Get,
  UseGuards,
  Req,
  Inject,
  Res,
  Post,
} from '@nestjs/common';
import { GoogleOAuthGuard } from '@Libs/commons/src/oauth/guards/google-oauth.guard';
import { AuthApiService } from '../AuthApi.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { JwtRefreshGuard } from '@Libs/commons/src/oauth/guards/jwt-refresh.guard';
import { JwtAccessGuard } from '@Libs/commons/src/oauth/guards/jwt-access.guard';

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
    const authUser = await this.authApiService.googleLogin(req);
    res.cookie('refreshToken', authUser.siteToken.refreshToken);
    return {
      message: authUser.message,
      accessToken: authUser.siteToken.accessToken,
    };
  }

  @Post('/verify-access')
  @UseGuards(JwtAccessGuard)
  async verifyAccessToken(@Req() req: Request) {
    return { message: 'authorized' };
  }

  @Post('/verify-refresh')
  @UseGuards(JwtRefreshGuard)
  async verifyRefreshToken(@Req() req: Request) {
    const authUser = await this.authApiService.googleLogin(req);
    return {
      message: 'authorized',
      accessToken: authUser.siteToken.accessToken,
    };
  }
}
