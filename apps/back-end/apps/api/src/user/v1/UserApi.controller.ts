import { GoogleOAuthGuard } from '@Libs/commons/oauth/google-oauth.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UserApiService } from '../UserApi.service';
@Controller('/user')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}
  @Get('/')
  async getUsers() {
    return await this.userApiService.findAll();
  }
  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return;
  }
}
