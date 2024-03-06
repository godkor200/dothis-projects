import { QueryBus } from '@nestjs/cqrs';
import { apiRouter, TRankRes } from '@dothis/dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param } from '@nestjs/common';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/related-word/domain/errors/relwords.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  IRes,
  RelWordsRankingRes,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import {
  GetRankingRelatedWordsDto,
  GetRankingRelatedWordsParams,
} from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { TGetRankingRelatedWordsRes } from '@Apps/modules/related-word/application/service/get-ranking-related-words.service';

const c = nestControllerContract(apiRouter.relatedWords);
const { rankingRelatedWords } = c;
const { summary, description } = rankingRelatedWords;
@ApiTags('관련어')
@Controller()
export class GetRankingRelatedWordsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(rankingRelatedWords)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({
    description:
      RelwordsNotFoundError.message + ' or ' + VideoNotFoundError.message,
  })
  @ApiOkResponse({
    type: RelWordsRankingRes,
  })
  async execute(@Param() params: GetRankingRelatedWordsParams) {
    return tsRestHandler(rankingRelatedWords, async ({ params }) => {
      const arg = new GetRankingRelatedWordsDto(params);
      const result = await this.queryBus.execute(arg);
      return match<TGetRankingRelatedWordsRes, TTsRestRes<IRes<TRankRes>>>(
        result,
        {
          Ok: (result) => ({
            status: 200,
            body: {
              success: true,
              data: result,
            },
          }),
          Err: (err: Error) => {
            if (
              err instanceof RelwordsNotFoundError ||
              err instanceof VideoNotFoundError
            )
              throw new NotFoundException(err.message);

            throw err;
          },
        },
      );
    });
  }
}
