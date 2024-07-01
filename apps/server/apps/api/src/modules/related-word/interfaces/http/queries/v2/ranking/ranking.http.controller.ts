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
import { VideoNotFoundError } from '@Apps/modules/video/domain/events/video.error';
import {
  IRes,
  RelWordsRankingRes,
  TTsRestRes,
} from '@Libs/commons/src/interfaces/types/res.types';
import {
  GetRankingRelatedWordsParams,
  GetRankingRelatedWordsV2Dto,
} from '@Apps/modules/related-word/application/dtos/get-ranking-related-words.dto';
import { TGetRankingRelatedWordsRes } from '@Apps/modules/related-word/application/service/get-ranking-related-words.service';
import { RelatedWordsNotFoundError } from '@Apps/modules/related-word/domain/errors/related-words.errors';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

const c = nestControllerContract(apiRouter.relatedWords);
const { rankingRelatedWordsV2 } = c;
const { summary, description } = rankingRelatedWordsV2;
@ApiTags('연관어')
@Controller()
export class RankingHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(rankingRelatedWordsV2)
  @ApiOperation({
    summary,
    description,
  })
  @ApiNotFoundResponse({
    description:
      RelatedWordsNotFoundError.message + ' or ' + VideoNotFoundError.message,
  })
  @ApiOkResponse({
    type: RelWordsRankingRes,
  })
  async execute(@Param() params: GetRankingRelatedWordsParams) {
    return tsRestHandler(rankingRelatedWordsV2, async ({ params }) => {
      const arg = new GetRankingRelatedWordsV2Dto(params);
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
              err instanceof RelatedWordsNotFoundError ||
              err instanceof VideoNotFoundError ||
              err instanceof KeywordsNotFoundError
            )
              throw new NotFoundException(err.message);

            throw err;
          },
        },
      );
    });
  }
}
