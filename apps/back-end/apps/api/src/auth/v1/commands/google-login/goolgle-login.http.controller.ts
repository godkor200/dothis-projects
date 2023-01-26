import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleOAuthGuard } from '@Libs/commons/src';

@ApiTags('auth')
@Controller('/auth')
export class GoogleLoginHttpController {
  @Get('/google-login')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: '유저 로그인' })
  @ApiOkResponse({
    description: '로그인후 /google-redirect로 리다이렉트한다.',
  })
  googleAuth() {
    return {
      message: 'Google Authentication',
    };
  }
}
