import { QueryBus } from '@nestjs/cqrs';
import { apiRouter, TRankRes } from '@dothis/dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, NotFoundException, Param } from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/rel-words/domain/relwords.errors';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { RelWordsRankingRes, IRes } from '@Libs/commons/src/types/res.types';
const c = nestControllerContract(apiRouter.relwords);
const { rankRel } = c;
const { summary, description } = rankRel;
export class RankRelQueryDto {
  readonly keyword: string;

  constructor(props: RankRelQueryDto) {
    this.keyword = props.keyword;
  }
}

@ApiTags('관련어')
@Controller()
export class RankRelHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(rankRel)
  @ApiOperation({
    summary,
    description,
  })
  @ApiParam({
    name: 'keyword',
    description: '탐색어',
    example: '소고기',
  })
  @ApiNotFoundResponse({
    description:
      RelwordsNotFoundError.message + ' or ' + VideoNotFoundError.message,
  })
  @ApiOkResponse({
    type: RelWordsRankingRes,
  })
  async execute(@Param('keyword') keyword: string): Promise<IRes<TRankRes>> {
    const arg = new RankRelQueryDto({ keyword });
    const result = await this.queryBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (
          err instanceof RelwordsNotFoundError ||
          err instanceof VideoNotFoundError
        )
          throw new NotFoundException(err.message);

        throw err;
      },
    });
  }
}
