import { Body, Controller, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { apiRouter } from '@dothis/dto';
import {
  incrementScoreWordsDto,
  WordBody,
} from '@Apps/modules/related-word/application/dtos/auto-complete-words.dto';

import { match, Result } from 'oxide.ts';
import { TIncrementScoreResult } from '@Apps/modules/related-word/application/service/increment-score.service';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
const c = nestControllerContract(apiRouter.relatedWords);
const { incrementScoreWords } = c;
const { summary, description } = incrementScoreWords;
@ApiTags('자동완성 단어')
@Controller()
export class IncrementScoreHttpController {
  constructor(private readonly commonBus: CommandBus) {}
  @TsRestHandler(incrementScoreWords)
  @ApiOperation({
    summary,
    description,
  })
  async execute(@Body() body: WordBody) {
    return tsRestHandler(incrementScoreWords, async ({ body }) => {
      const command = new incrementScoreWordsDto(body);
      const res: TIncrementScoreResult = await this.commonBus.execute(command);

      return match<TIncrementScoreResult, TTsRestRes<IRes>>(res, {
        Ok: (res) => ({ status: 200, body: { success: true } }),
        Err: (err: Error) => {
          throw err;
        },
      });
    });
  }
}
