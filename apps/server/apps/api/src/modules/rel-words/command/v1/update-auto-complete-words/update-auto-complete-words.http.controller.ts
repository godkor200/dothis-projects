import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateAutoCompleteWordsCommandDto } from '@Apps/modules/rel-words/interface/dtos/auto-complete-words.dto';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
const c = nestControllerContract(apiRouter.relwords);
const { summary, responses, description } = c.updateAutoCompleteWords;

@ApiTags('자동완성 단어')
@Controller()
export class UpdateAutoCompleteWordsHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(c.updateAutoCompleteWords)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    description: '인스턴스에 redis에 자동완성 단어를 업데이트 합니다.',
  })
  async execute(): Promise<IRes<void>> {
    const command = new UpdateAutoCompleteWordsCommandDto({});
    if (await this.commandBus.execute(command)) return { success: true };
  }
}
