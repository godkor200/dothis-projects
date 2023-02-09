import { CommandBus } from '@nestjs/cqrs';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  Cookies,
  JwtAccessGuard,
  TDecodePayload,
  User,
} from '@Libs/commons/src';
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetChannelDataCommandDto } from '@Apps/api/src/user/v1/commands/get-channel-data/get-channel-data.command.dto';

@ApiTags('user')
@Controller('/user')
@ApiCookieAuth()
export class GetChannelDataHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/get-channel-data')
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary: '유저 채널 데이터 저장하기',
    description:
      '유저가 채널 데이터를 가져오기 하면 크롤링된 channel 테이블에서 userChannelData 테이블로 이동, 추후 로직이 변경 될수 있음(2023.02.06일 기준)',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
    {
      name: 'Cookie',
      description: "구글 access-token(ex:'google_access_token=ya29.~~~~')",
    },
  ])
  @ApiOkResponse({
    description: '성공적으로 채널데이터를 저장한다면 성공 여부를 리턴한다.',
  })
  @ApiConflictResponse({
    description: '채널에 이미 저장된 데이터가 있다면 오류를 리턴한다.',
  })
  @ApiInternalServerErrorResponse({
    description:
      '구글 서버에 문제가 있거나 구글 auth 내용이 비정상적이라면 리턴한다.',
  })
  async getChannelData(
    @Req() req: Request,
    @User() user: TDecodePayload,
    @Cookies() cookie: { google_access_token: string },
  ) {
    const { id: userId, userEmail } = user;
    const accessToken = cookie.google_access_token;
    return await this.commandBus.execute(
      new GetChannelDataCommandDto({ userId, userEmail, accessToken }),
    );
  }
}
