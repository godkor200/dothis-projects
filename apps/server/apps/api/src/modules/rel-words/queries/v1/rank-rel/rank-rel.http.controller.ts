import { QueryBus } from '@nestjs/cqrs';
import { IRes } from '@Libs/commons/src/types/res.types';
import { apiRouter, TRankRes } from '@dothis/dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, NotFoundException, Param } from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { RelwordsNotFoundError } from '@Apps/modules/rel-words/domain/relwords.errors';
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
    example: '가가',
  })
  async execute(@Param('keyword') keyword: string): Promise<IRes<TRankRes[]>> {
    const arg = new RankRelQueryDto({ keyword });
    const result = await this.queryBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof RelwordsNotFoundError)
          throw new NotFoundException(err.message);
        throw err;
      },
    });
  }
}
