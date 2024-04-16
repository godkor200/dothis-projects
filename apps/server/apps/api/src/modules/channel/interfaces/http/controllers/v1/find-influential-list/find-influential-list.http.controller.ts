import { QueryBus } from '@nestjs/cqrs';
import {
  nestControllerContract,
  tsRestHandler,
  TsRestHandler,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, NotFoundException, Query } from '@nestjs/common';
import {
  FindInfluentialListDto,
  IFindInfluentialListQuery,
} from '@Apps/modules/channel/application/dtos/find-influential-list.dto';
import { match } from 'oxide.ts';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { TFindInfluentialListRes } from '@Apps/modules/channel/application/queries/find-influential-list.query-handler';
import { IRes, TTsRestRes } from '@Libs/commons/src/interfaces/types/res.types';
import { ParseArrayPipe } from '@Libs/commons/src/pipes/parse-array.pipe';
const { getInfluentialList } = nestControllerContract(apiRouter.channel);
const { summary, responses, description } = getInfluentialList;

@ApiTags('채널')
@Controller()
export class FindInfluentialListHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({
    summary,
    description,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: true,
    description: '검색어',
    example: '서울',
  })
  @ApiQuery({
    name: 'related',
    type: String,
    required: true,
    description: '관련어',
    example: '정치',
  })
  @ApiQuery({
    name: 'from',
    type: String,
    required: true,
    description: '언제부터 날짜',
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'to',
    type: String,
    required: true,
    description: '종료 날짜',
    example: '2024-01-10',
  })
  @ApiQuery({
    name: 'clusterNumber',
    type: String,
    required: true,
    description: '클러스터 번호 배열',
    example: '1,2,3',
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    required: false,
    description: '정렬할 필드 default: channel_subscribers',
    enum: ['channel_subscribers', 'channel_average_views'],
  })
  @ApiQuery({
    name: 'order',
    type: String,
    required: false,
    description: '정렬 순서 default: DESC',
    enum: ['ASC', 'DESC'],
  })
  @TsRestHandler(getInfluentialList)
  async execute(@Query(ParseArrayPipe) query: IFindInfluentialListQuery) {
    const outerQuery = query;
    console.log('1');
    return tsRestHandler(getInfluentialList, async ({ query: innerQuery }) => {
      const dto = new FindInfluentialListDto(outerQuery);
      const result: TFindInfluentialListRes = await this.queryBus.execute(dto);

      return match<
        TFindInfluentialListRes,
        TTsRestRes<IRes<TFindInfluentialListRes>>
      >(result, {
        Ok: (result) => ({
          status: 200,
          body: result,
        }),
        Err: (err: Error) => {
          if (err instanceof ChannelNotFoundError) {
            throw new NotFoundException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
