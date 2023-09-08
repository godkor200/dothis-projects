import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateAutoCompleteWordsCommandDto } from '@Apps/modules/rel-words/interface/dtos/auto-complete-words.dto';
import { IResDto } from '@Libs/commons/src/types/res.types';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const c = nestControllerContract(apiRouter.relwords);
const { summary, responses, description } = c.updateAutoCompleteWords;

@Controller()
export class UpdateAutoCompleteWordsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(c.updateAutoCompleteWords)
  async execute(): Promise<IResDto<void>> {
    const command = new UpdateAutoCompleteWordsCommandDto({});
    if (await this.commandBus.execute(command)) return { success: true };
  }
}
