import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from '@Libs/commons/src';

@Controller('/auth')
@ApiTags('auth')
export class GoogleLoginHttpController {
  @Get('/google-login')
  @UseGuards(GoogleOAuthGuard)
  googleAuth() {
    return {
      message: 'Google Authentication',
    };
  }
}
