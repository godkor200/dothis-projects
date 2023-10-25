import { CommandBus } from '@nestjs/cqrs';
import { Controller, UseGuards } from '@nestjs/common';
import { IsAdminGuard } from '@Libs/commons/src/oauth/guards/is-admin.guard';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { JwtAccessGuard } from '@Libs/commons/src';
const c = nestControllerContract(apiRouter.user);
const { putAdminUserEnv } = c;
@Controller()
export class PutEnvHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAccessGuard, IsAdminGuard)
  @TsRest(putAdminUserEnv)
  async execute() {
    return '11';
  }
}
