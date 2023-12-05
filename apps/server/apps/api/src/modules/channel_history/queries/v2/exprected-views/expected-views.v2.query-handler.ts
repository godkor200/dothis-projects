import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  CHANNEL_DATA_KEY,
  ExpectedViewsQuery,
  ExpectedViewsV2Query,
} from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { IExpectedData } from '@Apps/modules/channel_history/queries/v1/exprected-views/expected-views.http.controller';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { VIDEO_OS_DI_TOKEN } from '@Apps/modules/video/video.di-token';
import {
  IFindVideoIDAndChannelIdRes,
  IFindVideoIdResOnlyChannelId,
} from '@Apps/modules/video/interface/find-video.os.res';
import { CHANNEL_HISTORY_OS_DI_TOKEN } from '@Apps/modules/channel_history/constants/channel-history.di-token.constants';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { IChannelExpViewsRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { VideoServicePort } from '@Apps/modules/video/database/video.service.port';
import { VIDEO_DATA_KEY } from '@Apps/modules/video/dtos/find-videos.dtos';
import { VideoDataService } from '@Apps/modules/video/service/video-data.service';
import {
  Hit,
  HitList,
  OsRes,
} from '@Apps/common/aws/interface/os.res.interface';
import {
  IFindVideoHistoryResponse,
  IinnerHitVideoHistory,
} from '@Apps/modules/video_history/interface/find-video.history.res';
import { IChannelHistory } from '@Apps/modules/video/interface/find-accumulate-videos.interface';
import { ChannelHistoryAggregateService } from '@Apps/modules/channel_history/service/channel-history.aggregate.service';

@QueryHandler(ExpectedViewsV2Query)
export class ExpectedViewsV2QueryHandler
  implements
    IQueryHandler<
      ExpectedViewsV2Query,
      Result<IExpectedData[], VideoNotFoundError>
    >
{
  constructor(
    @Inject(CHANNEL_HISTORY_OS_DI_TOKEN)
    private readonly channelHistory: ChannelHistoryOutboundPort,

    private readonly channelHistoryAggregateService: ChannelHistoryAggregateService,
  ) {}

  /**
   * 1. video를 다 찾음
   * 2. 선별된 video_id로 video 히스토리를 찾음
   * 3. 채널 히스토리도 찾음
   * 4. 채널, 비디오 히스토리에서 각각 채널아이디, 날짜를 비교해서 맞으면 비디오 히스토리의 조회수/채널의 평균조회수 계산
   * 5. 날짜 별로 계산된 것을 모두 더하고 평균을 내어 리턴
   * @param query
   */
  async execute(
    query: ExpectedViewsV2Query,
  ): Promise<Result<IExpectedData[], VideoNotFoundError>> {
    const arg = {
      ...query,
      data: [CHANNEL_DATA_KEY.CHANNEL_AVERAGE_VIEWS],
    };
    /**
     * 해당날짜의 각 채널의 평균 조회수를 찾기 위해 히스토리를 가져옴, 해당날짜의 각 비디오의 조회수를 알기 위해 비디오 히스토리를 가져옴
     */
    const channelHistory =
      await this.channelHistory.findChannelHistoryByKeywordAndRelWordFullScan<IChannelHistory>(
        arg,
      );

    const result =
      this.channelHistoryAggregateService.calculateAverageViews(channelHistory);

    return Ok(result);
  }
}
