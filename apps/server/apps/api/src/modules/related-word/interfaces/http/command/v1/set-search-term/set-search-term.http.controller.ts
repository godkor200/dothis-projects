import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  SetDicTermCommand,
  SetDicTermCommandOutput,
} from '@Apps/modules/related-word/application/dtos/set-dic-term.command';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const { setDicTerm } = nestControllerContract(apiRouter.relatedWords);
const { description, summary, responses } = setDicTerm;
@Controller()
@ApiTags('탐색어')
export class SetSearchTermHttpController {
  constructor(private readonly commonBus: CommandBus) {}

  @ApiOkResponse({ description: responses[200] })
  @ApiOperation({ summary, description })
  @TsRest(setDicTerm)
  async handler(): Promise<SetDicTermCommandOutput> {
    const setDicTermCommandInput = new SetDicTermCommand();
    return await this.commonBus.execute(setDicTermCommandInput);
  }
}
