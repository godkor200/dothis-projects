import { Controller, Get, UseGuards, Req, Inject, Res } from '@nestjs/common';
import { Api, ApiDecorator, initNestServer, JsonQuery } from '@ts-rest/nest';
import { JwtRefreshGuard } from '@Libs/commons/src/oauth/guards/jwt-refresh.guard';
import { JwtAccessGuard } from '@Libs/commons/src/oauth/guards/jwt-access.guard';
import { GoogleOAuthGuard } from '@Libs/commons/src/oauth/guards/google-oauth.guard';
import { Request, Response } from 'express';
import { AuthApiService } from '../AuthApi.service';
import { apiUser } from '@dothis/share/lib/dto';
import { ApiTags } from '@nestjs/swagger';

const s = initNestServer(apiUser);

type RouteShape = typeof s.routeShapes;
@JsonQuery()
@ApiTags('auth')
@Controller('/auth')
export class AuthApiController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authApiService: AuthApiService,
  ) {}

  // @Get('/google-login')
  // @UseGuards(GoogleOAuthGuard)
  // googleAuth() {
  //   return { message: 'Google Authentication' };
  // }

  // @Get('/google-redirect')
  // @UseGuards(GoogleOAuthGuard)
  // async googleAuthRedirect(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const authUser = await this.authApiService.googleLogin(req);
  //   res.cookie('google_refreshToken', authUser.googleToken.googleRefreshToken);
  //   res.cookie('google_accessToken', authUser.googleToken.googleAccessToken);
  //   res.cookie('refreshToken', authUser.siteToken.refreshToken);
  //   res.cookie('accessToken', authUser.siteToken.accessToken);
  //
  //   return {
  //     message: authUser.message,
  //     accessToken: authUser.siteToken.accessToken,
  //     googleAccessToken: authUser.googleToken.googleAccessToken,
  //   };
  // }

  @UseGuards(JwtAccessGuard)
  @Api(s.route.verifyAccessTokenPost)
  async verifyAccessToken(@Req() req: Request) {
    return { message: 'authorized' };
  }

  @UseGuards(JwtRefreshGuard)
  @Api(s.route.verifyRefreshTokenPost)
  async verifyRefreshToken(
    @Req() req: Request,
    @ApiDecorator() {}: RouteShape['verifyRefreshTokenPost'],
  ) {
    const authUser = await this.authApiService.googleLogin(req);
    return {
      message: 'authorized',
      accessToken: authUser.siteToken.accessToken,
    };
  }
}
