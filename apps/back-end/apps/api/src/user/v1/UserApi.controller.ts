import { UserDto } from '@dothis/libs/src/model/user/user.model';
import { Controller, Get } from '@nestjs/common';
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
}
