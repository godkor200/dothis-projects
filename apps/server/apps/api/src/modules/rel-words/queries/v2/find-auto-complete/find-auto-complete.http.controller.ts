import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { nestControllerContract, TsRest, TsRestRequest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { FindAutoCompleteWordsCommandDto } from '@Apps/modules/rel-words/interface/dtos/auto-complete-words.dto';

import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
const c = nestControllerContract(apiRouter.relwords);
const { getAutoCompleteWords } = c;
const { responses, description, summary } = getAutoCompleteWords;

@ApiTags('연관어')
@Controller()
export class FindAutoCompleteHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getAutoCompleteWords)
  @ApiParam({ name: 'word', description: '단어입니다. 예: 애플' })
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    description: `데이터를 보냅니다.(예:애플페이, 애플 주식....)`,
  })
  async execute(
    @TsRestRequest() { params: { word } },
  ): Promise<IRes<string[]>> {
    const command = new FindAutoCompleteWordsCommandDto({ words: word });
    return { success: true, data: await this.queryBus.execute(command) };
  }
}
