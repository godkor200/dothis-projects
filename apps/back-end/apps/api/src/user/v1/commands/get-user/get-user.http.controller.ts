import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindUserCommand } from '@Apps/api/src/user/v1/commands/get-user/get-user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from '@Libs/commons/src/types/dto.types';

@Controller('/user')
export class GetUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('/:id')
  @ApiOperation({ summary: '유저를 가져옵니다.' })
  @ApiResponse({
    description: '유저를 찾습니다.',
    status: HttpStatus.OK,
    type: [UserDto],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  async getUser(@Param('id') id: string) {
    const command = new FindUserCommand({ userId: id });
    const res = await this.commandBus.execute(command);
    return res;
  }
}
