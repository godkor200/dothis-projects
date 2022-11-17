import { Controller, Get } from '@nestjs/common';
import { UserApiService } from './UserApi.service';
@Controller('/user')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}
  @Get('/')
  async getUsers(): Promise<any> {
    return await this.userApiService.findAll();
  }
}
