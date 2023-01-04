import { UserDto } from '@Libs/commons/src/types/dto.types';
import { TDecodePayload, User } from '@Libs/commons/src';
import { Cookies } from '@Libs/commons/src/decorator/cookies.decorator';
import { JwtAccessGuard } from '@Libs/commons/src/oauth/guards/jwt-access.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserApiService } from '../UserApi.service';

@ApiTags('user')
@Controller('/user')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}

  @Get('/')
  @ApiOperation({ summary: '유저를 가져옵니다.' })
  @ApiResponse({ type: [UserDto] })
  async getUsers() {
    return await this.userApiService.findAll();
  }

  @Get('/channel-data')
  @UseGuards(JwtAccessGuard)
  async getChannelData(
    @Req() req: Request,
    @User() user: TDecodePayload,
    @Cookies() cookie: { googleAccessToken: string },
  ) {
    const userId = user.userId;
    const accessToken = cookie.googleAccessToken;
    return await this.userApiService.registerUserData(userId, accessToken);
  }
}
