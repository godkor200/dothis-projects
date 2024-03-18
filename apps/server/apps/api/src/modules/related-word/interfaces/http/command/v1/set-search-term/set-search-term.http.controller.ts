import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  SetDicTermCommand,
  SetDicTermCommandOutput,
} from '@Apps/modules/related-word/application/dtos/set-dic-term.command';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter, cacheBaseApiUrl } from '@dothis/dto';
const { set } = nestControllerContract(apiRouter.cache);
const { description, summary, responses } = set;
@Controller()
export class SetSearchTermHttpController {
  constructor(private readonly commonBus: CommandBus) {}
  @ApiTags(cacheBaseApiUrl)
  @ApiOkResponse({ description: responses[200] })
  @ApiOperation({ summary, description })
  @TsRest(set)
  async handler(): Promise<SetDicTermCommandOutput> {
    const setDicTermCommandInput = new SetDicTermCommand();
    return await this.commonBus.execute(setDicTermCommandInput);
  }
}
