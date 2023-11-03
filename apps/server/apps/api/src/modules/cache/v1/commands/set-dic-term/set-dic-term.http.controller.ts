import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  SetDicTermCommand,
  SetDicTermCommandOutput,
} from 'apps/api/src/modules/cache/v1/commands/set-dic-term/set-dic-term.command';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter, cacheBaseApiUrl } from '@dothis/dto';
const { set } = nestControllerContract(apiRouter.cache);
const { description, summary, responses } = set;
@Controller()
export class SetDicTermHttpController {
  constructor(private readonly commonBus: CommandBus) {}
  @ApiTags(cacheBaseApiUrl)
  @ApiOkResponse({ description: responses[200] })
  @ApiUnauthorizedResponse({ description: responses[401] })
  @ApiInternalServerErrorResponse({ description: responses[500] })
  @ApiOperation({ summary, description })
  @TsRest(set)
  async handler(): Promise<SetDicTermCommandOutput> {
    const setDicTermCommandInput = new SetDicTermCommand();
    return await this.commonBus.execute(setDicTermCommandInput);
  }
}
